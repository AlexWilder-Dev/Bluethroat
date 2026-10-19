import type { Bar } from '../data/bluethroat';
import { barStatus, type LondonNow } from '../lib/time';

const base = import.meta.env.BASE_URL;

/**
 * The sign by each door: gold leaf on a black plate under a single downlight.
 * The light is on while the bar is open and off when it's shut.
 */
export function Plate({ bar, now, as: Tag = 'div' }: { bar: Bar; now: LondonNow; as?: 'div' | 'h2' }) {
  const st = barStatus(bar, now);
  const status = st.open ? `Open till ${st.closes}` : `Opens ${shortWhen(st.when)}`;
  return (
    <Tag className={`plate plate--${bar.id} ${st.open ? 'is-lit' : ''}`}>
      <span className="plate-lamp" aria-hidden="true" />
      <span className="plate-light" aria-hidden="true" />
      {['tl', 'tr', 'bl', 'br'].map((p) => (
        <span key={p} className={`plate-screw plate-screw--${p}`} aria-hidden="true" />
      ))}
      <img className="plate-bird" src={`${base}bird-gold.png`} alt="" width={160} height={123} />
      <span className="plate-word">Bluethroat</span>
      <span className="plate-bar">{bar.name}</span>
      <span className="plate-status">{status}</span>
    </Tag>
  );
}

export function shortWhen(when: string) {
  return when.replace('tonight at ', 'tonight, ').replace(/^(\w{3})\w*day, /, '$1 ');
}
