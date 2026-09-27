/* Guided word transitions and rendered controls; no learner storage is touched. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return originalResolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const { freshGuidedWord, guidedWordPrompt, placeGuidedLetter, tryReadingWord } = require('../lib/english-word.ts');
const { emptyProgress, readEnglishProgress } = require('../lib/english-progress.ts');
const { englishPronunciationVideos } = require('../lib/english-curriculum.ts');

for (const word of ['at', 'sat']) {
  let saved = freshGuidedWord();
  assert.deepEqual(guidedWordPrompt(word, '', true).map(c => c.id), [`build-intro-${word}`, 'build-tap', `sound-${word[0]}`]);
  assert.equal(placeGuidedLetter(word, saved, 't'), saved, 'A future letter cannot change the ordered word');
  for (const letter of word) {
    const cue = guidedWordPrompt(word, saved.built).at(-1);
    assert.equal(cue.id, `sound-${letter}`);
    assert.equal(cue.narration, undefined, 'Tap prompts use the real phoneme, never a TTS letter name');
    saved = placeGuidedLetter(word, saved, letter);
    assert.deepEqual(readEnglishProgress(JSON.stringify({ ...emptyProgress(), words: { [word]: saved } })).words[word], saved, 'A partial guided word resumes after reload');
  }
  assert.equal(saved.built, word);
  assert.deepEqual(guidedWordPrompt(word, saved.built).map(c => c.id), ['build-ready']);
  assert.equal(tryReadingWord(saved), saved, 'Building alone is not a reading attempt');
  saved = { ...saved, stage: 1 };
  saved = tryReadingWord(saved); assert.equal(saved.reads, 1);
  saved = tryReadingWord(saved); assert.equal(saved.reads, 2);
  assert.equal(tryReadingWord(saved), saved, 'No third reading try is counted');
}
const legacy = { stage: 0, built: 's', reads: 0, answers: {}, mode: 'independent' };
assert.equal(placeGuidedLetter('sat', legacy, 'a').mode, 'guided');
assert.equal(placeGuidedLetter('sat', legacy, 'a').built, 'sa', 'An old independent partial build keeps its letters');

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const provider = require('../components/english/EnglishProvider.tsx');
let progress = emptyProgress();
provider.useEnglish = () => ({ progress, update() {} });
const WordBuilder = require('../components/english/WordBuilder.tsx').default;
const render = word => renderToStaticMarkup(React.createElement(WordBuilder, { word, onComplete() {} }));
for (const word of ['at', 'sat']) {
  progress = emptyProgress();
  const originalVideo = englishPronunciationVideos[word];
  let html = render(word);
  assert.ok(!html.includes('Build on my own') && !html.includes('Let’s start'), 'No opening or mode-selection screen');
  assert.deepEqual([...html.matchAll(/aria-label="Add (\w)"/g)].map(m => m[1]), [...word], 'Tiles follow the word order');
  assert.equal((html.match(/<button[^>]*aria-current="step"/g) || []).length, 1, 'Only the current letter is active');
  assert.match(html, /class="en-word-dock"/, 'Main action uses the mobile dock');
  assert.ok(!html.includes('Watch and say'), 'No empty video placeholder');
  englishPronunciationVideos[word] = { kind: 'file', src: '/test-only-model.mp4' };
  progress.words[word] = { ...freshGuidedWord(), stage: 1, built: word };
  assert.ok(!render(word).includes('en-word-model-open'), 'The child gets the first reading try before the video model');
  progress.words[word].reads = 1;
  html = render(word);
  assert.ok(html.includes('Watch and say') && html.includes('I tried again'));
  assert.ok(!html.includes('<video') && !html.includes('<iframe'), 'A reading try does not auto-play or load the optional clip');
  progress.words[word].reads = 2;
  assert.ok(render(word).includes('See what it means'), 'Two tries can proceed without watching a video');
  englishPronunciationVideos[word] = originalVideo;
}
// Run the component's real mount effects with isolated media and document stubs.
// This catches a missing entry trigger, which a pure cue-order test cannot find.
async function checkOpeningEffects() {
  const audioModule = require('../components/english/useEnglishAudio.ts');
  const originalAudio = audioModule.default;
  const originalEffect = React.useEffect;
  const originalDocument = global.document;
  const played = [], listeners = new Set();
  let effects;
  let blocked = false;
  const sequence = async cues => { played.push(cues.map(cue => cue.id)); return true; };
  audioModule.default = () => ({ sequence, play() {}, stop() {}, playing: false, blocked, notice: blocked ? 'Tap the speaker to listen.' : '' });
  global.document = { hidden: false, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  const mount = (word, saved) => {
    progress = { ...emptyProgress(), words: saved ? { [word]: saved } : {} };
    effects = [];
    React.useEffect = fn => effects.push(fn);
    try { render(word); } finally { React.useEffect = originalEffect; }
    return () => { const cleanups = effects.map(effect => effect()); return () => cleanups.forEach(cleanup => cleanup?.()); };
  };
  const tick = () => new Promise(resolve => setTimeout(resolve, 10));
  try {
    for (const word of ['at', 'sat']) {
      played.length = 0;
      const setup = mount(word);
      const rehearsalCleanup = setup(); rehearsalCleanup();
      const cleanup = setup(); await tick();
      assert.deepEqual(played, [[`build-intro-${word}`, 'build-tap', `sound-${word[0]}`]], 'Entry speaks the introduction and first tap exactly once under Strict Mode');
      cleanup();
    }
    played.length = 0;
    const leaving = mount('sat')(); leaving(); await tick();
    assert.equal(played.length, 0, 'Leaving before playback cancels the opening');
    const resumed = mount('sat', { ...freshGuidedWord(), built: 's' })(); await tick();
    assert.deepEqual(played, [['build-next-tap', 'sound-a']], 'A partial word prompts the next letter without repeating the introduction');
    resumed(); played.length = 0;
    const reading = mount('sat', { ...freshGuidedWord(), stage: 1, built: 'sat' })(); await tick();
    assert.equal(played.length, 0, 'Resuming a reading turn does not reveal the answer automatically');
    reading();
    global.document.hidden = true;
    const background = mount('at')(); await tick();
    assert.equal(played.length, 0, 'A background activity waits until visible');
    global.document.hidden = false;
    [...listeners].forEach(fn => fn()); await tick();
    assert.deepEqual(played, [['build-intro-at', 'build-tap', 'sound-a']]);
    background(); assert.equal(listeners.size, 0);
    blocked = true; progress = emptyProgress();
    assert.match(render('sat'), /Tap to listen/, 'Autoplay rejection offers a same-screen replay button');
    console.log('Passed: guided builds, real phonemes, resume, reading/video gates, opening on entry once, Strict Mode cleanup, hidden-page deferral and autoplay fallback.');
  } finally {
    React.useEffect = originalEffect; audioModule.default = originalAudio; global.document = originalDocument;
  }
}
checkOpeningEffects().catch(error => { console.error(error); process.exitCode = 1; });
