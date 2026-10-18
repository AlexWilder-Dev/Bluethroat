import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menu, type Cocktail } from '../data/bluethroat';
import { useBar } from '../state/bar';
import { price } from '../lib/format';
import { GlassIcon } from './GlassIcon';
import { Marble } from './Marble';
import { IconArrow } from './Icons';

/** Twelve drinks, one word each, as printed on Edition 12. Pick a word, meet the drink. */
export function FlavourPicker() {
  const { bar } = useBar();
  const [selected, setSelected] = useState<string | null>(null);
  const [alcoholFree, setAlcoholFree] = useState(false);
  const drink = menu.cocktails.find((c) => c.id === selected) ?? null;
  const resultRef = useRef<HTMLDivElement>(null);

  // On a phone the drink lands below the words; bring it into view.
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
      <div className="picker-controls">
        <p className="picker-prompt">{alcoholFree ? 'Two of the twelve are available alcohol-free.' : 'Pick the word that fits your night.'}</p>
        <button type="button" role="switch" aria-checked={alcoholFree} className={`toggle ${alcoholFree ? 'is-on' : ''}`} onClick={toggleAlcoholFree}>
          <span className="toggle-track" aria-hidden="true">
            <motion.span className="toggle-knob" layout transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
          </span>
          Alcohol-free
        </button>
      </div>

      <ul className="words" aria-label="Flavours">
        {menu.cocktails.map((c) => {
          const off = alcoholFree && !c.alcoholFree;
          const on = c.id === selected;
          return (
            <li key={c.id}>
              <button type="button" className={`word ${on ? 'is-on' : ''}`} aria-pressed={on} disabled={off} onClick={() => choose(on ? null : c.id)}>
                <span className="word-text">{c.flavour}</span>
                {on && <motion.span layoutId="word-collar" className="word-collar" transition={{ type: 'spring', stiffness: 300, damping: 34 }} />}
              </button>
            </li>
          );
        })}
      </ul>

      <div ref={resultRef} className="picker-anchor">
        <Marble bar={bar.id} className="picker-result">
          <AnimatePresence mode="wait" initial={false}>
            {drink ? <DrinkReveal key={drink.id + bar.id} drink={drink} barPrice={bar.cocktailPrice} barName={bar.name} /> : <Empty key="empty" />}
          </AnimatePresence>
        </Marble>
      </div>
    </div>
  );
}

function DrinkReveal({ drink, barPrice, barName }: { drink: Cocktail; barPrice: number; barName: string }) {
  return (
    <motion.div
      className="reveal"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.21, 1] }}
      aria-live="polite"
    >
      <GlassIcon glass={drink.glass} size={56} draw className="reveal-glass" />
      <div className="reveal-text">
        <p className="reveal-flavour">{drink.flavour}</p>
        <h3 className="reveal-name">
          {drink.name}
          {drink.alcoholFree && (
            <span className="af-star" aria-hidden="true">
              *
            </span>
          )}
        </h3>
        <p className="reveal-ingredients">{drink.ingredients.join(', ')}</p>
        <p className="reveal-meta">
          <span className="reveal-price">{price(barPrice)}</span> at {barName}
          {drink.alcoholFree && <span className="reveal-af">* {menu.alcoholFreeNote}</span>}
        </p>
        <Link to={`/menu#${drink.id}`} className="textlink">
          See it on the full menu <IconArrow />
        </Link>
      </div>
    </motion.div>
  );
}

function Empty() {
  return (
    <motion.div className="reveal reveal--empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="empty-glasses" aria-hidden="true">
        <GlassIcon glass="rocks" size={34} />
        <GlassIcon glass="coupe" size={34} />
        <GlassIcon glass="highball" size={34} />
      </div>
      <p>Tap a word to meet its drink.</p>
    </motion.div>
  );
}
