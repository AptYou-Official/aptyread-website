/* Explore-letter teaching, listening, help and interrupted audio. No learner storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return resolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const { createLetterCases, casePracticeStars } = require('../lib/english-letter-cases.ts');
const { englishNarration } = require('../lib/english-narration.ts');
const tick = () => new Promise(resolve => setImmediate(resolve));
function setup(letter, random = () => .25) {
  const sounds = [], cues = [], pending = [];
  let works = true, voice = true, deferred = false;
  const session = createLetterCases(letter, {
    say: async id => { assert.ok(englishNarration[id], `Missing narration ${id}`); cues.push(id); return voice; },
    sound: value => { sounds.push(value); return deferred ? new Promise(resolve => pending.push(resolve)) : Promise.resolve(works); },
    stop() {}, changed() {},
  }, random);
  return { session, sounds, cues, pending, block: () => works = false, allow: () => works = true, noVoice: () => voice = false, defer: () => deferred = true };
}
async function guide(t, letter) {
  const s = t.session;
  await s.next(); await s.choose(letter); await s.touch(letter);
  assert.equal(s.snapshot().guideStep, 0, 'Cannot skip either guided form');
  await s.start(); await s.touch(letter.toUpperCase());
  assert.equal(s.snapshot().guideStep, 1);
  await s.touch(letter.toUpperCase()); assert.equal(s.snapshot().guideStep, 1, 'Repeated taps do not advance');
  await s.touch(letter); assert.equal(s.snapshot().guideStep, 2);
  assert.equal(s.snapshot().phase, 'guide', 'Child chooses when to start listening');
  assert.equal(casePracticeStars(s.snapshot()), 0, 'Stars count listening turns only');
  await s.next(); assert.equal(s.snapshot().phase, 'choose');
}
async function main() {
  for (const letter of ['s', 'a', 't']) {
    const t = setup(letter), s = t.session;
    const allowed = letter === 's' ? 'Ssat' : letter === 'a' ? 'SA sat'.replace(/ /g, '') : 'SATsat';
    const rounds = s.snapshot().rounds;
    assert.equal(rounds.length, 4);
    assert.deepEqual([...new Set(rounds.map(r => r.target.toLowerCase()))].sort(), ['a', 's', 't'], 'Questions require listening to mixed sounds');
    assert.ok(rounds.some(r => r.target === letter) && rounds.some(r => r.target === letter.toUpperCase()), 'Both new forms have a listening turn');
    for (const r of rounds) {
      assert.ok(r.options.every(v => allowed.includes(v)), 'Never introduce an untaught capital as a distractor');
      assert.equal(r.options.filter(v => v.toLowerCase() === r.target.toLowerCase()).length, 1, 'One valid sound answer');
      assert.equal(new Set(r.options).size, 3);
    }
    await guide(t, letter);
    assert.deepEqual(t.cues.slice(0, 3), [`cases-big-${letter}`, `cases-small-${letter}`, 'cases-same-sound']);
    assert.deepEqual(t.sounds.slice(0, 2), [letter, letter], 'Both forms play the real phoneme');
    for (let i = 0; i < 4; i++) {
      const before = s.snapshot(), r = before.rounds[i];
      assert.equal(casePracticeStars(before), i);
      assert.equal(before.heard, true);
      await s.listen(); assert.deepEqual(s.snapshot().rounds[i].options, r.options, 'Replay keeps positions stable');
      await s.choose(r.target);
      assert.equal(s.snapshot().phase, 'matched');
      assert.equal(casePracticeStars(s.snapshot()), i + 1);
      await s.choose(r.target); assert.equal(s.snapshot().index, i, 'No automatic advancement or double-tap skipping');
      await s.next();
    }
    assert.equal(s.snapshot().phase, 'complete'); assert.equal(casePracticeStars(s.snapshot()), 4);
    assert.ok(t.sounds.every(value => ['s', 'a', 't'].includes(value)), 'No TTS phonemes');
    s.dispose();
  }

  const helped = setup('t'), h = helped.session;
  await guide(helped, 't');
  const first = h.snapshot().rounds[0], wrong = first.options.find(v => v !== first.target);
  await h.choose(wrong); assert.equal(h.snapshot().retry, true); assert.equal(h.snapshot().phase, 'choose');
  await h.choose(wrong); assert.equal(h.snapshot().phase, 'help');
  await h.choose(first.target); assert.equal(h.snapshot().phase, 'help', 'No copying while the model is visible');
  await h.next(); assert.equal(h.snapshot().phase, 'choose'); assert.equal(h.snapshot().highlight, null);
  await h.choose(first.target); await h.next();
  for (let i = 1; i < 4; i++) {
    await h.help(); await h.next(); await h.choose(h.snapshot().rounds[i].target); await h.next();
  }
  assert.equal(h.snapshot().index, 4); assert.equal(h.snapshot().rounds.length, 5);
  assert.equal(casePracticeStars(h.snapshot()), 4, 'Extra review cannot inflate rewards');
  assert.equal(h.snapshot().highlight, null, 'A helped form returns without an answer cue');
  await h.help(); await h.next(); await h.choose(h.snapshot().rounds[4].target); await h.next();
  assert.equal(h.snapshot().phase, 'complete', 'Help cannot create endless review'); h.dispose();

  const blocked = setup('a'), b = blocked.session;
  blocked.block(); await b.touch('A'); assert.equal(b.snapshot().guideStep, 0, 'Failed guided audio is recoverable');
  blocked.allow(); blocked.noVoice(); await guide(blocked, 'a');
  await b.choose(b.snapshot().rounds[0].target); blocked.block(); await b.next();
  assert.equal(b.snapshot().heard, false);
  await b.choose(b.snapshot().rounds[1].target); assert.equal(b.snapshot().phase, 'choose', 'Cannot guess through unheard audio');
  blocked.allow(); await b.listen(); assert.equal(b.snapshot().heard, true, 'Phonemes work even without TTS'); b.dispose();

  const stale = setup('s'), p = stale.session;
  stale.defer(); const touch = p.touch('S');
  await p.touch('S'); assert.equal(stale.pending.length, 1, 'Only one sound at a time');
  p.stop(); stale.pending.shift()(true); await touch;
  assert.equal(p.snapshot().guideStep, 0, 'Background/overlay pause cancels stale advancement');
  const touch2 = p.touch('S'); stale.pending.shift()(true); await touch2;
  const touch3 = p.touch('s'); stale.pending.shift()(true); await touch3;
  const listen = p.next(); await tick(); p.stop(); stale.pending.shift()(true); await listen;
  assert.equal(p.snapshot().heard, false);
  const replay = p.listen(); p.dispose(); stale.pending.shift()(true); await replay;
  assert.equal(p.snapshot().heard, false, 'Disposed media cannot change a new topic');

  const orders = new Set();
  for (const value of [.01, .3, .7, .99]) {
    const t = setup('s', () => value); orders.add(t.session.snapshot().rounds[0].options.join('')); t.session.dispose();
  }
  assert.ok(orders.size > 1, 'Position is not the answer cue');
  const React = require('react'), { renderToStaticMarkup } = require('react-dom/server');
  const LetterCases = require('../components/english/LetterCases.tsx').default;
  for (const letter of ['s', 'a', 't']) {
    const html = renderToStaticMarkup(React.createElement(LetterCases, { letter, onComplete() {} }));
    assert.ok(html.includes(`Tap big ${letter.toUpperCase()}.`));
    assert.ok(html.includes(`aria-label="Tap small ${letter}"`));
    assert.ok(!html.includes('Choose the letter for the sound'), 'Guided introduction is not a test');
    assert.ok(html.includes('Your next action'));
  }
  console.log('Passed: all three case lessons, taught-only choices, both forms, mixed sounds, heard-audio gating, recoverable help, bounded revisit, four practice stars, pause/dispose races and guided rendering.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
