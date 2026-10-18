import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { barOrder, bars, brand, menu, press, type Bar, type BarId } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { barStatus, DAY_NAMES, nightOf, type LondonNow } from '../lib/time';
import { price } from '../lib/format';
import { ArchFrame } from '../components/ArchFrame';
import { StatusLine } from '../components/StatusLine';
import { FlavourPicker } from '../components/FlavourPicker';
import { IconArrow, IconOut } from '../components/Icons';

const ease = [0.22, 0.61, 0.21, 1] as const;

export function Tonight() {
  const { bar, barId, setBar, chosen, now } = useBar();

  return (
    <>
      <section className="tonight" aria-labelledby="tonight-title">
        <motion.p className="eyebrow tonight-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          {DAY_NAMES[now.day]} · Two railway arches
        </motion.p>
        <h1 id="tonight-title" className="visually-hidden">
          Bluethroat tonight: Deptford and Brixton
        </h1>

        <div className="arches" role="radiogroup" aria-label="Choose your arch">
          {barOrder.map((id, i) => (
            <ArchCard key={id} id={id} index={i} selected={barId === id} dim={chosen && barId !== id} onPick={() => setBar(id)} now={now} />
          ))}
        </div>

        <TonightPanel bar={bar} now={now} onSwitch={setBar} />
        <p className="tonight-intro">{brand.intro}</p>
      </section>

      <section className="section drinks" aria-labelledby="drinks-title">
        <div className="section-head">
          <ArchFrame photo={bar.photos.pour} className="drinks-arch" sizes="30vw" />
          <p className="eyebrow">
            {menu.edition} · {menu.season}
          </p>
          <h2 id="drinks-title" className="h2">
            Twelve drinks. One word each.
          </h2>
          <p className="lede">
            Every cocktail on the menu is given a single word. Choose yours, and we’ll pour the drink that goes with it. {price(bar.cocktailPrice)} each at{' '}
            {bar.name}.
          </p>
        </div>
        <FlavourPicker />
        <figure className="pull">
          <blockquote>“{press.lcw.quote}”</blockquote>
          <figcaption>
            {press.lcw.source}, on Bluethroat {bars[press.lcw.about].name}
          </figcaption>
        </figure>
      </section>

      <section className="section hire-teaser" aria-labelledby="hire-teaser-title">
        <ArchFrame photo={bar.photos.hire} className="hire-teaser-arch" sizes="(min-width: 900px) 30vw, 60vw" />
        <div>
          <p className="eyebrow">Private hire</p>
          <h2 id="hire-teaser-title" className="h2">
            Have the whole arch.
          </h2>
          <p className="lede">
            Exclusive use for up to {bars.deptford.hire.capacity} guests in Deptford or {bars.brixton.hire.capacity} in Brixton, with minimum spends from{' '}
            {price(Math.min(bars.deptford.hire.minimumSpend['tue-thu'], bars.brixton.hire.minimumSpend['tue-thu']))}. See the numbers for your night before you
            send a word.
          </p>
          <Link to="/private-hire" className="btn btn--line">
            Plan a private hire <IconArrow />
          </Link>
        </div>
      </section>

      <section className="section story" aria-labelledby="story-title">
        <p className="eyebrow">Since 2020</p>
        <h2 id="story-title" className="h2">
          Two arches, one family.
        </h2>
        <div className="story-cols">
          <p>
            Ari Mucaj has lived in Deptford since 1997. After twenty years behind central London bars, he and his brother Landi took an empty railway arch by
            Deptford Station and built Bluethroat from scratch. It opened in 2020, days before the first lockdown. Brixton followed in 2023, on Atlantic Road.
          </p>
          <p>{brand.nameNote} Fitting, for two bars with a soundtrack worth staying for.</p>
        </div>
        <div className="story-rooms">
          {barOrder.map((id) => (
            <figure key={id}>
              <ArchFrame photo={bars[id].photos.room} sizes="(min-width: 900px) 25vw, 45vw" />
              <figcaption className="caps">
                {bars[id].name} <span className="muted">est. {bars[id].established}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <figure className="pull pull--quiet">
          <blockquote>“{press.ari.quote}”</blockquote>
          <figcaption>{press.ari.source}</figcaption>
        </figure>
      </section>
    </>
  );
}

function ArchCard({
  id,
  index,
  selected,
  dim,
  onPick,
  now,
}: {
  id: BarId;
  index: number;
  selected: boolean;
  dim: boolean;
  onPick: () => void;
  now: LondonNow;
}) {
  const b = bars[id];
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`arch-card ${selected ? 'is-selected' : ''} ${dim ? 'is-dim' : ''}`}
      onClick={onPick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.15 + index * 0.18, ease }}
    >
      <ArchFrame photo={b.photos.arch} eager ring={selected} sizes="(min-width: 900px) 30vw, 46vw" />
      <span className="arch-card-name">{b.name}</span>
      <span className="arch-card-addr">{b.addressShort}</span>
      <StatusLine bar={b} now={now} short />
    </motion.button>
  );
}

function TonightPanel({ bar, now, onSwitch }: { bar: Bar; now: LondonNow; onSwitch: (id: BarId) => void }) {
  const st = barStatus(bar, now);
  const other = bars[bar.id === 'deptford' ? 'brixton' : 'deptford'];
  const otherSt = barStatus(other, now);
  const night = DAY_NAMES[nightOf(bar, now)];
  const sinceOpen = st.open ? now.minutes + (st.session.day === now.day ? 0 : 1440) - st.session.open : 0;

  let nudge: { text: string; to: BarId } | null = null;
  if (!st.open && otherSt.open) nudge = { text: `${bar.name} has closed for the night. ${other.name} is open until ${otherSt.closes}.`, to: other.id };
  else if (st.open && otherSt.open && otherSt.minutesLeft > st.minutesLeft && st.minutesLeft <= 90)
    nudge = { text: `${other.name} stays open later tonight, until ${otherSt.closes}.`, to: other.id };

  return (
    <motion.div
      key={bar.id}
      className="panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      aria-live="polite"
    >
      <p className="eyebrow">{st.open ? `${night} night at ${bar.name}` : `Bluethroat ${bar.name}`}</p>
      <p className="panel-big">{st.open ? `Open until ${st.closes}` : `Opens ${st.when}`}</p>
      <p className="panel-sub">
        {st.open && st.minutesLeft <= 45 ? `Closes in ${st.minutesLeft} minutes.` : bar.hoursSummary.map((s) => `${s.days} ${s.time}`).join(' · ')}
      </p>

      {nudge && (
        <button type="button" className="nudge" onClick={() => onSwitch(nudge!.to)}>
          {nudge.text} <span className="nudge-cta">Switch to {bars[nudge.to].name}</span>
        </button>
      )}

      <dl className="facts">
        <div>
          <dt>Walk in</dt>
          <dd>We’re primarily a walk-in bar, so drop by on the day.</dd>
        </div>
        <div>
          <dt>Find us</dt>
          <dd>
            {bar.addressLines.join(', ')}.{' '}
            <a href={bar.mapUrl} target="_blank" rel="noreferrer" className="textlink">
              Map <IconOut />
            </a>
          </dd>
        </div>
        <div>
          <dt>Pouring</dt>
          <dd>
            {menu.edition}, {menu.season}: twelve cocktails at {price(bar.cocktailPrice)}, two available alcohol-free.{' '}
            <Link to="/menu" className="textlink">
              Menu <IconArrow />
            </Link>
          </dd>
        </div>
        <div>
          <dt>Access</dt>
          <dd>{bar.wheelchair ? 'Wheelchair accessible.' : `${bar.accessNote} Deptford is wheelchair accessible.`}</dd>
        </div>
        <div>
          <dt>Ten or more?</dt>
          <dd>
            Groups of 10 and above may have a minimum spend.{' '}
            <a href={`mailto:${bar.hireEmail}`} className="textlink">
              Email ahead
            </a>
          </dd>
        </div>
      </dl>

      <div className="btn-row">
        <a className="btn btn--gold" href={bar.mapUrl} target="_blank" rel="noreferrer">
          Directions to {bar.name} <IconOut />
        </a>
        <Link className="btn btn--line" to="/menu">
          Tonight’s menu
        </Link>
      </div>

      {st.open && sinceOpen >= 60 && (
        <a className="review-nudge" href={bar.reviewUrl} target="_blank" rel="noreferrer">
          In with us tonight? We’d love your feedback on Google.{' '}
          <span className="textlink">
            Leave a quick review <IconOut />
          </span>
        </a>
      )}
    </motion.div>
  );
}
