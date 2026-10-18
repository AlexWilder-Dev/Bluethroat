import { motion } from 'framer-motion';
import type { Glass } from '../data/bluethroat';

// Line drawings after the glass icons on the printed menu.
const GLASSES: Record<Glass, string[]> = {
  rocks: ['M10 28 A14 2.6 0 1 0 38 28 A14 2.6 0 1 0 10 28', 'M10 28 V54 Q10 58.5 24 58.5 Q38 58.5 38 54 V28'],
  highball: ['M13 6 A11 2.2 0 1 0 35 6 A11 2.2 0 1 0 13 6', 'M13 6 V54 Q13 58.5 24 58.5 Q35 58.5 35 54 V6'],
  coupe: [
    'M8 20 H40 C40 29.5 32 33.5 26.2 35.5 V52.5 C26.2 54.4 29.5 55 32.6 55.6 C34.4 56 34.4 57.8 33 57.8 H15 C13.6 57.8 13.6 56 15.4 55.6 C18.5 55 21.8 54.4 21.8 52.5 V35.5 C16 33.5 8 29.5 8 20 Z',
  ],
};

export function GlassIcon({ glass, size = 48, draw = false, className = '' }: { glass: Glass; size?: number; draw?: boolean; className?: string }) {
  return (
    <svg
      className={`glass ${className}`}
      width={size}
      height={(size * 64) / 48}
      viewBox="0 0 48 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLASSES[glass].map((d, i) =>
        draw ? (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.15 + i * 0.35, ease: [0.45, 0, 0.2, 1] }}
          />
        ) : (
          <path key={d} d={d} />
        ),
      )}
    </svg>
  );
}

export const glassName: Record<Glass, string> = { rocks: 'Rocks glass', coupe: 'Coupe', highball: 'Highball' };
