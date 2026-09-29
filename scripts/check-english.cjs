/* Focused model + service-worker integration checks. No browser automation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');
const base = process.env.PREVIEW_URL || 'http://localhost:3100';
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { englishLessons, englishLevels, englishVideos, englishSoundPracticeVideos, englishMedia } = require('../lib/english-curriculum.ts');
const { readEnglishProgress, emptyProgress, enterEnglishActivity, englishAccess, completeEnglishActivity } = require('../lib/english-progress.ts');

async function main() {
  assert.equal(englishLevels.length, 5);
  assert.deepEqual(englishLessons.map(l => l.activities.length), [11, 6, 6, 6, 13, 6, 6, 6]);
  const ids = englishLessons.flatMap(l => l.activities.map(a => a.id));
  assert.equal(new Set(ids).size, 60);
  assert.equal(ids.includes('find-s'), false, 'The duplicate Touch and Say s topic is removed');
  assert.equal(Object.values(englishVideos).length, 12);
  for (const activity of englishLessons.flatMap(lesson => lesson.activities).filter(activity => activity.kind === 'video')) assert.ok(englishVideos[activity.id] || activity.audioIntroduction || activity.practicePreview, `Teaching video or explicit temporary audio introduction: ${activity.id}`);
  for (const value of Object.values(englishVideos)) assert.notEqual(value.landscape, value.portrait);
  for (const activity of englishLessons.flatMap(lesson => lesson.activities).filter(item => item.kind === 'sound')) {
    const clip = englishSoundPracticeVideos[activity.letter];
    assert.equal(clip.src, `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-sound-video-clips/sound-${activity.letter}.mp4`, 'Each sound practice uses its matching mouth model in the shared folder');
    assert.ok(fs.existsSync(path.join(__dirname, '../public', clip.poster)), 'Every practice model has a local poster');
    assert.ok(fs.existsSync(path.join(__dirname, '../public', englishMedia[`sound-${activity.letter}`])), 'Each practice has its own recorded phoneme fallback');
  }
  const saved = { ...emptyProgress(), completed: ['build-sat', 'build-sat', 'unknown'], current: { 'first-words': 10, 'explore-s': 99 }, words: { sat: { stage: 0, built: 'sa', reads: 0, answers: {} } } };
  const restored = readEnglishProgress(JSON.stringify(saved));
  assert.equal(restored.words.sat.built, 'sa', 'Partial letter construction survives reload');
  assert.deepEqual(restored.completed, ['build-sat'], 'Replay cannot inflate completion');
  assert.deepEqual(restored.current, { 'first-words': 10 });
  const migrated = readEnglishProgress(JSON.stringify({ ...emptyProgress(), completed: ['meet-s', 'practice-s', 'find-s'], current: { 'first-words': 3 } }));
  assert.deepEqual(migrated.completed, ['meet-s', 'practice-s'], 'Removed find-s completion is retired cleanly');
  assert.equal(migrated.current['first-words'], 2, 'Older positions move past the removed find-s topic');
  for (const raw of ['null', '{}', 'broken', '{"version":7}', '[]']) assert.deepEqual(readEnglishProgress(raw), emptyProgress());
  for (const bad of [{ stage: 1, built: 'sa', reads: 0, answers: {} }, { stage: 5, built: 'sat', reads: 1, answers: {} }, { stage: 5, built: 'sat', reads: 2, answers: {} }]) {
    assert.equal(readEnglishProgress(JSON.stringify({ ...emptyProgress(), words: { sat: bad } })).words.sat, undefined);
  }
  const finished = { stage: 5, built: 'sat', reads: 2, answers: { mat: [false, true], bench: [true] } };
  assert.deepEqual(readEnglishProgress(JSON.stringify({ ...emptyProgress(), words: { sat: finished } })).words.sat, finished);
  const initial = emptyProgress();
  assert.deepEqual([...englishAccess(initial).activities], ['meet-s'], 'Only the first topic starts unlocked');
  assert.deepEqual([...englishAccess(initial).lessons], ['first-words'], 'Only the first lesson starts unlocked');
  assert.equal(enterEnglishActivity(initial, 'first-words', 'build-sat'), initial, 'A direct URL cannot bypass prerequisites');
  assert.equal(enterEnglishActivity(initial, 'explore-a', 'write-a-capital'), initial, 'A locked lesson cannot change progress');
  assert.equal(completeEnglishActivity(initial, 'build-sat'), initial, 'A locked topic cannot be marked complete');
  assert.deepEqual([...englishAccess(restored).activities], ['meet-s'], 'Older out-of-order practice cannot unlock gaps');
  assert.equal(enterEnglishActivity(restored, 'first-words').current['first-words'], 0, 'An old saved position cannot bypass the path');
  let sequence = initial;
  for (let index = 0; index < englishLessons[0].activities.length; index++) {
    const activity = englishLessons[0].activities[index];
    assert.equal(englishAccess(sequence).next.activity.id, activity.id);
    assert.equal(englishAccess(sequence).lessons.has('explore-s'), false, 'The next lesson stays locked until the last topic');
    if (activity.kind === 'review') {
      assert.equal(completeEnglishActivity(sequence, activity.id), sequence, 'The new review cannot complete before its reading turns');
      sequence = { ...sequence, firstWords: { stage: 6, heard: ['at', 'sat'], matched: ['at', 'sat'], read: ['at', 'sat'], questionOrders: [true, false], readAtFirst: true } };
    }
    sequence = completeEnglishActivity(sequence, activity.id);
    assert.equal(sequence.completed.length, index + 1, 'One completion unlocks one new topic');
  }
  assert.equal(englishAccess(sequence).next.activity.id, 'meet-s-cases');
  assert.equal(englishAccess(sequence).lessons.has('explore-s'), true, 'Completing Lesson 1 unlocks Lesson 2');
  assert.equal(englishAccess(sequence).lessons.has('explore-a'), false);
  assert.equal(englishAccess(sequence).activities.has('find-s-cases'), false);
  let lessonTwo = sequence;
  for (const activity of englishLessons[1].activities) {
    assert.equal(englishAccess(lessonTwo).next.activity.id, activity.id, 'Lesson 2 opens one topic at a time');
    lessonTwo = completeEnglishActivity(lessonTwo, activity.id);
  }
  assert.equal(lessonTwo.completed.length, 17, 'Both opening lessons can now be completed');
  assert.equal(englishAccess(lessonTwo).next.activity.id, 'meet-a-cases');
  const savedVideo = englishVideos['meet-a-cases'];
  delete englishVideos['meet-a-cases'];
  assert.equal(completeEnglishActivity(lessonTwo, 'meet-a-cases'), lessonTwo, 'An unavailable video cannot unlock the next topic');
  englishVideos['meet-a-cases'] = savedVideo;
  let openingSequence = lessonTwo;
  for (const lesson of englishLessons.slice(2, 4)) {
    for (const activity of lesson.activities) {
      assert.equal(englishAccess(openingSequence).next.activity.id, activity.id, 'A and T retain sequential topic unlocking');
      openingSequence = completeEnglishActivity(openingSequence, activity.id);
    }
  }
  assert.equal(openingSequence.completed.length, 29, 'All four opening lessons can be completed');
  assert.equal(englishAccess(openingSequence).next.activity.id, 'meet-p');
  assert.equal(completeEnglishActivity(sequence, 'meet-s').completed.length, 11, 'Revision cannot inflate completion');
  assert.equal(enterEnglishActivity(sequence, 'first-words', 'meet-a').current['first-words'], 2, 'Reached topics remain open for revision');
  const satReady = { ...restored, completed: englishLessons[0].activities.slice(0, 10).map(item => item.id), current: { 'first-words': 0 } };
  const direct = enterEnglishActivity(satReady, 'first-words', 'build-sat');
  assert.equal(direct.current['first-words'], 9, 'An unlocked topic can be selected directly');
  assert.equal(direct.words.sat.built, 'sa', 'An unfinished word resumes');
  const completedWord = { ...direct, completed: [...direct.completed, 'build-sat'], words: { sat: finished } };
  const replay = enterEnglishActivity(completedWord, 'first-words', 'build-sat');
  assert.equal(replay.words.sat, undefined, 'A completed word opens ready for another try');
  assert.deepEqual(replay.completed, completedWord.completed, 'Replay keeps completion and subsequent unlocks');
  assert.equal(englishAccess(replay).activities.has('our-first-words'), true);
  assert.equal(completedWord.words.sat, finished, 'Selection does not mutate previous progress');
  assert.equal(enterEnglishActivity(completedWord, 'first-words').words.sat, finished, 'Ordinary continue retains the saved stage');
  assert.equal(enterEnglishActivity(completedWord, 'first-words', 'invalid-topic').words.sat, finished, 'Invalid topic falls back to resume');
  const later = { ...sequence, completed: englishLessons.slice(0, 2).flatMap(lesson => lesson.activities.map(item => item.id)) };
  assert.equal(englishAccess(later).next.activity.id, 'meet-a-cases', 'The same sequence applies across later lessons');
  assert.equal(englishAccess(later).lessons.has('explore-t'), false);
  const allDone = { ...initial, completed: ids };
  assert.equal(englishAccess(allDone).next, null);
  assert.equal(englishAccess(allDone).activities.size, 60);
  assert.equal('mastered' in restored, false);
  for (const letter of ['s', 'a', 't', 'p', 'i', 'n']) assert.ok(fs.statSync(path.join('public/english/media', `${letter}-sound.mp3`)).size > 1000);
  if (process.argv.includes('--model-only')) { console.log('Sequential unlocking, locked links, revision, resume and replay checks passed.'); return; }

  const manifestResponse = await fetch(base + '/english/manifest.webmanifest');
  assert.equal(manifestResponse.status, 200);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.scope, '/english/'); assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.some(i => i.purpose === 'maskable'));
  const workerResponse = await fetch(base + '/english/sw.js');
  assert.match(workerResponse.headers.get('cache-control'), /no-store/);
  const dashboard = await (await fetch(base + '/english/dashboard')).text();
  assert.ok(!dashboard.includes('href="/english/learn/first-words?activity=build-sat"'), 'The initial dashboard has no locked sat link');
  assert.ok(!dashboard.includes('href="/english/learn/explore-s"'), 'The initial dashboard has no locked lesson link');
  assert.match(dashboard, /View topics/);


  let offline = false;
  const handlers = {};
  const cachesByName = new Map();
  const absolute = input => new URL(typeof input === 'string' ? input : input.url, base).href;
  const network = async input => {
    if (offline) throw new TypeError('Network is offline');
    return fetch(absolute(input));
  };
  const caches = {
    async open(name) {
      if (!cachesByName.has(name)) cachesByName.set(name, new Map());
      const entries = cachesByName.get(name);
      return {
        async put(key, response) { entries.set(absolute(key), response.clone()); },
        async match(key) { return entries.get(absolute(key))?.clone(); },
        async addAll(keys) { for (const key of keys) { const response = await network(key); assert.ok(response.ok, `${key} must be available for offline use`); entries.set(absolute(key), response.clone()); } },
      };
    },
    async match(key) { for (const entries of cachesByName.values()) { const response = entries.get(absolute(key)); if (response) return response.clone(); } },
    async keys() { return [...cachesByName.keys()]; },
    async delete(key) { return cachesByName.delete(key); },
  };
  class WorkerRequest extends Request { constructor(input, options) { super(absolute(input), options); } }
  let claimed = false;
  const self = { location: { origin: base }, clients: { claim: async () => { claimed = true; } }, addEventListener: (name, handler) => { handlers[name] = handler; } };
  vm.runInNewContext(fs.readFileSync('public/english/sw.js', 'utf8'), { self, caches, fetch: network, Request: WorkerRequest, Response, URL, Set, Error });
  let installation;
  handlers.install({ waitUntil: promise => { installation = promise; } });
  await installation;
  const cached = [...cachesByName.values()][0];
  assert.ok([...cached.keys()].some(url => url.endsWith('.woff2')), 'Offline app includes the reading font');
  assert.equal([...cached.keys()].filter(url => url.endsWith('.ttf')).length, 2, 'Both bundled Andika weights are available offline');
  assert.ok(cached.has(base + '/english/fonts/Andika-OFL.txt'), 'The font licence is included with the offline app');
  assert.ok([...cached.keys()].some(url => url.endsWith('.css')), 'Offline app includes styles');
  assert.ok([...cached.keys()].some(url => url.endsWith('.js')), 'Offline app includes interactive scripts');
  await caches.open('unrelated-malayalam-cache'); await caches.open('apty-english-obsolete');
  let activation; handlers.activate({ waitUntil: p => { activation = p; } }); await activation;
  assert.ok(claimed); assert.ok(cachesByName.has('unrelated-malayalam-cache')); assert.ok(!cachesByName.has('apty-english-obsolete'));
  offline = true;
  function request(url, mode = 'navigate', headers = {}) {
    let response;
    handlers.fetch({ request: { url: base + url, method: 'GET', mode, headers: new Headers(headers) }, respondWith: p => { response = p; } });
    return response;
  }
  for (const url of ['/english/dashboard', '/english/lesson/first-words', '/english/lesson/explore-s', '/english/lesson/explore-a', '/english/lesson/explore-t', '/english/lesson/more-words', '/english/lesson/explore-p', '/english/lesson/explore-i', '/english/lesson/explore-n', '/english/learn/first-words?activity=build-sat', '/english/learn/explore-s', '/english/learn/explore-a', '/english/learn/explore-t', '/english/learn/more-words', '/english/learn/explore-p', '/english/learn/explore-i', '/english/learn/explore-n']) {
    const response = await request(url); assert.equal(response.status, 200); assert.match(await response.text(), /AptyRead/);
  }
  const fallback = await request('/english/not-saved'); assert.match(await fallback.text(), /A little pause/);
  for (const url of ['/api/admin/verify', '/admin/users', '/malayalam/dashboard', '/']) assert.equal(request(url), undefined, 'Worker does not intercept unrelated pages');
  assert.equal(request('/english/dashboard?_rsc=x', 'cors', { RSC: '1' }), undefined);
  assert.ok(![...cached.keys()].some(url => url.endsWith('.mp4')), 'Optional word videos are not downloaded during installation');
  for (const word of ['at', 'sat']) {
    const url = `/english/media/${word}-pronunciation-v1.mp4`;
    assert.equal(request(url, 'cors', { Range: 'bytes=0-99' }), undefined, 'Video ranges pass through to the server without entering the offline cache');
    assert.ok(fs.statSync(path.join('public', url)).size < 1000000, 'Each short model stays below the agreed 1 MB budget');
    const videoRange = await fetch(base + url, { headers: { Range: 'bytes=0-99' } });
    assert.equal(videoRange.status, 206);
    assert.match(videoRange.headers.get('content-type'), /video\/mp4/);
    assert.equal((await videoRange.arrayBuffer()).byteLength, 100);
  }
  const audio = await request('/english/media/s-sound.mp3', 'cors', { Range: 'bytes=0-99' });
  assert.equal(audio.status, 206); assert.equal((await audio.arrayBuffer()).byteLength, 100);
  const invalid = await request('/english/media/s-sound.mp3', 'cors', { Range: 'bytes=999999-' }); assert.equal(invalid.status, 416);
  console.log(JSON.stringify({ result: 'passed', cachedResources: cached.size, checks: ['60 curriculum steps', 'sequential topic and lesson unlocking', 'locked routes and placeholders', 'revision, resume and replay', 'portrait and landscape IDs', 'partial-word resume', 'corrupt progress recovery', 'duplicate completion protection', 'word-state validation', 'recorded phoneme assets', 'manifest and worker headers', 'production offline package with fonts/scripts/styles', 'offline lesson routes and fallback', 'cache isolation', 'RSC exclusion', 'audio byte ranges'] }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
