import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const directory = 'public/malayalam/icons';
await mkdir(directory, { recursive: true });
// Mechanical exports of the existing brand artwork for OS icon sizes.
for (const size of [180, 192, 512]) {
  await sharp('public/images/apty-mascot.png')
    .resize(size, size).flatten({ background: '#FAFAF7' }).png()
    .toFile(`${directory}/${size === 180 ? 'apple-touch-icon' : `icon-${size}`}.png`);
}
const maskableArtwork = await sharp('public/images/apty-mascot.png').resize(320, 320).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#FAFAF7' } })
  .composite([{ input: maskableArtwork, left: 96, top: 96 }]).png()
  .toFile(`${directory}/icon-maskable-512.png`);

// Optional source is the approved image-generation output; never regenerate it at build time.
if (process.argv[2]) {
  await sharp(process.argv[2]).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 90, mozjpeg: true })
    .toFile('public/images/aptymalayalam-social-share-v1.jpg');
}
console.log('Created Malayalam installation icons and, when supplied, the sharing-image export.');
