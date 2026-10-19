import { barOrder, bars, brand } from '../data/bluethroat';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="footer">
      <Wordmark />
      <p className="footer-line">{brand.menuLine}</p>
      <div className="footer-bars">
        {barOrder.map((id) => {
          const b = bars[id];
          return (
            <div key={id}>
              <h3 className="label">
                {b.name} <span className="est">est. {b.established}</span>
              </h3>
              <p>{b.addressLines.join(', ')}</p>
              <p>{b.hoursSummary.map((s) => `${s.days} ${s.time}`).join(' · ')}</p>
              <p className="footer-links">
                <a href={b.mapUrl} target="_blank" rel="noreferrer">
                  Map
                </a>
                <a href={b.reviewUrl} target="_blank" rel="noreferrer">
                  Review us on Google
                </a>
                <a href={`mailto:${b.hireEmail}`}>{b.hireEmail}</a>
              </p>
            </div>
          );
        })}
      </div>
      <p className="footer-links">
        <a href={brand.instagram.url} target="_blank" rel="noreferrer">
          {brand.instagram.handle}
        </a>
        <a href={`mailto:${brand.generalEmail}`}>{brand.generalEmail}</a>
      </p>
      <p className="footer-small">18+ only. A 12.5% service charge applies.</p>
      <p className="footer-small">Site by AlexWilder-Dev</p>
    </footer>
  );
}
