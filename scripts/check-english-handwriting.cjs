/* Run locally, with --verify-remote to repeat the 48 CDN HEAD checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true };
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: options }).outputText, file);
const handwriting = require('../lib/english-handwriting.ts');
const guides = require('../lib/english-tracing.json');
const { englishPaperWritingVideos } = require('../lib/english-curriculum.ts');
const { handwritingVideos, handwritingStrokes, handwritingLetters } = handwriting;
assert.equal(handwritingLetters.length, 24);
assert.equal(Object.keys(handwritingVideos).length, 48);
for (const [form, video] of Object.entries(handwritingVideos)) {
  assert.equal(video.src, `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-writing-video-clips/draw-${form === form.toUpperCase() ? 'big' : 'small'}-${form.toLowerCase()}.mp4`);
  assert.equal(video.verified, '2026-09-30'); assert.ok(video.bytes > 50000);
  if (video.poster) assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', video.poster)));
  if (englishPaperWritingVideos[form]) assert.equal(video.src, englishPaperWritingVideos[form].src, `${form}: preserve existing video`);
  const strokes = handwritingStrokes(form);
  assert.deepEqual(strokes.map(stroke => stroke.path), guides[form].path.match(/M[^M]+/g));
  assert.deepEqual(strokes.map(stroke => stroke.start), guides[form].starts);
  for (const [i, stroke] of strokes.entries()) {
    assert.equal(stroke.number, i + 1); assert.ok(stroke.cue && stroke.cue !== 'Follow this line.');
    assert.equal(stroke.narration.startsWith('Lift. '), i > 0, `${form}: announce actual pen lifts only`);
  }
}
assert.deepEqual(handwritingStrokes('A').map(stroke => stroke.cue), ['Slant down to the left.', 'Slant down to the right.', 'Go across to the right.']);
assert.deepEqual(handwritingStrokes('T').map(stroke => stroke.cue), ['Go across to the right.', 'Go down.']);
assert.equal(handwritingStrokes('i')[1].cue, 'Make a dot.');

// Exercise the real component callbacks with persistent controlled hooks.
function session() {
  const states = [], refs = [], completions = [], recorded = [];
  let stateIndex = 0, refIndex = 0;
  const hooks = {
    useState(initial) { const i = stateIndex++; if (!(i in states)) states[i] = typeof initial === 'function' ? initial() : initial; return [states[i], next => { states[i] = typeof next === 'function' ? next(states[i]) : next; }]; },
    useRef(initial) { const i = refIndex++; return refs[i] || (refs[i] = { current: initial }); },
    useEffect() {},
  };
  function TracePad() { return null; }
  const audio = { stop() {}, sequence: async () => true, playing: false };
  const module = { exports: {} };
  const load = id => id === 'react' ? hooks : id === '@/lib/english-handwriting' ? handwriting : id === './TracePad' ? { __esModule: true, default: TracePad } : id === './useEnglishAudio' ? { __esModule: true, default: () => audio } : id === './Icons' || id === './ParentHelp' ? { __esModule: true, default: () => null } : require(id);
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../components/english/FormationPractice.tsx'), 'utf8'), { compilerOptions: options }).outputText;
  new Function('require', 'module', 'exports', code)(load, module, module.exports);
  function render() { stateIndex = 0; refIndex = 0; const wrapper = module.exports.default({ letter: 's', suspended: false, invitation: true, onTryForm: form => recorded.push(form), onComplete: forms => completions.push(forms) }); return wrapper.type(wrapper.props); }
  function nodes(node, type) { if (!node || typeof node !== 'object') return []; return [...(node.type === type ? [node] : []), ...React.Children.toArray(node.props?.children).flatMap(child => nodes(child, type))]; }
  function text(node) { return typeof node === 'string' ? node : typeof node === 'object' && node ? React.Children.toArray(node.props?.children).map(text).join('') : ''; }
  const button = label => { const match = nodes(render(), 'button').find(node => text(node).trim() === label || node.props['aria-label'] === label); assert.ok(match, `Missing button ${label}`); return match; };
  return { render, nodes, button, TracePad, completions, recorded };
}
let test = session();
assert.equal(test.render().props['data-handwriting-form'], 's', 'Lowercase is the initial invitation');
assert.equal(test.nodes(test.render(), test.TracePad)[0].props.autoDemo, true);
test.button('Keep reading').props.onClick(); assert.deepEqual(test.completions, [[]]); assert.deepEqual(test.recorded, []);
test = session(); test.button('Watch a hand').props.onClick();
test.nodes(test.render(), 'video')[0].props.onPlay(); test.button('Keep reading').props.onClick(); assert.deepEqual(test.completions, [[]], 'Watching creates no writing try');
test = session(); const pad = test.nodes(test.render(), test.TracePad)[0]; pad.props.onComplete(false); assert.deepEqual(test.completions, [[]], 'Blank Done creates no writing try');
test = session(); test.nodes(test.render(), test.TracePad)[0].props.onTry(); test.nodes(test.render(), test.TracePad)[0].props.onTry();
assert.deepEqual(test.recorded, ['s'], 'Persist a form immediately, once');
test.button('SBig').props.onClick(); test.nodes(test.render(), test.TracePad)[0].props.onTry(); test.button('Keep reading').props.onClick();
assert.deepEqual(test.completions, [['s', 'S']], 'Keep both actually attempted cases'); assert.deepEqual(test.recorded, ['s', 'S']);
test = session(); test.button('Use paper').props.onClick(); test.button('I tried on paper').props.onClick(); assert.deepEqual(test.completions, [['s']]); assert.deepEqual(test.recorded, ['s']);

async function main() {
  if (process.argv.includes('--verify-remote')) {
    const entries = Object.entries(handwritingVideos); let cursor = 0;
    await Promise.all(Array.from({ length: 6 }, async () => { while (cursor < entries.length) { const [form, video] = entries[cursor++]; const response = await fetch(video.src, { method: 'HEAD', signal: AbortSignal.timeout(15000) }); assert.equal(response.status, 200, `${form}: live video`); assert.match(response.headers.get('content-type') || '', /^video\/mp4/); assert.ok(Number(response.headers.get('content-length')) > 0); } }));
    console.log('PASS: all 48 live writing-video URLs return 200 video/mp4.');
  }
  console.log('PASS: 48 verified writing models, path-matched stroke cues, lowercase invitation, unscored skip/watch, immediate unique drawing tries, and explicit paper confirmation.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
