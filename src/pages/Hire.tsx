import { useEffect, useState } from 'react';
import { bars, hire } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { Photo } from '../components/Photo';
import { HirePlanner, type Plan } from '../components/HirePlanner';
import { EnquiryForm } from '../components/EnquiryForm';

export function Hire() {
  const { barId, setBar } = useBar();
  const [plan, setPlan] = useState<Plan>({ bar: barId, band: 'fri-sat', guests: 40 });

  // The header switch and the planner stay in step.
  useEffect(() => {
    setPlan((p) => (p.bar === barId ? p : { ...p, bar: barId, guests: Math.min(p.guests, bars[barId].hire.capacity) }));
  }, [barId]);

  const update = (p: Plan) => {
    setPlan(p);
    if (p.bar !== barId) setBar(p.bar);
  };

  const start = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('enq-date')?.focus({ preventScroll: true }), 700);
  };

  const bar = bars[plan.bar];

  return (
    <article className="page hire">
      <header className="sheet hire-head">
        <h1 className="label">Private hire</h1>
        <p className="hire-cap">
          Bluethroat {bar.name}, up to {bar.hire.capacity} guests
        </p>
        <p className="quiet">
          The whole arch for your event. Set the bar, the night and your numbers to see the minimum spend, service and hire fee, then send us the details.
        </p>
      </header>

      <figure className="hire-photo">
        <Photo photo={bar.photos.hire} sizes="(min-width: 900px) 60vw, 100vw" eager />
      </figure>

      <section className="sheet" aria-label="Plan your hire">
        <HirePlanner plan={plan} onChange={update} onStart={start} />
      </section>

      <section className="sheet terms" aria-label="Terms">
        {hire.terms.map((t) => (
          <div key={t.title} className="term">
            <h2 className="label">{t.title}</h2>
            {t.points.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ))}
        <div className="term">
          <h2 className="label">Confirmation and cancellation policy</h2>
          {hire.steps.map((s, i) => (
            <p key={s}>
              <span className="step">{i + 1}.</span> {s}
            </p>
          ))}
          <p>{hire.payment}</p>
        </div>
      </section>

      <section className="sheet" aria-labelledby="enquire-title">
        <h2 id="enquire-title" className="label">
          To enquire
        </h2>
        <EnquiryForm plan={plan} onPlan={update} />
      </section>
    </article>
  );
}
