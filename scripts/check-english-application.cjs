/* A new-word attempt is not an oral-reading score. Check recovery and honest support records. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return resolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const { APPLICATION_ID, freshApplication, nextApplication, readApplication } = require('../lib/english-application.ts');
const { englishLessons, englishPronunciationVideos } = require('../lib/english-curriculum.ts');
const { emptyProgress, updateApplication, completeEnglishActivity, enterEnglishActivity, englishAccess, readEnglishProgress } = require('../lib/english-progress.ts');
const { englishNarration } = require('../lib/english-narration.ts');
let progress = { ...emptyProgress(), completed: englishLessons.slice(0, 5).flatMap(l => l.activities.map(a => a.id)).filter(id => id !== APPLICATION_ID) };
assert.equal(progress.completed.length, 42);
assert.equal(englishAccess(progress).next.activity.id, APPLICATION_ID);
const locked = emptyProgress(); assert.equal(updateApplication(locked, { type: 'tried' }), locked);
assert.equal(completeEnglishActivity(progress, APPLICATION_ID), progress);
const snapshots = [];
function act(action) {
  progress = updateApplication(progress, action);
  assert.deepEqual(readEnglishProgress(JSON.stringify(progress)), progress, 'Each paused phase reloads faithfully');
  snapshots.push(structuredClone(progress));
}
assert.deepEqual(readApplication(freshApplication()), freshApplication());
act({ type: 'read-built' }); assert.equal(progress.application.step, 0);
for (const word of ['pan', 'tap']) {
  if (word === 'tap') act({ type: 'read-help' });
  act({ type: 'tried' }); act({ type: 'model-tried' }); act({ type: 'meaning-next' });
  const step = progress.application.step;
  act({ type: 'choose', letter: word[0] }); assert.equal(progress.application.words[word].built, '', 'Must hear the prompt before spelling');
  act({ type: 'read-built' }); assert.equal(progress.application.step, step);
  act({ type: 'heard' }); act({ type: 'choose', letter: word[2] });
  assert.equal(progress.application.words[word].built, '');
  assert.equal(progress.application.words[word].misses, 1);
  act({ type: 'build-help' }); act({ type: 'choose', letter: word[0] }); act({ type: 'undo' });
  assert.equal(progress.application.words[word].built, '');
  for (const letter of word) act({ type: 'choose', letter });
  act({ type: 'read-built' });
  assert.ok(!progress.completed.includes(APPLICATION_ID), 'Building alone cannot complete a reading activity');
  act({ type: 'read-back' });
}
assert.equal(progress.completed.length, 43); assert.equal(englishAccess(progress).next.activity.id, 'meet-p-cases');
assert.equal(progress.application.words.pan.readingHelp, false);
assert.equal(progress.application.words.tap.readingHelp, true);
assert.equal(progress.application.words.tap.spellingHelp, true);
assert.equal(nextApplication(progress.application, { type: 'tried' }), progress.application);
for (const mutate of [v => v.step = 11, v => v.words.pan.built = 'nap', v => v.words.tap.readBack = false, v => v.words.pan.misses = -1, v => v.words.tap.heard = false]) {
  const bad = structuredClone(progress.application); mutate(bad); assert.equal(readApplication(bad), undefined);
}
const premature = freshApplication(); premature.words.tap.readingHelp = true; assert.equal(readApplication(premature), undefined);
const replay = enterEnglishActivity(progress, 'more-words', APPLICATION_ID);
assert.equal(replay.application, undefined); assert.deepEqual(replay.completed, progress.completed);
assert.equal(replay.moreWords, progress.moreWords); assert.equal(replay.firstWords, progress.firstWords);
for (const id of ['discover-read', 'discover-next', 'discover-read-back']) assert.doesNotMatch(englishNarration[id], /\b(pan|tap)\b/i, 'First attempts do not speak their answer');

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const provider = require('../components/english/EnglishProvider.tsx');
provider.useEnglish = () => ({ progress, update() {} });
const MoreWords = require('../components/english/MoreWords.tsx').default;
const render = () => renderToStaticMarkup(React.createElement(MoreWords, { onComplete() {} }));
for (const word of ['pan', 'tap']) {
  const start = word === 'pan' ? 0 : 5;
  progress = snapshots.find(p => p.application.step === start);
  englishPronunciationVideos[word] = { kind: 'file', src: '/test-only-model.mp4' };
  let html = render();
  assert.match(html, /Hear the sounds/); assert.ok(!html.includes('Watch and say') && !html.includes('en-application-scene'));
  assert.match(html, new RegExp(`en-review-reading-word">${word}<`));
  progress = snapshots.find(p => p.application.step === start + 1); html = render();
  assert.ok(html.includes('Watch and say') && !html.includes('<video') && !html.includes('<iframe'), 'Optional model only after first attempt, never preloaded');
  progress = snapshots.find(p => p.application.step === start + 2); assert.ok(render().includes(`en-application-scene is-${word}`));
  progress = snapshots.find(p => p.application.step === start + 3); html = render();
  assert.ok(!html.includes('en-application-scene') && !html.includes('en-review-reading-word') && !html.includes('is-hint'));
  assert.equal((html.match(/aria-label="Choose /g) || []).length, 4);
  assert.doesNotMatch(html, new RegExp(`>${word}<`), 'Spelling hides the printed answer');
  delete englishPronunciationVideos[word];
}
async function checkOpening() {
  const audioModule = require('../components/english/useEnglishAudio.ts');
  const originalAudio = audioModule.default, originalEffect = React.useEffect;
  const originalDocument = global.document, originalWindow = global.window;
  const played = [];
  let effects;
  audioModule.default = () => ({ sequence: async cues => { played.push(cues.map(c => c.id)); return true; }, stop() {}, playing: false, notice: '', blocked: false });
  global.document = { hidden: false, addEventListener() {}, removeEventListener() {} };
  global.window = { location: { href: 'http://localhost:3100/english/learn/more-words' }, scrollTo() {}, addEventListener() {}, removeEventListener() {} };
  const mount = step => {
    progress = snapshots.find(p => p.application.step === step);
    effects = []; React.useEffect = fn => effects.push(fn);
    try { render(); } finally { React.useEffect = originalEffect; }
    return () => { const cleanup = effects.map(fn => fn()); return () => cleanup.forEach(fn => fn?.()); };
  };
  const tick = () => new Promise(resolve => setTimeout(resolve, 10));
  try {
    for (const step of [0, 5]) {
      played.length = 0;
      const setup = mount(step); setup()(); const cleanup = setup(); await tick();
      assert.deepEqual(played, [['discover-read']], 'Strict Mode entry gives a direction once, with no answer'); cleanup();
    }
    for (const [step, cue] of [[3, 'discover-build'], [4, 'discover-read-back']]) {
      played.length = 0; const cleanup = mount(step)(); await tick();
      assert.deepEqual(played, [[cue]], 'Reload provides context without automatically saying the answer'); cleanup();
    }
    played.length = 0; mount(0)()(); await tick(); assert.equal(played.length, 0, 'Leaving cancels pending opening narration');
  } finally {
    audioModule.default = originalAudio; React.useEffect = originalEffect;
    global.document = originalDocument; global.window = originalWindow;
  }
}
checkOpening().then(() => console.log('Passed: 43-topic progression, reading and spelling gates, recovery/undo/reload, separate help records, state validation, replay preservation, picture/answer hiding, optional clip timing, Strict Mode entry and leave cancellation.')).catch(error => { console.error(error); process.exitCode = 1; });
