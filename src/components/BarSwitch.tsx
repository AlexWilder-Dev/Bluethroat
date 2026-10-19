import { motion } from 'framer-motion';
import { barOrder, bars } from '../data/bluethroat';
import { useBar } from '../state/bar';

export function BarSwitch({ id = 'top', label = 'Choose a bar' }: { id?: string; label?: string }) {
  const { barId, setBar } = useBar();
  return (
    <div className="switch" role="radiogroup" aria-label={label}>
      {barOrder.map((b) => {
        const active = b === barId;
        return (
          <button key={b} type="button" role="radio" aria-checked={active} className={`switch-opt ${active ? 'is-active' : ''}`} onClick={() => setBar(b)}>
            {bars[b].name}
            {active && <motion.span layoutId={`switch-${id}`} className="switch-rule" transition={{ type: 'spring', stiffness: 300, damping: 34 }} />}
          </button>
        );
      })}
    </div>
  );
}
