import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { brand, faqs, houseRules } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { DAY_NAMES, clock, nightOf } from '../lib/time';
import { ArchFrame } from '../components/ArchFrame';
import { BarSwitch } from '../components/BarSwitch';
import { StatusLine } from '../components/StatusLine';
import { IconOut } from '../components/Icons';

export function Visit() {
  const { bar, now } = useBar();
  const tonight = nightOf(bar, now);
  const apple = `https://maps.apple.com/?q=${encodeURIComponent('Bluethroat ' + bar.name)}&ll=${bar.coords.lat},${bar.coords.lng}`;

  return (
    <article className="page visit-page">
      <header className="page-head">
        <div className="page-head-text">
          <p className="eyebrow">Visit</p>
          <h1 className="h1">Bluethroat {bar.name}</h1>
          <div className="page-switch">
            <BarSwitch id="visit" label="Show details for" />
          </div>
          <p className="visit-status">
            <StatusLine bar={bar} now={now} />
          </p>
        </div>
        <ArchFrame photo={bar.photos.door} className="page-head-arch" sizes="(min-width: 900px) 30vw, 40vw" eager />
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={bar.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="visit-grid"
        >
          <section className="visit-card" aria-labelledby="where-title">
            <h2 id="where-title" className="caps-title">
              Where
            </h2>
            <address className="address">
              {bar.addressLines.map((l) => (
                <span key={l} className="line">
                  {l}
                </span>
              ))}
            </address>
            <p className="muted">{bar.findingUs}</p>
            <div className="btn-row">
              <a className="btn btn--gold" href={bar.mapUrl} target="_blank" rel="noreferrer">
                Google Maps <IconOut />
              </a>
              <a className="btn btn--line" href={apple} target="_blank" rel="noreferrer">
                Apple Maps <IconOut />
              </a>
            </div>
          </section>

          <section className="visit-card" aria-labelledby="hours-title">
            <h2 id="hours-title" className="caps-title">
              Opening hours
            </h2>
            <table className="hours">
              <tbody>
                {bar.sessions.map((s) => (
                  <tr key={s.day} className={s.day === tonight ? 'is-tonight' : ''}>
                    <th scope="row">
                      {DAY_NAMES[s.day]}
                      {s.day === tonight && <span className="tonight-tag">Tonight</span>}
                    </th>
                    <td>
                      {clock(s.open)}–{clock(s.close)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted">Walk-ins welcome. We’re primarily a walk-in bar, so drop by on the day.</p>
          </section>

          <section className="visit-card" aria-labelledby="access-title">
            <h2 id="access-title" className="caps-title">
              Access
            </h2>
            <p className={`access ${bar.wheelchair ? 'is-yes' : 'is-no'}`}>{bar.accessNote}</p>
            {!bar.wheelchair && <p className="muted">Bluethroat Deptford is wheelchair accessible.</p>}
          </section>
        </motion.div>
      </AnimatePresence>

      <section className="section rules" aria-labelledby="rules-title">
        <h2 id="rules-title" className="h2">
          Before you come
        </h2>
        <dl className="rules-list">
          {houseRules.map((r) => (
            <div key={r.title}>
              <dt className="caps">{r.title}</dt>
              <dd>{r.title === 'Groups of 10+' ? <GroupsText email={bar.hireEmail} text={r.text} /> : r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="h2">
          Questions
        </h2>
        <Faq />
      </section>

      <section className="section contact-strip" aria-label="Contact">
        <div>
          <p className="caps">Lost something?</p>
          <p>
            Email <a href={`mailto:${brand.generalEmail}`}>{brand.generalEmail}</a> with a description of the item and when you visited.
          </p>
        </div>
        <div>
          <p className="caps">Follow along</p>
          <p>
            <a href={brand.instagram.url} target="_blank" rel="noreferrer">
              {brand.instagram.handle} on Instagram
            </a>
          </p>
        </div>
        <div>
          <p className="caps">Been in?</p>
          <p>
            <a href={bar.reviewUrl} target="_blank" rel="noreferrer">
              Leave Bluethroat {bar.name} a Google review
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}

function GroupsText({ text, email }: { text: string; email: string }) {
  return (
    <>
      {text}{' '}
      <a href={`mailto:${email}`} className="textlink">
        {email}
      </a>
    </>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="faq-list">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={isOpen ? 'is-open' : ''}>
            <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{f.q}</span>
              <span className="faq-mark" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  className="faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 0.61, 0.21, 1] }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
