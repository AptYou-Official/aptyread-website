/* Lesson 5 progression, audio scaffolds, cumulative listening and isolated review. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { englishLessons, englishVideos, englishMedia, englishSoundPracticeVideos } = require('../lib/english-curriculum.ts');
const { emptyProgress, englishAccess, completeEnglishActivity, readEnglishProgress, updateFirstWords, enterEnglishActivity, updateProgramme } = require('../lib/english-progress.ts');
const { getProgrammeActivity } = require('../lib/english-programme.ts');
const { programmeSteps, freshProgrammeState, isProgrammeStepReady } = require('../lib/english-programme-progress.ts');
const { createLetterLink, initialLetterLink, linkLetters, letterLinkReward } = require('../lib/english-letter-link.ts');
const { freshGuidedWord, placeGuidedLetter, guidedWordPrompt, tryReadingWord } = require('../lib/english-word.ts');
const { readFirstWords, reviewReadingWord } = require('../lib/english-review.ts');
const { englishNarration } = require('../lib/english-narration.ts');
const lesson = englishLessons.find(l => l.id === 'more-words');
const prior = englishLessons[0].activities.map(a => a.id);
const opening = { ...emptyProgress(), completed: prior };
const oldReview = { stage: 6, heard: ['at', 'sat'], matched: ['at', 'sat'], read: ['at', 'sat'], questionOrders: [true, false], readAtFirst: true };

async function main() {
  assert.equal(lesson.id, 'more-words');
  assert.equal(lesson.activities.length, 17);
  assert.equal(prior.length, 12, 'PIN follows the integrated SAT lesson without compulsory formation topics');
  assert.equal(englishAccess(opening).next.activity.id, 'pin-remember-sat');
  assert.equal(englishAccess({ ...opening, completed: prior.slice(0, -1) }).lessons.has(lesson.id), false);
  let progress = opening;
  for (const item of lesson.activities.slice(0, lesson.activities.findIndex(a => a.id === 'more-little-words'))) {
    assert.equal(englishAccess(progress).next.activity.id, item.id);
    if (item.kind === 'practice') {
      assert.equal(completeEnglishActivity(progress, item.id), progress);
      const steps = programmeSteps(getProgrammeActivity(item.id));
      for (let turns = 0; !progress.programme?.[item.id]?.complete; turns++) {
        assert.ok(turns < 100);
        const state = progress.programme?.[item.id] || freshProgrammeState(steps[0]), step = steps[state.task];
        const action = isProgrammeStepReady(step, state) ? { type: 'next' } : !state.heard && ['sound', 'build'].includes(step.kind) ? { type: 'heard' } : state.phase === 0 ? { type: 'continue' } : { type: 'choose', value: step.kind === 'sound' ? step.letter : step.kind === 'build' ? step.word[state.built.length] : step.answer };
        progress = updateProgramme(progress, item.id, action, '2026-09-30T12:00:00Z');
      }
    } else progress = completeEnglishActivity(progress, item.id);
    assert.deepEqual(readEnglishProgress(JSON.stringify(progress)), progress);
  }
  assert.deepEqual(progress.audioIntroductions, ['meet-p', 'meet-i', 'meet-n']);
  assert.equal(completeEnglishActivity(progress, 'more-little-words'), progress);
  const withOldReview = { ...progress, firstWords: oldReview };
  assert.equal(completeEnglishActivity(withOldReview, 'more-little-words'), withOldReview, 'Lesson 1 cannot finish Lesson 5');

  for (const letter of ['p', 'i', 'n']) {
    assert.equal(englishVideos[`meet-${letter}`], undefined);
    assert.equal(lesson.activities.find(a => a.id === `meet-${letter}`).audioIntroduction, true);
    for (const file of [englishMedia[`sound-${letter}`], englishSoundPracticeVideos[letter].poster]) assert.ok(fs.statSync('public' + file).size > 1000);
    assert.ok(englishSoundPracticeVideos[letter].src.endsWith(`/sound-${letter}.mp4`));
    for (const r of initialLetterLink(letter).rounds) assert.equal(r.options.length, 3);
    const session = createLetterLink(letter, { say: async () => true, sound: async () => true, stop() {}, changed() {} }, () => .3);
    await session.start();
    let rounds = 0;
    while (session.snapshot().phase !== 'complete') {
      const state = session.snapshot(), r = state.rounds[state.index];
      assert.equal(r.options.length, 3);
      assert.equal(new Set(r.options).size, 3);
      assert.equal(r.options.filter(v => v === r.target).length, 1);
      assert.ok(r.options.every(v => linkLetters[letter].includes(v)));
      if (!state.heard) await session.listen();
      await session.choose(r.options.find(v => v !== r.target));
      assert.equal(session.snapshot().phase, 'choose', 'Wrong answer gives another try');
      await session.choose(r.target);
      session.next(); await Promise.resolve();
      rounds++; assert.ok(rounds <= 4);
    }
    assert.deepEqual(letterLinkReward(letter, session.snapshot()), { total: 4, earned: 4 });
    session.dispose();
  }
  assert.ok(!linkLetters.p.includes('i') && !linkLetters.p.includes('n'));
  assert.ok(!linkLetters.i.includes('n'));

  for (const word of ['pin', 'sit']) {
    let state = freshGuidedWord();
    assert.deepEqual(guidedWordPrompt(word, '', true).map(c => c.id), [`build-intro-${word}`, 'build-tap', `sound-${word[0]}`]);
    assert.equal(placeGuidedLetter(word, state, word[2]), state);
    for (const letter of word) {
      state = placeGuidedLetter(word, state, letter);
      assert.deepEqual(readEnglishProgress(JSON.stringify({ ...progress, words: { [word]: state } })).words[word], state);
    }
    state = tryReadingWord({ ...state, stage: 1 });
    state = tryReadingWord(state);
    assert.equal(state.reads, 2);
    assert.equal(readEnglishProgress(JSON.stringify({ ...progress, words: { [word]: { ...state, stage: 3, reads: 1 } } })).words[word], undefined);
    for (const prefix of ['word-', 'say-', 'say-again-', 'story-', 'celebrate-', 'review-find-', 'review-correct-']) assert.ok(englishNarration[prefix + word], prefix + word);
  }

  for (const readAtFirst of [true, false]) {
    let p = updateFirstWords(withOldReview, { type: 'start', questionOrders: [false, true], readAtFirst }, 'more');
    const act = action => { p = updateFirstWords(p, action, 'more'); assert.deepEqual(readEnglishProgress(JSON.stringify(p)), p); assert.deepEqual(p.firstWords, oldReview); };
    act({ type: 'hear', word: 'at' }); assert.deepEqual(p.moreWords.heard, []);
    act({ type: 'hear', word: 'pin' }); act({ type: 'next' }); assert.equal(p.moreWords.stage, 1);
    act({ type: 'hear', word: 'sit' }); act({ type: 'next' });
    act({ type: 'choose', word: 'sit' }); act({ type: 'next' }); assert.equal(p.moreWords.stage, 2);
    act({ type: 'choose', word: 'pin' }); act({ type: 'next' });
    act({ type: 'choose', word: 'sit' }); act({ type: 'next' });
    const first = reviewReadingWord(p.moreWords, 'more');
    act({ type: 'read' }); assert.notEqual(reviewReadingWord(p.moreWords, 'more'), first);
    assert.equal(p.completed.length, 26);
    act({ type: 'read' }); assert.equal(p.completed.length, 27);
    assert.equal(englishAccess(p).next.activity.id, 'more-words-with-apty');
    assert.equal(readFirstWords(p.moreWords), undefined, 'Review pairs cannot be substituted');
    const replay = enterEnglishActivity(p, lesson.id, 'more-little-words');
    assert.equal(replay.moreWords, undefined); assert.deepEqual(replay.firstWords, oldReview);
    assert.deepEqual(replay.completed, p.completed);
  }
  for (const id of ['review-read', 'review-read-next']) assert.doesNotMatch(englishNarration[id], /\b(pin|sit)\b/i);
  console.log('Passed: integrated PIN sequence, explicit audio-introduction provenance, six real sound assets, three-choice taught-only rounds/retries, pin/sit builds and reload, separate review storage/gates/orders/replay, 27 completed core topics unlock word application.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
