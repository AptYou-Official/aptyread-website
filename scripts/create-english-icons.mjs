import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/english/icons', { recursive: true });
for (const size of [180, 192, 512]) {
  const artwork = await sharp('public/images/apty-mascot.png').resize(Math.round(size * 0.75), Math.round(size * 0.75), { fit: 'contain', background: '#FAFAF7' }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#FAFAF7' } }).composite([{ input: artwork, gravity: 'center' }]).png().toFile(`public/english/icons/${size === 180 ? 'apple-touch-icon' : `icon-${size}`}.png`);
}
const maskable = await sharp('public/images/apty-mascot.png').resize(300, 300, { fit: 'contain', background: '#FAFAF7' }).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#FAFAF7' } }).composite([{ input: maskable, gravity: 'center' }]).png().toFile('public/english/icons/icon-maskable-512.png');
