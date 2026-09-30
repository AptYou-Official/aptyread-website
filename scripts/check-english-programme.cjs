/* Content integrity, code boundaries and finite Level 1 sequencing. No efficacy claims. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText, filename);
const p = require('../lib/english-programme.ts');
const { programmeLessons, programmeOpeningActivities, allProgrammeActivities, programmeTrials, programmePracticeWords, programmeKnownLetters } = p;
const supportedScenes = new Set(require('../components/english/ProgrammeScene.tsx').supportedProgrammeScenes);
const validateScene = (scene, location) => assert.ok(supportedScenes.has(scene), `${location}: scene ${scene} must have authored artwork, not the fallback`);

// This is a deliberately reviewed single-letter VC/CVC print bank. It excludes
// exception pronunciations, suffixes, clusters, consonant teams and reserved items.
const printBank = new Set('at sat tap sit pin pan cat mat pen hat rat pig sad kid dog log fan bag sun jug wet van yam zip pat pip can sam ran kim dig got hot on bed in bin jim had fun zed yap jog red big'.split(' '));
function validatePrint(text, known, location) {
  const words = text.toLowerCase().match(/[a-z]+/g) || [];
  assert.ok(words.length, `${location}: missing print`);
  for (const word of words) {
    assert.ok(printBank.has(word), `${location}: ${word} needs an explicit pronunciation/meaning ledger review`);
    assert.match(word, /^[bcdfghjklmnprstvwxyz]?[aeiou][bcdfghjklmnprstvwxyz]$/, `${location}: ${word} exceeds this VC/CVC scope`);
    assert.ok([...word].every(letter => known.has(letter)), `${location}: untaught code in ${word}`);
    assert.ok(!p.programmeReservedObservationWords.includes(word), `${location}: reserved observation word ${word} exposed`);
  }
}
function validateChoices(choices, answer, location) {
  assert.ok(choices.length >= 2 && choices.length <= 3, `${location}: bounded choices`);
  assert.equal(new Set(choices.map(choice => choice.id)).size, choices.length, `${location}: unique choices`);
  assert.equal(choices.filter(choice => choice.id === answer).length, 1, `${location}: one deterministic answer`);
  for (const choice of choices) { assert.ok(choice.id && choice.label && choice.scene, `${location}: choice is fully authored`); validateScene(choice.scene, location); }
}
const taskIds = new Set();
function validateActivity(activity, known) {
  assert.ok(activity.id && activity.title && activity.objective && activity.skills.length);
  assert.ok(activity.tasks.length >= 1 && activity.tasks.length <= 4, `${activity.id}: short activity`);
  assert.deepEqual(programmeKnownLetters(activity.id), activity.knownLetters);
  const tasks = programmeTrials(activity.id);
  assert.ok(tasks.length >= 1 && tasks.length <= 4, `${activity.id}: at most four short trials`);
  for (const task of activity.tasks) {
    if (task.kind === 'review' || task.kind === 'check') {
      assert.ok(!taskIds.has(task.id), `duplicate wrapper ${task.id}`); taskIds.add(task.id);
    }
  }
  for (const task of tasks) {
    assert.ok(!taskIds.has(task.id), `duplicate task ${task.id}`); taskIds.add(task.id);
    if (task.kind === 'sound') {
      if (task.mode === 'teach') known.add(task.letter);
      assert.ok(known.has(task.letter), `${task.id}: check cannot introduce a sound`);
      assert.ok(task.knownLetters.includes(task.letter));
      assert.ok(task.knownLetters.every(letter => known.has(letter)), `${task.id}: choices include untaught letters`);
    }
    if (task.kind === 'build' || task.kind === 'read') validatePrint(task.word, known, task.id);
    if (task.kind === 'build') {
      const tiles = [...task.letters];
      for (const letter of task.word) { const i = tiles.indexOf(letter); assert.ok(i >= 0, `${task.id}: missing tile ${letter}`); tiles.splice(i, 1); }
      assert.ok(task.letters.every(letter => known.has(letter)), `${task.id}: untaught tile`);
      assert.ok(task.meaning && task.scene); validateScene(task.scene, task.id);
    }
    if (task.kind === 'read' || task.kind === 'listen') validateChoices(task.choices, task.answer, task.id);
    if (task.kind === 'listen') { assert.ok(task.story.length > 80 && task.question && task.scene, `${task.id}: authored oral story`); validateScene(task.scene, task.id); }
    if (task.kind === 'book') {
      assert.ok(task.title && task.conventions?.length, `${task.id}: print conventions and language preparation`);
      assert.ok(task.preparation?.length, `${task.id}: visible model for names or needed meanings`);
      for (const item of task.preparation) { validatePrint(item.text, known, `${task.id}/preparation`); validateScene(item.scene, task.id); }
      assert.ok(task.pages.length >= 3 && task.pages.length <= 5, `${task.id}: manageable complete book`);
      assert.equal(new Set(task.pages.map(page => page.id)).size, task.pages.length);
      for (const page of task.pages) {
        validatePrint(page.text, known, `${task.id}/${page.id}`);
        validateScene(page.scene, `${task.id}/${page.id}`);
        if (page.question) validateChoices(page.choices, page.answer, `${task.id}/${page.id}`);
        else assert.ok(!page.choices && !page.answer);
      }
    }
  }
  assert.deepEqual([...known], activity.knownLetters, `${activity.id}: exact taught-code ledger`);
  assert.ok(programmePracticeWords(activity.id).every(word => tasks.some(task => (task.kind === 'build' || task.kind === 'read') && task.word === word)));
}

assert.equal(p.LEVEL_ONE_LETTERS.length, 24);
assert.equal(new Set(p.LEVEL_ONE_LETTERS).size, 24);
assert.deepEqual(p.LEVEL_ONE_LETTER_GROUPS, ['sat', 'pin', 'cme', 'hrg', 'dko', 'lfb', 'ujw', 'vyz']);
const tracing = require('../lib/english-tracing.json');
for (const letter of p.LEVEL_ONE_LETTERS) {
  assert.ok(fs.statSync(`public/english/media/${letter}-sound.mp3`).size > 1000, `${letter}: bundled phoneme recording`);
  for (const form of [letter, letter.toUpperCase()]) assert.ok(tracing[form]?.path, `${form}: optional formation guide`);
}
assert.equal(new Set(allProgrammeActivities.map(activity => activity.id)).size, allProgrammeActivities.length);
assert.equal(new Set(programmeLessons.map(lesson => lesson.id)).size, programmeLessons.length);
const openingBoundaries = { 'our-first-words': 'sat', 'null': 'sat', 'find-p': 'satp', 'find-i': 'satpi', 'more-words-with-apty': 'satpin' };
for (const activity of Object.values(programmeOpeningActivities).flat()) {
  assert.ok(Object.hasOwn(openingBoundaries, String(activity.afterActivityId)), `${activity.id}: known insertion point`);
  validateActivity(activity, new Set(openingBoundaries[String(activity.afterActivityId)]));
}
const known = new Set('satpin');
let previous = 'more-words';
for (const lesson of programmeLessons) {
  assert.equal(lesson.prerequisite, previous, `${lesson.id}: finite connected route`);
  for (const activity of lesson.activities) validateActivity(activity, known);
  assert.deepEqual([...known], lesson.taughtLetters, `${lesson.id}: cumulative code`);
  previous = lesson.id;
}
assert.equal(previous, 'level-one-bridge');
assert.deepEqual([...known], p.LEVEL_ONE_LETTERS);
assert.equal(programmeLessons.flatMap(lesson => lesson.activities).flatMap(activity => programmeTrials(activity.id)).filter(task => task.kind === 'sound' && task.mode === 'teach').length, 18);
assert.ok(programmeOpeningActivities['more-words'].some(activity => programmePracticeWords(activity.id).includes('pan')), 'Pan is explicitly exposed, never a fresh reserved check');
assert.deepEqual(p.programmeReservedObservationWords, ['nap', 'tip', 'tin']);

// Guardrail sensitivity: reject code leaks and exception words even when all
// their alphabet letters have appeared. Alphabet coverage is not decodability.
assert.throws(() => validatePrint('Pat got wet.', new Set('satpin'), 'early leak'), /untaught code/);
assert.throws(() => validatePrint('The dog is wet.', known, 'exception leak'), /ledger review/);
assert.throws(() => validatePrint('Pat can nap.', known, 'reserved leak'), /ledger review|reserved/);
assert.throws(() => validateChoices([{ id: 'a', label: 'A', scene: 'cat' }, { id: 'b', label: 'B', scene: 'dog' }], 'missing', 'bad key'), /deterministic answer/);
assert.equal(programmePracticeWords('first-book-story').length, 0, 'Story tokens must not become taught isolated garden words');

console.log(`English programme: ${programmeLessons.length + 2} core lessons; ${allProgrammeActivities.length} new activities; ${taskIds.size} stable task/wrapper IDs; all code, print, answers, reservations and route checks passed.`);
