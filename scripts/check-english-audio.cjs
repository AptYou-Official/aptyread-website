/* Audio ordering and cancellation checks with controlled media completions. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { createEnglishAudioPlayer } = require('../lib/english-audio-player.ts');
const { chooseEnglishVoice } = require('../lib/english-voice.ts');
const { narrationCue, englishNarration } = require('../lib/english-narration.ts');
const { readEnglishProgress, emptyProgress } = require('../lib/english-progress.ts');
const { englishMedia } = require('../lib/english-curriculum.ts');
const flush = () => new Promise(resolve => setImmediate(resolve));

async function main() {
  const recordings = [], spoken = [], states = [];
  global.Audio = class {
    constructor(src) { this.src = src; recordings.push(this); }
    play() {
      if (this.src === '/blocked.mp3') return Promise.reject(Object.assign(new Error('gesture required'), { name: 'NotAllowedError' }));
      return this.src === '/broken.mp3' ? Promise.reject(new Error('unavailable')) : Promise.resolve();
    }
    pause() { this.paused = true; }
    removeAttribute() { this.src = ''; }
    load() {}
  };
  global.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  const david = { name: 'Microsoft David', lang: 'en-US', default: true };
  const zira = { name: 'Microsoft Zira Desktop - English (United States)', lang: 'en-US', default: false };
  const heera = { name: 'Microsoft Heera', lang: 'en-IN', default: false };
  let voices = [david, heera, zira];
  const speech = { speak: item => spoken.push(item), cancel() {}, getVoices: () => voices };
  global.window = { speechSynthesis: speech };
  const urls = { 'sound-s': '/s.mp3', 'sound-a': '/a.mp3', 'word-sat': 'https://cdn.example.test/sat.mp3', broken: '/broken.mp3' };
  const player = createEnglishAudioPlayer(id => urls[id], state => states.push(state));
  const cues = [];
  let result = player.sequence([narrationCue('build-find'), { id: 'sound-s' }, narrationCue('build-next'), { id: 'sound-a' }], index => cues.push(index));
  assert.equal(spoken.at(-1).text, 'Find this sound.');
  assert.equal(spoken.at(-1).voice, zira, 'Installed US female voice takes precedence over the system default');
  assert.equal(spoken.at(-1).lang, 'en-US');
  assert.equal(spoken.at(-1).pitch, 1, 'Keep natural pitch; do not simulate a younger speaker');
  assert.equal(recordings.length, 0, 'Phoneme waits until instruction ends');
  spoken.at(-1).onend(); await flush();
  assert.equal(recordings.at(-1).src, '/s.mp3');
  recordings.at(-1).onended(); await flush();
  assert.equal(spoken.at(-1).text, 'Now find this sound.');
  spoken.at(-1).onend(); await flush();
  assert.equal(recordings.at(-1).src, '/a.mp3');
  recordings.at(-1).onended(); assert.equal(await result, true);
  assert.deepEqual(cues, [0, 1, 2, 3]);
  assert.equal(states.at(-1).playing, false);

  const opening = [narrationCue('build-intro-sat'), narrationCue('build-tap'), { id: 'sound-s' }];
  const beforeOpeningSounds = recordings.length;
  result = player.sequence(opening);
  assert.equal(spoken.at(-1).text, 'Let’s make a word together.');
  spoken.at(-1).onerror({ error: 'not-allowed' });
  assert.equal(await result, false);
  assert.equal(states.at(-1).blocked, true);
  assert.equal(recordings.length, beforeOpeningSounds, 'Autoplay blocking must not skip the opening and play only /s/');
  result = player.sequence(opening);
  assert.equal(states.at(-1).blocked, false, 'A user retry clears the blocked state');
  assert.equal(spoken.at(-1).text, 'Let’s make a word together.');
  spoken.at(-1).onend(); await flush();
  assert.equal(spoken.at(-1).text, 'Now tap');
  spoken.at(-1).onend(); await flush();
  assert.equal(recordings.at(-1).src, '/s.mp3');
  recordings.at(-1).onended(); assert.equal(await result, true);

  urls['build-intro-at'] = '/blocked.mp3';
  result = player.sequence([narrationCue('build-intro-at'), narrationCue('build-tap'), { id: 'sound-a' }]);
  const spokenBeforeBlockedRecording = spoken.length;
  assert.equal(await result, false);
  assert.equal(states.at(-1).blocked, true, 'Future studio recordings expose the same tap-to-listen fallback');
  assert.equal(spoken.length, spokenBeforeBlockedRecording, 'A blocked studio introduction cannot skip ahead');

  const interruptedOpening = player.sequence(opening);
  const staleError = spoken.at(-1).onerror;
  result = player.play('word-sat', 'sat');
  staleError({ error: 'not-allowed' });
  recordings.at(-1).onended();
  assert.equal(await interruptedOpening, false);
  assert.equal(await result, true);
  assert.equal(states.at(-1).blocked, false, 'A cancelled introduction cannot mark newer audio as blocked');

  assert.equal(chooseEnglishVoice([heera, david]), david, 'Keep US accent when no known female voice is available');
  assert.equal(chooseEnglishVoice([heera]), undefined, 'Do not explicitly choose an unrelated accent');
  assert.equal(chooseEnglishVoice([]), undefined);
  voices = [];
  result = player.play('word-at', 'at');
  assert.equal(spoken.at(-1).voice, undefined, 'Use en-US browser fallback while voices are loading');
  assert.equal(spoken.at(-1).lang, 'en-US');
  spoken.at(-1).onend(); await result;
  voices = [david, zira];
  result = player.play('word-at', 'at');
  assert.equal(spoken.at(-1).voice, zira, 'Recheck voices after the browser loads its list');
  spoken.at(-1).onend(); await result;

  const cancelled = player.sequence([narrationCue('build-find'), { id: 'sound-s' }]);
  const lateEnd = spoken.at(-1).onend;
  const before = recordings.length;
  result = player.play('word-sat', 'sat');
  assert.equal(await cancelled, false, 'A new tap settles the interrupted queue');
  lateEnd(); await flush();
  assert.equal(recordings.length, before + 1, 'An old callback cannot start its queued phoneme');
  assert.equal(recordings.at(-1).src, urls['word-sat'], 'CDN recording takes priority over TTS');
  recordings.at(-1).onended(); assert.equal(await result, true);

  const stopped = player.sequence([{ id: 'sound-s' }, { id: 'sound-a' }]);
  const last = recordings.at(-1), count = recordings.length;
  player.stop(); assert.equal(await stopped, false);
  assert.equal(last.paused, true); assert.equal(last.src, '');
  assert.equal(recordings.length, count, 'Stop prevents queued speech after a break or navigation');

  global.window = {};
  result = player.sequence([narrationCue('build-find'), { id: 'sound-s' }]);
  await flush();
  assert.equal(recordings.at(-1).src, '/s.mp3', 'Recorded phonemes still play without a device voice');
  recordings.at(-1).onended(); assert.equal(await result, false);
  assert.match(states.at(-1).notice, /no spoken voice/);
  global.window = { speechSynthesis: speech };
  const spokenBefore = spoken.length;
  assert.equal(await player.play('missing-phoneme'), false);
  assert.equal(spoken.length, spokenBefore, 'Missing phonemes never fall back to letter-name TTS');
  assert.equal(await player.sequence([{ id: 'broken' }, narrationCue('build-next')]), false);
  assert.equal(spoken.length, spokenBefore, 'A failed required sound does not continue the blend');
  assert.equal(states.at(-1).playing, false);

  for (const id of Object.keys(englishNarration)) assert.ok(Object.hasOwn(englishMedia, id), `Recording slot for ${id}`);
  for (const mode of ['guided', 'independent']) {
    const saved = { stage: 0, built: 's', reads: 0, answers: {}, started: true, mode };
    const restored = readEnglishProgress(JSON.stringify({ ...emptyProgress(), words: { sat: saved } }));
    assert.deepEqual(restored.words.sat, saved, 'Guidance choice and partial word survive reload');
  }
  const unstarted = { stage: 0, built: '', reads: 0, answers: {}, started: false };
  assert.deepEqual(readEnglishProgress(JSON.stringify({ ...emptyProgress(), words: { sat: unstarted } })).words.sat, unstarted);
  console.log('Passed: opening narration order, TTS/recording autoplay fallback and retry, stale-event cancellation, US female voice preference, late-loading voices, ordered audio, Stop, CDN priority, unavailable voices/recordings, no phoneme TTS, recording slots and resume.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
