/* Visual uppercase/lowercase recognition, optional sound reinforcement and recovery. */
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

function setup(letter, random = () => .25) {
  const sounds = [], cues = [], pending = [];
  let soundWorks = true, voiceWorks = true, deferred = false;
  const session = createLetterCases(letter, {
    say: async id => { assert.ok(englishNarration[id], `Missing narration ${id}`); cues.push(id); return voiceWorks; },
    sound: value => { sounds.push(value); return deferred ? new Promise(resolve => pending.push(resolve)) : Promise.resolve(soundWorks); },
    stop() {}, changed() {},
  }, random);
  return { session, sounds, cues, pending, block: () => soundWorks = false, defer: () => deferred = true };
}

async function main() {
  for (const letter of ['s', 'a', 't', 'p', 'i', 'n']) {
    const t = setup(letter), s = t.session;
    const rounds = s.snapshot().rounds;
    assert.equal(s.snapshot().phase, 'choose');
    assert.deepEqual(rounds.map(round => round.target), [letter.toUpperCase(), letter]);
    assert.equal(rounds.length, 2);
    assert.ok(rounds.every(round => round.options.length === 3));
    assert.ok(rounds[0].options.every(value => value === value.toUpperCase()), 'Big-letter choices stay uppercase');
    assert.ok(rounds[1].options.every(value => value === value.toLowerCase()), 'Small-letter choices stay lowercase');
    assert.equal(casePracticeStars(s.snapshot()), 0);

    await s.start();
    assert.deepEqual(t.cues, [`cases-find-big-${letter}`]);
    assert.deepEqual(t.sounds, [], 'The sound is not required before the visual choice');
    await s.listen();
    assert.deepEqual(t.sounds, [letter], 'The speaker is optional sound reinforcement');

    const first = s.snapshot().rounds[0];
    const wrong = first.options.find(value => value !== first.target);
    await s.choose(wrong);
    assert.equal(s.snapshot().phase, 'choose');
    assert.equal(s.snapshot().retry, true);
    assert.equal(t.cues.at(-1), 'cases-retry');
    await s.choose(first.target);
    assert.equal(s.snapshot().phase, 'matched');
    assert.equal(casePracticeStars(s.snapshot()), 1);
    assert.deepEqual(t.sounds, [letter, letter], 'A correct tap confirms with the real letter sound');
    await s.choose(first.target);
    assert.equal(s.snapshot().index, 0, 'A matched round waits for Next');
    await s.next();
    assert.equal(s.snapshot().phase, 'choose');
    assert.equal(s.snapshot().index, 1);
    assert.equal(t.cues.at(-1), `cases-find-small-${letter}`);
    await s.choose(s.snapshot().rounds[1].target);
    assert.equal(s.snapshot().phase, 'matched');
    assert.equal(casePracticeStars(s.snapshot()), 2);
    await s.next();
    assert.equal(s.snapshot().phase, 'complete');
    assert.equal(casePracticeStars(s.snapshot()), 2);
    s.dispose();
  }

  const blocked = setup('s'), b = blocked.session;
  blocked.block();
  await b.start();
  await b.choose('S');
  assert.equal(b.snapshot().phase, 'matched', 'A visual match completes even when its optional sound fails');
  assert.ok(b.snapshot().notice);
  b.dispose();

  const stale = setup('s'), p = stale.session;
  stale.defer();
  const chosen = p.choose('S');
  assert.equal(p.snapshot().phase, 'matched');
  p.stop();
  stale.pending.shift()(true);
  await chosen;
  assert.equal(p.snapshot().busy, false, 'A stopped sound cannot leave the activity busy');
  p.dispose();

  const orders = new Set();
  for (const value of [.01, .3, .7, .99]) {
    const t = setup('s', () => value); orders.add(t.session.snapshot().rounds[0].options.join('')); t.session.dispose();
  }
  assert.ok(orders.size > 1, 'Choices are not permanently tied to one position');

  const React = require('react'), { renderToStaticMarkup } = require('react-dom/server');
  const LetterCases = require('../components/english/LetterCases.tsx').default;
  for (const letter of ['s', 'a', 't', 'p', 'i', 'n']) {
    const html = renderToStaticMarkup(React.createElement(LetterCases, { letter, onComplete() {} }));
    assert.ok(html.includes(`Find big ${letter.toUpperCase()}.`));
    assert.ok(html.includes(`aria-label="Choose big ${letter.toUpperCase()}"`));
    assert.ok(!html.includes('Help me'), 'The visual activity has no guided help loop');
    assert.ok(!html.includes('Choose the letter for the sound'), 'Sound is not the task');
    assert.ok(html.includes('0 of 2 practice stars earned'));
    assert.ok(html.includes('Your next action'));
  }
  console.log('Passed: visual big/small rounds, optional sound reinforcement, retry clarity, two-star progress, recovery and uncluttered rendering.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
