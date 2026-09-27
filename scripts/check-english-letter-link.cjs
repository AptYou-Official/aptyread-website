/* Listening pedagogy, recovery and progression. Does not touch learner storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return resolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const { createLetterLink, letterLinkReward, linkLetters } = require('../lib/english-letter-link.ts');
const tick = () => new Promise(resolve => setImmediate(resolve));
function setup(letter, deferred = false) {
  const sounds = [], cues = [], pending = [];
  let soundWorks = true, voiceWorks = true, stops = 0;
  const session = createLetterLink(letter, {
    say: id => { cues.push(id); return Promise.resolve(voiceWorks); },
    sound: value => { sounds.push(value); return deferred ? new Promise(resolve => pending.push(resolve)) : Promise.resolve(soundWorks); },
    stop: () => { stops++; }, changed: () => {},
  }, () => .25);
  return { session, sounds, cues, pending, stops: () => stops, blockSound: () => { soundWorks = false; }, allowSound: () => { soundWorks = true; }, noVoice: () => { voiceWorks = false; } };
}
async function main() {
  const guided = setup('s'), g = guided.session;
  assert.deepEqual(letterLinkReward('s', g.snapshot()), { total: 2, earned: 0 });
  g.next(); await g.touch();
  assert.equal(g.snapshot().phase, 'touch', 'Guided practice cannot finish without hearing and touching');
  await g.start();
  assert.deepEqual(guided.cues, ['link-listen', 'link-touch']);
  assert.deepEqual(guided.sounds, ['s']);
  await g.choose('a'); assert.equal(g.snapshot().phase, 'touch');
  await g.touch(); assert.equal(g.snapshot().phase, 'say');
  assert.deepEqual(letterLinkReward('s', g.snapshot()), { total: 2, earned: 1 });
  assert.equal(guided.cues.at(-1), 'link-your-turn');
  await g.listen(); assert.equal(g.snapshot().phase, 'say', 'Replay does not stand in for the child’s own try');
  assert.equal(letterLinkReward('s', g.snapshot()).earned, 1, 'Replaying does not earn another star');
  g.next(); assert.equal(g.snapshot().phase, 'complete');
  assert.deepEqual(letterLinkReward('s', g.snapshot()), { total: 2, earned: 2 }); g.dispose();

  for (const letter of ['a', 't']) {
    const t = setup(letter), s = t.session;
    const total = letter === 'a' ? 3 : 4;
    assert.deepEqual(letterLinkReward(letter, s.snapshot()), { total, earned: 0 });
    assert.deepEqual(s.snapshot().rounds.map(r => r.target), letter === 'a' ? ['a', 's', 'a'] : ['t', 's', 'a', 't']);
    for (const r of s.snapshot().rounds) assert.deepEqual([...r.options].sort(), [...linkLetters[letter]].sort(), 'No untaught distractors');
    await s.choose(s.snapshot().rounds[0].target);
    assert.equal(s.snapshot().phase, 'choose', 'No answer before the real sound has played');
    await s.start();
    while (s.snapshot().phase !== 'complete') {
      const before = s.snapshot();
      assert.equal(letterLinkReward(letter, before).earned, before.index);
      await s.choose(before.rounds[before.index].target);
      assert.deepEqual(letterLinkReward(letter, s.snapshot()), { total, earned: before.index + 1 });
      assert.equal(s.snapshot().phase, 'matched');
      assert.equal(s.snapshot().index, before.index, 'A correct response waits for Continue');
      await s.choose(before.rounds[before.index].target);
      assert.equal(s.snapshot().index, before.index, 'Rapid taps cannot skip rounds');
      s.next(); await tick();
    }
    assert.equal(s.snapshot().rounds.length, letter === 'a' ? 3 : 4);
    assert.deepEqual(letterLinkReward(letter, s.snapshot()), { total, earned: total });
    s.dispose();
  }

  const helped = setup('t'), h = helped.session;
  await h.start(); await h.choose('t'); h.next(); await tick();
  await h.choose('a');
  assert.equal(h.snapshot().assisted, false, 'First miss replays without giving the answer away');
  assert.equal(h.snapshot().index, 1);
  await h.choose('t');
  assert.deepEqual(letterLinkReward('t', h.snapshot()), { total: 4, earned: 1 }, 'Mistakes and help keep the earned star');
  assert.equal(h.snapshot().assisted, true, 'Two misses teach the connection');
  assert.equal(helped.cues.at(-1), 'link-help');
  assert.equal(h.snapshot().highlight, null, 'The model highlight clears before another choice');
  await h.choose('s');
  assert.equal(letterLinkReward('t', h.snapshot()).earned, 2, 'A supported match earns the same practice star');
  h.next(); await tick();
  await h.choose('a'); h.next(); await tick();
  await h.choose('t'); h.next(); await tick();
  assert.equal(h.snapshot().rounds.length, 5, 'A helped sound is revisited later');
  assert.deepEqual(letterLinkReward('t', h.snapshot()), { total: 4, earned: 4 }, 'Extra revisits never move the goal or remove stars');
  assert.deepEqual(h.snapshot().rounds[4], { target: 's', options: h.snapshot().rounds[4].options, revisit: true });
  assert.equal(h.snapshot().assisted, false);
  assert.equal(h.snapshot().highlight, null, 'Revisits begin without a visual answer');
  await h.help(); await h.choose('s'); h.next(); await tick();
  assert.deepEqual(letterLinkReward('t', h.snapshot()), { total: 4, earned: 4 }, 'Finishing a revisit does not add another star');
  assert.equal(h.snapshot().phase, 'complete', 'Repeated help cannot create an endless remedial loop'); h.dispose();

  const recovered = setup('a'), r = recovered.session;
  await r.start(); await r.help(); await r.choose('a'); r.next(); await tick();
  await r.choose('s'); r.next(); await tick();
  await r.choose('a'); r.next(); await tick();
  assert.equal(r.snapshot().phase, 'complete');
  assert.equal(r.snapshot().rounds.length, 3, 'A later unassisted base turn satisfies the revisit'); r.dispose();

  const blocked = setup('a'), b = blocked.session;
  blocked.blockSound(); await b.start(); await b.choose('a'); b.next();
  assert.equal(b.snapshot().heard, false); assert.equal(b.snapshot().phase, 'choose');
  blocked.allowSound(); blocked.noVoice(); await b.listen();
  assert.equal(b.snapshot().heard, true, 'Direct replay works without TTS');
  assert.equal(blocked.cues.at(-1), 'link-find-it', 'A first manual listen still gives the action prompt after its real sound');
  b.dispose();
  const noVoice = setup('a'); noVoice.noVoice(); await noVoice.session.start();
  assert.equal(noVoice.session.snapshot().heard, true, 'An unavailable instruction never replaces or prevents the real phoneme'); noVoice.session.dispose();

  const stale = setup('a', true), p = stale.session;
  const waiting = p.listen(); assert.equal(p.snapshot().busy, true);
  await p.choose('a'); assert.equal(p.snapshot().phase, 'choose');
  p.stop(); stale.pending.shift()(true); await waiting;
  assert.equal(p.snapshot().heard, false, 'A paused callback cannot mark an unheard cue as heard');
  const resumed = p.listen(); stale.pending.shift()(true); await resumed;
  assert.equal(p.snapshot().heard, true);
  const demonstration = p.help(); await tick();
  assert.equal(p.snapshot().highlight, 'a', 'Explicit help pairs the sound with its letter');
  p.dispose(); stale.pending.shift()(true); await demonstration;
  assert.ok(stale.stops() > 0);

  const orders = new Set();
  for (const value of [.01, .25, .6, .99]) {
    const sample = createLetterLink('t', { say: async () => true, sound: async () => true, stop() {}, changed() {} }, () => value);
    orders.add(sample.snapshot().rounds[0].options.join('')); sample.dispose();
  }
  assert.ok(orders.size > 1, 'Answers are not permanently tied to a screen position');

  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const LetterSoundLink = require('../components/english/LetterSoundLink.tsx').default;
  for (const letter of ['s', 'a', 't']) {
    const html = renderToStaticMarkup(React.createElement(LetterSoundLink, { letter, onComplete() {} }));
    const choices = [...html.matchAll(/aria-label="Choose ([sat])"/g)].map(m => m[1]);
    assert.deepEqual(choices, letter === 's' ? [] : linkLetters[letter]);
    assert.ok(!/Find [sat][.<]/.test(html), 'The listening heading never prints the answer');
    assert.ok(html.includes('Your next action'));
    const total = letter === 's' ? 2 : letter === 'a' ? 3 : 4;
    assert.ok(html.includes(`0 of ${total} practice stars earned`));
    assert.equal((html.match(/class="is-waiting"/g) || []).length, total);
  }
  const AchievementStars = require('../components/english/AchievementStars.tsx').default;
  for (const count of [2, 3, 4]) {
    const partial = renderToStaticMarkup(React.createElement(AchievementStars, { count, earned: 1, variant: 'progress' }));
    assert.equal((partial.match(/class="is-earned"/g) || []).length, 1);
    assert.equal((partial.match(/class="is-waiting"/g) || []).length, count - 1);
    const final = renderToStaticMarkup(React.createElement(AchievementStars, { count }));
    assert.equal((final.match(/class="is-earned"/g) || []).length, count);
    assert.ok(final.includes(`${count} stars for completed practice`));
  }
  const SoundPractice = require('../components/english/SoundPractice.tsx').default;
  assert.ok(renderToStaticMarkup(React.createElement(SoundPractice, { letter: 's', onComplete() {} })).includes('0 of 3 practice stars earned'));
  const WordCelebration = require('../components/english/WordCelebration.tsx').default;
  for (const word of ['at', 'sat', 'first-words']) {
    const html = renderToStaticMarkup(React.createElement(WordCelebration, { word, headingRef: { current: null }, onReplay() {} }));
    assert.ok(html.includes('Five celebration stars'));
    assert.equal((html.match(/class="is-earned"/g) || []).length, 5, 'Every reading completion keeps five appreciation stars');
    assert.ok(!html.includes('of 5'), 'Reading celebration is not a five-out-of-five score');
  }
  console.log('Passed: guided/listening flows, audio gating, bounded help and revisit, stable 2/3/4 practice rewards, sound-practice stars, five-star reading celebrations, recovery and rendered controls.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
