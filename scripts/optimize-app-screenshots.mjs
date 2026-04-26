import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inputDir = path.join(root, "assets", "app-screenshots");
const outDir = path.join(root, "public", "images", "app-screenshots");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs
  .readdirSync(inputDir)
  .filter((f) => /^\d{2}_.*\.png$/i.test(f))
  .sort();

if (files.length === 0) {
  console.error("No master PNGs found in assets/app-screenshots (expected NN_*.png)");
  process.exit(1);
}

for (const f of files) {
  const m = f.match(/^(\d{2})_/);
  if (!m) continue;
  const id = m[1];
  const inputPath = path.join(inputDir, f);
  const outPath = path.join(outDir, `${id}.webp`);
  const meta = await sharp(inputPath).metadata();
  await sharp(inputPath)
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);
  const outStat = fs.statSync(outPath);
  console.log(
    `${id}.webp  ${meta.width}×${meta.height} → 800×~${Math.round(
      800 * (meta.height / meta.width)
    )}  ${(outStat.size / 1024).toFixed(0)} KB`
  );
}

console.log("Done.");
