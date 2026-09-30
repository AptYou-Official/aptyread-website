/* Real component callbacks: one action prompt, intact teaching, no early answers. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true };
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: options }).outputText, file);
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return resolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const { emptyProgress } = require('../lib/english-progress.ts');
const { englishLessons } = require('../lib/english-curriculum.ts');
const { APPLICATION_ID } = require('../lib/english-application.ts');
const paper = require('../lib/english-paper-writing.ts');
const readingPath = englishLessons.filter(lesson => !lesson.supplemental).flatMap(lesson => lesson.activities.map(activity => activity.id));
const before = id => ({ ...emptyProgress(), completed: readingPath.slice(0, readingPath.indexOf(id)) });
const tick = () => new Promise(resolve => setTimeout(resolve, 5));
global.document = { hidden: false, addEventListener() {}, removeEventListener() {} };
global.window = { scrollTo() {}, addEventListener() {}, removeEventListener() {} };

function nodes(node, type) {
  if (!node || typeof node !== 'object') return [];
  return [...(node.type === type ? [node] : []), ...React.Children.toArray(node.props?.children).flatMap(child => nodes(child, type))];
}
function label(node) {
  if (node?.props?.['aria-hidden']) return '';
  return typeof node === 'string' ? node : typeof node === 'object' && node ? React.Children.toArray(node.props?.children).map(label).join('') : '';
}
function session(file, props, initial = emptyProgress()) {
  const states = [], refs = [], children = new Map(), played = [], cleanups = [], watched = [];
  let stateIndex = 0, refIndex = 0, effects = [], progress = initial;
  const hooks = {
    useState(initial) { const i = stateIndex++; if (!(i in states)) states[i] = typeof initial === 'function' ? initial() : initial; return [states[i], next => { states[i] = typeof next === 'function' ? next(states[i]) : next; }]; },
    useRef(initial) { const i = refIndex++; return refs[i] || (refs[i] = { current: initial }); },
    useEffect(effect) { effects.push(effect); },
    useCallback(callback) { return callback; },
  };
  const audio = {
    playing: false, blocked: false, notice: '', stop() {},
    async sequence(cues) { played.push(cues.map(cue => cue.id)); return true; },
    async play(id) { played.push([id]); return true; },
  };
  const module = { exports: {} };
  const load = id => {
    if (id === 'react') return hooks;
    if (id === './EnglishProvider') return { useEnglish: () => ({ progress, update: change => { progress = change(progress); } }) };
    if (id === './useEnglishAudio') return { __esModule: true, default: () => audio };
    if (id === '@/lib/english-paper-writing') return { ...paper, createPaperWriting: () => ({ watch: direct => watched.push(direct), dispose() {}, pause() {} }) };
    if (id.startsWith('./')) {
      if (!children.has(id)) children.set(id, function Child() { return null; });
      return { __esModule: true, default: children.get(id) };
    }
    return require(id);
  };
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, `../components/english/${file}.tsx`), 'utf8'), { compilerOptions: options }).outputText;
  new Function('require', 'module', 'exports', code)(load, module, module.exports);
  function render() { stateIndex = 0; refIndex = 0; effects = []; return module.exports.default(props); }
  function button(text) { const match = nodes(render(), 'button').find(node => label(node).trim() === text || node.props['aria-label'] === text); assert.ok(match, `${file}: missing button ${text}`); assert.ok(!match.props.disabled, `${file}: button ${text} is disabled`); return match; }
  return {
    render, button, played, watched, audio,
    get progress() { return progress; },
    child(name) { return nodes(render(), children.get(`./${name}`))[0]; },
    async click(text) { button(text).props.onClick(); await tick(); },
    async mount() { render(); cleanups.push(...effects.map(effect => effect()).filter(Boolean)); await tick(); },
    clear() { played.length = 0; },
    dispose() { cleanups.forEach(cleanup => cleanup()); },
  };
}

async function main() {
  let test = session('WordBuilder', { word: 'sat', onComplete() {} });
  await test.mount(); assert.deepEqual(test.played, [['build-tap', 'sound-s']], 'Opening pairs one action with the actual phoneme');
  for (const letter of 'sat') {
    test.clear(); await test.click(`Add ${letter}`);
    assert.deepEqual(test.played, [[`sound-${letter}`]], 'One correct tap hears one sound, without narrating the next tap');
  }
  assert.equal(test.progress.words.sat.built, 'sat');
  test.clear(); await test.click('Hear sat together');
  assert.deepEqual(test.played, [['sound-s', 'sound-a', 'sound-t', 'word-sat']], 'Explicit blending model keeps every phoneme and whole word');
  test.clear(); await test.click('I tried reading sat');
  assert.deepEqual(test.played, [['read-again']]); assert.equal(test.progress.words.sat.reads, 1);
  test.clear(); await test.click('I tried reading sat');
  assert.deepEqual(test.played, []); assert.equal(test.progress.words.sat.reads, 2, 'Two attempts remain distinct from oral-reading assessment');
  test.dispose();

  test = session('MoreWords', { onComplete() {} }, before(APPLICATION_ID));
  await test.mount(); assert.deepEqual(test.played, [['discover-read']], 'Independent first attempt never automatically supplies the word');
  test.clear(); await test.click('Hear the sounds');
  assert.deepEqual(test.played, [['sound-p', 'sound-a', 'sound-n', 'word-pan']], 'Requested help goes straight to the complete model');
  assert.equal(test.progress.application.words.pan.readingHelp, true);
  await test.click('I tried it'); await test.click('I tried again');
  test.clear(); await test.click('Make it');
  assert.deepEqual(test.played, [['word-pan']], 'The spelling prompt speaks the word once');
  assert.equal(test.progress.application.words.pan.heard, true);
  test.clear(); await test.click('Help me');
  assert.deepEqual(test.played, [['sound-p']]); assert.equal(test.progress.application.words.pan.spellingHelp, true, 'Shorter help still records support');
  for (const letter of 'pan') await test.click(`Choose ${letter}`);
  await test.click('Read it');
  test.clear(); await test.click('I tried it');
  assert.equal(test.progress.application.step, 5);
  assert.deepEqual(test.played, [['discover-read']], 'Moving to a new word preserves its independent first attempt');
  test.dispose();

  test = session('SentenceReview', { onComplete() {} }, before('our-first-words'));
  await test.mount(); assert.deepEqual(test.played, [], 'A clear Listen button does not need a spoken Listen preamble');
  await test.click('Listen');
  assert.deepEqual(test.played, [['sentence-sat', 'sentence-find-sat']], 'Supported sentence finding retains the actual sentence and target');
  test.clear(); await test.click('Word mat');
  assert.deepEqual(test.played, [['sentence-find-sat']]); assert.equal(test.progress.sentenceReview.step, 1);
  test.clear(); await test.click('Word sat');
  assert.deepEqual(test.played, [['sound-practice-star', 'sentence-at', 'sentence-find-at']]);
  test.clear(); await test.click('Word at');
  assert.deepEqual(test.played, [['sound-practice-complete']]); assert.equal(test.progress.sentenceReview.step, 3);
  test.dispose();

  test = session('FirstWordsReview', { pair: 'more', onComplete() {} }, before('more-little-words'));
  await test.mount(); assert.deepEqual(test.played, [['review-listen']], 'Word exploration opens with one action');
  test.audio.blocked = true; test.clear(); await test.click('Listen');
  assert.deepEqual(test.played, [['word-pin']], 'Blocked-audio recovery starts the actual available word instead of repeating directions');
  assert.deepEqual(test.progress.moreWords.heard, ['pin']);
  test.dispose();

  let completed = 0;
  test = session('WritingPractice', { activity: { id: 'write-s-lowercase', letter: 's', kind: 'write' }, onComplete() { completed++; } });
  await test.click('Draw here'); await test.mount();
  assert.equal(test.child('TracePad').props.autoDemo, true, 'Drawing begins with an explicit moving-dot model');
  assert.deepEqual(test.played, [], 'The trace wrapper does not layer a procedural intro over stroke cues');
  await test.child('TracePad').props.onStrokeCue('Curve around.', 0);
  assert.deepEqual(test.played, [['handwriting.s.stroke.1']], 'Actual model cues stay available');
  test.child('TracePad').props.onComplete(false);
  assert.ok(test.button('Draw here')); assert.equal(completed, 0, 'A blank drawing never becomes a completed try');
  test.dispose();

  test = session('PaperWriting', { letter: 's', uppercase: false, suspended: false, onBack() {}, onComplete() {} });
  await test.mount(); await test.click('Watch');
  assert.deepEqual(test.watched, [true], 'Pressing Watch starts its model directly without narrating the same button');
  assert.deepEqual(test.played, []);
  test.dispose();
  console.log('PASS: legacy action-to-audio queues, complete blending/reading models, independent first attempts, support records, blocked recovery, direct paper model, and non-overlapping tracing cues.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
