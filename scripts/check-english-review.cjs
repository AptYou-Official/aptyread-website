/* Progress migration and full review transitions; no browser automation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { englishLessons } = require('../lib/english-curriculum.ts');
const { englishNarration } = require('../lib/english-narration.ts');
const { freshFirstWords, nextFirstWords, readFirstWords, reviewReadingWord } = require('../lib/english-review.ts');
const { emptyProgress, readEnglishProgress, enterEnglishActivity, updateFirstWords, englishAccess, completeEnglishActivity } = require('../lib/english-progress.ts');

const beforeReview = { ...emptyProgress(), completed: englishLessons[0].activities.slice(0, englishLessons[0].activities.findIndex(a => a.id === 'our-first-words')).map(a => a.id) };
assert.equal(updateFirstWords(emptyProgress(), { type: 'start', questionOrders: [true, false], readAtFirst: true }).firstWords, undefined, 'A locked review cannot start');
assert.equal(completeEnglishActivity(beforeReview, 'our-first-words'), beforeReview, 'Listening alone cannot finish the lesson');

for (const readAtFirst of [true, false]) {
  let progress = updateFirstWords(beforeReview, { type: 'start', questionOrders: [false, true], readAtFirst });
  const act = action => {
    progress = updateFirstWords(progress, action);
    assert.deepEqual(readEnglishProgress(JSON.stringify(progress)), progress, 'Each substep and card order survive a reload');
  };
  act({ type: 'next' }); assert.equal(progress.firstWords.stage, 1);
  act({ type: 'hear', word: 'at' }); act({ type: 'hear', word: 'at' });
  assert.equal(progress.firstWords.heard.length, 1, 'Repeated taps do not count as both words');
  act({ type: 'next' }); assert.equal(progress.firstWords.stage, 1);
  act({ type: 'hear', word: 'sat' }); act({ type: 'next' });
  assert.equal(progress.firstWords.stage, 2);
  act({ type: 'choose', word: 'sat' }); act({ type: 'next' });
  assert.equal(progress.firstWords.stage, 2, 'An incorrect choice permits retry without advancement');
  act({ type: 'choose', word: 'at' }); act({ type: 'next' });
  assert.equal(progress.firstWords.stage, 3);
  act({ type: 'choose', word: 'at' }); act({ type: 'next' });
  assert.equal(progress.firstWords.stage, 3);
  act({ type: 'choose', word: 'sat' }); act({ type: 'next' });
  assert.equal(progress.firstWords.stage, 4);
  assert.equal(englishAccess(progress).activities.has('sat-use-words'), false, 'Matching both words does not unlock the next reading activity');
  const first = reviewReadingWord(progress.firstWords);
  act({ type: 'read' });
  assert.notEqual(reviewReadingWord(progress.firstWords), first, 'Each word gets its own reading turn');
  assert.equal(progress.firstWords.stage, 5);
  assert.equal(englishAccess(progress).activities.has('sat-use-words'), false);
  act({ type: 'read' });
  assert.equal(progress.firstWords.stage, 6);
  assert.equal(englishAccess(progress).activities.has('sat-use-words'), true);
   assert.equal(progress.completed.length, 11);
  const replay = enterEnglishActivity(progress, 'first-words', 'our-first-words');
  assert.equal(replay.firstWords, undefined, 'A completed review opens ready to replay');
  assert.deepEqual(replay.completed, progress.completed, 'Replay preserves completed topics and lessons');
  assert.equal(enterEnglishActivity(progress, 'first-words').firstWords, progress.firstWords, 'Ordinary resume keeps the saved finish');
}

for (const bad of [null, {}, { ...freshFirstWords(), stage: 6 }, { ...freshFirstWords(), stage: 1, read: ['at'] }, { ...freshFirstWords(), questionOrders: [true] }, { ...freshFirstWords(), heard: ['unknown'] }]) assert.equal(readFirstWords(bad), undefined);
const legacyAt = { ...beforeReview, words: { at: { stage: 2, built: 'at', reads: 2, answers: {} } } };
const migrated = readEnglishProgress(JSON.stringify(legacyAt));
assert.equal(migrated.words.at.stage, 3, 'Old at completion maps to the new finish');
assert.deepEqual(migrated.completed, legacyAt.completed, 'Adding a story does not remove existing unlocks');
assert.equal(enterEnglishActivity(migrated, 'first-words', 'build-at').words.at, undefined, 'Revisiting old at starts the whole new journey');
const atStory = { ...legacyAt.words.at, journeyVersion: 2 };
assert.equal(readEnglishProgress(JSON.stringify({ ...beforeReview, words: { at: atStory } })).words.at.stage, 2, 'A new at meaning scene resumes as the scene');
assert.equal(readEnglishProgress(JSON.stringify({ ...beforeReview, words: { at: { ...atStory, stage: 3, reads: 1 } } })).words.at, undefined, 'A word finish requires both reading attempts');
for (const key of ['review-read', 'review-read-next']) assert.doesNotMatch(englishNarration[key], /\b(at|sat)\b/i, 'The final reading prompt must not say the answer');
assert.equal(nextFirstWords(freshFirstWords(), { type: 'read' }).stage, 0);
console.log('Passed: legacy at migration, meaning-scene resume, review gates/retries, both reading orders, reload at every stage, final lesson unlock, completion-preserving replay, no answer in reading prompts.');
