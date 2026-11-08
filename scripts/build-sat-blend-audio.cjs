/*
 * Build the download-page blend as one uninterrupted audio request.
 * Usage: node scripts/build-sat-blend-audio.cjs [path-to-ffmpeg]
 * Alternatively set FFMPEG_BINARY. Originals are read-only inputs.
 * Cue positions come from decoded PCM sample counts, not MP3 file durations.
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'public', 'try-assets', 'sat');
const ffmpeg = process.argv[2] || process.env.FFMPEG_BINARY || 'ffmpeg';
const sampleRate = 48000;
const channels = 2;
const bytesPerSampleFrame = 4 * channels; // interleaved f32le stereo
const recipe = [
  { kind: 'instruction', file: 'blend.mp3', pauseBeforeMs: 0 },
  { kind: 's', file: 's.mp3', pauseBeforeMs: 0 },
  { kind: 'a', file: 'a.mp3', pauseBeforeMs: 0 },
  { kind: 't', file: 't.mp3', pauseBeforeMs: 0 },
  { kind: 'word', file: 'word-sat.mp3', pauseBeforeMs: 600 },
  { kind: 'turn', file: 'your-turn.mp3', pauseBeforeMs: 350 },
];

function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    encoding: null, windowsHide: true, maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr.toString() || `FFmpeg exited ${result.status}`);
  return result.stdout;
}

function decode(file) {
  const pcm = run(['-i', file, '-map', '0:a:0', '-vn', '-ar', String(sampleRate), '-ac', String(channels), '-f', 'f32le', 'pipe:1']);
  if (!pcm.length || pcm.length % bytesPerSampleFrame) throw new Error(`Invalid decoded PCM: ${file}`);
  return pcm;
}

function peak(buffer) {
  let value = 0;
  for (let i = 0; i < buffer.length; i += 4) value = Math.max(value, Math.abs(buffer.readFloatLE(i)));
  return value;
}

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'aptyread-sat-blend-'));
try {
  const pieces = [], cues = [], sources = [];
  let cursor = 0;
  for (const item of recipe) {
    const input = path.join(assets, item.file);
    const beforeHash = hash(input);
    const pcm = decode(input);
    const pauseSamples = Math.round(item.pauseBeforeMs * sampleRate / 1000);
    if (pauseSamples) pieces.push(Buffer.alloc(pauseSamples * bytesPerSampleFrame));
    cursor += pauseSamples;
    const startSample = cursor;
    cursor += pcm.length / bytesPerSampleFrame;
    pieces.push(pcm);
    cues.push({ kind: item.kind, start: startSample / sampleRate, end: cursor / sampleRate, startSample, endSample: cursor });
    sources.push({ ...item, sha256: beforeHash, decodedSampleFrames: pcm.length / bytesPerSampleFrame, pauseBeforeSamples: pauseSamples });
  }
  const timeline = Buffer.concat(pieces);
  const pcmFile = path.join(scratch, 'blend-sequence.f32le');
  const outputFile = path.join(scratch, 'blend-sequence.mp3');
  fs.writeFileSync(pcmFile, timeline);
  run(['-f', 'f32le', '-ar', String(sampleRate), '-ac', String(channels), '-i', pcmFile,
    '-map_metadata', '-1', '-c:a', 'libmp3lame', '-b:a', '160k', '-write_xing', '1', outputFile]);
  const decodedOutput = decode(outputFile);
  if (decodedOutput.length !== timeline.length) throw new Error(`Gapless duration mismatch: ${decodedOutput.length} vs ${timeline.length} PCM bytes`);
  for (const item of sources) {
    if (hash(path.join(assets, item.file)) !== item.sha256) throw new Error(`Original changed while building: ${item.file}`);
  }
  const cueData = { version: 1, src: '/try-assets/sat/blend-sequence.mp3', sampleRate, duration: cursor / sampleRate, cues };
  const manifest = {
    purpose: 'Continuous blend playback for the download-page activity; existing app recordings and pauses preserved.',
    generator: 'scripts/build-sat-blend-audio.cjs',
    encoding: { codec: 'MP3/libmp3lame', bitrateKbps: 160, sampleRate, channels, gaplessMetadata: true },
    sources,
    output: { file: 'blend-sequence.mp3', sha256: hash(outputFile), bytes: fs.statSync(outputFile).size, sampleFrames: cursor, durationSeconds: cursor / sampleRate },
    cueFile: 'lib/sat-blend-cues.json',
    verification: { fullDecodePassed: true, decodedSampleCountMatches: true, originalHashesUnchanged: true, sourcePeak: peak(timeline), outputPeak: peak(decodedOutput) },
    edits: 'Concatenation only, with exactly 600 ms before the whole word and 350 ms before the turn prompt. No new voice, background music, time stretching or normalization.',
  };
  fs.copyFileSync(outputFile, path.join(assets, 'blend-sequence.mp3'));
  fs.writeFileSync(path.join(root, 'lib', 'sat-blend-cues.json'), JSON.stringify(cueData, null, 2) + '\n');
  fs.writeFileSync(path.join(assets, 'blend-sequence.sources.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ duration: cueData.duration, bytes: manifest.output.bytes, sha256: manifest.output.sha256, cues, verification: manifest.verification }, null, 2));
} finally {
  // Only this unique, script-created scratch directory is removed.
  const resolvedScratch = path.resolve(scratch);
  const tempRoot = path.resolve(os.tmpdir()) + path.sep;
  if (resolvedScratch.startsWith(tempRoot) && path.basename(resolvedScratch).startsWith('aptyread-sat-blend-')) fs.rmSync(resolvedScratch, { recursive: true, force: true });
}
