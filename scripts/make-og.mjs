// One-off: build public/og.jpg (1200×630) from a real Bluethroat photo with their mark on it.
// Usage: node scripts/make-og.mjs [photo] [focus-x] [focus-y] [out]
import sharp from 'sharp';

const W = 1200;
const H = 630;
const photo = process.argv[2] ?? 'research/img/deptford--92587053--DSC07440.jpg';
const fx = Number(process.argv[3] ?? 0.5);
const fy = Number(process.argv[4] ?? 0.42);
const out = process.argv[5] ?? 'public/og.jpg';
const MARCELLUS = 'scripts/fonts/Marcellus-Regular.ttf';
const POPPINS = 'scripts/fonts/Poppins-Medium.ttf';

// Cover-crop around a focal point.
const meta = await sharp(photo).metadata();
const scale = Math.max(W / meta.width, H / meta.height);
const rw = Math.round(meta.width * scale);
const rh = Math.round(meta.height * scale);
const left = Math.min(Math.max(Math.round(rw * fx - W / 2), 0), rw - W);
const top = Math.min(Math.max(Math.round(rh * fy - H / 2), 0), rh - H);
const base = await sharp(photo).rotate().resize(rw, rh).extract({ left, top, width: W, height: H }).modulate({ brightness: 0.92 }).toBuffer();

// A dark scrim on the left so the mark reads, like the shadow side of the room.
const scrim = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0c0f0f" stop-opacity="0.92"/>
      <stop offset="0.42" stop-color="#0c0f0f" stop-opacity="0.72"/>
      <stop offset="0.75" stop-color="#0c0f0f" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#0c0f0f" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
  </svg>`,
);

const text = (markup, fontfile, font) =>
  sharp({ text: { text: markup, fontfile, font, rgba: true, dpi: 72 } })
    .png()
    .toBuffer();

const bird = await sharp('research/brand/bird-gold.png').resize({ width: 150 }).toBuffer();
const word = await text(`<span foreground="#dabf7e" letter_spacing="${Math.round(0.34 * 64 * 1024)}">BLUETHROAT</span>`, MARCELLUS, 'Marcellus 64');
const places = await text(
  `<span foreground="#e9e6df" letter_spacing="${Math.round(0.3 * 21 * 1024)}">DEPTFORD  ·  BRIXTON</span>`,
  POPPINS,
  'Poppins Medium 21',
);
const line = await text(`<span foreground="#c9c8c2">Cocktail bars in South London’s railway arches</span>`, MARCELLUS, 'Marcellus 30');

const X = 72;
await sharp(base)
  .composite([
    { input: scrim, left: 0, top: 0 },
    { input: bird, left: X, top: 150 },
    { input: word, left: X, top: 290 },
    { input: line, left: X, top: 382 },
    { input: places, left: X, top: 452 },
  ])
  .jpeg({ quality: 88, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
  .toFile(out);

const info = await sharp(out).metadata();
const { size } = await import('node:fs').then((fs) => fs.promises.stat(out));
console.log(out, `${info.width}x${info.height}`, info.format, `${Math.round(size / 1024)}KB`);
