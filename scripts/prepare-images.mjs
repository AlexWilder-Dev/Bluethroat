// One-off: resize the bar's own photos from research/ into public/img/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const R = 'research/img/';
const H = 'research/pdf-images/hire/';
const photos = {
  'dep-arch-exterior': R + 'deptford--27b2a91a--Philosopher.PNG',
  'dep-long-bar': R + 'deptford--92587053--DSC07440.jpg',
  'dep-banquette': R + 'deptford--18b00e0b--IMG_3983.JPG',
  'dep-entrance': R + 'deptford--722c6570--IMG_6627.jpg',
  'dep-sign-brick': H + 'dep-000.jpg',
  'dep-amber-rocks': R + 'deptford--40fc7704--8DFFD2C2-584B-42A6-BE3E-FF21203F6611.JPG',
  'dep-green-coupe': R + 'deptford--417973aa--DSC09480.jpg',
  'dep-pour-rocks': R + 'home--47c9d695--DSC08301.jpg',
  'dep-strain-coupe': R + 'deptford--8d6975a6--DB503BB4-75EE-45B3-AD97-A0F7C31491B4.JPG',
  'dep-twist-coupe': R + 'deptford--86423c76--DSC08202.jpg',
  'brx-vault-night': R + 'brixton--8f935541--DSC08968.JPEG',
  'brx-tile-vault': R + 'brixton--17257975--tempImageJ2ULKr.png',
  'brx-back-bar': R + 'brixton--4f1a9f90--DSC08955.JPEG',
  'brx-menu-drink': R + 'brixton--1e1d10b0--DSC00322.jpg',
  'brx-coupe-marble': R + 'brixton--6ca94079--DSC00393-2_2.jpg',
  'brx-pour': R + 'brixton--897c2d10--DSC00505_3.jpg',
  'brx-strain': R + 'brixton--8fd6a9b0--tempImage5ZIJN7.png',
  'brx-stools': R + 'brixton--f7c7dba6--DSC00001-3.jpeg',
  'brx-sign': H + 'brx-000.jpg',
  'brx-lantern-room': R + 'home--d2d42d29--DSC09208_2.jpeg',
};

await mkdir('public/img', { recursive: true });
for (const [name, src] of Object.entries(photos)) {
  for (const w of [640, 1280]) {
    const info = await sharp(src)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true, progressive: true })
      .toFile(`public/img/${name}-${w}.jpg`);
    console.log(name, w, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
  }
}

// Brand: bird cut from their sign, and favicons from their BB monogram.
await sharp('research/brand/bird-gold.png').resize({ width: 320 }).png({ compressionLevel: 9 }).toFile('public/bird-gold.png');
await sharp('research/brand/bird-ink.png').resize({ width: 320 }).png({ compressionLevel: 9 }).toFile('public/bird-ink.png');
const mono = 'research/img/favicon-orig.png';
await sharp(mono).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(mono).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(mono).resize(192, 192).png().toFile('public/icon-192.png');
console.log('brand done');
