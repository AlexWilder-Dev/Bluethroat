import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bars, brand, menu, type Photo as PhotoData } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { BarSwitch } from '../components/BarSwitch';
import { GlassIcon, glassName } from '../components/GlassIcon';
import { Photo } from '../components/Photo';
import { IconOut } from '../components/Icons';

// Drinks photographed at each bar. None is matched to a named cocktail.
const barShots: Record<string, PhotoData[]> = {
  deptford: [
    { src: 'dep-amber-rocks', alt: 'An amber cocktail in a rocks glass on the white marble at Deptford', position: '50% 55%' },
    { src: 'dep-green-coupe', alt: 'A bright green cocktail in a stemmed glass on the white marble at Deptford', position: '50% 60%' },
    { src: 'dep-twist-coupe', alt: 'A pale cocktail with a lemon twist in a coupe at Deptford', position: '50% 50%' },
  ],
  brixton: [
    { src: 'brx-coupe-marble', alt: 'A pale yellow cocktail in a coupe on the black marble at Brixton', position: '40% 60%' },
    { src: 'brx-pour', alt: 'A bartender pouring into a rocks glass at the Brixton bar', position: '50% 50%' },
    { src: 'brx-back-bar', alt: 'Two guests at the lit back bar in Brixton', position: '45% 50%' },
  ],
};

/** Price as printed on their card: £13.5 */
const cardPrice = (n: number) => `£${n}`;

export function MenuPage() {
  const { bar } = useBar();
  const [afOnly, setAfOnly] = useState(false);
  const { hash } = useLocation();
  const target = hash.replace('#', '');
  const drinks = afOnly ? menu.cocktails.filter((c) => c.alcoholFree) : menu.cocktails;

  // Arriving from the flavour picker: bring that drink into view.
  useEffect(() => {
    if (!target) return;
    const el = document.getElementById(target);
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  }, [target]);

  return (
    <article className="page card">
      <header className="card-head">
        <p className="card-kicker">
          <span>{menu.season.replace(' 2026', '')} menu</span>
          <span>{brand.instagram.handle}</span>
        </p>
        <h1 className="card-title">Bluethroat Bar</h1>
        <BarSwitch id="menu" label="Show the menu for" />
        <p className="card-line">{brand.menuLine}</p>
        <p className="card-edition">
          {menu.edition}
          <br />
          {menu.season} menu
        </p>
      </header>

      <section className="card-section" aria-labelledby="cocktails-title">
        <h2 id="cocktails-title" className="label">
          Cocktails
        </h2>
        <p className="card-price">{cardPrice(bar.cocktailPrice)}</p>
        <div className="filter" role="group" aria-label="Filter cocktails">
          <button type="button" aria-pressed={!afOnly} className={!afOnly ? 'is-on' : ''} onClick={() => setAfOnly(false)}>
            All twelve
          </button>
          <button type="button" aria-pressed={afOnly} className={afOnly ? 'is-on' : ''} onClick={() => setAfOnly(true)}>
            * Available alcohol-free
          </button>
        </div>
        <motion.ul className="drinks" layout>
          <AnimatePresence initial={false}>
            {drinks.map((c) => (
              <motion.li
                key={c.id}
                id={c.id}
                layout
                className={`drink ${c.id === target ? 'is-target' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GlassIcon glass={c.glass} size={22} />
                <span className="visually-hidden">{glassName[c.glass]}. </span>
                <h3 className="drink-name">
                  {c.name}
                  {c.alcoholFree && ' *'}
                </h3>
                <p className="drink-ing">{c.ingredients.join(', ')}</p>
                <p className="drink-flavour">{c.flavour}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="card-foot">
          <span>
            {menu.allergens} {menu.service}
          </span>
          <span>* {menu.alcoholFreeNote}</span>
        </p>
      </section>

      <div className="card-cols">
        <section className="card-section" aria-labelledby="wines-title">
          <h2 id="wines-title" className="label">
            Wines
          </h2>
          <p className="card-note">{menu.wineNote}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={bar.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {bar.wines.map((s) => (
                <div key={s.title} className="list">
                  <h3 className="list-title">{s.title}</h3>
                  {s.items.map((w) => (
                    <p key={w.name} className="list-row">
                      <span>{w.name}</span>
                      <span className="list-price">{w.glass ? `${w.glass} | ${w.bottle}` : w.bottle}</span>
                    </p>
                  ))}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        <div>
          <section className="card-section" aria-labelledby="beers-title">
            <h2 id="beers-title" className="label">
              Beers
            </h2>
            <div className="list">
              {menu.beers.map((b) => (
                <p key={b.name} className="list-row">
                  <span>
                    <span className="list-strong">{b.name}</span>
                    <span className="list-sub">{b.detail}</span>
                  </span>
                  <span className="list-price">{b.price}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="card-section" aria-labelledby="snacks-title">
            <h2 id="snacks-title" className="label">
              Snacks
            </h2>
            <p className="card-note">{menu.snacks.note}</p>
            <div className="list list--centre">
              {menu.snacks.items.map((s) => (
                <p key={s.name}>
                  {s.name} | {s.price}
                </p>
              ))}
              <p className="list-strong">
                {menu.snacks.all.name} | {menu.snacks.all.price}
              </p>
            </div>
          </section>
        </div>
      </div>

      <section className="card-section review">
        <p>We’d love your feedback on Google</p>
        <a href={bar.reviewUrl} target="_blank" rel="noreferrer" className="label">
          Leave a quick review for {bar.name} <IconOut />
        </a>
      </section>

      <section className="shots" aria-label={`At the bar in ${bar.name}`}>
        {barShots[bar.id].map((p) => (
          <Photo key={p.src} photo={p} sizes="(min-width: 900px) 30vw, 70vw" />
        ))}
      </section>
      <p className="shots-caption">At the bar in {bars[bar.id].name}.</p>
    </article>
  );
}
