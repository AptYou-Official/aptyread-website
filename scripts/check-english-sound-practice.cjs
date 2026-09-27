/* Media handoffs are controlled so stale callbacks and interrupted holds are testable. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { createSoundPracticeSession } = require('../lib/english-sound-practice.ts');
const tick = () => new Promise(resolve => setImmediate(resolve));
function setup() {
  const cues = [], events = [], pending = [], loops = [];
  let videoBlocked = false;
  const session = createSoundPracticeSession({
    say: id => { cues.push(id); return new Promise(resolve => pending.push(resolve)); },
    sound: () => { events.push('sound'); return new Promise(resolve => pending.push(resolve)); },
    stopAudio: () => events.push('stop-audio'),
    playVideo: loop => { loops.push(loop); events.push('play-video'); return videoBlocked ? Promise.reject(new Error('blocked')) : Promise.resolve(); },
    pauseVideo: () => events.push('pause-video'),
    changed: state => events.push(state.phase),
  });
  return { session, cues, events, pending, loops, block: () => { videoBlocked = true; } };
}
async function main() {
  const t = setup(), s = t.session;
  let run = s.watch();
  assert.deepEqual(t.cues, ['practice-watch']);
  assert.equal(t.events.includes('play-video'), false, 'Watch narration finishes before the model');
  t.pending.shift()(true); await run;
  assert.equal(s.snapshot().phase, 'watch');
  assert.deepEqual(t.loops, [false], 'The initial model plays exactly once');
  s.videoEnded();
  assert.equal(s.snapshot().phase, 'try');
  assert.equal(t.cues.at(-1), 'practice-now-try');
  assert.equal(s.snapshot().looping, false, 'The model is quiet throughout Now you try');
  assert.deepEqual(t.loops, [false]);
  assert.equal(s.beginHold(), true, 'A child can interrupt the turn prompt');
  assert.deepEqual(t.events.slice(-3), ['stop-audio', 'pause-video', 'holding']);
  s.videoEnded(); t.pending.shift()(false); await tick();
  assert.equal(s.snapshot().phase, 'holding', 'Stale media events cannot restart the model or narration');
  assert.deepEqual(t.loops, [false], 'An interrupted prompt cannot start a late loop');
  s.endHold(); s.endHold();
  assert.equal(s.snapshot().turns, 1, 'Release counts exactly once');
  assert.equal(s.snapshot().phase, 'between', 'The next model waits for a child action');
  assert.equal(s.beginHold(), false);

  run = s.watch(); assert.equal(t.cues.at(-1), 'practice-watch-again');
  t.pending.shift()(true); await run;
  assert.equal(s.beginHold(), true, 'Holding also stops an in-progress model');
  s.cancelHold(); s.endHold();
  assert.equal(s.snapshot().turns, 1, 'Cancelled pointer movement never earns a turn');
  s.beginHold(); s.pause(); s.endHold();
  assert.equal(s.snapshot().turns, 1, 'Leaving the page during a hold never earns a turn');
  assert.equal(s.snapshot().phase, 'paused'); s.resume();
  await tick();
  assert.equal(s.snapshot().phase, 'try');
  assert.equal(s.snapshot().looping, true, 'Continue resumes the model directly from a gesture');
  s.beginHold(); s.endHold();
  assert.equal(s.snapshot().turns, 2);
  await s.watch(true); s.videoEnded(); t.pending.shift()(true); await tick();
  assert.equal(s.snapshot().looping, true);
  s.beginHold(); s.endHold(); s.endHold();
  assert.equal(s.snapshot().phase, 'complete'); assert.equal(s.snapshot().turns, 3);
  s.dispose();

  const looped = setup(), l = looped.session;
  await l.watch(true); l.videoEnded();
  looped.pending.shift()(true); await tick();
  assert.deepEqual(looped.loops, [false, true], 'The model loops after the spoken try prompt');
  const cueCount = looped.cues.length;
  l.videoEnded(); l.videoEnded();
  assert.equal(looped.cues.length, cueCount, 'Loop boundaries cannot repeat the instructions');
  assert.equal(l.snapshot().turns, 0, 'Watching never awards practice turns');
  assert.equal(l.snapshot().looping, true);
  l.pause(); l.pause();
  assert.equal(l.snapshot().looping, false);
  l.resume(); await tick();
  assert.equal(l.snapshot().looping, true, 'Repeated hidden-page events preserve the try-stage resume');
  assert.equal(looped.cues.length, cueCount, 'Resume does not repeat the already-heard prompt');
  l.beginHold();
  assert.equal(l.snapshot().looping, false, 'Pressing stops the loop immediately');
  assert.deepEqual(looped.events.slice(-3), ['stop-audio', 'pause-video', 'holding']);
  l.endHold();
  assert.equal(l.snapshot().phase, 'between');
  assert.equal(l.snapshot().turns, 1);
  l.videoEnded();
  assert.equal(l.snapshot().looping, false, 'The next demonstration waits for the child');
  l.dispose();

  const rejected = setup();
  run = rejected.session.watch(); rejected.pending.shift()(false); await run;
  assert.equal(rejected.session.snapshot().phase, 'blocked');
  assert.equal(rejected.events.includes('play-video'), false);
  await rejected.session.watch(true);
  assert.equal(rejected.session.snapshot().phase, 'watch', 'The manual video retry does not depend on a working TTS voice');
  rejected.session.dispose();

  const missing = setup(); missing.block(); await missing.session.watch(true);
  assert.equal(missing.session.snapshot().phase, 'blocked');
  run = missing.session.watch(true, true);
  missing.session.videoFailed();
  assert.equal(missing.session.snapshot().phase, 'watch', 'An old video error cannot interrupt the recorded-sound fallback');
  missing.pending.shift()(true); await run;
  assert.equal(missing.session.snapshot().phase, 'try');
  missing.pending.shift()(true); await tick();
  assert.equal(missing.session.snapshot().looping, false, 'Offline phonemes stay replayable without synthesizing or looping narration');
  missing.session.beginHold(); missing.session.endHold();
  assert.equal(missing.session.snapshot().turns, 1);
  missing.session.dispose();

  const failedLoop = setup();
  await failedLoop.session.watch(true);
  failedLoop.session.videoEnded(); failedLoop.block();
  failedLoop.pending.shift()(true); await tick();
  assert.equal(failedLoop.session.snapshot().phase, 'blocked', 'A blocked repeat exposes the same retry/fallback controls');
  assert.equal(failedLoop.session.snapshot().looping, false);
  failedLoop.session.dispose();

  const cancelledLoop = setup();
  await cancelledLoop.session.watch(true); cancelledLoop.session.videoEnded();
  cancelledLoop.session.pause(); cancelledLoop.pending.shift()(true); await tick();
  assert.deepEqual(cancelledLoop.loops, [false], 'Hiding the page during Now you try cancels the pending loop');
  cancelledLoop.session.dispose();

  const stale = setup(); run = stale.session.watch(); stale.session.dispose();
  stale.pending.shift()(true); await run;
  assert.equal(stale.events.includes('play-video'), false, 'Unmount or Strict Mode cleanup cancels pending entry narration');
  const paused = setup(); run = paused.session.watch(); paused.session.pause();
  paused.pending.shift()(true); await run;
  assert.equal(paused.events.includes('play-video'), false, 'A late prompt cannot restart a paused page');
  paused.session.dispose();
  console.log('Passed: single model then narrated turn then continuous loop, quiet holds, child-paced three turns, pause/resume, stale callbacks, blocked loop recovery, recorded-phoneme fallback and disposal.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
