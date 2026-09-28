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
let state = { progress: emptyProgress(), ready: true, offline: true, storageAvailable: true };
require('../components/english/EnglishProvider.tsx').useEnglish = () => state;
const Topics = require('../components/english/LessonTopics.tsx').default;
const Dashboard = require('../components/english/Dashboard.tsx').default;
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const links = html => [...html.matchAll(/href="([^"]*\/learn\/[^" ]*)"/g)].map(match => match[1]);

let topics = render(Topics, { lesson: englishLessons[0] });
assert.deepEqual(links(topics), ['/english/learn/first-words?activity=meet-s'], 'Only the first topic opens for a new reader');
assert.equal((topics.match(/aria-disabled="true"/g) || []).length, 11);
assert.ok(links(render(Dashboard)).includes('/english/learn/first-words?activity=meet-s'));

state.progress = { ...emptyProgress(), completed: englishLessons[0].activities.slice(0, 9).map(a => a.id) };
topics = render(Topics, { lesson: englishLessons[0] });
assert.equal(links(topics).length, 10, 'Previously reached topics remain available for replay');
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
assert.ok(waiting.includes('Practise again') && waiting.includes('Explore A is coming soon'));
assert.ok(!links(waiting).some(link => link.includes('explore-a')), 'The featured action offers useful revision while new content is being prepared');
englishVideos['meet-a-cases'] = savedVideo;
state.progress = { ...emptyProgress(), completed: englishLessons.slice(0, 3).flatMap(l => l.activities.map(a => a.id)) };
assert.ok(links(render(Dashboard)).includes('/english/learn/explore-t?activity=meet-t-cases'), 'Finishing A continues directly into T');
state.progress = { ...emptyProgress(), completed: englishLessons.flatMap(l => l.activities.map(a => a.id)) };
assert.ok(render(Dashboard).includes('Practise again'), 'Finishing the opening sequence offers revision');

const inPlayer = render(Topics, { lesson: englishLessons[1], currentId: 'write-s-capital', onSelect() {} });
assert.equal((inPlayer.match(/aria-current="step"/g) || []).length, 1, 'The player marks exactly one current topic');
assert.equal((inPlayer.match(/<button /g) || []).length, 6, 'The in-lesson menu uses the same reached-topic rules');
state.ready = false;
assert.equal(links(render(Topics, { lesson: englishLessons[0] })).length, 0, 'No topic can be launched while stored progress is loading');
console.log('Passed: fresh start, exact continuation, replay, locked previews, missing-media boundaries, in-lesson navigation and loading-state access.');
