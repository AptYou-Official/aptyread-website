/* Isolated worker/config fixtures. Never opens browser caches or saved reader data. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const { getPathMatch } = require('next/dist/shared/lib/router/utils/path-match');
const { prepareDestination } = require('next/dist/shared/lib/router/utils/prepare-destination');
const root = path.resolve(__dirname, '..');
const configPromise = import(pathToFileURL(path.join(root, 'next.config.mjs')).href).then(module => module.default);

function workerFixture(options = {}) {
  const handlers = new Map();
  const calls = [];
  const storage = new Map([
    ['apty.english.progress.v1', 'fixture reader progress'],
    ['parent-preference', 'fixture preference'],
  ]);
  const forbiddenStorage = new Proxy({}, { get() { throw new Error('Reader storage must not be accessed'); } });
  vm.runInNewContext(fs.readFileSync(path.join(root, 'public/english/sw.js'), 'utf8'), {
    self: {
      addEventListener: (type, handler) => handlers.set(type, handler),
      skipWaiting: async () => { calls.push('skipWaiting'); },
      clients: {claim: async () => { calls.push('claim'); }},
      registration: {unregister: async () => { calls.push('unregister'); return true; }},
    },
    caches: {
      keys: async () => {
        if (options.failKeys) throw new Error('Cache access blocked');
        return options.names || [];
      },
      delete: async name => {
        calls.push(`delete:${name}`);
        if (options.failDelete) throw new Error('Cache deletion blocked');
        return true;
      },
    },
    localStorage: forbiddenStorage,
    indexedDB: forbiddenStorage,
    fetch: () => { throw new Error('Worker must not fetch or modify account data'); },
  }, {filename:'public/english/sw.js'});
  async function dispatch(type) {
    const waits = [];
    handlers.get(type)({waitUntil: promise => waits.push(promise)});
    assert.equal(waits.length, 1, `${type} must remain alive until the work completes`);
    await Promise.all(waits);
  }
  return {handlers, calls, storage, dispatch};
}

test('retirement worker installs immediately and has no fetch interception', async () => {
  const worker = workerFixture();
  assert.deepEqual([...worker.handlers.keys()].sort(), ['activate','install']);
  await worker.dispatch('install');
  assert.deepEqual(worker.calls, ['skipWaiting']);
});

test('activation removes only disposable English caches and unregisters its own registration', async () => {
  const worker = workerFixture({names:[
    'apty-english-v48-clear-activities-fit', 'apty-english-old-preview',
    'apty-malayalam-v1', 'another-app-cache', 'apty-english', 'parent-preferences',
  ]});
  const originalProgress = [...worker.storage];
  await worker.dispatch('activate');
  assert.deepEqual(worker.calls, [
    'delete:apty-english-v48-clear-activities-fit', 'delete:apty-english-old-preview',
    'claim', 'unregister',
  ]);
  assert.deepEqual([...worker.storage], originalProgress);
});

test('activation still unregisters when cache enumeration or deletion is blocked', async () => {
  for (const options of [{failKeys:true},{names:['apty-english-old-preview'],failDelete:true}]) {
    const worker = workerFixture(options);
    await worker.dispatch('activate');
    assert.deepEqual(worker.calls.slice(-2), ['claim','unregister']);
  }
});

test('English redirects preserve query strings and leave the worker URL directly reachable', async () => {
  const config = await configPromise;
  const redirects = await config.redirects();
  function redirectFor(address) {
    const url = new URL(address, 'https://www.aptyread.ai');
    for (const rule of redirects) {
      const params = getPathMatch(rule.source, {strict:true, removeUnnamedParams:true})(url.pathname);
      if (params === false) continue;
      const destination = prepareDestination({
        destination:rule.destination,
        params,
        query:Object.fromEntries(url.searchParams),
        appendParamsToQuery:false,
      }).parsedDestination;
      return {rule, destination};
    }
    return null;
  }
  for (const pathname of ['/english','/english/','/english/dashboard','/english/learn/first-words','/english/sw.js/extra']) {
    const result = redirectFor(`${pathname}?utm_source=fixture&gclid=fixture-click`);
    assert(result, pathname);
    assert.equal(result.rule.permanent, false);
    assert.equal(result.destination.pathname, '/download');
    assert.deepEqual(result.destination.query, {utm_source:'fixture',gclid:'fixture-click'});
  }
  for (const address of ['/english/sw.js','/english/sw.js?version=fixture','/englishish/lesson']) assert.equal(redirectFor(address), null, address);
  const workerHeaders = (await config.headers()).filter(rule => getPathMatch(rule.source)('/english/sw.js') !== false).flatMap(rule => rule.headers);
  assert(workerHeaders.some(header => header.key.toLowerCase() === 'cache-control' && header.value.includes('no-store')));
  assert(fs.statSync(path.join(root, 'public/english/sw.js')).isFile(), 'Worker must remain a static JavaScript file');
});
