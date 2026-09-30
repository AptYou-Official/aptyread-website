/* Render/navigation contracts for the complete Level 1 prototype. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) { return resolve.call(this, name.startsWith('@/') ? path.join(__dirname, '..', name.slice(2)) : name, ...rest); };
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { englishLessons, englishVideos } = require('../lib/english-curriculum.ts');
const { emptyProgress, englishAccess } = require('../lib/english-progress.ts');
const { getProgrammeActivity, programmePracticeWords } = require('../lib/english-programme.ts');
let state = { progress: emptyProgress(), ready: true, offline: true, storageAvailable: true, preview: false, update() { throw new Error('Browsing must not change learner progress'); } };
require('../components/english/EnglishProvider.tsx').useEnglish = () => state;
const { default: Topics, getLessonTopicGroups } = require('../components/english/LessonTopics.tsx');
const Dashboard = require('../components/english/Dashboard.tsx').default;
const Overview = require('../components/english/LessonOverview.tsx').default;
const Journey = require('../components/english/LessonJourney.tsx').default;
const Garden = require('../components/english/WordGarden.tsx').default;
const Parent = require('../components/english/ParentProgramme.tsx').default;
const render = (component, props = {}) => renderToStaticMarkup(React.createElement(component, props));
const links = html => [...html.matchAll(/href="([^"]*\/learn\/[^" ]*)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
const topicIds = html => [...html.matchAll(/data-topic-id="([^"]+)"/g)].map(match => match[1]);
const core = englishLessons.filter(lesson => !lesson.supplemental);
const mainPath = core.flatMap(lesson => lesson.activities.map(activity => ({ lesson, activity })));
const first = core[0];
const coreIds = mainPath.map(item => item.activity.id);
const topicHref = (lesson, activity) => `/english/learn/${lesson.id}?activity=${activity.id}`;
const firstOverview = render(Overview, { lesson: JSON.parse(JSON.stringify(first)) });
assert.ok(firstOverview.includes('LEVEL 1 · LESSON 1'), 'Serialized lessons retain their core number');
assert.deepEqual(links(render(Topics, { lesson: first })), [topicHref(first, first.activities[0])]);
assert.equal((render(Topics, { lesson: first }).match(/aria-disabled="true"/g) || []).length, first.activities.length - 1);
assert.ok(links(render(Dashboard)).includes(topicHref(first, first.activities[0])));
assert.equal((render(Dashboard).match(/class="en-hub-lesson /g) || []).length, Math.min(3, core.length), 'New children see only three nearby lesson cards');
assert.equal(links(render(Garden)).length, 0, 'Future words and books are not revealed by the empty garden');

for (const lesson of englishLessons) {
  const groups = getLessonTopicGroups(lesson);
  assert.ok(groups.every(group => group.end > group.start && group.end - group.start <= 3), `${lesson.id}: small nonempty activity groups`);
  assert.deepEqual(groups.flatMap(group => lesson.activities.slice(group.start, group.end).map(activity => activity.id)), lesson.activities.map(activity => activity.id), `${lesson.id}: groups cover every authored activity once in order`);
}

function journeyParts(html) {
  const [panel, all] = html.split('<details class="en-journey-all">');
  assert.ok(all, 'The full list is still available as an optional disclosure');
  const stops = panel.match(/<ol[^>]*class="en-journey-stops"[\s\S]*?<\/ol>/)?.[0];
  assert.ok(stops);
  return { panel, all, stops };
}
const groups = getLessonTopicGroups(first);
for (let frontier = 0; frontier <= first.activities.length; frontier++) {
  state.progress = { ...emptyProgress(), completed: first.activities.slice(0, frontier).map(activity => activity.id) };
  const before = structuredClone(state.progress);
  const { panel, all, stops } = journeyParts(render(Journey, { lesson: first }));
  const groupIndex = frontier === first.activities.length ? groups.length - 1 : groups.findIndex(group => frontier >= group.start && frontier < group.end);
  const { start, end } = groups[groupIndex];
  assert.deepEqual(topicIds(panel), first.activities.slice(start, end).map(activity => activity.id));
  assert.deepEqual(links(panel), first.activities.slice(start, Math.min(end, frontier + 1)).map(activity => topicHref(first, activity)), `Frontier ${frontier}: only reached activities can launch`);
  assert.deepEqual(topicIds(all), first.activities.map(activity => activity.id));
  assert.deepEqual(links(all), links(render(Topics, { lesson: first })));
  assert.equal((stops.match(/aria-current="step"/g) || []).length, frontier < first.activities.length ? 1 : 0);
  assert.deepEqual(state.progress, before, 'Rendering preserves progress');
}

const buildIndex = first.activities.findIndex(activity => activity.id === 'build-at');
state.progress = { ...emptyProgress(), completed: first.activities.slice(0, buildIndex).map(activity => activity.id) };
assert.ok(links(render(Dashboard)).includes('/english/learn/first-words?activity=build-at'), 'Primary action resumes the exact activity');
assert.ok(!links(render(Topics, { lesson: first })).some(href => href.endsWith('activity=build-sat')));
assert.equal(links(render(Topics, { lesson: core[1] })).length, 0, 'Later core content does not open across a gap');

state.progress = { ...emptyProgress(), completed: first.activities.map(activity => activity.id) };
assert.ok(links(render(Dashboard)).includes(topicHref(core[1], core[1].activities[0])), 'Optional formation does not delay the next core lesson');
const exploreS = englishLessons.find(lesson => lesson.id === 'explore-s');
assert.equal(links(render(Topics, { lesson: exploreS })).length, exploreS.activities.length, 'Introduced letters expose their optional practice');
assert.ok(render(Overview, { lesson: exploreS }).includes('LEVEL 1 · LETTER PRACTICE'));
const savedVideo = englishVideos['meet-s-cases'];
try {
  delete englishVideos['meet-s-cases'];
  assert.equal(links(render(Topics, { lesson: exploreS })).length, exploreS.activities.length, 'Authored placeholder practice is playable when a video is absent');
} finally { englishVideos['meet-s-cases'] = savedVideo; }

const garden = render(Garden);
assert.ok(garden.includes('<strong>at</strong>') && garden.includes('<strong>sat</strong>'));
assert.ok(!garden.includes('<strong>pin</strong>') && !garden.includes('<strong>pan</strong>'), 'Unlearned words stay out of the garden');
for (const href of links(garden)) {
  const url = new URL(href, 'https://test.local');
  assert.ok(englishAccess(state.progress).completed.has(url.searchParams.get('activity')), 'Garden replay links point only to completed sources');
}

state.ready = false;
assert.equal(links(render(Topics, { lesson: first })).length, 0);
assert.equal(links(render(Garden)).length, 0);
assert.equal((journeyParts(render(Journey, { lesson: first })).stops.match(/<button /g) || []).length, 0);
state.ready = true;
state.progress = { ...emptyProgress(), completed: ['meet-s', 'build-sat'] };
assert.deepEqual(links(render(Topics, { lesson: first })), first.activities.slice(0, 2).map(activity => topicHref(first, activity)), 'Out-of-order saved completion cannot open a gap');

state.progress = { ...emptyProgress(), completed: coreIds };
const terminal = render(Dashboard);
assert.ok(terminal.includes('Play again'));
assert.equal(englishAccess(state.progress).next, null);
assert.ok(!links(terminal).some(href => /level-[2-5]/.test(href)), 'Completion never routes into unauthored future stages');
const last = core.at(-1);
assert.ok(links(render(Overview, { lesson: last })).includes(topicHref(last, last.activities[0])), 'Replay explicitly starts at the first activity instead of a stale terminal resume state');
assert.ok(render(Garden).includes('Books we explored'), 'Completed books have replay destinations');

const authored = core.flatMap(lesson => lesson.activities).find(activity => getProgrammeActivity(activity.id) && programmePracticeWords(activity.id).length);
state.progress.evidence = [
  { activityId: authored.id, taskId: 'one', skillId: 'meaning', outcome: 'independent', at: '2026-09-30T09:00:00.000Z' },
  { activityId: authored.id, taskId: 'one', skillId: 'meaning', outcome: 'supported', at: '2026-09-29T09:00:00.000Z' },
  { activityId: authored.id, taskId: 'two', skillId: 'encode', outcome: 'supported', at: '2026-09-30T09:00:00.000Z' },
];
const parentBefore = structuredClone(state.progress);
const parent = render(Parent, { onShowLevels() {} });
assert.match(parent, /<strong>1<\/strong><h2>Independent on-screen tasks/);
assert.match(parent, /<strong>1<\/strong><h2>Tasks with support/);
assert.ok(parent.includes('Completed does not mean mastered.'));
assert.ok(parent.includes('An option for another day'));
const previews = links(parent).filter(href => new URL(href, 'https://test.local').searchParams.get('preview') === '1');
assert.equal(previews.length, englishLessons.reduce((count, lesson) => count + lesson.activities.length, 0), 'Every authored activity has an adult preview');
for (const href of previews) {
  const url = new URL(href, 'https://test.local');
  const lesson = englishLessons.find(item => url.pathname === `/english/learn/${item.id}`);
  assert.ok(lesson?.activities.some(activity => activity.id === url.searchParams.get('activity')), 'Each parent preview resolves to its own authored lesson/activity');
}
assert.deepEqual(state.progress, parentBefore, 'Inspecting or rendering the full programme never changes child records');

// An unfinished letter invitation resumes only at the exact place left open.
state.progress = {
  ...emptyProgress(), completed: first.activities.slice(0, 2).map(activity => activity.id),
  current: { [first.id]: 1 }, lastLesson: first.id,
  formationOffers: { 'practice-s': { status: 'pending', forms: [] } },
};
assert.equal(links(render(Dashboard))[0], topicHref(first, first.activities[1]), 'Home resumes the pending letter invitation before the next reading activity');
assert.equal(links(render(Overview, { lesson: first }))[0], topicHref(first, first.activities[1]), 'Lesson overview resumes the same invitation');
assert.deepEqual(topicIds(journeyParts(render(Journey, { lesson: first })).panel), first.activities.slice(0, 2).map(activity => activity.id), 'The current journey stop stays with its pending invitation');
assert.ok(render(Dashboard).includes('Make s too'));
state.progress.current[first.id] = 2;
assert.equal(links(render(Dashboard))[0], topicHref(first, first.activities[2]), 'An old pending invitation does not pull a child back after changing activity');
assert.equal(links(render(Overview, { lesson: first }))[0], topicHref(first, first.activities[2]));
state.progress.current[first.id] = 1;
state.progress.lastLesson = core[1].id;
assert.equal(links(render(Dashboard))[0], topicHref(first, first.activities[2]), 'An invitation in a different last-visited lesson does not replace the next reading step');

state.progress = { ...parentBefore, formationOffers: {
  'practice-s': { status: 'later', forms: [] },
  'find-a': { status: 'pending', forms: ['a'] },
  'find-t': { status: 'practised', forms: ['t', 'T'] },
} };
const formationParent = render(Parent, { onShowLevels() {} });
assert.match(formationParent, /<strong>2<\/strong><h2>Letter invitations practised/, 'A pending replay retains prior practice; Later with no forms adds none');
const formationDetails = formationParent.match(/<details class="en-parent-formation-record"[\s\S]*?<\/details>/)?.[0];
assert.ok(formationDetails?.includes('<strong>a</strong>') && formationDetails.includes('<strong>t · T</strong>'));
assert.ok(!formationDetails.includes('<strong>s</strong>'), 'Deferred invitations are not represented as practised forms');
assert.ok(formationParent.includes('not independent sentence reading'));
assert.deepEqual(getLessonTopicGroups(first).map(group => group.title), ['Meet s', 'Meet a', 'Meet t', 'Make and read', 'Our turn']);

const makerCount = html => (html.match(/aria-label="Sticker: Letter maker"/g) || []).length;
state.progress = { ...emptyProgress(), completed: [...first.activities.slice(0, 2).map(activity => activity.id), 'meet-s-cases', 'find-s-cases'], formationOffers: { 'practice-s': { status: 'later', forms: [] } } };
assert.equal(makerCount(render(Garden)), 0, 'Explore videos, case matching and Later with no forms cannot earn a writing sticker');
assert.ok(render(Parent, { onShowLevels() {} }).includes('2 / 6 activities completed'), 'Optional activity counts describe completion, not written forms');
assert.ok(!render(Parent, { onShowLevels() {} }).includes('activities practised'));
state.progress.formationOffers['practice-s'] = { status: 'pending', forms: ['s', 'S'] };
assert.equal(makerCount(render(Garden)), 1, 'A pending invitation with actual prior forms earns one writing participation sticker');
assert.deepEqual(state.progress.completed, [...first.activities.slice(0, 2).map(activity => activity.id), 'meet-s-cases', 'find-s-cases'], 'A form-backed badge does not add activity completion');
state.progress.completed.push('write-s-lowercase');
assert.equal(makerCount(render(Garden)), 2, 'A separately completed writing activity earns its own participation sticker');
const cIndex = mainPath.findIndex(item => item.activity.id === 'cme-meet-c');
state.progress = { ...emptyProgress(), completed: [...mainPath.slice(0, cIndex + 1).map(item => item.activity.id), 'forms-c'] };
assert.equal(makerCount(render(Garden)), 1, 'A generic formation activity completed through the writing guard earns a maker sticker');
state.progress = parentBefore;

// Verify group selections preserve original lesson indices without mounting an app.
function elements(node, predicate) {
  const found = [];
  React.Children.forEach(node, child => { if (!React.isValidElement(child)) return; if (predicate(child)) found.push(child); found.push(...elements(child.props.children, predicate)); });
  return found;
}
const selectedIndices = [];
const groupIndex = Math.min(1, groups.length - 1);
const groupTree = Topics({ lesson: first, groupIndex, showHeading: false, onSelect: index => selectedIndices.push(index) });
elements(groupTree, element => element.type === 'button').forEach(button => button.props.onClick());
assert.deepEqual(selectedIndices, Array.from({ length: groups[groupIndex].end - groups[groupIndex].start }, (_, offset) => groups[groupIndex].start + offset));
console.log(`Passed: ${englishLessons.length} lesson group coverage, every first-lesson frontier, child access, optional practice, media placeholders, completed-only word/book garden, terminal replay, ${previews.length} valid adult previews, distinct latest-task evidence counts, pending invitation resume and actual formation practice counts.`);
