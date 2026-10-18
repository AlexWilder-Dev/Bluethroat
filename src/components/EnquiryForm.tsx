import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useState, type FormEvent } from 'react';
import { barOrder, bars, hire, type HireBand } from '../data/bluethroat';
import { price } from '../lib/format';
import { DAY_NAMES } from '../lib/time';
import { hireTotals, type Plan } from './HirePlanner';
import { IconOut } from './Icons';

interface Details {
  date: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  food: 'caterer' | 'snacks' | 'unsure';
  champagne: boolean;
  notes: string;
}

const blank: Details = { date: '', name: '', email: '', phone: '', occasion: '', food: 'unsure', champagne: false, notes: '' };

const foodLabels: Record<Details['food'], string> = {
  caterer: 'We’ll bring in a caterer',
  snacks: 'Olives and nuts will do',
  unsure: 'Not sure yet',
};

function bandForDate(date: string): HireBand | null {
  if (!date) return null;
  const d = new Date(date + 'T12:00:00').getDay();
  if (d >= 2 && d <= 4) return 'tue-thu';
  if (d === 5 || d === 6) return 'fri-sat';
  return null;
}

function longDate(date: string) {
  const d = new Date(date + 'T12:00:00');
  return `${DAY_NAMES[d.getDay()]} ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const EnquiryForm = forwardRef<HTMLFormElement, { plan: Plan; onPlan: (p: Plan) => void }>(function EnquiryForm({ plan, onPlan }, ref) {
  const [d, setD] = useState<Details>(blank);
  const [errors, setErrors] = useState<Partial<Record<keyof Details | 'guests', string>>>({});
  const [sent, setSent] = useState(false);
  const bar = bars[plan.bar];
  const bandLabel = hire.bands.find((b) => b.id === plan.band)!.label;
  const t = hireTotals(plan);
  const dateBand = bandForDate(d.date);
  const offCard = d.date !== '' && dateBand === null;

  const set = <K extends keyof Details>(k: K, v: Details[K]) => {
    setD((prev) => ({ ...prev, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const setDate = (v: string) => {
    set('date', v);
    const b = bandForDate(v);
    if (b && b !== plan.band) onPlan({ ...plan, band: b });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!d.name.trim()) errs.name = 'Who should we reply to?';
    if (!/^\S+@\S+\.\S+$/.test(d.email)) errs.email = 'We need an email address to reply.';
    if (!d.date) errs.date = 'Pick your preferred date.';
    if (plan.guests < 1 || plan.guests > bar.hire.capacity) errs.guests = `${bar.name} holds up to ${bar.hire.capacity}.`;
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`enq-${first}`)?.focus();
      return;
    }
    setSent(true);
    requestAnimationFrame(() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const mailto = () => {
    const lines = [
      `Private hire enquiry – Bluethroat ${bar.name}`,
      '',
      `Date: ${d.date ? longDate(d.date) : '—'} (${bandLabel})`,
      `Guests: ${plan.guests}`,
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      d.phone ? `Phone: ${d.phone}` : null,
      d.occasion ? `Occasion: ${d.occasion}` : null,
      `Food: ${foodLabels[d.food]}`,
      `Champagne pre-order: ${d.champagne ? 'Yes, please' : 'Not for now'}`,
      d.notes ? `Notes: ${d.notes}` : null,
      '',
      `From the planner: ${price(t.minimum)} minimum spend + 12.5% service, plus the ${price(hire.fee)} hire fee.`,
    ].filter((l) => l !== null);
    const subject = `Private hire – ${bar.name} – ${d.date ? longDate(d.date) : 'date tbc'}`;
    return `mailto:${bar.hireEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div className="enquiry" id="enquiry">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            className="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">Enquiry received</p>
            <h3 className="h3">Thank you, {d.name.split(' ')[0]}.</h3>
            <p>
              Your enquiry for <strong>Bluethroat {bar.name}</strong> on <strong>{longDate(d.date)}</strong> for <strong>{plan.guests} guests</strong> is with
              us. We’ll confirm availability and send a payment link for the {price(hire.fee)} hire fee. Your booking is secured once the hire fee has been
              received.
            </p>
            <dl className="sent-summary">
              <div>
                <dt>Minimum spend</dt>
                <dd>
                  {price(t.minimum)} <span className="muted">+ 12.5% service</span>
                </dd>
              </div>
              <div>
                <dt>Food</dt>
                <dd>{foodLabels[d.food]}</dd>
              </div>
              {d.champagne && (
                <div>
                  <dt>Champagne</dt>
                  <dd>Pre-order, counts towards the spend</dd>
                </div>
              )}
            </dl>
            <p className="demo-note">This is a demo, so nothing has been sent. The real thing would land in {bar.hireEmail}.</p>
            <div className="btn-row">
              <a className="btn btn--line" href={mailto()}>
                Email it to {bar.name} instead <IconOut />
              </a>
              <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
                Edit enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={ref}
            className="form"
            noValidate
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <fieldset className="field">
              <legend className="caps">Bar</legend>
              <div className="choice-row">
                {barOrder.map((id) => (
                  <label key={id} className={`choice choice--radio ${plan.bar === id ? 'is-on' : ''}`}>
                    <input
                      type="radio"
                      name="bar"
                      value={id}
                      checked={plan.bar === id}
                      onChange={() => onPlan({ ...plan, bar: id, guests: Math.min(plan.guests, bars[id].hire.capacity) })}
                    />
                    <span className="choice-title">{bars[id].name}</span>
                    <span className="choice-sub">up to {bars[id].hire.capacity}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-grid">
              <div className="field">
                <label className="caps" htmlFor="enq-date">
                  Preferred date
                </label>
                <input
                  id="enq-date"
                  type="date"
                  min={todayISO()}
                  value={d.date}
                  onChange={(e) => setDate(e.target.value)}
                  aria-invalid={!!errors.date}
                  aria-describedby="enq-date-note"
                />
                <p id="enq-date-note" className={`hint ${errors.date ? 'is-error' : ''}`}>
                  {errors.date ??
                    (offCard
                      ? `Our hire rates are listed for ${hire.bands.map((b) => b.label).join(' and ')}. Tell us about this date below and we’ll let you know.`
                      : d.date
                        ? `${longDate(d.date)} · ${bandLabel} rate`
                        : `${bandLabel} rate selected`)}
                </p>
              </div>

              <div className="field">
                <label className="caps" htmlFor="enq-guests">
                  Guests
                </label>
                <input
                  id="enq-guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={bar.hire.capacity}
                  value={plan.guests}
                  onChange={(e) => onPlan({ ...plan, guests: Math.max(1, Math.min(bar.hire.capacity, Number(e.target.value) || 1)) })}
                  aria-invalid={!!errors.guests}
                />
                <p className={`hint ${errors.guests ? 'is-error' : ''}`}>{errors.guests ?? `Up to ${bar.hire.capacity} at ${bar.name}`}</p>
              </div>

              <div className="field">
                <label className="caps" htmlFor="enq-name">
                  Your name
                </label>
                <input id="enq-name" autoComplete="name" value={d.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
                {errors.name && <p className="hint is-error">{errors.name}</p>}
              </div>

              <div className="field">
                <label className="caps" htmlFor="enq-email">
                  Email
                </label>
                <input
                  id="enq-email"
                  type="email"
                  autoComplete="email"
                  value={d.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="hint is-error">{errors.email}</p>}
              </div>

              <div className="field">
                <label className="caps" htmlFor="enq-phone">
                  Phone <span className="optional">optional</span>
                </label>
                <input id="enq-phone" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>

              <div className="field">
                <label className="caps" htmlFor="enq-occasion">
                  The occasion
                </label>
                <input
                  id="enq-occasion"
                  placeholder="A birthday, a leaving do, a launch…"
                  value={d.occasion}
                  onChange={(e) => set('occasion', e.target.value)}
                />
              </div>
            </div>

            <fieldset className="field">
              <legend className="caps">Food</legend>
              <p className="hint">We don’t have a kitchen. We can provide olives and nuts, and tables and space for anything you have delivered.</p>
              <div className="choice-row choice-row--3">
                {(Object.keys(foodLabels) as Details['food'][]).map((k) => (
                  <label key={k} className={`choice choice--radio ${d.food === k ? 'is-on' : ''}`}>
                    <input type="radio" name="food" value={k} checked={d.food === k} onChange={() => set('food', k)} />
                    <span className="choice-title">{foodLabels[k]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="check">
              <input type="checkbox" checked={d.champagne} onChange={(e) => set('champagne', e.target.checked)} />
              <span>
                We’d like to pre-order champagne <span className="muted">(it counts towards the minimum spend)</span>
              </span>
            </label>

            <div className="field">
              <label className="caps" htmlFor="enq-notes">
                Anything else
              </label>
              <textarea
                id="enq-notes"
                rows={4}
                placeholder="Timings, set-up, decorations, accessibility…"
                value={d.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </div>

            <div className="form-foot">
              <p className="form-sum">
                {bar.name} · {bandLabel} · {plan.guests} guests · <strong>{price(t.minimum)}</strong> minimum + 12.5% service · {price(hire.fee)} hire fee
              </p>
              <button type="submit" className="btn btn--gold">
                Send enquiry
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
});
