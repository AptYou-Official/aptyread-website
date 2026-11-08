/* Isolated audio fixtures. No browser, microphone, network or analytics calls. */
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

function fixture() {
  let now = 0, nextTimer = 0;
  const timers = new Map();
  const clock = {
    setTimeout(callback, ms) {
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
  const listeners = new Map();
  const plays = [], addedListeners = [];
  const audio = {
    src: '', preload: '', active: false, nextPlay: 'ok', pauses: 0,
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
      this.active = true;
      return Promise.resolve();
    },
    pause() { this.active = false; this.pauses += 1; },
    emit(type) {
      if (type === 'ended' || type === 'error') this.active = false;
      for (const callback of [...(listeners.get(type) || [])]) callback();
    },
  };
  const moduleFixture = { exports: {} };
  vm.runInNewContext(compiled, {
    module: moduleFixture, exports: moduleFixture.exports,
    setTimeout: clock.setTimeout, clearTimeout: clock.clearTimeout,
  }, { filename });
  const player = new moduleFixture.exports.PreviewAudio(() => audio, 1000);
  return { player, audio, plays, timers, listeners, addedListeners, clock };
}

test('recorded clips play sequentially and onClip follows audible sequence order', async () => {
  const f = fixture(), order = [];
  const result = f.player.play([{ src: 's' }, { src: 'a' }, { src: 't' }], index => order.push(index));
  assert.deepEqual(f.plays, ['s']);
  assert.deepEqual(order, [0]);
  f.audio.emit('ended'); await flush();
  assert.deepEqual(f.plays, ['s', 'a']);
  assert.deepEqual(order, [0, 1]);
  f.audio.emit('ended'); await flush();
  assert.deepEqual(f.plays, ['s', 'a', 't']);
  assert.deepEqual(order, [0, 1, 2]);
  f.audio.emit('ended');
  assert.equal(await result, true);
  assert.equal(f.timers.size, 0);
  assert.equal(f.listeners.get('ended').size, 0);
  assert.equal(f.listeners.get('error').size, 0);
});

test('the whole-word pause starts after the final sound and does not overlap it', async () => {
  const f = fixture(), order = [];
  const result = f.player.play([{ src: 't' }, { src: 'sat', pauseBefore: 600 }], index => order.push(index));
  f.audio.emit('ended'); await flush();
  f.clock.tick(599); await flush();
  assert.deepEqual(f.plays, ['t']);
  assert.deepEqual(order, [0]);
  assert.equal(f.audio.active, false);
  f.clock.tick(1); await flush();
  assert.deepEqual(f.plays, ['t', 'sat']);
  assert.deepEqual(order, [0, 1]);
  f.audio.emit('ended');
  assert.equal(await result, true);
});

for (const failure of ['reject', 'throw', 'error', 'timeout']) {
  test(`${failure}: failed audio does not advance and a subsequent user retry can succeed`, async () => {
    const f = fixture(), order = [];
    if (failure === 'reject' || failure === 'throw') f.audio.nextPlay = failure;
    const result = f.player.play([{ src: 's' }, { src: 'a' }], index => order.push(index));
    if (failure === 'error') f.audio.emit('error');
    if (failure === 'timeout') f.clock.tick(1000);
    assert.equal(await result, false);
    assert.deepEqual(f.plays, ['s']);
    assert.deepEqual(order, [0]);
    assert.equal(f.audio.active, false);
    assert.equal(f.timers.size, 0);
    const retry = f.player.play([{ src: 's' }]);
    f.audio.emit('ended');
    assert.equal(await retry, true);
    assert.deepEqual(f.plays, ['s', 's']);
  });
}

test('stop settles an in-flight sequence and an old ended callback cannot advance a replacement', async () => {
  const f = fixture(), oldOrder = [];
  const old = f.player.play([{ src: 'old-s' }, { src: 'old-a' }], index => oldOrder.push(index));
  const staleEnded = f.addedListeners.find(listener => listener.type === 'ended').callback;
  f.player.stop();
  assert.equal(await old, false);
  const replacement = f.player.play([{ src: 'new-sat' }]);
  staleEnded(); await flush();
  assert.deepEqual(f.plays, ['old-s', 'new-sat']);
  assert.deepEqual(oldOrder, [0]);
  assert.equal(f.audio.active, true);
  assert.equal(f.listeners.get('ended').size, 1);
  f.audio.emit('ended');
  assert.equal(await replacement, true);
});

test('starting another sequence immediately cancels the playing sequence', async () => {
  const f = fixture();
  const old = f.player.play([{ src: 'old-s' }, { src: 'old-a' }]);
  const replacement = f.player.play([{ src: 'new-sat' }]);
  assert.equal(await old, false);
  assert.deepEqual(f.plays, ['old-s', 'new-sat']);
  f.audio.emit('ended');
  assert.equal(await replacement, true);
  assert.equal(f.timers.size, 0);
});

for (const replace of [false, true]) {
  test(`${replace ? 'replacement' : 'stop'} cancels a pending pause without starting its clip later`, async () => {
    const f = fixture();
    const old = f.player.play([{ src: 's' }, { src: 'stale-word', pauseBefore: 600 }]);
    f.audio.emit('ended'); await flush();
    let replacement;
    if (replace) replacement = f.player.play([{ src: 'new-sat' }]);
    else f.player.stop();
    assert.equal(await old, false);
    f.clock.tick(700); await flush();
    assert.deepEqual(f.plays, replace ? ['s', 'new-sat'] : ['s']);
    if (replacement) {
      f.audio.emit('ended');
      assert.equal(await replacement, true);
    }
    assert.equal(f.timers.size, 0);
  });
}

test('late timeout or error callbacks from an abandoned clip cannot cancel new playback', async () => {
  const f = fixture();
  const old = f.player.play([{ src: 'old-s' }]);
  const staleError = f.addedListeners.find(listener => listener.type === 'error').callback;
  const staleTimeout = [...f.timers.values()][0].callback;
  const replacement = f.player.play([{ src: 'new-sat' }]);
  assert.equal(await old, false);
  staleError(); staleTimeout(); await flush();
  assert.equal(f.audio.active, true);
  f.audio.emit('ended');
  assert.equal(await replacement, true);
});
