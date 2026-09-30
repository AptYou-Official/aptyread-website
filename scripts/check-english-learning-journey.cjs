/* Embedded formation is an invitation, separate from the unchanged reading route. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { englishLessons } = require('../lib/english-curriculum.ts');
const { LEVEL_ONE_LETTERS } = require('../lib/english-programme.ts');
const { getFormationLetter } = require('../lib/english-learning-journey.ts');
const { emptyProgress, createEnglishPreviewProgress, englishAccess, completeEnglishActivity, offerEnglishFormation, recordEnglishFormationTry, finishEnglishFormation, enterEnglishActivity, readEnglishProgress } = require('../lib/english-progress.ts');
const { getProgrammeActivity } = require('../lib/english-programme.ts');
const { programmeSteps } = require('../lib/english-programme-progress.ts');

const path = englishLessons.filter(lesson => !lesson.supplemental).flatMap(lesson => lesson.activities);
const expectedIds = [
  'meet-s', 'practice-s', 'meet-a', 'practice-a', 'find-a', 'meet-t', 'practice-t', 'find-t', 'build-at', 'build-sat', 'our-first-words', 'sat-use-words',
  'pin-remember-sat', 'meet-p', 'practice-p', 'find-p', 'pin-use-p', 'meet-i', 'practice-i', 'find-i', 'pin-use-i', 'meet-n', 'practice-n', 'find-n', 'build-pin', 'build-sit', 'more-little-words', 'more-words-with-apty', 'pin-use-words',
  'first-book-story', 'first-book-listen', 'first-book-return',
  'cme-meet-c', 'cme-meet-m', 'cme-meet-e', 'cme-tap-book', 'cme-return',
  'hrg-meet-h', 'hrg-meet-r', 'hrg-meet-g', 'hrg-race-book', 'hrg-return',
  'dko-meet-d', 'dko-meet-k', 'dko-meet-o', 'dko-dig-book', 'dko-return',
  'lfb-meet-l', 'lfb-meet-f', 'lfb-meet-b', 'lfb-location-book', 'lfb-return',
  'ujw-meet-u', 'ujw-meet-j', 'ujw-meet-w', 'ujw-wet-book', 'ujw-return',
  'vyz-meet-v', 'vyz-meet-y', 'vyz-meet-z', 'vyz-zed-book', 'vyz-return',
  'l1-bridge-words', 'l1-bridge-story', 'l1-bridge-information',
];
assert.deepEqual(path.map(activity => activity.id), expectedIds, 'Formation invitations cannot insert or reorder reading prerequisites');
const mapped = path.flatMap(activity => {
  const letter = getFormationLetter(activity.id);
  return letter ? [{ id: activity.id, letter }] : [];
});
assert.equal(mapped.length, 24);
assert.deepEqual(mapped.map(item => item.letter), LEVEL_ONE_LETTERS);
assert.deepEqual(Object.fromEntries(mapped.slice(0, 6).map(item => [item.id, item.letter])), {
  'practice-s': 's', 'find-a': 'a', 'find-t': 't', 'find-p': 'p', 'find-i': 'i', 'find-n': 'n',
});
for (const id of ['unknown', '__proto__', 'constructor', 'meet-s', 'build-sat', 'first-book-story', 'write-s-lowercase', 'forms-c']) assert.equal(getFormationLetter(id), undefined);

// The first invitation opens only after its sound introduction. Unknown and
// future activities cannot create a phantom writing record or completion.
const fresh = emptyProgress();
assert.equal(offerEnglishFormation(fresh, 'practice-s'), fresh);
assert.equal(finishEnglishFormation(fresh, 'practice-s', ['s']), fresh);
assert.equal(recordEnglishFormationTry(fresh, 'practice-s', 's'), fresh);
assert.equal(offerEnglishFormation(fresh, 'unknown'), fresh);
const sOpen = completeEnglishActivity(fresh, 'meet-s');
assert.equal(finishEnglishFormation(sOpen, 'practice-s', ['s']), sOpen, 'A finish needs a real pending invitation');
assert.equal(recordEnglishFormationTry(sOpen, 'practice-s', 's'), sOpen, 'A try cannot invent an invitation');

for (const { id, letter } of mapped) {
  const index = path.findIndex(activity => activity.id === id);
  // A valid completed prefix models either a reducer-completed topic or a
  // legacy completion. This test does not fabricate any reading evidence.
  const original = { ...emptyProgress(), completed: expectedIds.slice(0, index + 1), current: {}, lastLesson: 'first-words' };
  const originalSnapshot = JSON.stringify(original);
  const frontier = englishAccess(original).next?.activity.id ?? null;
  const offered = offerEnglishFormation(original, id);
  assert.deepEqual(offered.formationOffers[id], { status: 'pending', forms: [] });
  assert.equal(offerEnglishFormation(offered, id), offered, 'Refresh/repeated effects must not restart an existing invitation');
  assert.equal(englishAccess(offered).next?.activity.id ?? null, frontier, 'Pending writing never gates the next reading topic');
  assert.deepEqual(offered.completed, original.completed);
  assert.equal(offered.evidence, original.evidence);
  assert.deepEqual(readEnglishProgress(JSON.stringify(offered)), offered, 'A pending invitation survives refresh');

  const firstMark = recordEnglishFormationTry(offered, id, letter);
  assert.deepEqual(firstMark.formationOffers[id], { status: 'pending', forms: [letter] }, 'A real mark is saved immediately without closing the invitation');
  assert.equal(recordEnglishFormationTry(firstMark, id, letter), firstMark, 'Repeated marks do not duplicate the form');
  assert.deepEqual(firstMark.completed, original.completed);
  assert.deepEqual(firstMark.current, original.current, 'A mark does not auto-advance the player');
  assert.equal(firstMark.evidence, original.evidence);
  assert.equal(englishAccess(firstMark).next?.activity.id ?? null, frontier);
  const afterLeavingHome = readEnglishProgress(JSON.stringify(firstMark));
  assert.deepEqual(afterLeavingHome, firstMark, 'Leaving before Done or Keep reading cannot lose a saved mark');
  const paperTry = recordEnglishFormationTry(afterLeavingHome, id, letter.toUpperCase());
  assert.deepEqual(paperTry.formationOffers[id], { status: 'pending', forms: [letter, letter.toUpperCase()] });
  assert.deepEqual(readEnglishProgress(JSON.stringify(paperTry)), paperTry);
  assert.deepEqual(finishEnglishFormation(paperTry, id, []).formationOffers[id], { status: 'practised', forms: [letter, letter.toUpperCase()] }, 'Keep reading preserves already reported tries');
  for (const badForm of [null, undefined, {}, ['s'], '', 'q', letter + letter]) assert.equal(recordEnglishFormationTry(offered, id, badForm), offered, 'Only the selected letter form can be recorded');

  const later = finishEnglishFormation(offered, id, []);
  assert.deepEqual(later.formationOffers[id], { status: 'later', forms: [] });
  assert.equal(recordEnglishFormationTry(later, id, letter), later, 'A late callback cannot record after the invitation closes');
  assert.equal(englishAccess(later).next?.activity.id ?? null, frontier);
  assert.deepEqual(later.completed, original.completed);
  assert.deepEqual(readEnglishProgress(JSON.stringify(later)), later);

  const reopened = offerEnglishFormation(later, id);
  const lower = finishEnglishFormation(reopened, id, [letter, letter, 'not-a-form']);
  assert.deepEqual(lower.formationOffers[id], { status: 'practised', forms: [letter] });
  assert.equal(englishAccess(lower).next?.activity.id ?? null, frontier);
  assert.deepEqual(lower.completed, original.completed, 'Writing participation adds no reading or supplemental-topic completion');
  assert.equal(lower.evidence, original.evidence, 'A drawing attempt is not an accuracy observation');
  assert.deepEqual(readEnglishProgress(JSON.stringify(lower)), lower);

  const repeat = offerEnglishFormation(lower, id);
  assert.deepEqual(repeat.formationOffers[id], { status: 'pending', forms: [letter] }, 'Offering replay retains known practice');
  assert.deepEqual(readEnglishProgress(JSON.stringify(repeat)), repeat);
  const postponedReplay = finishEnglishFormation(repeat, id, []);
  assert.deepEqual(postponedReplay.formationOffers[id], lower.formationOffers[id], 'Later on replay cannot erase previous practice');
  const upper = finishEnglishFormation(offerEnglishFormation(postponedReplay, id), id, [letter.toUpperCase()]);
  assert.deepEqual(upper.formationOffers[id], { status: 'practised', forms: [letter, letter.toUpperCase()] });
  assert.deepEqual(readEnglishProgress(JSON.stringify(upper)), upper);
  assert.equal(finishEnglishFormation(upper, id, []), upper, 'Duplicate finish events are harmless');
  assert.equal(recordEnglishFormationTry(upper, id, letter), upper);
  assert.equal(JSON.stringify(original), originalSnapshot, 'Offers and responses are immutable');

  const malformed = offerEnglishFormation(original, id);
  for (const bad of [null, {}, 's', [null], ['q'], ['unknown']]) assert.equal(finishEnglishFormation(malformed, id, bad), malformed, 'Malformed response does not mean later or practised');
}

// A current, unfinished topic may display an invitation without its optional
// response completing that reading topic. The player controls its boundary.
const currentOffer = offerEnglishFormation(sOpen, 'practice-s');
const currentPractice = finishEnglishFormation(currentOffer, 'practice-s', ['s']);
assert.equal(englishAccess(currentPractice).next.activity.id, 'practice-s');
assert.ok(!currentPractice.completed.includes('practice-s'));

// Player integration: the programme reducer may complete the core activity
// before its Next callback opens the formation offer. Keep that current index
// until the invitation is answered; refresh must show that same pending offer.
const cLesson = englishLessons.find(lesson => lesson.id === 'cat-mat-pen');
const cId = 'cme-meet-c', cIndex = expectedIds.indexOf(cId);
const cSteps = programmeSteps(getProgrammeActivity(cId)), cLast = cSteps[cSteps.length - 1];
const completedC = {
  ...emptyProgress(), completed: [...expectedIds.slice(0, cIndex + 1), 'write-s-lowercase'],
  current: { 'cat-mat-pen': 0 }, lastLesson: 'cat-mat-pen',
  words: { at: { stage: 1, built: 'at', reads: 1, answers: {} } },
  programme: { [cId]: { task: cSteps.length - 1, phase: 2, built: '', misses: 0, supported: false, heard: false, answer: cLast.answer, complete: true } },
  evidence: [{ activityId: cId, taskId: cLast.id, skillId: 'meaning.cat', outcome: 'independent', at: '2026-09-30T12:00:00Z' }],
  formationOffers: { 'practice-s': { status: 'practised', forms: ['s'] } },
};
const pendingC = offerEnglishFormation(completedC, cId);
const refreshedC = readEnglishProgress(JSON.stringify(pendingC));
assert.deepEqual(refreshedC, pendingC);
const resumedC = enterEnglishActivity(refreshedC, cLesson.id);
assert.equal(resumedC.current[cLesson.id], 0);
assert.equal(resumedC.formationOffers[cId].status, 'pending');
assert.equal(resumedC.programme[cId].complete, true);
assert.equal(englishAccess(resumedC).next.activity.id, 'cme-meet-m', 'The reading frontier may already advance while the current screen is the optional offer');
const explicitReplay = enterEnglishActivity(refreshedC, cLesson.id, cId);
assert.equal(explicitReplay.programme[cId], undefined, 'Explicit replay may reset its old task attempt');
assert.equal(explicitReplay.formationOffers[cId].status, 'pending', 'Explicit replay does not erase its waiting formation offer');
assert.deepEqual(explicitReplay.completed, completedC.completed);
assert.deepEqual(explicitReplay.evidence, completedC.evidence);
assert.deepEqual(explicitReplay.words, completedC.words);
const answeredC = finishEnglishFormation(explicitReplay, cId, []);
const continuedC = enterEnglishActivity(completeEnglishActivity(answeredC, cId), cLesson.id, 'cme-meet-m');
assert.equal(continuedC.current[cLesson.id], 1);
assert.equal(continuedC.formationOffers[cId].status, 'later');
assert.deepEqual(continuedC.completed, completedC.completed);
assert.deepEqual(continuedC.formationOffers['practice-s'], completedC.formationOffers['practice-s']);
assert.deepEqual(continuedC.evidence, completedC.evidence);
assert.deepEqual(continuedC.words, completedC.words);
const sideIds = new Set(englishLessons.filter(lesson => lesson.supplemental).flatMap(lesson => lesson.activities.map(activity => activity.id)));
assert.equal(continuedC.completed.filter(id => sideIds.has(id)).length, 1, 'An embedded offer cannot inflate supplemental-topic completion');
const bypassedC = enterEnglishActivity(pendingC, cLesson.id, 'cme-meet-m');
assert.equal(bypassedC.formationOffers[cId].status, 'pending', 'Choosing the next reading topic preserves an optional offer for later revisit');

const raw = { ...sOpen, formationOffers: {
  'practice-s': { status: 'pending', forms: ['s', 's', 'S', 'a', 7], ignored: 'drop' },
  'find-a': { status: 'practised', forms: ['a'] },
  unknown: { status: 'practised', forms: ['s'] },
} };
const sanitized = readEnglishProgress(JSON.stringify(raw));
assert.deepEqual(sanitized.formationOffers, { 'practice-s': { status: 'pending', forms: ['s', 'S'] } });
for (const bad of [null, [], {}, { status: 'mastered', forms: ['s'] }, { status: 'practised', forms: [] }, { status: 'practised', forms: ['a'] }, { status: 'pending', forms: 's' }]) {
  const restored = readEnglishProgress(JSON.stringify({ ...sOpen, formationOffers: { 'practice-s': bad } }));
  assert.equal(restored.formationOffers, undefined, 'Malformed entries cannot claim handwriting participation');
}
for (const bad of [null, [], 'invalid', 42]) assert.equal(readEnglishProgress(JSON.stringify({ ...sOpen, formationOffers: bad })).formationOffers, undefined);
const preserved = readEnglishProgress(JSON.stringify({ ...sOpen, formationOffers: { 'practice-s': { status: 'later', forms: ['s'] } } }));
assert.deepEqual(preserved.formationOffers['practice-s'], { status: 'practised', forms: ['s'] }, 'Existing practice survives a contradictory later flag');
assert.deepEqual(readEnglishProgress(JSON.stringify(sOpen)), sOpen, 'Saves without offers are unchanged');

// Preview records exist only in the adult sandbox and cannot unlock a child.
const child = emptyProgress(), childSnapshot = JSON.stringify(child);
const preview = createEnglishPreviewProgress();
const adultOffer = offerEnglishFormation(preview, 'vyz-meet-z');
const adultMark = recordEnglishFormationTry(adultOffer, 'vyz-meet-z', 'z');
assert.deepEqual(adultMark.formationOffers['vyz-meet-z'], { status: 'pending', forms: ['z'] });
const adultPractice = finishEnglishFormation(adultMark, 'vyz-meet-z', ['Z']);
assert.deepEqual(adultPractice.formationOffers['vyz-meet-z'], { status: 'practised', forms: ['z', 'Z'] });
assert.deepEqual(adultPractice.completed, []);
assert.ok(!adultPractice.evidence?.length);
assert.equal(JSON.stringify(child), childSnapshot);
const returnedToChild = readEnglishProgress(JSON.stringify(adultPractice));
assert.equal(returnedToChild.preview, undefined);
assert.equal(returnedToChild.formationOffers, undefined, 'A locked preview-only invitation cannot become child practice');
assert.equal(englishAccess(returnedToChild).next.activity.id, 'meet-s');

console.log('Learning journey: all 24 embedded formation mappings, unchanged 65-topic reading route, skip/practise/replay, pending restore, malformed/locked input and preview isolation passed.');
