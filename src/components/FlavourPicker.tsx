import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menu, type Cocktail } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { price } from '../lib/format';
import { GlassIcon } from './GlassIcon';

/** The Edition 12 grid, read by flavour: each drink on the card has one word. */
export function FlavourPicker() {
  const { bar } = useBar();
  const [selected, setSelected] = useState<string | null>(null);
  const [alcoholFree, setAlcoholFree] = useState(false);
  const drink = menu.cocktails.find((c) => c.id === selected) ?? null;
  const resultRef = useRef<HTMLDivElement>(null);

  // On a phone the drink lands below the grid; bring it into view.
  const choose = (id: string | null) => {
    setSelected(id);
    if (id) window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  };

  const toggleAlcoholFree = () => {
    const next = !alcoholFree;
    setAlcoholFree(next);
    if (next && (!drink || !drink.alcoholFree)) choose(menu.cocktails.find((c) => c.alcoholFree)!.id);
  };

  return (
    <div className="picker">
      <div className="picker-bar">
        <p>Choose a flavour</p>
        <button type="button" className={`af ${alcoholFree ? 'is-on' : ''}`} aria-pressed={alcoholFree} onClick={toggleAlcoholFree}>
          <span className="af-box" aria-hidden="true" />* Available alcohol-free
        </button>
      </div>

      <ul className="flavours">
        {menu.cocktails.map((c) => {
          const on = c.id === selected;
          return (
            <li key={c.id}>
              <button
                type="button"
                className={`flavour ${on ? 'is-on' : ''}`}
                aria-pressed={on}
                disabled={alcoholFree && !c.alcoholFree}
                onClick={() => choose(on ? null : c.id)}
              >
                <GlassIcon glass={c.glass} size={20} />
                <span className="flavour-word">{c.flavour}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div ref={resultRef} className="pick" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {drink ? (
            <Pick key={drink.id + bar.id} drink={drink} barPrice={bar.cocktailPrice} barName={bar.name} />
          ) : (
            <motion.p key="empty" className="pick-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Tap a flavour to see its cocktail.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Pick({ drink, barPrice, barName }: { drink: Cocktail; barPrice: number; barName: string }) {
  return (
    <motion.div
      className="pick-item"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.21, 1] }}
    >
      <GlassIcon glass={drink.glass} size={40} draw className="pick-glass" />
      <h3 className="drink-name">
        {drink.name}
        {drink.alcoholFree && ' *'}
      </h3>
      <p className="drink-ing">{drink.ingredients.join(', ')}</p>
      <p className="drink-flavour">{drink.flavour}</p>
      <p className="pick-meta">
        {price(barPrice)} at {barName}
        {drink.alcoholFree && <span> · * {menu.alcoholFreeNote}</span>}
      </p>
      <Link to={`/menu#${drink.id}`} className="more">
        The full menu
      </Link>
    </motion.div>
  );
}
