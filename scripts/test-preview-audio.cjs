/* Deterministic media/network regression fixtures. No real browser, network or analytics calls. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const filename = path.join(__dirname, '../lib/preview-audio.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
}).outputText;
const flush = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};

function fixture(timeoutMs = 1000) {
  let now = 0, nextTimer = 0;
  const timers = new Map();
  const clock = {
    setTimeout(callback, ms = 0) {
      const id = ++nextTimer;
      timers.set(id, { callback, due: now + ms });
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    tick(ms) {
      const target = now + ms;
      for (;;) {
        const next = [...timers].filter(([, timer]) => timer.due <= target)
          .sort((a, b) => a[1].due - b[1].due)[0];
        if (!next) break;
        now = next[1].due;
        timers.delete(next[0]);
        next[1].callback();
      }
      now = target;
    },
  };
  const listeners = new Map(), plays = [], sourceChanges = [], addedListeners = [];
  const audio = {
    _src: '', preload: '', active: false, nextPlay: 'ok', pauses: 0,
    currentTime: 0, duration: 30, readyState: 0, paused: true, ended: false,
    get src() { return this._src; },
    set src(value) {
      this._src = value; this.currentTime = 0; this.ended = false; this.readyState = 0;
      sourceChanges.push(value);
    },
    get currentSrc() { return this._src; },
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
      addedListeners.push({ type, callback, src: this.src });
    },
    removeEventListener(type, callback) { listeners.get(type)?.delete(callback); },
    play() {
      assert.equal(this.active, false, 'a new clip must not overlap existing playback');
      plays.push(this.src);
      const outcome = this.nextPlay;
      this.nextPlay = 'ok';
      if (outcome === 'throw') throw new Error('Playback unavailable');
      if (outcome === 'reject') return Promise.reject(new Error('Playback blocked'));
      this.active = true; this.paused = false;
      return outcome === 'pending' ? new Promise(() => {}) : Promise.resolve();
    },
    pause() { this.active = false; this.paused = true; this.pauses += 1; },
    load() {},
    removeAttribute(name) { if (name === 'src') this._src = ''; },
    emit(type) {
      if (type === 'playing') { this.active = true; this.paused = false; this.readyState = 3; }
      if (type === 'ended' || type === 'error') { this.active = false; this.paused = true; }
      if (type === 'ended') this.ended = true;
      for (const callback of [...(listeners.get(type) || [])]) callback({ type, target: this, currentTarget: this });
    },
  };
  const requests = [], objectUrls = [], revokedUrls = [];
  const fetch = (url, options = {}) => {
    const request = { url, options, ...deferred() };
    requests.push(request);
    return request.promise;
  };
  const URLFixture = {
    createObjectURL(blob) {
      const url = `blob:preview-fixture-${objectUrls.length + 1}`;
      objectUrls.push({ url, blob }); return url;
    },
    revokeObjectURL(url) { revokedUrls.push(url); },
  };
  const moduleFixture = { exports: {} };
  const raf = callback => clock.setTimeout(() => callback(now), 16);
  const sandbox = {
    module: moduleFixture, exports: moduleFixture.exports,
    setTimeout: clock.setTimeout, clearTimeout: clock.clearTimeout,
    requestAnimationFrame: raf, cancelAnimationFrame: clock.clearTimeout,
    performance: { now: () => now }, fetch, AbortController, Blob, URL: URLFixture,
  };
  sandbox.window = sandbox;
  vm.runInNewContext(compiled, sandbox, { filename });
  const player = new moduleFixture.exports.PreviewAudio(() => audio, timeoutMs);
  async function resolveFetch(index = 0, ok = true) {
    requests[index].resolve({ ok, status: ok ? 200 : 503, blob: async () => new Blob(['fixture audio'], { type: 'audio/mpeg' }) });
    await flush();
  }
  return { player, audio, plays, sourceChanges, timers, listeners, addedListeners, clock, requests, objectUrls, revokedUrls, resolveFetch };
}

test('play starts in the tap call, but loading and visual cues wait for actual playback', async () => {
  const f = fixture(), order = [], states = [], times = [];
  f.audio.nextPlay = 'pending';
  const result = f.player.play([{ src: 's' }], index => order.push(index), {
    onState: state => states.push(state), onTime: (seconds, index) => times.push({ seconds, index }),
  });
  assert.deepEqual(f.plays, ['s'], 'play() must not await preload or readiness');
  assert.equal(states[0], 'loading');
  assert.deepEqual(order, []);
  f.clock.tick(400); await flush();
  assert.deepEqual(order, [], 'a delayed network response must not start the letter cue');
  f.audio.emit('playing');
  assert.deepEqual(order, [0]);
  assert.equal(states.at(-1), 'playing');
  f.audio.emit('playing');
  assert.deepEqual(order, [0], 'resuming a clip must not re-run its initial cue');
  f.audio.currentTime = 0.25; f.audio.emit('timeupdate');
  assert.ok(times.some(point => point.seconds === 0.25 && point.index === 0));
  f.audio.emit('ended');
  assert.equal(await result, true);
});

test('recorded clips play sequentially and each cue starts on its playing event', async () => {
  const f = fixture(), order = [];
  const result = f.player.play([{ src: 's' }, { src: 'a' }, { src: 't' }], index => order.push(index));
  assert.deepEqual(f.plays, ['s']); assert.deepEqual(order, []);
  f.audio.emit('playing'); assert.deepEqual(order, [0]);
  f.audio.emit('ended'); await flush();
  assert.deepEqual(f.plays, ['s', 'a']); assert.deepEqual(order, [0]);
  f.audio.emit('playing'); assert.deepEqual(order, [0, 1]);
  f.audio.emit('ended'); await flush();
  assert.deepEqual(f.plays, ['s', 'a', 't']);
  f.audio.emit('playing'); assert.deepEqual(order, [0, 1, 2]);
  f.audio.emit('ended');
  assert.equal(await result, true);
  assert.equal(f.timers.size, 0);
  for (const callbacks of f.listeners.values()) assert.equal(callbacks.size, 0);
});

test('the whole-word pause follows the final sound and does not advance the next cue early', async () => {
  const f = fixture(), order = [];
  const result = f.player.play([{ src: 't' }, { src: 'sat', pauseBefore: 600 }], index => order.push(index));
  f.audio.emit('playing'); f.audio.emit('ended'); await flush();
  f.clock.tick(599); await flush();
  assert.deepEqual(f.plays, ['t']); assert.deepEqual(order, [0]);
  f.clock.tick(1); await flush();
  assert.deepEqual(f.plays, ['t', 'sat']); assert.deepEqual(order, [0]);
  f.audio.emit('playing'); assert.deepEqual(order, [0, 1]);
  f.audio.emit('ended'); assert.equal(await result, true);
});

for (const failure of ['reject', 'throw', 'error', 'timeout']) {
  test(`${failure}: audio fails without advancing; a later user retry succeeds`, async () => {
    const f = fixture(), order = [];
    if (failure === 'reject' || failure === 'throw') f.audio.nextPlay = failure;
    const result = f.player.play([{ src: 's' }, { src: 'a' }], index => order.push(index));
    if (failure === 'error') f.audio.emit('error');
    if (failure === 'timeout') f.clock.tick(1000);
    assert.equal(await result, false);
    assert.deepEqual(f.plays, ['s']); assert.deepEqual(order, []);
    assert.equal(f.audio.active, false); assert.equal(f.timers.size, 0);
    const retry = f.player.play([{ src: 's' }], index => order.push(index));
    f.audio.emit('playing'); f.audio.emit('ended');
    assert.equal(await retry, true); assert.deepEqual(order, [0]);
  });
}

test('successful play() resolution alone does not complete a clip or advance the sequence', async () => {
  const f = fixture(); let settled = false;
  const result = f.player.play([{ src: 's' }, { src: 'a' }]).then(ok => { settled = true; return ok; });
  await flush();
  assert.equal(settled, false); assert.deepEqual(f.plays, ['s']);
  f.player.stop(); assert.equal(await result, false);
});

test('first playing event renews the loading deadline', async () => {
  const f = fixture(); let settled = false;
  const result = f.player.play([{ src: 'slow-start' }]).then(ok => { settled = true; return ok; });
  f.clock.tick(900); f.audio.emit('playing');
  f.clock.tick(900); await flush();
  assert.equal(settled, false, 'loading time must not consume the playback watchdog');
  f.audio.emit('ended'); assert.equal(await result, true);
});

test('a long recording can play beyond twelve seconds while media time keeps progressing', async () => {
  const f = fixture(); let settled = false;
  const result = f.player.play([{ src: 'long-blend' }]).then(ok => { settled = true; return ok; });
  f.audio.emit('playing');
  for (let i = 1; i <= 20; i += 1) {
    f.clock.tick(800); f.audio.currentTime = i * 0.8; f.audio.emit('timeupdate'); await flush();
    assert.equal(settled, false, `normal playback unexpectedly failed after ${i * 0.8}s`);
  }
  f.audio.emit('ended'); assert.equal(await result, true);
});

test('repeated timeupdate or playing events at a frozen media time do not hide a stall', async () => {
  const f = fixture();
  const result = f.player.play([{ src: 'stalled-blend' }]);
  f.audio.emit('playing');
  f.clock.tick(400); f.audio.emit('timeupdate'); f.audio.emit('playing');
  f.clock.tick(400); f.audio.emit('timeupdate'); f.audio.emit('playing');
  f.clock.tick(201);
  assert.equal(await result, false);
  assert.equal(f.audio.active, false); assert.equal(f.timers.size, 0);
});

test('waiting shows loading and resumed playback can finish without replaying the first cue', async () => {
  const f = fixture(), states = [], order = [];
  const result = f.player.play([{ src: 'buffered' }], index => order.push(index), { onState: state => states.push(state) });
  f.audio.emit('playing');
  f.audio.currentTime = 0.3; f.audio.emit('timeupdate'); f.audio.emit('waiting');
  assert.equal(states.at(-1), 'loading');
  f.clock.tick(300); f.audio.emit('playing');
  assert.equal(states.at(-1), 'playing'); assert.deepEqual(order, [0]);
  f.audio.currentTime = 0.6; f.audio.emit('timeupdate');
  f.audio.emit('ended'); assert.equal(await result, true);
});

test('animation-frame observation follows real currentTime and is cancelled on stop', async () => {
  const f = fixture(), times = [];
  const result = f.player.play([{ src: 'blend' }], undefined, { onTime: (seconds, index) => times.push({ seconds, index }) });
  f.audio.emit('playing');
  f.audio.currentTime = 0.45; f.clock.tick(20);
  assert.ok(times.some(point => point.seconds === 0.45 && point.index === 0));
  f.player.stop(); assert.equal(await result, false);
  const count = times.length;
  f.audio.currentTime = 4; f.clock.tick(1000); f.audio.emit('timeupdate');
  assert.equal(times.length, count); assert.equal(f.timers.size, 0);
});

test('old completion and cue callbacks cannot affect replacement playback', async () => {
  const f = fixture(), oldOrder = [], oldTimes = [];
  const old = f.player.play([{ src: 'old-s' }, { src: 'old-a' }], index => oldOrder.push(index), { onTime: t => oldTimes.push(t) });
  const stale = [...f.addedListeners];
  const replacement = f.player.play([{ src: 'new-sat' }]);
  assert.equal(await old, false);
  for (const listener of stale) listener.callback({ type: listener.type, target: f.audio });
  await flush();
  assert.deepEqual(f.plays, ['old-s', 'new-sat']);
  assert.deepEqual(oldOrder, []); assert.deepEqual(oldTimes, []);
  assert.equal(f.audio.active, true);
  f.audio.emit('playing'); f.audio.emit('ended'); assert.equal(await replacement, true);
});

for (const replace of [false, true]) {
  test(`${replace ? 'replacement' : 'stop'} cancels a pending pause without starting its clip later`, async () => {
    const f = fixture();
    const old = f.player.play([{ src: 's' }, { src: 'stale-word', pauseBefore: 600 }]);
    f.audio.emit('playing'); f.audio.emit('ended'); await flush();
    let replacement;
    if (replace) replacement = f.player.play([{ src: 'new-sat' }]); else f.player.stop();
    assert.equal(await old, false);
    f.clock.tick(700); await flush();
    assert.deepEqual(f.plays, replace ? ['s', 'new-sat'] : ['s']);
    if (replacement) { f.audio.emit('playing'); f.audio.emit('ended'); assert.equal(await replacement, true); }
    assert.equal(f.timers.size, 0);
  });
}

test('late timeout and error callbacks from an abandoned clip cannot stop a new clip', async () => {
  const f = fixture();
  const old = f.player.play([{ src: 'old-s' }]);
  const staleError = f.addedListeners.find(listener => listener.type === 'error').callback;
  const staleTimeout = [...f.timers.values()][0].callback;
  const replacement = f.player.play([{ src: 'new-sat' }]);
  assert.equal(await old, false);
  staleError(); staleTimeout(); await flush();
  assert.equal(f.audio.active, true);
  f.audio.emit('playing'); f.audio.emit('ended'); assert.equal(await replacement, true);
});

test('pending preload does not delay a tap and finishing preload never replaces a playing source', async () => {
  const f = fixture();
  f.player.preload(['/sound.mp3']);
  const result = f.player.play([{ src: '/sound.mp3' }]);
  assert.deepEqual(f.plays, ['/sound.mp3']);
  f.audio.emit('playing'); await f.resolveFetch();
  assert.equal(f.audio.src, '/sound.mp3');
  assert.deepEqual(f.sourceChanges, ['/sound.mp3']);
  f.audio.emit('ended'); assert.equal(await result, true);
  const cached = f.player.play([{ src: '/sound.mp3' }]);
  assert.ok(f.audio.src.startsWith('blob:'), 'a completed warm-up should benefit the next tap');
  f.audio.emit('playing'); f.audio.emit('ended'); assert.equal(await cached, true);
  f.player.dispose();
});

for (const failure of ['network', 'http']) {
  test(`${failure} preload failure leaves normal user-started playback available`, async () => {
    const f = fixture();
    f.player.preload(['/sound.mp3']);
    if (failure === 'network') { f.requests[0].reject(new Error('Network unavailable')); await flush(); }
    else await f.resolveFetch(0, false);
    const result = f.player.play([{ src: '/sound.mp3' }]);
    assert.deepEqual(f.plays, ['/sound.mp3']);
    f.audio.emit('playing'); f.audio.emit('ended'); assert.equal(await result, true);
    f.player.dispose();
  });
}

test('dispose cancels playback, aborts pending warm-up and releases cached object URLs', async () => {
  const f = fixture();
  f.player.preload(['/ready.mp3', '/pending.mp3']);
  await f.resolveFetch(0);
  const cachedUrl = f.objectUrls[0].url;
  const result = f.player.play([{ src: '/ready.mp3' }]);
  f.audio.emit('playing'); f.player.dispose();
  assert.equal(await result, false); assert.equal(f.audio.active, false);
  assert.equal(f.requests[1].options.signal.aborted, true);
  assert.ok(f.revokedUrls.includes(cachedUrl));
  assert.equal(f.timers.size, 0);
  await f.resolveFetch(1);
  for (const { url } of f.objectUrls) assert.ok(f.revokedUrls.includes(url), 'late warm-up must not leak a blob URL after disposal');
});
