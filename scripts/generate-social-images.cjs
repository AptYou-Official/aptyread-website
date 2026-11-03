/**
 * Rebuild the website's 1200 x 630 sharing cards:
 *   node scripts/generate-social-images.cjs
 *
 * Uses the existing sharp and Next/font fontkit dependencies. Font outlines make
 * the output independent of system fonts and preserve Nunito Sans's ss01 'a'.
 * The source artwork is used as supplied, with proportional scaling only.
 */
const fs = require("node:fs/promises");
const path = require("node:path");
const assert = require("node:assert/strict");
const sharp = require("sharp");
const createFont = require("next/dist/compiled/@next/font/dist/fontkit").default;

const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "public", "homepage");
const OUTPUT = path.join(ROOT, "public", "social");
const WIDTH = 1200;
const HEIGHT = 630;
const COLORS = {
  paper: "#FAFAF7",
  blue: "#173A8A",
  teal: "#007A90",
  cyan: "#00B8D9",
  body: "#5B6B7C",
  mist: "#E8F3F5",
  line: "#D8E6E7",
  sage: "#EDF3EC",
};

let nunito;
let andika;
const faces = new Map();
const assets = new Map();

function face(weight = 700) {
  if (!faces.has(weight)) faces.set(weight, nunito.getVariation({ wght: weight, wdth: 100, opsz: 12, YTLC: 500 }));
  return faces.get(weight);
}

function shape(text, options = {}) {
  const { size = 24, weight = 700, font = face(weight), tracking = 0, features = [] } = options;
  const run = font.layout(text, features);
  const scale = size / font.unitsPerEm;
  const width = run.positions.reduce((sum, pos) => sum + pos.xAdvance * scale, 0) + Math.max(0, run.glyphs.length - 1) * tracking;
  return { run, scale, width };
}

function textLine(text, x, baseline, options = {}) {
  const { fill = COLORS.blue, tracking = 0, align = "left", colors } = options;
  const { run, scale, width } = shape(text, options);
  let advance = align === "center" ? -width / 2 : align === "right" ? -width : 0;
  const glyphs = run.glyphs.map((glyph, index) => {
    const pos = run.positions[index];
    const transform = `translate(${(x + advance + pos.xOffset * scale).toFixed(3)} ${(baseline - pos.yOffset * scale).toFixed(3)}) scale(${scale.toFixed(6)} ${(-scale).toFixed(6)})`;
    const rendered = `<path d="${glyph.path.toSVG()}" fill="${colors ? colors(index) : fill}" transform="${transform}"/>`;
    advance += pos.xAdvance * scale + tracking;
    return rendered;
  }).join("");
  return glyphs;
}

function textBlock(lines, x, baseline, options = {}) {
  const { size = 58, lineHeight = size * 1.13, accentLast = true, maxWidth = 590 } = options;
  return lines.map((line, index) => {
    assert(shape(line, { ...options, size }).width <= maxWidth, `Text exceeds card column: ${line}`);
    return textLine(line, x, baseline + index * lineHeight, { ...options, size, fill: accentLast && index === lines.length - 1 ? COLORS.teal : COLORS.blue });
  }).join("");
}

function wordmark(x = 64, baseline = 90) {
  return textLine("AptyRead", x, baseline, {
    size: 43,
    weight: 800,
    features: ["ss01"],
    tracking: -1.55,
    colors: index => index < 4 ? COLORS.blue : COLORS.cyan,
  });
}

function base() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <rect width="1200" height="630" fill="${COLORS.paper}"/>
    <rect x="686" y="32" width="482" height="566" rx="34" fill="${COLORS.mist}"/>
    <circle cx="1124" cy="89" r="82" fill="#DAEEF1"/>
    ${wordmark()}`;
}

function footer() {
  return `<path d="M64 554H626" stroke="${COLORS.line}" stroke-width="1"/>
    ${textLine("Every Child Reads.", 64, 587, { size: 18, weight: 750, fill: COLORS.teal })}
    ${textLine("aptyread.ai", 626, 587, { size: 18, weight: 600, align: "right", fill: COLORS.body })}`;
}

async function image(filename, x, y, width, height) {
  if (!assets.has(filename)) {
    const data = await sharp(path.join(ASSETS, filename)).png().toBuffer();
    assets.set(filename, `data:image/png;base64,${data.toString("base64")}`);
  }
  return `<image href="${assets.get(filename)}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`;
}

async function appPanel(filename) {
  const screen = { x: 871, y: 64, w: 226, h: 491 };
  return `<rect x="861" y="62" width="246" height="510" rx="30" fill="#173A8A" opacity=".04"/>
    <rect x="863" y="56" width="242" height="507" rx="29" fill="white"/>
    ${await image(filename, screen.x, screen.y, screen.w, screen.h)}
    ${await image("apty-mascot.webp", 692, 311, 231, 231)}
    ${textLine("Inside AptyRead", 926, 585, { size: 16, weight: 650, align: "center", fill: COLORS.teal })}`;
}

async function wordPanel(tiles, prompt) {
  const center = 927;
  const gap = 13;
  const tileWidths = tiles.map(tile => Math.max(88, shape(tile, { size: tile.length > 1 ? 32 : 54, font: andika }).width + 28));
  const total = tileWidths.reduce((sum, width) => sum + width, 0) + (tiles.length - 1) * gap;
  let x = center - total / 2;
  const renderedTiles = tiles.map((tile, index) => {
    const width = tileWidths[index];
    const size = tile.length > 1 ? 32 : 54;
    const markup = `<rect x="${x}" y="207" width="${width}" height="99" rx="19" fill="#DCE7DF"/>
      <rect x="${x}" y="201" width="${width}" height="99" rx="19" fill="${COLORS.paper}" stroke="#D8E5DF"/>
      ${textLine(tile, x + width / 2, 269, { size, font: andika, align: "center" })}`;
    x += width + gap;
    return markup;
  }).join("");
  return `${textLine("A WORD. A LITTLE DISCOVERY.", center, 151, { size: 17, weight: 750, align: "center", tracking: .8, fill: COLORS.teal })}
    ${renderedTiles}
    ${prompt.map((line, index) => textLine(line, center, 351 + index * 29, { size: 22, weight: 650, align: "center", fill: COLORS.blue })).join("")}
    ${await image("apty-mascot.webp", 842, 403, 170, 170)}`;
}

const guideCards = [
  {
    slug: "reading-guide",
    label: "READING GUIDE FOR PARENTS",
    lines: ["Little words.", "Big discoveries."],
    size: 62,
    sub: ["Practical reading ideas", "to explore together."],
    tiles: ["s", "a", "t"],
    prompt: ["Say it. Build it.", "Explore its meaning."],
  },
  {
    slug: "child-knows-alphabet-but-cant-read",
    label: "READING GUIDE FOR PARENTS",
    lines: ["Knows the alphabet.", "What comes next?"],
    size: 55,
    sub: ["Help familiar letters", "become meaningful words."],
    tiles: ["m", "a", "t"],
    prompt: ["Where could we", "put a mat?"],
  },
  {
    slug: "how-to-teach-letter-sounds",
    label: "READING GUIDE FOR PARENTS",
    lines: ["How can we practise", "letter sounds?"],
    size: 55,
    sub: ["A few sounds.", "Something to read together."],
    tiles: ["a", "m"],
    prompt: ["I am happy.", "What could you say?"],
  },
  {
    slug: "how-to-teach-child-to-blend-sounds",
    label: "READING GUIDE FOR PARENTS",
    lines: ["How do sounds", "become a word?"],
    size: 61,
    sub: ["Listen, blend and explore", "what the word means."],
    tiles: ["s", "u", "n"],
    prompt: ["Read sun together.", "Draw a sunny sky."],
  },
  {
    slug: "knows-letter-sounds-but-cant-read-words",
    label: "READING GUIDE FOR PARENTS",
    lines: ["Knows the sounds.", "Still finding the word?"],
    size: 53,
    sub: ["Notice the sticking point.", "Find a small next step."],
    tiles: ["m", "a", "p"],
    prompt: ["Draw a little map", "of your home."],
  },
  {
    slug: "how-to-help-child-who-struggles-with-reading",
    label: "READING GUIDE FOR PARENTS",
    lines: ["What if reading", "feels difficult?"],
    size: 62,
    sub: ["A little support.", "A calmer place to begin."],
    tiles: ["s", "u", "n"],
    prompt: ["A small word.", "A shared turn."],
  },
  {
    slug: "child-reads-words-but-struggles-with-sentences",
    label: "READING GUIDE FOR PARENTS",
    lines: ["Reads the words.", "What about meaning?"],
    size: 54,
    sub: ["Bring a sentence together.", "Explore what it tells you."],
    tiles: ["The", "cat", "sat."],
    prompt: ["Who sat?", "Talk about what happened."],
  },
];

async function writeCard(slug, svg) {
  const file = path.join(OUTPUT, `${slug}.png`);
  await sharp(Buffer.from(`${svg}</svg>`)).png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 }).toFile(file);
  const metadata = await sharp(file).metadata();
  assert.equal(metadata.width, WIDTH);
  assert.equal(metadata.height, HEIGHT);
  console.log(`${slug}.png | ${metadata.width}x${metadata.height} | ${(await fs.stat(file)).size} bytes`);
}

async function main() {
  nunito = createFont(await fs.readFile(path.join(ASSETS, "NunitoSans-Variable.ttf")));
  andika = createFont(await fs.readFile(path.join(ASSETS, "Andika-Regular.ttf")));
  assert(face(800).layout("AptyRead", ["ss01"]).glyphs.some(glyph => glyph.name === "a.ss01"), "The AptyRead wordmark must use Nunito's ss01 alternate a.");
  await fs.mkdir(OUTPUT, { recursive: true });

  await writeCard("aptyread-share-v2", `${base()}
    ${textLine("ENGLISH LITERACY · AGES 4–10", 64, 147, { size: 18, weight: 750, tracking: .7, fill: COLORS.teal })}
    ${textBlock(["Help your", "child read.", "And understand."], 64, 241, { size: 65, weight: 800, tracking: -1.5, lineHeight: 72, maxWidth: 584 })}
    ${textLine("9 free lessons, including", 64, 464, { size: 25, weight: 650, fill: COLORS.body })}
    ${textLine("your child’s first story.", 64, 500, { size: 25, weight: 650, fill: COLORS.body })}
    ${await appPanel("app-words.webp")}${footer()}`);

  await writeCard("the-aptyread-path", `${base()}
    ${textLine("THE APTYREAD JOURNEY", 64, 147, { size: 18, weight: 750, tracking: .7, fill: COLORS.teal })}
    ${textBlock(["From first sounds.", "To reading", "with meaning."], 64, 242, { size: 59, weight: 800, tracking: -1.3, lineHeight: 69, maxWidth: 584 })}
    ${textLine("Five connected levels.", 64, 462, { size: 25, weight: 650, fill: COLORS.body })}
    ${textLine("One step builds on another.", 64, 498, { size: 25, weight: 650, fill: COLORS.body })}
    ${await appPanel("app-first-story.webp")}${footer()}`);

  for (const card of guideCards) {
    await writeCard(card.slug, `${base()}
      ${textLine(card.label, 64, 153, { size: 18, weight: 750, tracking: .7, fill: COLORS.teal })}
      ${textBlock(card.lines, 64, 269, { size: card.size, weight: 800, tracking: -1.2, lineHeight: 74, maxWidth: 584 })}
      ${card.sub.map((line, index) => textLine(line, 64, 425 + index * 35, { size: 25, weight: 650, fill: COLORS.body })).join("")}
      ${await wordPanel(card.tiles, card.prompt)}${footer()}`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
