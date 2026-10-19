import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { barOrder, bars, hire, type BarId, type HireBand } from '../data/bluethroat';
import { price } from '../lib/format';

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

/** Their rate card, made to answer the question: what will our night cost? */
export function HirePlanner({ plan, onChange, onStart }: { plan: Plan; onChange: (p: Plan) => void; onStart: () => void }) {
  const cap = bars[plan.bar].hire.capacity;
  const t = hireTotals(plan);
  const setGuests = (n: number) => onChange({ ...plan, guests: Math.max(hire.minGuests, Math.min(cap, n)) });
  const pickBar = (id: BarId) => onChange({ ...plan, bar: id, guests: Math.min(plan.guests, bars[id].hire.capacity) });

  return (
    <div className="planner">
      <div className="planner-q">
        <p className="label">Bar</p>
        <div className="options">
          {barOrder.map((id) => (
            <button key={id} type="button" className={`option ${plan.bar === id ? 'is-on' : ''}`} aria-pressed={plan.bar === id} onClick={() => pickBar(id)}>
              <span className="option-main">{bars[id].name}</span>
              <span className="option-sub">up to {bars[id].hire.capacity} guests</span>
            </button>
          ))}
        </div>
      </div>

      <div className="planner-q">
        <p className="label">Night</p>
        <div className="options">
          {hire.bands.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`option ${plan.band === b.id ? 'is-on' : ''}`}
              aria-pressed={plan.band === b.id}
              onClick={() => onChange({ ...plan, band: b.id })}
            >
              <span className="option-main">{b.label}</span>
              <span className="option-sub">{price(bars[plan.bar].hire.minimumSpend[b.id])} minimum spend</span>
            </button>
          ))}
        </div>
      </div>

      <div className="planner-q">
        <label className="label" htmlFor="guests">
          Guests
        </label>
        <div className="stepper">
          <button type="button" aria-label="One fewer guest" onClick={() => setGuests(plan.guests - 1)} disabled={plan.guests <= hire.minGuests}>
            −
          </button>
          <output htmlFor="guests">{plan.guests}</output>
          <button type="button" aria-label="One more guest" onClick={() => setGuests(plan.guests + 1)} disabled={plan.guests >= cap}>
            +
          </button>
          <input
            id="guests"
            type="range"
            min={hire.minGuests}
            max={cap}
            value={plan.guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            style={{ ['--fill' as string]: `${((plan.guests - hire.minGuests) / (cap - hire.minGuests)) * 100}%` }}
          />
        </div>
        {plan.bar === 'brixton' && plan.guests === cap && (
          <p className="hint">
            Brixton holds up to {cap}. Deptford takes up to {bars.deptford.hire.capacity}.
          </p>
        )}
      </div>

      <table className="sum">
        <tbody>
          <tr>
            <th scope="row">Minimum spend</th>
            <td>
              <Tween value={t.minimum} />
            </td>
          </tr>
          <tr>
            <th scope="row">Service charge, 12.5%</th>
            <td>
              <Tween value={t.service} />
            </td>
          </tr>
          <tr>
            <th scope="row">Hire fee, paid upfront</th>
            <td>{price(t.fee)}</td>
          </tr>
          <tr className="sum-total">
            <th scope="row">From</th>
            <td>
              <Tween value={t.total} />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="sum-note">
        About {price(Math.ceil(t.perHead))} a head in drinks for {plan.guests} guests. The hire fee is refundable up to 7 days before the event.
      </p>
      <button type="button" className="btn" onClick={onStart}>
        Enquire with these details
      </button>
    </div>
  );
}

function Tween({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => price(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.7, ease: [0.22, 0.61, 0.21, 1] });
    return () => c.stop();
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}
