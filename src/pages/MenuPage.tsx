import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { brand, menu } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { price } from '../lib/format';
import { ArchFrame } from '../components/ArchFrame';
import { BarSwitch } from '../components/BarSwitch';
import { GlassIcon, glassName } from '../components/GlassIcon';
import { Marble } from '../components/Marble';
import { IconOut } from '../components/Icons';

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
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
  }, [target]);

  return (
    <article className="page menu-page">
      <header className="page-head">
        <div className="page-head-text">
          <p className="eyebrow">Bluethroat {bar.name}</p>
          <h1 className="h1">{menu.edition}</h1>
          <p className="page-head-sub">{menu.season} menu</p>
          <p className="lede">{brand.menuLine}</p>
          <div className="page-switch">
            <span className="caps muted">Prices for</span>
            <BarSwitch id="menu" label="Show prices for" />
          </div>
        </div>
        <ArchFrame photo={bar.photos.drinks} className="page-head-arch" sizes="(min-width: 900px) 30vw, 40vw" />
      </header>

      <section className="menu-block" aria-labelledby="cocktails-title">
        <div className="menu-block-head">
          <h2 id="cocktails-title" className="caps-title">
            Cocktails <span className="menu-price">{price(bar.cocktailPrice)}</span>
          </h2>
          <div className="chips" role="group" aria-label="Filter cocktails">
            <button type="button" className={`chip ${!afOnly ? 'is-on' : ''}`} aria-pressed={!afOnly} onClick={() => setAfOnly(false)}>
              All twelve
            </button>
            <button type="button" className={`chip ${afOnly ? 'is-on' : ''}`} aria-pressed={afOnly} onClick={() => setAfOnly(true)}>
              Available alcohol-free
            </button>
          </div>
        </div>

        <Marble bar={bar.id} className="menu-marble">
          <motion.ul className="cocktails" layout>
            <AnimatePresence initial={false}>
              {drinks.map((c) => (
                <motion.li
                  key={c.id}
                  id={c.id}
                  layout
                  className={`cocktail ${c.id === target ? 'is-target' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassIcon glass={c.glass} size={30} className="cocktail-glass" />
                  <span className="visually-hidden">{glassName[c.glass]}. </span>
                  <h3 className="cocktail-name">
                    {c.name}
                    {c.alcoholFree && (
                      <span className="af-star" title={menu.alcoholFreeNote}>
                        *
                      </span>
                    )}
                  </h3>
                  <p className="cocktail-ing">{c.ingredients.join(', ')}</p>
                  <p className="cocktail-flavour">{c.flavour}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <p className="menu-foot">
            <span>{menu.allergens}</span>
            <span>* {menu.alcoholFreeNote}</span>
          </p>
        </Marble>
      </section>

      <div className="menu-cols">
        <section className="menu-block" aria-labelledby="wines-title">
          <h2 id="wines-title" className="caps-title">
            Wines
          </h2>
          <p className="menu-note">{menu.wineNote}</p>
          <p className="price-cols" aria-hidden="true">
            <span>Glass</span>
            <span>Bottle</span>
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={bar.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {bar.wines.map((s) => (
                <div key={s.title} className="wine-section">
                  <h3 className="caps">{s.title}</h3>
                  <table className="price-table">
                    <thead className="visually-hidden">
                      <tr>
                        <th>Wine</th>
                        <th>Glass</th>
                        <th>Bottle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.items.map((w) => (
                        <tr key={w.name}>
                          <td>{w.name}</td>
                          <td className="num">{w.glass ? price(w.glass) : ''}</td>
                          <td className="num">{price(w.bottle)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        <div>
          <section className="menu-block" aria-labelledby="beers-title">
            <h2 id="beers-title" className="caps-title">
              Beers
            </h2>
            <table className="price-table">
              <tbody>
                {menu.beers.map((b) => (
                  <tr key={b.name}>
                    <td>
                      {b.name}
                      <span className="sub">{b.detail}</span>
                    </td>
                    <td className="num">{price(b.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="menu-block" aria-labelledby="snacks-title">
            <h2 id="snacks-title" className="caps-title">
              Snacks <span className="menu-note-inline">{menu.snacks.note}</span>
            </h2>
            <table className="price-table">
              <tbody>
                {menu.snacks.items.map((s) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td className="num">{price(s.price)}</td>
                  </tr>
                ))}
                <tr className="row-strong">
                  <td>{menu.snacks.all.name}</td>
                  <td className="num">{price(menu.snacks.all.price)}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>

      <section className="menu-close">
        <p className="muted">
          {menu.allergens} {menu.service} The same twelve cocktails pour at both bars; the wine lists differ.
        </p>
        <a className="review-card" href={bar.reviewUrl} target="_blank" rel="noreferrer">
          <span className="eyebrow">We’d love your feedback on Google</span>
          <span className="review-card-cta">
            Leave a quick review for {bar.name} <IconOut />
          </span>
        </a>
      </section>
    </article>
  );
}
