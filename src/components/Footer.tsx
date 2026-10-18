import { barOrder, bars, brand } from '../data/bluethroat';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-head">
        <Wordmark />
        <p className="footer-line">{brand.line}.</p>
      </div>
      <div className="footer-bars">
        {barOrder.map((id) => {
          const b = bars[id];
          return (
            <div key={id} className="footer-bar">
              <h3 className="caps">
                {b.name} <span className="muted">est. {b.established}</span>
              </h3>
              <p>
                {b.addressLines.map((l) => (
                  <span key={l} className="line">
                    {l}
                  </span>
                ))}
              </p>
              <p>
                {b.hoursSummary.map((s) => (
                  <span key={s.days} className="line">
                    {s.days} {s.time}
                  </span>
                ))}
              </p>
              <p className="footer-links">
                <a href={b.mapUrl} target="_blank" rel="noreferrer">
                  Map
                </a>
                <a href={b.reviewUrl} target="_blank" rel="noreferrer">
                  Leave us a review
                </a>
                <a href={`mailto:${b.hireEmail}`}>{b.hireEmail}</a>
              </p>
            </div>
          );
        })}
      </div>
      <div className="footer-meta">
        <p>
          <a href={brand.instagram.url} target="_blank" rel="noreferrer">
            Instagram {brand.instagram.handle}
          </a>
          <a href={`mailto:${brand.generalEmail}`}>{brand.generalEmail}</a>
        </p>
        <p className="muted">18+ only. A 12.5% service charge applies.</p>
        <p className="credit">Site by AlexWilder-Dev</p>
      </div>
    </footer>
  );
}
