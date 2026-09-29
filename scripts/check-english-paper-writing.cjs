/* Writing practice: both modes stay available, one try is enough, celebration is not a score. */
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
  for (const letter of ['S', 's', 'A', 'a', 'T', 't', 'P', 'p', 'I', 'i', 'N', 'n']) {
    const t = setup(letter), s = t.session;
    s.finishTry(); assert.equal(s.snapshot().turns, 0, 'Cannot finish before watching the model');
    await s.watch();
    assert.ok(t.events.indexOf('paper-watch') < t.events.indexOf('video'), 'Watch precedes the silent model');
    assert.equal(s.snapshot().phase, 'watch');
    s.videoPlaying(); s.tryNow(); assert.equal(s.snapshot().phase, 'watch', 'The model must finish before writing');
    s.videoEnded(); assert.equal(s.snapshot().phase, 'try');
    assert.equal(t.events.at(-1), `paper-write-${letter === letter.toUpperCase() ? 'big' : 'small'}-${letter.toLowerCase()}`);
    s.finishTry(); assert.equal(s.snapshot().turns, 1, 'One explicit writing attempt is enough');
    assert.equal(s.snapshot().phase, 'complete');
    s.finishTry(); assert.equal(s.snapshot().turns, 1, 'Duplicate completion taps do not add attempts');
    s.tryAgain(); assert.equal(s.snapshot().phase, 'ready', 'Extra practice is optional');
    await s.watch(); s.videoEnded(); s.finishTry(); assert.equal(s.snapshot().turns, 2, 'A child may practise again without a score');
    s.dispose();
  }

  const paused = setup(), p = paused.session;
  await p.watch(); p.videoPlaying(); p.pause(); assert.equal(p.snapshot().phase, 'paused');
  p.videoEnded(); assert.equal(p.snapshot().turns, 0, 'Late video events never count a try');
  p.resume(); assert.equal(p.snapshot().phase, 'watch'); p.videoEnded(); p.finishTry(); assert.equal(p.snapshot().phase, 'complete'); p.dispose();

  const failed = setup(); failed.block(); await failed.session.watch();
  assert.equal(failed.session.snapshot().phase, 'blocked');
  failed.session.finishTry(); assert.equal(failed.session.snapshot().turns, 0);
  failed.session.usePicture(); assert.equal(failed.session.snapshot().pictureOnly, true);
  failed.session.videoEnded(); failed.session.finishTry(); assert.equal(failed.session.snapshot().turns, 1, 'Picture fallback still permits one explicit try'); failed.session.dispose();

  const stale = setup(); stale.defer();
  const opening = stale.session.watch(); stale.session.pause(); stale.pending.shift()(true); await opening;
  assert.ok(!stale.events.includes('video'), 'A paused narration cannot restart the model'); stale.session.dispose();

  const React = require('react'), { renderToStaticMarkup } = require('react-dom/server');
  const WritingPractice = require('../components/english/WritingPractice.tsx').default;
  const PaperWriting = require('../components/english/PaperWriting.tsx').default;
  const WritingCelebration = require('../components/english/WritingCelebration.tsx').default;
  const TracePad = require('../components/english/TracePad.tsx').default;
  const guides = require('../lib/english-tracing.json');
  for (const sourceFile of ['WritingPractice.tsx', 'PaperWriting.tsx', 'WritingCelebration.tsx', 'TracePad.tsx']) {
    const source = fs.readFileSync(path.join(__dirname, '../components/english', sourceFile), 'utf8');
    assert.ok(!source.includes('You made ${displayLabel}!'), `${sourceFile} must not promise accurate formation`);
  }
  for (const lesson of englishLessons.filter(l => l.id.startsWith('explore-'))) {
    assert.equal(lesson.activities.length, 6, 'Paper remains an option within the same sequential topic');
    for (const activity of lesson.activities.filter(a => a.kind === 'write')) {
      const html = renderToStaticMarkup(React.createElement(WritingPractice, { activity, onComplete() {} }));
      assert.ok(html.includes('Trace on screen') && html.includes('Write on paper'));
      const letter = activity.uppercase ? activity.letter.toUpperCase() : activity.letter;
      assert.ok(html.includes(`<strong>${letter}</strong>`), 'Both writing choices show the correct letter');
      const paper = renderToStaticMarkup(React.createElement(PaperWriting, { letter: activity.letter, uppercase: !!activity.uppercase, suspended: false, onBack() {}, onComplete() {} }));
      const clip = englishPaperWritingVideos[letter];
      assert.equal(clip.src, `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-writing-video-clips/draw-${activity.uppercase ? 'big' : 'small'}-${activity.letter}.mp4`);
      assert.ok(paper.includes(clip.src)); assert.ok(paper.includes('preload="none"') && paper.includes('muted=""'));
      assert.ok(!paper.includes('practice stars'), 'Writing has no score display');
      assert.ok(!paper.includes('I tried it</button>'), 'The initial dock invites watching');
      assert.ok(fs.existsSync(path.join(__dirname, '../public', clip.poster)));
      const trace = renderToStaticMarkup(React.createElement(TracePad, { letter, onComplete() {}, onListen() {} }));
      assert.ok(trace.includes(guides[letter].path), 'All letter forms have real tracing paths');
      assert.equal(guides[letter].path.match(/M/g).length, { S: 1, s: 1, A: 3, a: 2, T: 2, t: 2, P: 2, p: 2, I: 3, i: 2, N: 3, n: 2 }[letter]);
      assert.ok(paper.includes(`how to write ${activity.uppercase ? 'capital' : 'lowercase'} ${letter}`));
      assert.ok(activity.title.includes(activity.uppercase ? 'My Big' : 'My Small'));
    }
  }
  const celebration = renderToStaticMarkup(React.createElement(WritingCelebration, { label: 'Big S', letter: 'S' }));
  assert.ok(celebration.includes('Nice try!') && celebration.includes('You practised Big S.') && celebration.includes('Apty is celebrating with you'));
  assert.ok(!celebration.includes('You made Big S!'), 'Writing celebration must not claim handwriting accuracy');
  console.log('Passed: child-friendly writing choices, one required attempt, optional retries, paper fallback, gentle trace guidance, effort-based celebration and no writing score.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
