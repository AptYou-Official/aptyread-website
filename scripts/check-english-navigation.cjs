/* Navigation must preserve the learning frontier and never route into absent media. */
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
const { emptyProgress } = require('../lib/english-progress.ts');
let state = { progress: emptyProgress(), ready: true, offline: true, storageAvailable: true, update() { throw new Error('Browsing topics must not change learner progress'); } };
require('../components/english/EnglishProvider.tsx').useEnglish = () => state;
const Topics = require('../components/english/LessonTopics.tsx').default;
const Dashboard = require('../components/english/Dashboard.tsx').default;
const Overview = require('../components/english/LessonOverview.tsx').default;
const Journey = require('../components/english/LessonJourney.tsx').default;
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const links = html => [...html.matchAll(/href="([^"]*\/learn\/[^" ]*)"/g)].map(match => match[1]);

// Server-to-client props are serialized copies, not the curriculum's objects.
const firstOverview = render(Overview, { lesson: JSON.parse(JSON.stringify(englishLessons[0])) });
assert.ok(firstOverview.includes('LEVEL 1 · LESSON 1'), 'A serialized lesson keeps its number');
const thirdOverview = render(Overview, { lesson: JSON.parse(JSON.stringify(englishLessons[2])) });
assert.ok(thirdOverview.includes('First, play Lesson 2.'), 'Locked previews name the correct prerequisite');

let topics = render(Topics, { lesson: englishLessons[0] });
assert.deepEqual(links(topics), ['/english/learn/first-words?activity=meet-s'], 'Only the first topic opens for a new reader');
assert.equal((topics.match(/aria-disabled="true"/g) || []).length, 10);
assert.ok(links(render(Dashboard)).includes('/english/learn/first-words?activity=meet-s'));

state.progress = { ...emptyProgress(), completed: englishLessons[0].activities.slice(0, 8).map(a => a.id) };
topics = render(Topics, { lesson: englishLessons[0] });
assert.equal(links(topics).length, 9, 'Previously reached topics remain available for replay');
assert.ok(links(topics).some(link => link.endsWith('activity=build-at')));
assert.ok(!links(topics).some(link => link.endsWith('activity=build-sat')), 'The next word stays locked');
assert.ok(links(render(Dashboard)).some(link => link.endsWith('activity=build-at')), 'Continue opens the exact next topic');
assert.equal(links(render(Topics, { lesson: englishLessons[1] })).length, 0, 'Previewing a locked lesson never unlocks it');

state.progress = { ...emptyProgress(), completed: englishLessons.slice(0, 2).flatMap(l => l.activities.map(a => a.id)) };
assert.equal(links(render(Topics, { lesson: englishLessons[1] })).length, 6);
assert.deepEqual(links(render(Topics, { lesson: englishLessons[2] })), ['/english/learn/explore-a?activity=meet-a-cases'], 'Explore A now starts at its connected video');
assert.ok(links(render(Dashboard)).includes('/english/learn/explore-a?activity=meet-a-cases'));
assert.equal(links(render(Topics, { lesson: englishLessons[3] })).length, 0, 'Explore T stays locked until Explore A is complete');
const savedVideo = englishVideos['meet-a-cases'];
delete englishVideos['meet-a-cases'];
assert.equal(links(render(Topics, { lesson: englishLessons[2] })).length, 0, 'A future missing video remains unavailable');
const waiting = render(Dashboard);
assert.ok(waiting.includes('Play again'));
assert.ok(!waiting.toLowerCase().includes('coming soon'), 'Unfinished material is not advertised to learners');
assert.ok(!links(waiting).some(link => link.includes('explore-a')), 'The featured action offers useful revision when the next lesson is not published');
englishVideos['meet-a-cases'] = savedVideo;
state.progress = { ...emptyProgress(), completed: englishLessons.slice(0, 3).flatMap(l => l.activities.map(a => a.id)) };
assert.ok(links(render(Dashboard)).includes('/english/learn/explore-t?activity=meet-t-cases'), 'Finishing A continues directly into T');
state.progress = { ...emptyProgress(), completed: englishLessons.flatMap(l => l.activities.map(a => a.id)) };
assert.ok(render(Dashboard).includes('Play again'), 'Finishing the opening sequence offers revision');

const inPlayer = render(Topics, { lesson: englishLessons[1], currentId: 'write-s-capital', onSelect() {} });
assert.equal((inPlayer.match(/aria-current="step"/g) || []).length, 1, 'The player marks exactly one current topic');
assert.equal((inPlayer.match(/<button /g) || []).length, 6, 'The in-lesson menu uses the same reached-topic rules');
state.ready = false;
assert.equal(links(render(Topics, { lesson: englishLessons[0] })).length, 0, 'No topic can be launched while stored progress is loading');

// The compact journey is a different view of exactly the same first-lesson sequence.
const first = englishLessons[0];
const groupBounds = [[0, 2], [2, 5], [5, 8], [8, 11]];
const topicIds = html => [...html.matchAll(/data-topic-id="([^"]+)"/g)].map(match => match[1]);
const topicHref = activity => `/english/learn/first-words?activity=${activity.id}`;
function journeyParts(html) {
  const [panel, all] = html.split('<details class="en-journey-all">');
  assert.ok(all, 'The complete activity list remains available in a closed comparison disclosure');
  const stops = panel.match(/<ol class="en-journey-stops"[\s\S]*?<\/ol>/)?.[0];
  assert.ok(stops);
  return { panel, all, stops };
}
state.ready = true;
for (let frontier = 0; frontier <= first.activities.length; frontier++) {
  state.progress = { ...emptyProgress(), completed: first.activities.slice(0, frontier).map(activity => activity.id) };
  const snapshot = structuredClone(state.progress);
  const { panel, all, stops } = journeyParts(render(Journey, { lesson: first }));
  const currentGroup = frontier === 11 ? 3 : groupBounds.findIndex(([start, end]) => frontier >= start && frontier < end);
  const [start, end] = groupBounds[currentGroup];
  assert.deepEqual(topicIds(panel), first.activities.slice(start, end).map(activity => activity.id), `Frontier ${frontier} shows only its 2–3 nearby activities`);
  assert.deepEqual(links(panel), first.activities.slice(start, Math.min(end, frontier + 1)).map(topicHref), 'The panel opens completed topics and the exact next topic only');
  assert.deepEqual(topicIds(all), first.activities.map(activity => activity.id), 'All activities retains the complete authored sequence');
  assert.deepEqual(links(all), links(render(Topics, { lesson: first })), 'The comparison list retains the original access and replay rules');
  assert.equal((stops.match(/<li /g) || []).length, 4, 'The overview has four ordered picture stops');
  assert.equal((stops.match(/<button /g) || []).length, currentGroup + 1, 'Future stops are informational, not launch controls');
  assert.equal((stops.match(/aria-current="step"/g) || []).length, frontier < 11 ? 1 : 0, 'Only the true learning frontier is marked current');
  assert.equal((stops.match(/aria-pressed="true"/g) || []).length, 1, 'The visible panel has a separate selection state');
  assert.deepEqual(state.progress, snapshot, 'Rendering either view does not write completion or resume state');
}

state.progress = { ...emptyProgress(), completed: ['meet-s', 'build-sat'] };
let compact = journeyParts(render(Journey, { lesson: first }));
assert.equal((compact.stops.match(/<button /g) || []).length, 1, 'A completion beyond a gap cannot unlock a future stop');
assert.deepEqual(links(compact.panel), first.activities.slice(0, 2).map(topicHref));
assert.match(render(Overview, { lesson: first }), /aria-label="1 of 11 topics completed"/, 'Overview progress and journey use the same contiguous completion frontier');
state.ready = false;
compact = journeyParts(render(Journey, { lesson: first }));
assert.equal(links(compact.panel + compact.all).length, 0, 'Loading saved progress does not expose launch links');
assert.equal((compact.stops.match(/<button /g) || []).length, 0);
assert.equal((compact.stops.match(/aria-current="step"/g) || []).length, 0);
state.ready = true;
state.progress = { ...emptyProgress(), completed: ['meet-s', 'practice-s'] };
const meetAVideo = englishVideos['meet-a'];
try {
  delete englishVideos['meet-a'];
  compact = journeyParts(render(Journey, { lesson: first }));
  assert.deepEqual(topicIds(compact.panel), ['meet-a', 'practice-a', 'find-a']);
  assert.equal(links(compact.panel).length, 0, 'A missing next video cannot launch or unlock its later activities');
} finally { englishVideos['meet-a'] = meetAVideo; }

// Exercise the actual selection handlers with isolated local hooks. Browser QA
// still covers focus, layout and native details interaction.
function elements(node, predicate) {
  const found = [];
  React.Children.forEach(node, child => {
    if (!React.isValidElement(child)) return;
    if (predicate(child)) found.push(child);
    found.push(...elements(child.props.children, predicate));
  });
  return found;
}
let chosenGroup = null, generatedId = 0;
function journeyTree() {
  const originalState = React.useState, originalId = React.useId;
  React.useState = () => [chosenGroup, next => { chosenGroup = next; }];
  React.useId = () => `journey-test-${generatedId++}`;
  try { return Journey({ lesson: first }); }
  finally { React.useState = originalState; React.useId = originalId; }
}
state.progress = { ...emptyProgress(), completed: first.activities.slice(0, 8).map(activity => activity.id) };
const beforeSelection = structuredClone(state.progress);
const replayStop = elements(journeyTree(), element => element.type === 'button' && element.props['aria-label'] === 'Meet a, completed. Show activities')[0];
assert.ok(replayStop);
replayStop.props.onClick();
compact = journeyParts(renderToStaticMarkup(journeyTree()));
assert.deepEqual(topicIds(compact.panel), ['meet-a', 'practice-a', 'find-a'], 'Selecting a completed stop exposes its replay cards');
assert.match(compact.stops, /aria-label="Our first words, you are here. Show activities" aria-current="step" aria-pressed="false"/, 'Revisiting an earlier panel does not move the learning frontier');
assert.deepEqual(state.progress, beforeSelection, 'Changing the selected panel never changes learner progress');
state.progress = emptyProgress();
compact = journeyParts(renderToStaticMarkup(journeyTree()));
assert.deepEqual(topicIds(compact.panel), ['meet-s', 'practice-s'], 'A retained selection falls back safely if that group is no longer reached');

state.progress = { ...emptyProgress(), completed: first.activities.map(activity => activity.id) };
const selectedIndices = [];
const groupTree = Topics({ lesson: first, groupIndex: 1, showHeading: false, onSelect: index => selectedIndices.push(index) });
elements(groupTree, element => element.type === 'button').forEach(button => button.props.onClick());
assert.deepEqual(selectedIndices, [2, 3, 4], 'Grouped in-player navigation passes original lesson indices');
assert.ok(render(Overview, { lesson: first }).includes('en-lesson-journey'));
assert.ok(!render(Overview, { lesson: englishLessons[1] }).includes('en-lesson-journey'), 'The prototype remains scoped to the first lesson');
console.log('Passed: exact continuation/replay/access, every first-lesson journey boundary, compact future stops, full-list parity, local panel selection without progress changes, loading/missing-media safety and original grouped indices.');
