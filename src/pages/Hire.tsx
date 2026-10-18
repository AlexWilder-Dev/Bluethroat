import { useEffect, useRef, useState } from 'react';
import { bars, hire } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { ArchFrame } from '../components/ArchFrame';
import { HirePlanner, type Plan } from '../components/HirePlanner';
import { EnquiryForm } from '../components/EnquiryForm';

export function Hire() {
  const { barId, setBar } = useBar();
  const [plan, setPlan] = useState<Plan>({ bar: barId, band: 'fri-sat', guests: 40 });
  const formRef = useRef<HTMLFormElement>(null);

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
    <article className="page hire-page">
      <header className="page-head">
        <div className="page-head-text">
          <p className="eyebrow">Private hire</p>
          <h1 className="h1">The whole arch, for your night.</h1>
          <p className="lede">
            Exclusive use of Bluethroat Deptford for up to {bars.deptford.hire.capacity} guests, or Brixton for up to {bars.brixton.hire.capacity}. Set your
            bar, night and numbers below to see exactly what it takes, then send us the details.
          </p>
        </div>
        <ArchFrame photo={bar.photos.hire} className="page-head-arch" sizes="(min-width: 900px) 30vw, 40vw" eager />
      </header>

      <section className="section" aria-labelledby="planner-title">
        <h2 id="planner-title" className="visually-hidden">
          Hire planner
        </h2>
        <HirePlanner plan={plan} onChange={update} onStart={start} />
        <p className="fine">{hire.payment}</p>
      </section>

      <section className="section terms" aria-labelledby="terms-title">
        <h2 id="terms-title" className="h2">
          What’s included
        </h2>
        <div className="terms-grid">
          {hire.terms.map((t) => (
            <div key={t.title} className="term">
              <h3 className="caps">{t.title}</h3>
              <ul>
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section steps" aria-labelledby="steps-title">
        <h2 id="steps-title" className="h2">
          How booking works
        </h2>
        <ol className="steps-list">
          {hire.steps.map((s, i) => (
            <li key={s}>
              <span className="step-n" aria-hidden="true">
                {['I', 'II', 'III'][i]}
              </span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="enquiry-title">
        <p className="eyebrow">Enquire</p>
        <h2 id="enquiry-title" className="h2">
          Tell us about your night.
        </h2>
        <EnquiryForm ref={formRef} plan={plan} onPlan={update} />
      </section>
    </article>
  );
}
