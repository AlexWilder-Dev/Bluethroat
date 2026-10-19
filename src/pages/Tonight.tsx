import { Link } from 'react-router-dom';
import { barOrder, bars, brand, hire, menu, press, type BarId } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { barStatus, type LondonNow } from '../lib/time';
import { price } from '../lib/format';
import { Plate } from '../components/Plate';
import { Photo } from '../components/Photo';
import { FlavourPicker } from '../components/FlavourPicker';
import { IconOut } from '../components/Icons';

export function Tonight() {
  const { bar, now, setBar } = useBar();

  return (
    <>
      <section className="tonight" aria-labelledby="tonight-title">
        <h1 id="tonight-title" className="visually-hidden">
          Bluethroat Deptford and Brixton, tonight
        </h1>
        <p className="dateline">
          <span>{now.label}</span>
          <span>Walk-ins welcome</span>
        </p>
        <div className="venues">
          {barOrder.map((id) => (
            <Venue key={id} id={id} now={now} onMenu={() => setBar(id)} />
          ))}
        </div>
      </section>

      <section className="sheet cocktails" aria-labelledby="cocktails-title">
        <header className="sheet-head">
          <h2 id="cocktails-title" className="label">
            Cocktails
          </h2>
          <p className="sheet-sub">
            {menu.edition} · {menu.season} · {price(bar.cocktailPrice)} at {bar.name}
          </p>
        </header>
        <FlavourPicker />
        <p className="footnote">
          “{press.lcw.quote}” <span className="footnote-src">{press.lcw.source}, on Brixton</span>
        </p>
      </section>

      <section className="rooms" aria-label="The two arches">
        {barOrder.map((id) => (
          <figure key={id} className="room">
            <Photo photo={bars[id].photos.room} sizes="(min-width: 900px) 45vw, 100vw" />
            <figcaption>
              <strong>{bars[id].name}</strong> {id === 'deptford' ? 'The long marble bar under the brick vault.' : 'The vault and the lit back bar.'}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="about">
        <p className="about-lead">{brand.intro}</p>
        <p className="about-small">Opened in 2020 by brothers Ari and Landi Mucaj. Brixton followed in 2023.</p>
      </section>

      <section className="sheet hire-note" aria-labelledby="hire-title">
        <h2 id="hire-title" className="label">
          Private hire
        </h2>
        <p>
          Exclusive use of either arch: up to {bars.deptford.hire.capacity} guests in Deptford, {bars.brixton.hire.capacity} in Brixton. Minimum spend from{' '}
          {price(bars.deptford.hire.minimumSpend['tue-thu'])}, plus a {price(hire.fee)} hire fee.
        </p>
        <Link to="/private-hire" className="more">
          Work out your night and enquire
        </Link>
      </section>
    </>
  );
}

function Venue({ id, now, onMenu }: { id: BarId; now: LondonNow; onMenu: () => void }) {
  const b = bars[id];
  const st = barStatus(b, now);
  const sinceOpen = st.open ? now.minutes + (st.session.day === now.day ? 0 : 1440) - st.session.open : 0;
  return (
    <article className="venue">
      <Plate bar={b} now={now} as="h2" />
      <div className="venue-info">
        <p className="venue-address">{b.addressLines.join(', ')}</p>
        <p className="venue-hours">
          {b.hoursSummary.map((s) => (
            <span key={s.days}>
              {s.days} {s.time}
            </span>
          ))}
        </p>
        <p className="venue-access">{b.wheelchair ? 'Wheelchair accessible' : 'No wheelchair access'}</p>
        <p className="venue-links">
          <a href={b.mapUrl} target="_blank" rel="noreferrer">
            Directions <IconOut />
          </a>
          <Link to="/menu" onClick={onMenu}>
            Menu & prices
          </Link>
          {st.open && sinceOpen >= 60 && (
            <a href={b.reviewUrl} target="_blank" rel="noreferrer">
              In tonight? Review us <IconOut />
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
