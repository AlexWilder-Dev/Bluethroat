import { motion } from 'framer-motion';
import { barOrder, bars } from '../data/bluethroat';
import { useBar } from '../state/bar';

export function BarSwitch({ id = 'header', label = 'Choose a bar' }: { id?: string; label?: string }) {
  const { barId, setBar } = useBar();
  return (
    <div className="switch" role="radiogroup" aria-label={label}>
      {barOrder.map((b) => {
        const active = b === barId;
        return (
          <button key={b} type="button" role="radio" aria-checked={active} className={`switch-opt ${active ? 'is-active' : ''}`} onClick={() => setBar(b)}>
            {active && <motion.span layoutId={`switch-${id}`} className="switch-pill" transition={{ type: 'spring', stiffness: 260, damping: 32 }} />}
            <span className="switch-label">{bars[b].name}</span>
          </button>
        );
      })}
    </div>
  );
}
