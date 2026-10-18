import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { barOrder, bars, hire, type BarId, type HireBand } from '../data/bluethroat';
import { price } from '../lib/format';
import { IconArrow } from './Icons';

export interface Plan {
  bar: BarId;
  band: HireBand;
  guests: number;
}

export function hireTotals(plan: Plan) {
  const minimum = bars[plan.bar].hire.minimumSpend[plan.band];
  const service = minimum * hire.serviceRate;
  return { minimum, service, fee: hire.fee, total: minimum + service + hire.fee, perHead: minimum / plan.guests };
}

export function HirePlanner({ plan, onChange, onStart }: { plan: Plan; onChange: (p: Plan) => void; onStart: () => void }) {
  const cap = bars[plan.bar].hire.capacity;
  const t = hireTotals(plan);
  const otherBigger = plan.bar === 'brixton' ? bars.deptford : null;

  const pickBar = (id: BarId) => onChange({ ...plan, bar: id, guests: Math.min(plan.guests, bars[id].hire.capacity) });

  return (
    <div className="planner">
      <div className="planner-inputs">
        <fieldset className="field">
          <legend className="caps">Which arch?</legend>
          <div className="choice-row">
            {barOrder.map((id) => (
              <button key={id} type="button" className={`choice ${plan.bar === id ? 'is-on' : ''}`} aria-pressed={plan.bar === id} onClick={() => pickBar(id)}>
                <span className="choice-title">{bars[id].name}</span>
                <span className="choice-sub">up to {bars[id].hire.capacity} guests</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend className="caps">Which night?</legend>
          <div className="choice-row">
            {hire.bands.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`choice ${plan.band === b.id ? 'is-on' : ''}`}
                aria-pressed={plan.band === b.id}
                onClick={() => onChange({ ...plan, band: b.id })}
              >
                <span className="choice-title">{b.label}</span>
                <span className="choice-sub">{price(bars[plan.bar].hire.minimumSpend[b.id])} minimum</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label className="caps" htmlFor="guests">
            How many guests?
          </label>
          <div className="guests">
            <output htmlFor="guests" className="guests-num">
              {plan.guests}
            </output>
            <input
              id="guests"
              type="range"
              min={hire.minGuests}
              max={cap}
              value={plan.guests}
              onChange={(e) => onChange({ ...plan, guests: Number(e.target.value) })}
              style={{ ['--fill' as string]: `${((plan.guests - hire.minGuests) / (cap - hire.minGuests)) * 100}%` }}
            />
          </div>
          {otherBigger && plan.guests === cap && (
            <p className="hint">
              Brixton holds up to {cap}. For more, Deptford takes up to {otherBigger.hire.capacity}.
            </p>
          )}
        </div>
      </div>

      <div className="planner-output">
        <GuestArch capacity={cap} guests={plan.guests} />
        <dl className="tally">
          <div>
            <dt>Minimum spend on drinks</dt>
            <dd>
              <Tween value={t.minimum} />
            </dd>
          </div>
          <div>
            <dt>Service charge, 12.5%</dt>
            <dd>
              <Tween value={t.service} />
            </dd>
          </div>
          <div>
            <dt>Hire fee, paid upfront</dt>
            <dd>{price(t.fee)}</dd>
          </div>
          <div className="tally-total">
            <dt>From</dt>
            <dd>
              <Tween value={t.total} />
            </dd>
          </div>
        </dl>
        <p className="tally-note">
          About {price(Math.ceil(t.perHead))} a head in drinks for {plan.guests} guests. The hire fee is refundable up to 7 days before.
        </p>
        <button type="button" className="btn btn--gold" onClick={onStart}>
          Start your enquiry <IconArrow />
        </button>
      </div>
    </div>
  );
}

function Tween({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => price(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.9, ease: [0.22, 0.61, 0.21, 1] });
    return () => c.stop();
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}

/** Capacity drawn as lamps inside an arch; guests light them from the floor up. */
function GuestArch({ capacity, guests }: { capacity: number; guests: number }) {
  const W = 200;
  const H = 230;
  const R = W / 2;
  const dots = useMemo(() => archDots(capacity, W, H), [capacity]);
  return (
    <svg className="guest-arch" viewBox={`-8 -8 ${W + 16} ${H + 16}`} role="img" aria-label={`${guests} of ${capacity} guests`}>
      <path className="guest-arch-line" d={`M0 ${H} V${R} A${R} ${R} 0 0 1 ${W} ${R} V${H}`} />
      <path className="guest-arch-line guest-arch-line--inner" d={`M8 ${H} V${R} A${R - 8} ${R - 8} 0 0 1 ${W - 8} ${R} V${H}`} />
      {dots.map((d, i) => (
        <circle key={`${capacity}-${i}`} cx={d.x} cy={d.y} r={d.r} className={i < guests ? 'lit' : ''} style={{ transitionDelay: `${(i % 12) * 12}ms` }} />
      ))}
    </svg>
  );
}

function archDots(n: number, W: number, H: number) {
  const R = W / 2;
  const pad = 20;
  const inside = (x: number, y: number) => {
    if (x < pad || x > W - pad || y > H - pad + 4) return false;
    if (y >= R) return true;
    return Math.hypot(x - R, y - R) <= R - pad;
  };
  // Shrink the grid until the arch holds n lamps, then fill from the floor.
  for (let s = 26; s > 8; s -= 0.5) {
    const rows: { x: number; y: number; r: number }[][] = [];
    for (let y = H - pad + 4; y > 0; y -= s * 0.88) {
      const xs: number[] = [];
      for (let x = pad; x <= W - pad + 0.01; x += s) if (inside(x, y)) xs.push(x);
      if (!xs.length) continue;
      const shift = (W - (xs[0] + xs[xs.length - 1])) / 2;
      rows.push(xs.map((x) => ({ x: x + shift, y, r: s * 0.28 })));
    }
    if (rows.reduce((a, r) => a + r.length, 0) < n) continue;
    const out: { x: number; y: number; r: number }[] = [];
    for (const row of rows) {
      const need = n - out.length;
      if (need <= 0) break;
      if (row.length <= need) out.push(...row);
      else {
        // Keep the top course centred under the crown of the arch.
        const mid = [...row].sort((a, b) => Math.abs(a.x - R) - Math.abs(b.x - R)).slice(0, need);
        out.push(...mid.sort((a, b) => a.x - b.x));
      }
    }
    return out;
  }
  return [];
}
