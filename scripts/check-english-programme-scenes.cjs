/* Authored scene coverage, recorded phoneme availability, and actual tracing
 * pointer-start behaviour. Run: node scripts/check-english-programme-scenes.cjs
 * This checks assets and interactions, not phonetic quality or learning efficacy. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = path.resolve(__dirname, '..');
const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true };
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: options }).outputText, filename);
}
const programme = require('../lib/english-programme.ts');
const { englishMedia } = require('../lib/english-curriculum.ts');
const { default: ProgrammeScene, supportedProgrammeScenes } = require('../components/english/ProgrammeScene.tsx');
const guides = require('../lib/english-tracing.json');
const letters = [...'satpincmehrgdkolfbujwvyz'];
assert.deepEqual(programme.LEVEL_ONE_LETTERS, letters, 'The intended 24-letter scope must be reviewed if it changes');

const requiredScenes = new Set();
function collectScenes(value) {
  if (!value || typeof value !== 'object') return;
  if (typeof value.scene === 'string') requiredScenes.add(value.scene);
  for (const child of Object.values(value)) collectScenes(child);
}
collectScenes(programme.allProgrammeActivities);
const supported = new Set(supportedProgrammeScenes);
assert.equal(supported.size, supportedProgrammeScenes.length, 'Scene identifiers must be unique');
for (const scene of requiredScenes) {
  assert.ok(supported.has(scene), `${scene}: missing authored artwork`);
  const svg = renderToStaticMarkup(React.createElement(ProgrammeScene, { scene }), { identifierPrefix: scene });
  assert.match(svg, /viewBox="0 0 400 270"/, `${scene}: consistent illustration canvas`);
  assert.match(svg, /role="img" aria-label="[^"]+"/, `${scene}: meaningful accessible description`);
  assert.ok(!svg.includes('aria-label="An open book."'), `${scene}: fallback illustration must not stand in for meaning`);
  assert.ok(!svg.includes('<text'), `${scene}: illustration must not print the answer`);
  assert.ok(!svg.includes('<image'), `${scene}: artwork stays self-contained`);
}

function hasMpegAudioFrame(bytes) {
  const offset = bytes.subarray(0, 3).toString() === 'ID3'
    ? 10 + ((bytes[6] & 127) << 21) + ((bytes[7] & 127) << 14) + ((bytes[8] & 127) << 7) + (bytes[9] & 127)
    : 0;
  for (let index = offset; index < Math.min(bytes.length - 3, offset + 4096); index++) {
    const version = (bytes[index + 1] >> 3) & 3;
    const layer = (bytes[index + 1] >> 1) & 3;
    const bitrate = bytes[index + 2] >> 4;
    const sampleRate = (bytes[index + 2] >> 2) & 3;
    if (bytes[index] === 255 && (bytes[index + 1] & 224) === 224 && version !== 1 && layer > 0 && bitrate > 0 && bitrate < 15 && sampleRate < 3) return true;
  }
  return false;
}
for (const letter of letters) {
  const expected = `/english/media/${letter}-sound.mp3`;
  assert.equal(englishMedia[`sound-${letter}`], expected, `${letter}: isolated phoneme must resolve to the recording`);
  const file = path.join(root, 'public', expected);
  assert.ok(fs.existsSync(file), `${letter}: missing recorded phoneme`);
  const bytes = fs.readFileSync(file);
  assert.ok(bytes.length > 1000 && hasMpegAudioFrame(bytes), `${letter}: file must contain MPEG audio, not an error document`);
}

const expectedForms = letters.flatMap(letter => [letter, letter.toUpperCase()]).sort();
assert.deepEqual(Object.keys(guides).sort(), expectedForms, 'Every one of the 24 letters has both writing forms');
function transformedStarts(guide) {
  const [tx = 0, ty = 0, sx = 1, sy = sx] = guide.transform.match(/-?\d*\.?\d+/g).map(Number);
  return guide.starts.map(([x, y]) => ({ x: tx + x * sx, y: ty + y * sy }));
}
for (const [letter, guide] of Object.entries(guides)) {
  const authored = Array.from(guide.path.matchAll(/M\s*([\d.-]+)[\s,]+([\d.-]+)/g), match => [Number(match[1]), Number(match[2])]);
  assert.ok(authored.length > 0, `${letter}: needs a stroke`);
  assert.deepEqual(guide.starts, authored, `${letter}: each authored stroke needs its own starting dot`);
  assert.deepEqual(guide.start, authored[0], `${letter}: first-stroke fallback matches the path`);
  assert.ok(!/[AaHhVv]/.test(guide.path), `${letter}: bounds use explicit coordinate pairs; arcs and shorthand need separate support`);
  for (const point of transformedStarts(guide)) assert.ok(point.x >= 0 && point.x <= 500 && point.y >= 0 && point.y <= 330, `${letter}: starting dot stays on paper`);
}

// Render with controlled hooks and invoke the real SVG pointer handler. This
// catches a regression to validating only guide.start rather than all strokes.
const traceCode = ts.transpileModule(fs.readFileSync(path.join(root, 'components/english/TracePad.tsx'), 'utf8'), { compilerOptions: options }).outputText;
function traceAt(letter, point) {
  const states = [], effects = [];
  let cursor = 0;
  const mockReact = {
    useState(initial) { const index = cursor++; states[index] = initial; return [initial, value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }]; },
    useRef: initial => ({ current: initial }), useMemo: factory => factory(), useEffect: effect => effects.push(effect),
  };
  const module = { exports: {} };
  const load = name => name === 'react' ? mockReact : name === '@/lib/english-tracing.json' ? guides : name === '@/lib/english-handwriting' ? require('../lib/english-handwriting.ts') : name === './Icons' ? { __esModule: true, default: () => null } : require(name);
  new Function('require', 'module', 'exports', 'setTimeout', 'clearTimeout', traceCode)(load, module, module.exports, () => 1, () => {});
  const element = module.exports.default({ letter, onComplete() {}, onListen() {} });
  let svg;
  function find(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'svg') svg = node;
    for (const child of React.Children.toArray(node.props?.children)) find(child);
  }
  find(element);
  assert.ok(svg?.props.onPointerDown, 'TracePad exposes its real pointer interaction');
  svg.props.onPointerDown({ clientX: point.x, clientY: point.y, pointerId: 1, button: 0, isPrimary: true, preventDefault() {}, currentTarget: { setPointerCapture() {}, getScreenCTM: () => null, getBoundingClientRect: () => ({ left: 0, top: 0, width: 500, height: 330 }) } });
  return states[3]; // The visible guidance state, not a duplicated start algorithm.
}
for (const [letter, index] of [['A', 2], ['T', 1]]) {
  const starts = transformedStarts(guides[letter]);
  assert.ok(Math.hypot(starts[index].x - starts[0].x, starts[index].y - starts[0].y) > 58, `${letter}: regression fixture must be outside the first-start tolerance`);
  assert.equal(traceAt(letter, starts[index]), null, `${letter}: later authored stroke must not show a false start warning`);
  assert.equal(traceAt(letter, { x: 490, y: 320 }), 'start', `${letter}: a distant mark still receives gentle guidance`);
}
console.log(`PASS: ${requiredScenes.size} authored scenes, 24 recorded phonemes, 48 writing guides, and A/T multistroke pointer starts.`);
