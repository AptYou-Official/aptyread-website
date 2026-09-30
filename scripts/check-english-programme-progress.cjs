/* Full finite reading route; participation, evidence, restore and side-practice boundaries. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { englishLessons } = require('../lib/english-curriculum.ts');
const { getProgrammeActivity, allProgrammeActivities } = require('../lib/english-programme.ts');
const model = require('../lib/english-programme-progress.ts');
const progressModel = require('../lib/english-progress.ts');
const { emptyProgress, englishAccess, completeEnglishActivity, updateProgramme, updateSentenceReview, updateFirstWords, updateApplication, enterEnglishActivity, readEnglishProgress } = progressModel;
const { programmeSteps, programmeBookPreparation, freshProgrammeState, nextProgrammeState, isProgrammeStepReady, programmeEvidence, readProgrammeState, programmeChoiceOrder, programmeSoundChoices } = model;
const { applicationWord } = require('../lib/english-application.ts');
const now = '2026-09-30T12:00:00.000Z';
const core = englishLessons.filter(lesson => !lesson.supplemental);
const path = core.flatMap(lesson => lesson.activities.map(activity => ({ lesson, activity })));
assert.equal(core.length, 10);
assert.equal(path.length, 65);
assert.equal(englishLessons.filter(lesson => lesson.supplemental).length, 24);
const correctPositions = new Set();
for (const activity of allProgrammeActivities) {
  for (const step of programmeSteps(activity)) {
    if (step.kind === 'sound') {
      const options = programmeSoundChoices(step);
      assert.equal(options.length, Math.min(3, step.knownLetters.length));
      assert.equal(new Set(options).size, options.length);
      assert.ok(options.includes(step.letter));
      assert.ok(options.every(letter => step.knownLetters.includes(letter)));
      assert.ok(!(options.includes('c') && options.includes('k')), 'Two spellings for the same /k/ phoneme cannot be competing single-sound answers');
      assert.deepEqual(programmeSoundChoices(step), options, 'Choice order stays still during a response');
    }
    if ('choices' in step && step.choices?.length === 2) {
      const options = programmeChoiceOrder(step.choices, step.id);
      correctPositions.add(options.findIndex(choice => choice.id === step.answer));
      assert.deepEqual(programmeChoiceOrder(step.choices, step.id), options);
    }
  }
}
assert.deepEqual([...correctPositions].sort(), [0, 1], 'Real authored questions cannot all teach a fixed answer position');

function nextCorrectAction(step, state) {
  if (isProgrammeStepReady(step, state)) return { type: 'next' };
  if (step.kind === 'book-cover') return { type: !state.heard ? 'heard' : state.bookPrep < programmeBookPreparation(step).length - 1 ? 'prepare-next' : 'continue' };
  if (state.phase === 0) {
    if (['sound', 'listen', 'build'].includes(step.kind) && !state.heard) return { type: 'heard' };
    return { type: 'continue' };
  }
  if (step.kind === 'sound' || step.kind === 'build') {
    if (!state.heard) return { type: 'heard' };
    return { type: 'choose', value: step.kind === 'sound' ? step.letter : step.word[state.built.length] };
  }
  if (step.kind === 'page' && !step.question) return { type: 'continue' };
  return { type: 'choose', value: step.answer };
}
function runProgramme(progress, activityId) {
  const activity = getProgrammeActivity(activityId), steps = programmeSteps(activity);
  assert.equal(completeEnglishActivity(progress, activityId), progress, `${activityId}: cannot skip unfinished practice`);
  let actions = 0;
  while (!progress.programme?.[activityId]?.complete) {
    const state = progress.programme?.[activityId] || freshProgrammeState(steps[0]);
    const action = nextCorrectAction(steps[state.task], state);
    const next = updateProgramme(progress, activityId, action, now);
    assert.notDeepEqual(next, progress, `${activityId}/${steps[state.task].id}: action must progress`);
    assert.deepEqual(readEnglishProgress(JSON.stringify(next)), next, `${activityId}: every partial state resumes exactly`);
    progress = next;
    assert.ok(++actions < 100, `${activityId}: no unbounded activity loop`);
  }
  return progress;
}
let progress = emptyProgress();
for (const { lesson, activity } of path) {
  assert.equal(englishAccess(progress).next.activity.id, activity.id, `${activity.id}: exact route frontier`);
  assert.equal(englishAccess(progress).next.lessonId, lesson.id);
  const later = path[path.indexOf(path.find(item => item.activity.id === activity.id)) + 1];
  if (later) assert.equal(completeEnglishActivity(progress, later.activity.id), progress, 'A future topic cannot complete ahead of the frontier');
  if (activity.kind === 'practice') progress = runProgramme(progress, activity.id);
  else if (activity.id === 'our-first-words') {
    progress = updateSentenceReview(progress, { type: 'start' });
    progress = updateSentenceReview(progress, { type: 'find', word: 'sat' });
    progress = updateSentenceReview(progress, { type: 'find', word: 'at' });
  } else if (activity.id === 'more-little-words') {
    for (const action of [{ type: 'start', questionOrders: [false, true], readAtFirst: true }, { type: 'hear', word: 'pin' }, { type: 'hear', word: 'sit' }, { type: 'next' }, { type: 'choose', word: 'pin' }, { type: 'next' }, { type: 'choose', word: 'sit' }, { type: 'next' }, { type: 'read' }, { type: 'read' }]) progress = updateFirstWords(progress, action, 'more');
  } else if (activity.kind === 'apply') {
    for (let i = 0; i < 2; i++) {
      for (const type of ['tried', 'model-tried', 'meaning-next', 'heard']) progress = updateApplication(progress, { type });
      for (const letter of applicationWord(progress.application)) progress = updateApplication(progress, { type: 'choose', letter });
      for (const type of ['read-built', 'read-back']) progress = updateApplication(progress, { type });
    }
  } else progress = completeEnglishActivity(progress, activity.id);
  assert.ok(progress.completed.includes(activity.id), `${activity.id}: has a reachable terminal state`);
  if (activity.id === 'meet-s') {
    const access = englishAccess(progress);
    assert.ok(access.lessons.has('explore-s'));
    assert.equal(access.next.activity.id, 'practice-s', 'Optional handwriting cannot divert the reading frontier');
    assert.ok(!access.lessons.has('explore-a'), 'Formation waits for its sound introduction');
    const withWriting = completeEnglishActivity(progress, 'write-s-lowercase');
    assert.ok(withWriting.completed.includes('write-s-lowercase'), 'Known-letter side practice is reachable');
    assert.equal(englishAccess(withWriting).next.activity.id, 'practice-s');
  }
}
assert.equal(englishAccess(progress).next, null, 'The route ends; there is no endless mastery gate');
assert.equal(progress.completed.length, 65, 'The complete reading route required no handwriting completions');
assert.equal(englishAccess(progress).lessons.size, 34, 'All 10 main and 24 side-practice lessons are available at the end');
assert.ok(progress.evidence.length > 80);
assert.ok(progress.evidence.every(row => !/oral|fluency|handwriting/.test(row.skillId)), 'No self-reported reading or drawing score');
assert.ok(progress.evidence.every(row => row.at === now && row.activityId && row.taskId));
assert.deepEqual(readEnglishProgress(JSON.stringify(progress)), progress);

// A completed replay resets only its own attempt, preserving access and earlier evidence.
const replayId = 'cme-meet-c';
const replay = enterEnglishActivity(progress, 'cat-mat-pen', replayId);
assert.equal(replay.programme[replayId], undefined);
assert.deepEqual(replay.completed, progress.completed);
assert.deepEqual(replay.evidence, progress.evidence);
assert.equal(englishAccess(replay).next, null);
const partial = updateProgramme(replay, replayId, { type: 'heard' }, now);
assert.deepEqual(enterEnglishActivity(partial, 'cat-mat-pen', replayId).programme[replayId], partial.programme[replayId], 'Incomplete replay resumes rather than restarting');

// Observable independence means no help/retry on this response, never unobserved oral reading.
const readActivity = getProgrammeActivity('pin-use-p');
const steps = programmeSteps(readActivity), readIndex = steps.findIndex(step => step.kind === 'read'), readStep = steps[readIndex];
let state = freshProgrammeState(readStep, readIndex);
let next = nextProgrammeState(readActivity, state, { type: 'continue' });
assert.deepEqual(programmeEvidence(readActivity, state, next, { type: 'continue' }, now), [], 'I tried creates no reading score');
state = next;
next = nextProgrammeState(readActivity, state, { type: 'choose', value: readStep.answer });
assert.equal(programmeEvidence(readActivity, state, next, { type: 'choose', value: readStep.answer }, now)[0].outcome, 'independent');
assert.equal(programmeEvidence(readActivity, state, next, { type: 'choose', value: readStep.answer }, now)[0].skillId, 'meaning.tap');
for (const assistance of [{ type: 'help' }, { type: 'choose', value: readStep.choices.find(choice => choice.id !== readStep.answer).id }]) {
  const helped = nextProgrammeState(readActivity, state, assistance);
  const correct = nextProgrammeState(readActivity, helped, { type: 'choose', value: readStep.answer });
  assert.equal(programmeEvidence(readActivity, helped, correct, { type: 'choose', value: readStep.answer }, now)[0].outcome, 'supported');
}
const guidedStep = steps[0];
const guidedStart = freshProgrammeState(guidedStep);
assert.deepEqual(nextProgrammeState(readActivity, guidedStart, { type: 'continue' }), guidedStart, 'A guided build cannot bypass the model');
let guided = nextProgrammeState(readActivity, guidedStart, { type: 'heard' });
guided = nextProgrammeState(readActivity, guided, { type: 'continue' });
for (const letter of guidedStep.word) {
  const after = nextProgrammeState(readActivity, guided, { type: 'choose', value: letter });
  const rows = programmeEvidence(readActivity, guided, after, { type: 'choose', value: letter }, now);
  if (rows.length) assert.equal(rows[0].outcome, 'supported', 'Guided copying is never independent encoding');
  guided = after;
}
const bookActivity = getProgrammeActivity('first-book-story'), bookSteps = programmeSteps(bookActivity);
let cover = freshProgrammeState(bookSteps[0]);
const cards = programmeBookPreparation(bookSteps[0]);
assert.equal(cover.bookPrep, 0);
assert.deepEqual(cards.slice(0, 2).map(card => [card.id, card.text, card.scene]), [['prepare-0', 'Pat', 'pat-sat'], ['prepare-1', 'Pip', 'pip-sat']], 'Names retain their exact media IDs and picture models');
assert.deepEqual(cards.slice(2).map(card => card.id), bookSteps[0].conventions.map((_, index) => `convention-${index}`));
for (let index = 0; index < cards.length; index++) {
  assert.equal(cover.bookPrep, index);
  assert.equal(cover.heard, false, 'A new card is not automatically heard');
  assert.deepEqual(nextProgrammeState(bookActivity, cover, { type: 'prepare-next' }), cover, 'Do not skip an unheard card');
  assert.deepEqual(nextProgrammeState(bookActivity, cover, { type: 'continue' }), cover, 'Preparation must be heard/read together before opening');
  assert.deepEqual(readProgrammeState(bookActivity.id, JSON.parse(JSON.stringify(cover))), cover, 'Refresh keeps the exact unheard card');
  const heard = nextProgrammeState(bookActivity, cover, { type: 'heard' });
  assert.deepEqual(readProgrammeState(bookActivity.id, JSON.parse(JSON.stringify(heard))), heard, 'Refresh retains the heard card without replaying it');
  assert.deepEqual(programmeEvidence(bookActivity, cover, heard, { type: 'heard' }, now), [], 'Preparation is modelling, never independent reading evidence');
  if (index < cards.length - 1) {
    assert.deepEqual(nextProgrammeState(bookActivity, heard, { type: 'continue' }), heard, 'Only the last heard card opens the book');
    cover = nextProgrammeState(bookActivity, heard, { type: 'prepare-next' });
    assert.equal(cover.task, 0); assert.equal(cover.phase, 0);
  } else {
    assert.deepEqual(nextProgrammeState(bookActivity, heard, { type: 'prepare-next' }), heard, 'No phantom preparation card');
    cover = nextProgrammeState(bookActivity, heard, { type: 'continue' });
    assert.equal(cover.phase, 1);
  }
}
const openedPage = nextProgrammeState(bookActivity, cover, { type: 'next' });
assert.equal(openedPage.task, 1);
assert.equal(openedPage.bookPrep, undefined, 'Preparation position must not leak into a reading page');
assert.deepEqual(nextProgrammeState(bookActivity, openedPage, { type: 'prepare-next' }), openedPage, 'A page has no preparation-next action');
const { bookPrep: ignoredBookPrep, ...legacyCover } = freshProgrammeState(bookSteps[0]);
assert.equal(readProgrammeState(bookActivity.id, legacyCover).bookPrep, 0, 'An unheard legacy cover starts on its first card');
assert.equal(readProgrammeState(bookActivity.id, { ...legacyCover, heard: true }).bookPrep, cards.length - 1, 'A heard legacy cover had played the whole old preparation');
assert.equal(nextProgrammeState(bookActivity, { ...legacyCover, heard: true }, { type: 'continue' }).phase, 1, 'Preserve the opening permission of an old heard cover');
const legacyFirstHeard = nextProgrammeState(bookActivity, legacyCover, { type: 'heard' });
assert.equal(legacyFirstHeard.bookPrep, 0, 'Hearing the first card of an unheard legacy save cannot unlock all cards');
for (const invalid of [-1, cards.length, 0.5, '0', null, NaN, Infinity]) assert.equal(readProgrammeState(bookActivity.id, { ...freshProgrammeState(bookSteps[0]), bookPrep: invalid }), undefined, 'Reject an invalid preparation index');
assert.equal(readProgrammeState(bookActivity.id, { ...freshProgrammeState(bookSteps[0]), phase: 1, heard: true }), undefined, 'An early card cannot claim the book is ready');
assert.equal(readProgrammeState(bookActivity.id, { ...freshProgrammeState(bookSteps[0]), bookPrep: cards.length - 1, phase: 1 }), undefined, 'An unheard last card cannot claim the book is ready');
assert.equal(readProgrammeState(bookActivity.id, { ...openedPage, bookPrep: 3 }).bookPrep, undefined, 'Discard preparation fields attached to other tasks');
let page = freshProgrammeState(bookSteps[1], 1);
const pageAfter = nextProgrammeState(bookActivity, page, { type: 'continue' });
assert.deepEqual(programmeEvidence(bookActivity, page, pageAfter, { type: 'continue' }, now), [], 'A page turn gives no oral or comprehension evidence');

// Legacy numeric indexes retain the same actual activity despite inserted practice.
const legacy = {
  'first-words': ['meet-s', 'practice-s', 'meet-a', 'practice-a', 'find-a', 'meet-t', 'practice-t', 'find-t', 'build-at', 'build-sat', 'our-first-words'],
  'more-words': ['meet-p', 'practice-p', 'find-p', 'meet-i', 'practice-i', 'find-i', 'meet-n', 'practice-n', 'find-n', 'build-pin', 'build-sit', 'more-little-words', 'more-words-with-apty'],
};
for (const [lessonId, ids] of Object.entries(legacy)) {
  const lesson = englishLessons.find(lesson => lesson.id === lessonId);
  ids.forEach((id, index) => {
    const raw = { version: 1, current: { [lessonId]: index }, completed: [...ids.slice(0, index), 'write-s-lowercase'], words: {}, lastLesson: lessonId };
    const migrated = readEnglishProgress(JSON.stringify(raw));
    assert.equal(lesson.activities[migrated.current[lessonId]].id, id, `${lessonId}/${index}: stable legacy activity`);
    assert.ok(migrated.completed.includes('write-s-lowercase'));
    assert.deepEqual(readEnglishProgress(JSON.stringify(migrated)), migrated, 'Migration is idempotent');
  });
}
const removedFind = readEnglishProgress(JSON.stringify({ version: 1, current: { 'first-words': 3 }, completed: ['meet-s', 'practice-s', 'find-s'], words: {}, lastLesson: 'first-words' }));
assert.equal(englishLessons[0].activities[removedFind.current['first-words']].id, 'meet-a');
assert.ok(!removedFind.completed.includes('find-s'));

// Untrusted state cannot claim completion in the middle of a book or an unbuilt word.
assert.equal(readProgrammeState('missing', {}), undefined);
assert.equal(readProgrammeState('first-book-story', { ...freshProgrammeState(bookSteps[0]), task: 999 }), undefined);
assert.equal(readProgrammeState('pin-use-p', { ...guidedStart, phase: 2, built: 't' }), undefined);
assert.ok(!readProgrammeState('first-book-story', { ...freshProgrammeState(bookSteps[1], 1), complete: true }).complete);

if (typeof progressModel.createEnglishPreviewProgress === 'function') {
  const preview = progressModel.createEnglishPreviewProgress();
  assert.equal(englishAccess(preview).next, null);
  assert.equal(englishAccess(preview).activities.size, englishLessons.flatMap(lesson => lesson.activities).length);
  assert.equal(preview.completed.length, 0, 'Preview grants access without inventing completions');
  assert.ok(!preview.evidence?.length, 'Preview must not manufacture learning evidence');
  const restoredPreview = readEnglishProgress(JSON.stringify(preview));
  assert.equal(restoredPreview.preview, undefined, 'Preview access cannot leak into a restored child save');
  assert.equal(englishAccess(restoredPreview).next.activity.id, 'meet-s');
  assert.deepEqual(emptyProgress().completed, [], 'Preview leaves a fresh child untouched');
} else {
  throw new Error('Export createEnglishPreviewProgress so preview semantics are verified, not inferred from UI');
}
console.log(`Programme progress: all ${path.length} core topics traversed and restored; 24 optional formation routes; replay, evidence, preparation, migration, malformed saves and preview checks passed.`);
