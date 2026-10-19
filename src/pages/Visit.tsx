import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { brand, faqs, houseRules } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { DAY_NAMES, clock, nightOf } from '../lib/time';
import { Plate } from '../components/Plate';
import { Photo } from '../components/Photo';
import { IconOut } from '../components/Icons';

export function Visit() {
  const { bar, now } = useBar();
  const tonight = nightOf(bar, now);
  const apple = `https://maps.apple.com/?q=${encodeURIComponent('Bluethroat ' + bar.name)}&ll=${bar.coords.lat},${bar.coords.lng}`;

  return (
    <article className="page visit">
      <h1 className="visually-hidden">Visit Bluethroat {bar.name}</h1>
      <Plate bar={bar} now={now} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={bar.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <section className="sheet visit-where" aria-labelledby="where-title">
            <h2 id="where-title" className="label">
              Address
            </h2>
            <address className="address">
              {bar.addressLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p className="quiet">{bar.findingUs}</p>
            <p className="links">
              <a className="btn" href={bar.mapUrl} target="_blank" rel="noreferrer">
                Google Maps <IconOut />
              </a>
              <a className="btn btn--line" href={apple} target="_blank" rel="noreferrer">
                Apple Maps <IconOut />
              </a>
            </p>
          </section>

          <figure className="visit-photo">
            <Photo photo={bar.photos.door} sizes="(min-width: 900px) 60vw, 100vw" />
            <figcaption>{bar.photos.door.alt}.</figcaption>
          </figure>

          <section className="sheet" aria-labelledby="hours-title">
            <h2 id="hours-title" className="label">
              Opening hours
            </h2>
            <table className="hours">
              <tbody>
                {bar.sessions.map((s) => (
                  <tr key={s.day} className={s.day === tonight ? 'is-tonight' : ''}>
                    <th scope="row">
                      {DAY_NAMES[s.day]}
                      {s.day === tonight && <span className="tag">tonight</span>}
                    </th>
                    <td>
                      {clock(s.open)} – {clock(s.close)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="sheet" aria-labelledby="access-title">
            <h2 id="access-title" className="label">
              Access
            </h2>
            <p className="access">{bar.accessNote}</p>
            {!bar.wheelchair && <p className="quiet">Bluethroat Deptford is wheelchair accessible.</p>}
          </section>
        </motion.div>
      </AnimatePresence>

      <section className="sheet" aria-labelledby="rules-title">
        <h2 id="rules-title" className="label">
          Good to know
        </h2>
        <dl className="rules">
          {houseRules.map((r) => (
            <div key={r.title}>
              <dt>{r.title}</dt>
              <dd>
                {r.text}
                {r.title === 'Groups of 10+' && (
                  <>
                    {' '}
                    <a href={`mailto:${bar.hireEmail}`}>{bar.hireEmail}</a>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sheet" aria-labelledby="faq-title">
        <h2 id="faq-title" className="label">
          FAQs
        </h2>
        <Faq />
      </section>

      <section className="sheet contact" aria-label="Contact">
        <p>
          Lost something? Email <a href={`mailto:${brand.generalEmail}`}>{brand.generalEmail}</a> with a description of the item and when you visited.
        </p>
        <p>
          <a href={brand.instagram.url} target="_blank" rel="noreferrer">
            {brand.instagram.handle} on Instagram
          </a>{' '}
          ·{' '}
          <a href={bar.reviewUrl} target="_blank" rel="noreferrer">
            Review {bar.name} on Google
          </a>
        </p>
      </section>
    </article>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="faq">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={isOpen ? 'is-open' : ''}>
            <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{f.q}</span>
              <span className="faq-mark" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  className="faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.21, 1] }}
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
