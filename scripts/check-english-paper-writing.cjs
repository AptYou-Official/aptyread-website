/* Paper practice models movement; only explicit writing tries earn stars. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return resolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const { createPaperWriting } = require('../lib/english-paper-writing.ts');
const { englishLessons, englishPaperWritingVideos } = require('../lib/english-curriculum.ts');
const tick = () => new Promise(resolve => setImmediate(resolve));
function setup(letter = 'S') {
  const events = [], pending = [];
  let defer = false, blocked = false, narration = true;
  const session = createPaperWriting(letter, {
    say: id => { events.push(id); return defer ? new Promise(resolve => pending.push(resolve)) : Promise.resolve(narration); },
    play: async () => { events.push('video'); if (blocked) throw Error('Playback blocked'); },
    stop: () => events.push('stop'), changed: () => {},
  });
  return { session, events, pending, defer: () => { defer = true; }, block: () => { blocked = true; }, noVoice: () => { narration = false; } };
}
async function main() {
  for (const letter of ['S', 's', 'A', 'a', 'T', 't']) {
    const t = setup(letter), s = t.session;
    s.finishTry(); assert.equal(s.snapshot().turns, 0, 'Cannot earn a star before a model');
    await s.watch();
    assert.ok(t.events.indexOf('paper-watch') < t.events.indexOf('video'), 'Watch precedes the silent model');
    assert.equal(s.snapshot().phase, 'watch');
    s.videoPlaying(); s.tryNow(); assert.equal(s.snapshot().phase, 'watch', 'First model is shown completely');
    s.videoEnded(); assert.equal(s.snapshot().phase, 'try');
    assert.equal(t.events.at(-1), `paper-write-${letter === letter.toUpperCase() ? 'big' : 'small'}-${letter.toLowerCase()}`, 'Each letter and case gets its own writing instruction');
    assert.equal(s.snapshot().turns, 0, 'Watching earns no star');
    s.showModel(); await tick(); s.videoPlaying(); s.videoEnded();
    assert.equal(s.snapshot().turns, 0, 'Replay earns no star');
    s.finishTry(); s.finishTry(); assert.equal(s.snapshot().turns, 1, 'Rapid duplicate taps count once');
    s.nextTry(); assert.equal(s.snapshot().phase, 'try');
    assert.equal(s.snapshot().covered, false);
    assert.equal(t.events.at(-1), 'paper-one-more');
    s.pause(); s.pause(); s.videoEnded(); s.finishTry();
    assert.equal(s.snapshot().turns, 1, 'Pause and late video events never count a try');
    s.resume(); assert.equal(s.snapshot().phase, 'try', 'Quiet writing resumes without a forced replay');
    s.finishTry(); s.nextTry();
    assert.equal(s.snapshot().covered, true, 'The third try offers recall with help available');
    s.showModel(); await tick(); s.videoPlaying();
    assert.equal(s.snapshot().covered, false); assert.equal(s.snapshot().turns, 2);
    s.tryNow(); assert.equal(s.snapshot().phase, 'try', 'A previously seen replay can be stopped for writing');
    s.finishTry(); assert.equal(s.snapshot().phase, 'complete');
    s.finishTry(); s.nextTry(); s.showModel(); await s.watch();
    assert.equal(s.snapshot().turns, 3); s.dispose();
  }
  const stale = setup(); stale.defer();
  const opening = stale.session.watch(); stale.session.pause(); stale.pending.shift()(true); await opening;
  assert.ok(!stale.events.includes('video'), 'A paused narration cannot restart the model');
  stale.session.resume(); await tick(); assert.equal(stale.session.snapshot().phase, 'watch');
  stale.session.videoPlaying(); stale.session.dispose(); stale.session.videoEnded();
  assert.equal(stale.session.snapshot().turns, 0);
  const failed = setup(); failed.block(); await failed.session.watch();
  assert.equal(failed.session.snapshot().phase, 'blocked');
  failed.session.finishTry(); assert.equal(failed.session.snapshot().turns, 0);
  failed.session.usePicture(); assert.equal(failed.session.snapshot().pictureOnly, true);
  assert.equal(failed.session.snapshot().phase, 'try'); failed.session.finishTry();
  assert.equal(failed.session.snapshot().turns, 1, 'Offline picture guidance still requires an explicit try'); failed.session.dispose();
  const noVoice = setup(); noVoice.noVoice(); await noVoice.session.watch();
  assert.equal(noVoice.session.snapshot().phase, 'watch', 'Missing TTS never blocks the muted clip'); noVoice.session.dispose();
  const unmounted = setup(); unmounted.defer();
  const awaiting = unmounted.session.watch(); unmounted.session.dispose(); unmounted.pending.shift()(true); await awaiting;
  assert.ok(!unmounted.events.includes('video'), 'Unmount cancels pending media');
  const React = require('react'), { renderToStaticMarkup } = require('react-dom/server');
  const WritingPractice = require('../components/english/WritingPractice.tsx').default;
  const PaperWriting = require('../components/english/PaperWriting.tsx').default;
  const TracePad = require('../components/english/TracePad.tsx').default;
  const guides = require('../lib/english-tracing.json');
  for (const lesson of englishLessons.filter(l => l.id.startsWith('explore-'))) {
  assert.equal(lesson.activities.length, 6, 'Paper is an option within the same sequential topic');
  for (const activity of lesson.activities.filter(a => a.kind === 'write')) {
    const html = renderToStaticMarkup(React.createElement(WritingPractice, { activity, onComplete() {} }));
    assert.ok(html.includes('Trace on screen') && html.includes('Write on paper'));
    const letter = activity.uppercase ? activity.letter.toUpperCase() : activity.letter;
    assert.ok(html.includes(`<strong>${letter}</strong>`), 'Both writing choices show the correct letter');
    const paper = renderToStaticMarkup(React.createElement(PaperWriting, { letter: activity.letter, uppercase: !!activity.uppercase, suspended: false, onBack() {}, onComplete() {} }));
    const clip = englishPaperWritingVideos[letter];
    assert.equal(clip.src, `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-writing-video-clips/draw-${activity.uppercase ? 'big' : 'small'}-${activity.letter}.mp4`, 'Every paper model uses the shared writing folder');
    assert.ok(paper.includes(clip.src)); assert.ok(paper.includes('preload="none"') && paper.includes('muted=""'));
    assert.ok(paper.includes('0 of 3 practice stars earned'));
    assert.ok(!paper.includes('I tried it</button>'), 'The initial dock invites watching rather than instant completion');
    assert.ok(fs.existsSync(path.join(__dirname, '../public', clip.poster)));
    const trace = renderToStaticMarkup(React.createElement(TracePad, { letter, onComplete() {}, onListen() {} }));
    assert.ok(trace.includes(guides[letter].path), 'All six letters have real tracing paths, not a text fallback');
    assert.equal(guides[letter].path.match(/M/g).length, { S: 1, s: 1, A: 3, a: 2, T: 2, t: 2 }[letter], 'Pen lifts are retained for the sequential demonstration');
    assert.ok(paper.includes(`how to write ${activity.uppercase ? 'capital' : 'lowercase'} ${letter}`));
  }
  }
  console.log('Passed: all six letter/case models and instructions, tracing paths and pen lifts, narration order, three-try rewards, pause/resume, stale events, media fallback and the six-topic lesson structure.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
