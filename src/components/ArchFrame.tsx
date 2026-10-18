import { AnimatePresence, motion } from 'framer-motion';
import type { Photo as PhotoData } from '../data/bluethroat';
import { Photo } from './Photo';

/** A photo set in the shape of a railway arch. */
export function ArchFrame({
  photo,
  sizes,
  eager,
  className = '',
  ring = false,
}: {
  photo: PhotoData;
  sizes?: string;
  eager?: boolean;
  className?: string;
  ring?: boolean;
}) {
  return (
    <div className={`arch ${ring ? 'arch--ring' : ''} ${className}`}>
      <AnimatePresence initial={true} mode="popLayout">
        <motion.div
          key={photo.src}
          className="arch-img"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 0.61, 0.21, 1] }}
        >
          <Photo photo={photo} sizes={sizes} eager={eager} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
