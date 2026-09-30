/* Existing progress, guided previews, new routes and writing guides. */
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
const { englishLessons, englishVideos, englishPaperWritingVideos } = require('../lib/english-curriculum.ts');
const { emptyProgress, englishAccess, completeEnglishActivity, readEnglishProgress, enterEnglishActivity } = require('../lib/english-progress.ts');
const { englishNarration } = require('../lib/english-narration.ts');
const guides = require('../lib/english-tracing.json');
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
let progress = { ...emptyProgress(), completed: englishLessons.filter(l => ['first-words', 'more-words'].includes(l.id)).flatMap(l => l.activities.map(a => a.id)), lastLesson: 'more-words' };
require('../components/english/EnglishProvider.tsx').useEnglish = () => ({ progress, ready: true, offline: false, storageAvailable: true });
const Topics = require('../components/english/LessonTopics.tsx').default;
const Dashboard = require('../components/english/Dashboard.tsx').default;
const Video = require('../components/english/LessonVideo.tsx').default;
const Trace = require('../components/english/TracePad.tsx').default;
assert.equal(progress.completed.length, 29);
progress = readEnglishProgress(JSON.stringify(progress));
assert.equal(englishAccess(progress).next.activity.id, 'first-book-story', 'Reading continues to the tiny book');
assert.equal(enterEnglishActivity(progress, 'explore-i').lastLesson, 'explore-i', 'Known-letter formation is supplementary and can be selected directly');
const publicHome = render(Dashboard);
assert.ok(publicHome.includes('Play again'), 'Home retains revision alongside the next reading lesson');
const expected = ['explore-p', 'explore-i', 'explore-n'];
const exploreLessons = englishLessons.filter(l => expected.includes(l.id));
assert.deepEqual(exploreLessons.map(l => l.id), expected);
for (const lesson of exploreLessons) {
  assert.equal(lesson.activities.length, 6);
  const topics = render(Topics, { lesson });
  assert.ok(topics.includes(`href="/english/learn/${lesson.id}?activity=${lesson.activities[0].id}"`));
  assert.equal((topics.match(/aria-disabled="true"/g) || []).length, 0, 'All known-letter side topics are available');
  for (const activity of lesson.activities) {
    assert.equal(englishAccess(progress).next.activity.id, 'first-book-story', 'Optional writing never diverts the reading frontier');
    assert.ok(englishAccess(progress).activities.has(activity.id));
    if (activity.kind === 'video') {
      assert.equal(englishVideos[activity.id], undefined);
      assert.equal(activity.practicePreview, true);
      const html = render(Video, { activity, onComplete() {} });
      assert.ok(html.includes('Watch and try') && html.includes('Let’s practise'));
      assert.ok(!html.includes('<iframe') && !html.includes('I watched and tried'), 'No false video or watched-video action');
    }
    const before = progress.completed.length;
    progress = completeEnglishActivity(progress, activity.id);
    assert.equal(progress.completed.length, before + 1);
    assert.deepEqual(readEnglishProgress(JSON.stringify(progress)), progress, 'Preview provenance survives reload');
    assert.deepEqual(completeEnglishActivity(progress, activity.id), progress, 'Replaying does not duplicate completion');
  }
}
assert.equal(progress.completed.length, 47);
assert.equal(progress.practicePreviews.length, 9);
assert.equal(englishAccess(progress).next.activity.id, 'first-book-story');
assert.equal(progress.audioIntroductions, undefined, 'Preview completion is distinct from recorded-sound introductions');
const polluted = readEnglishProgress(JSON.stringify({ ...progress, practicePreviews: [...progress.practicePreviews, 'meet-s', 'unknown', 'meet-p-cases'] }));
assert.deepEqual(polluted.practicePreviews, progress.practicePreviews);
const beforeReplay = progress.practicePreviews.slice();
englishVideos['meet-p-cases'] = { portrait: 'future-portrait', landscape: 'future-landscape' };
const actual = render(Video, { activity: exploreLessons[0].activities[0], onComplete() {} });
assert.ok(actual.includes('en-video-loading') && !actual.includes('I watched and tried'), 'Approved IDs automatically use the automatic player');
assert.deepEqual(readEnglishProgress(JSON.stringify(progress)).practicePreviews, beforeReplay, 'Adding real media preserves the honest earlier record');
delete englishVideos['meet-p-cases'];
for (const letter of 'PpIiNn') {
  const big = letter === letter.toUpperCase();
  const base = letter.toLowerCase();
  assert.ok(englishNarration[`paper-write-${big ? 'big' : 'small'}-${base}`]);
  assert.ok(englishNarration[`cases-${big ? 'big' : 'small'}-${base}`]);
  assert.ok(fs.statSync(path.join(__dirname, '../public', englishPaperWritingVideos[letter].poster)).size > 1000);
  assert.ok(render(Trace, { letter, onComplete() {}, onListen() {} }).includes(guides[letter].path));
}
assert.ok(guides.p.descender > guides.p.baseline && guides.p.baseline > guides.p.midline, 'Lowercase p has a visible descender zone');
assert.ok(guides.N.path.indexOf('M 75 10 L 75 90') < guides.N.path.indexOf('M 25 10 L 75 90'), 'N follows the clip: left stem, right stem, diagonal');
assert.ok(guides.i.path.endsWith('L 50 20.01'), 'Lowercase i ends with a dot rather than a drawn ring');
console.log('Passed: 29 core topics plus optional Explore P/I/N, honest preview provenance and replacement, independent side-practice access, six writing assets and letter-specific guides.');
