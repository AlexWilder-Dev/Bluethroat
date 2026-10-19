import type { Bar, Session } from '../data/bluethroat';

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface LondonNow {
  day: number;
  minutes: number;
  date: Date;
  /** e.g. "Monday 19 October" */
  label: string;
}

const dateLabel = (d: Date, timeZone: string) => d.toLocaleDateString('en-GB', { timeZone, weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '');

/**
 * Wall-clock time in London. A `?at=2026-10-23T22:30` query string pins the clock,
 * which is handy for showing the site as it looks on a Friday night.
 */
export function londonNow(): LondonNow {
  const at = new URLSearchParams(window.location.search).get('at');
  if (at) {
    const m = at.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (m) {
      const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]));
      return { day: d.getUTCDay(), minutes: +m[4] * 60 + +m[5], date: d, label: dateLabel(d, 'UTC') };
    }
  }
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = DAY_SHORT.indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')), date: now, label: dateLabel(now, 'Europe/London') };
}

/** 1020 → "5pm", 1440 → "12am", 1500 → "1am", in the style of their own listings. */
export function clock(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  const hr = Math.floor(m / 60);
  const min = m % 60;
  const suffix = hr < 12 ? 'am' : 'pm';
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return min ? `${h12}.${String(min).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
}

export type BarStatus = { open: true; session: Session; closes: string; minutesLeft: number } | { open: false; next: Session; when: string; opensIn: number };

export function barStatus(bar: Bar, now: LondonNow = londonNow()): BarStatus {
  // A session that started yesterday can still be running after midnight.
  for (const s of bar.sessions) {
    const offset = s.day === now.day ? 0 : s.day === (now.day + 6) % 7 ? 1440 : null;
    if (offset === null) continue;
    const t = now.minutes + offset;
    if (t >= s.open && t < s.close) {
      return { open: true, session: s, closes: clock(s.close), minutesLeft: s.close - t };
    }
  }
  // Otherwise find the next opening, up to a week ahead.
  let best: { s: Session; inMins: number } | null = null;
  for (const s of bar.sessions) {
    let delta = ((s.day - now.day + 7) % 7) * 1440 + s.open - now.minutes;
    if (delta <= 0) delta += 7 * 1440;
    if (!best || delta < best.inMins) best = { s, inMins: delta };
  }
  const next = best!;
  const daysAway = Math.floor((now.minutes + next.inMins) / 1440);
  const when =
    daysAway === 0
      ? `tonight at ${clock(next.s.open)}`
      : daysAway === 1
        ? `tomorrow, ${clock(next.s.open)}`
        : `${DAY_NAMES[next.s.day]}, ${clock(next.s.open)}`;
  return { open: false, next: next.s, when, opensIn: next.inMins };
}

export function sessionFor(bar: Bar, day: number): Session | undefined {
  return bar.sessions.find((s) => s.day === day);
}

/** The trading "night" a moment belongs to: 12.30am on Saturday is still Friday night. */
export function nightOf(bar: Bar, now: LondonNow = londonNow()): number {
  const st = barStatus(bar, now);
  return st.open ? st.session.day : now.day;
}

export function todayLabel(now: LondonNow = londonNow()): string {
  return DAY_NAMES[now.day];
}
