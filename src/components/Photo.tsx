import type { Photo as PhotoData } from '../data/bluethroat';

const base = import.meta.env.BASE_URL;

export function photoUrl(stem: string, width: 640 | 1280 = 1280) {
  return `${base}img/${stem}-${width}.jpg`;
}

export function Photo({
  photo,
  sizes = '(min-width: 900px) 40vw, 90vw',
  eager = false,
  className,
}: {
  photo: PhotoData;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={photoUrl(photo.src, 640)}
      srcSet={`${photoUrl(photo.src, 640)} 640w, ${photoUrl(photo.src, 1280)} 1280w`}
      sizes={sizes}
      alt={photo.alt}
      style={{ objectPosition: photo.position }}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
