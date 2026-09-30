/* Export the exact spoken scripts and replaceable model slots in the Level 1
 * programme. This reads local source only; it does not generate or upload media. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { allProgrammeActivities, LEVEL_ONE_LETTERS } = require('../lib/english-programme.ts');
const { programmeSteps, freshProgrammeState, isProgrammeStepReady, programmeBookPreparation } = require('../lib/english-programme-progress.ts');
const { programmeMedia, programmeVideoModels, programmeMediaKey, programmeInstruction, programmeInstructionName } = require('../lib/english-programme-media.ts');
const { englishLessons, englishVideos, englishSoundPracticeVideos, englishPaperWritingVideos, englishPronunciationVideos, BUNNY_LIBRARY, mediaFor } = require('../lib/english-curriculum.ts');
const { englishNarration } = require('../lib/english-narration.ts');
const { handwritingVideos, handwritingStrokes, handwritingInstruction } = require('../lib/english-handwriting.ts');

const rows = [];
const seen = new Set();
const lessonFor = new Map(englishLessons.flatMap(lesson => lesson.activities.map(activity => [activity.id, lesson])));
const scriptId = text => `script-${crypto.createHash('sha256').update(text).digest('hex').slice(0, 12)}`;
const localFileExists = url => url.startsWith('/') ? fs.existsSync(path.join(root, 'public', url.slice(1))) : null;
const csvColumns = ['asset_kind', 'cue_id', 'lesson_id', 'lesson_title', 'activity_id', 'activity_title', 'step_id', 'step_kind', 'use', 'exact_script', 'shared_script_id', 'scene', 'recording_url', 'poster_url', 'status', 'notes'];
function add(row) {
  assert.ok(!seen.has(row.cue_id), `Duplicate cue or model ID: ${row.cue_id}`);
  seen.add(row.cue_id);
  rows.push(Object.fromEntries(csvColumns.map(key => [key, row[key] ?? ''])));
}

let stepCount = 0;
for (const activity of allProgrammeActivities) {
  const lesson = lessonFor.get(activity.id);
  assert.ok(lesson, `Programme activity is not on the learning path: ${activity.id}`);
  const steps = programmeSteps(activity);
  assert.ok(steps.length, `Programme activity has no steps: ${activity.id}`);
  const stepIds = new Set();
  for (const [index, step] of steps.entries()) {
    assert.ok(!stepIds.has(step.id), `Duplicate step ID within ${activity.id}: ${step.id}`);
    stepIds.add(step.id);
    stepCount++;
    const scene = 'scene' in step ? step.scene : '';
    const context = {
      lesson_id: lesson.id, lesson_title: lesson.title, activity_id: activity.id,
      activity_title: activity.title, step_id: step.id, step_kind: step.kind, scene,
    };
    function audio(name, text, use, notes = '', cueScene = scene) {
      assert.equal(typeof text, 'string', `${activity.id}/${step.id}/${name}: script must be a string`);
      assert.ok(text.trim(), `${activity.id}/${step.id}/${name}: empty script`);
      const key = programmeMediaKey(activity.id, step.id, name);
      const recording = programmeMedia[key] || '';
      add({ ...context, asset_kind: 'programme_audio', cue_id: key, use, exact_script: text,
        shared_script_id: scriptId(text), scene: cueScene, recording_url: recording,
        status: recording ? 'registered_override' : 'recording_needed', notes });
    }
    const firstPhase = freshProgrammeState(step).phase;
    const lastPhase = step.kind === 'book-cover' ? 1 : 2;
    for (let phase = firstPhase; phase <= lastPhase; phase++) {
      const ready = isProgrammeStepReady(step, { ...freshProgrammeState(step), phase });
      audio(`directions-${phase}`, programmeInstruction(step, phase, false, ready), ready ? 'Step success directions' : `Directions, phase ${phase}`);
      const afterListening = programmeInstructionName(step, phase, false, ready, true);
      if (afterListening !== `directions-${phase}`) audio(afterListening, programmeInstruction(step, phase, false, ready, true), `Response directions, phase ${phase}`, 'Replayable current-action cue. On first requested sound/spelling playback this precedes the target, keeping the target sound/word last. Replay plays the target alone.');
    }
    if (index === steps.length - 1) {
      audio('directions-complete', programmeInstruction(step, lastPhase, true, true), 'Activity completion directions');
    }
    if (step.kind === 'sound' || step.kind === 'build' || step.kind === 'read' || step.kind === 'listen' || step.kind === 'page' && step.question) {
      audio('retry', 'Let’s have another try.', 'First retry');
    }
    if (step.kind === 'build' || step.kind === 'read') {
      audio('word', step.word, 'Whole word', 'Say the whole word naturally. Individual phonemes use the existing sound-<letter> files.');
      audio('meaning', `${step.word}. ${step.meaning || ''}`, 'Word and meaning', 'The same exact script is used wherever this step explains its meaning.');
    }
    if (step.kind === 'read') {
      audio('question', programmeInstruction(step, 1, false, false), 'Picture choice instruction');
    }
    if (step.kind === 'listen') {
      audio('story', step.story, 'Narrated story');
      audio('question', step.question, 'Listening question');
    }
    if (step.kind === 'book-cover') {
      programmeBookPreparation(step).forEach(item => audio(item.id, item.text, item.scene ? 'Book vocabulary or character preparation' : 'Book preparation model', 'One tap-paced card at a time. Next advances only after this part is heard or read together. No joined convention monologue.', item.scene || ''));
    }
    if (step.kind === 'page') {
      audio('page', step.text, 'Read the complete page', 'Preserve the sentence punctuation and phrasing.');
      step.text.split(' ').forEach((word, wordIndex) => audio(`word-${wordIndex}`, word, 'Tapped page word', 'Index and text exactly match the on-screen space-separated token, including its punctuation.'));
      if (step.question) audio('question', step.question, 'Page meaning question');
    }
    if ('choices' in step && step.choices) {
      step.choices.forEach(option => audio(`choice-${option.id}`, option.label, 'Picture label on request', 'Heard only when the child asks for this picture label.', option.scene));
    }
    const modelKey = programmeMediaKey(activity.id, step.id, 'model');
    const model = programmeVideoModels[modelKey];
    add({ ...context, asset_kind: 'programme_video_model', cue_id: modelKey, use: 'Optional teaching model',
      recording_url: model?.src || '', poster_url: model?.poster || '', status: model ? 'registered_override' : 'optional_placeholder',
      notes: `Objective: ${activity.objective} A model is shown at phase 0 (if this step has one) and after the step is ready. There is no authored video script or uploaded file implied by this slot.` });
  }
}

const phonemes = LEVEL_ONE_LETTERS.map(letter => {
  const cueId = `sound-${letter}`, url = mediaFor(cueId) || '';
  assert.ok(url, `Missing phoneme registration for ${letter}`);
  const exists = localFileExists(url);
  assert.notEqual(exists, false, `Registered phoneme file does not exist: ${url}`);
  const notes = 'Existing short phoneme recording. Do not replace with the letter name or ordinary TTS. Registration is preserved.';
  add({ asset_kind: 'phoneme_reference', cue_id: cueId, use: 'Isolated letter sound', recording_url: url,
    status: exists === true ? 'existing_local_file' : 'existing_registration', notes });
  return { cueId, letter, registeredUrl: url, localFileExists: exists };
});

// Preserve the original four-lesson package as a separate reference. That
// historical brief selects IDs; URLs below come only from the current code,
// never from the brief's proposed folder or filename suggestions.
const legacyBriefPath = 'docs/english/studio/lessons-01-04-recordings-v1.json';
const legacyBrief = JSON.parse(fs.readFileSync(path.join(root, legacyBriefPath), 'utf8'));
const legacyAudio = [...new Set(legacyBrief.items.flatMap(item => item.cue_ids))].map(cueId => ({
  cueId, currentFallbackScript: englishNarration[cueId] || '', registeredUrl: mediaFor(cueId) || '',
}));
for (const item of legacyAudio) {
  add({ asset_kind: 'legacy_audio_reference', cue_id: item.cueId, use: 'Original four-lesson package reference',
    exact_script: item.currentFallbackScript, recording_url: item.registeredUrl,
    status: item.registeredUrl ? 'existing_registration' : 'no_current_registration',
    notes: 'Unchanged registration inventory, not a new recording order or an audit of every current legacy screen. Remote availability and recording/script agreement are not checked by this exporter.' });
}
const legacyLessonIds = ['first-words', 'explore-s', 'explore-a', 'explore-t'];
const legacyVideos = englishLessons.filter(lesson => legacyLessonIds.includes(lesson.id)).flatMap(lesson => lesson.activities
  .filter(activity => englishVideos[activity.id])
  .map(activity => ({ lessonId: lesson.id, activityId: activity.id, ...englishVideos[activity.id] })));
const originalLetters = ['s', 'a', 't'];
const legacyVideoReferences = {
  bunnyLibrary: BUNNY_LIBRARY, teachingVideos: legacyVideos,
  soundPractice: Object.fromEntries(originalLetters.map(letter => [letter, englishSoundPracticeVideos[letter]])),
  paperWriting: Object.fromEntries(originalLetters.flatMap(letter => [letter, letter.toUpperCase()]).map(letter => [letter, englishPaperWritingVideos[letter]])),
  pronunciation: Object.fromEntries(['at', 'sat'].map(word => [word, englishPronunciationVideos[word]])),
};

// The completed handwriting films accompany formation; they are not new
// production requests. Stroke narration uses stable form-specific cue IDs.
for (const [form, video] of Object.entries(handwritingVideos)) {
  add({ asset_kind: 'handwriting_video_reference', cue_id: `handwriting.${form}.video`,
    use: `Writing ${form}: optional real-hand model`, recording_url: video.src,
    poster_url: video.poster || '', status: 'connected',
    notes: `HEAD verified ${video.verified}: video/mp4, ${video.bytes} bytes. Watching does not record a writing try.` });
  for (const mode of ['trace', 'video', 'paper']) {
    const cueId = `handwriting.${form}.${mode}.directions`;
    const narration = handwritingInstruction(mode);
    add({ asset_kind: 'handwriting_audio', cue_id: cueId, use: `Formation ${form}, ${mode} instructions`,
      exact_script: narration, shared_script_id: scriptId(narration),
      recording_url: mediaFor(cueId) || '', status: mediaFor(cueId) ? 'connected' : 'recording_needed' });
  }
  for (const stroke of handwritingStrokes(form)) {
    const cueId = `handwriting.${form}.stroke.${stroke.number}`;
    add({ asset_kind: 'handwriting_audio', cue_id: cueId, use: `Formation ${form}, stroke ${stroke.number}`,
      exact_script: stroke.narration, shared_script_id: scriptId(stroke.narration),
      recording_url: mediaFor(cueId) || '', status: mediaFor(cueId) ? 'connected' : 'recording_needed',
      notes: 'Device narration follows the authored animation; each new stroke includes a lift cue.' });
  }
}

// Reject misspelled new registrations instead of silently exporting dead slots.
for (const [key, value] of Object.entries(programmeMedia)) {
  assert.ok(!value || rows.some(row => ['programme_audio', 'handwriting_audio'].includes(row.asset_kind) && row.cue_id === key), `Unknown programme audio registration: ${key}`);
}
for (const [key, value] of Object.entries(programmeVideoModels)) {
  assert.ok(!value || rows.some(row => row.asset_kind === 'programme_video_model' && row.cue_id === key), `Unknown programme video registration: ${key}`);
}
const audioRows = rows.filter(row => row.asset_kind === 'programme_audio');
const summary = {
  programmeActivities: allProgrammeActivities.length,
  flattenedSteps: stepCount,
  programmeAudioCues: audioRows.length,
  uniqueProgrammeScripts: new Set(audioRows.map(row => row.exact_script)).size,
  registeredProgrammeAudio: audioRows.filter(row => row.recording_url).length,
  optionalVideoModelSlots: rows.filter(row => row.asset_kind === 'programme_video_model').length,
  registeredVideoModels: rows.filter(row => row.asset_kind === 'programme_video_model' && row.recording_url).length,
  existingPhonemes: phonemes.length,
  legacyAudioReferences: legacyAudio.length,
  handwritingVideos: Object.keys(handwritingVideos).length,
  handwritingAudioCues: rows.filter(row => row.asset_kind === 'handwriting_audio').length,
};
const manifest = {
  schemaVersion: 1,
  scope: 'Current authored Level 1 ProgrammeActivity content; legacy package and phoneme registrations are preserved references.',
  generatedBy: 'node scripts/export-english-programme-media.cjs',
  sources: ['lib/english-programme.ts', 'lib/english-programme-progress.ts', 'lib/english-programme-media.ts', 'components/english/ProgrammeActivity.tsx'],
  notes: [
    'Blank recording_url and poster_url mean no replacement is registered. They are not proposed URLs.',
    'exact_script is the current TTS fallback text. Matching shared_script_id values may share one approved recording.',
    'Book step IDs are <book-id>.cover and <book-id>.<page-id>. Choice and page-word keys retain their authored IDs and indices.',
    'Media is not generated, uploaded, downloaded, or checked over the network by this script.',
    'The legacy reference describes the original first-words/explore-s/explore-a/explore-t package, not the first four lessons on the reordered core path.',
  ],
  summary, rows, phonemes, handwritingVideos,
  preservedLegacyPackage: { originalLessonIds: legacyLessonIds, historicalBrief: legacyBriefPath, audio: legacyAudio, video: legacyVideoReferences },
};
const csvCell = value => `"${String(value).replaceAll('"', '""')}"`;
const csv = `${csvColumns.map(csvCell).join(',')}\r\n${rows.map(row => csvColumns.map(key => csvCell(row[key])).join(',')).join('\r\n')}\r\n`;
const outDir = path.join(root, 'docs', 'english', 'media');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'level-1-recording-plan.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outDir, 'level-1-recording-plan.csv'), csv, 'utf8');
console.log(`Exported ${summary.programmeAudioCues} programme cues (${summary.uniqueProgrammeScripts} exact scripts), ${summary.optionalVideoModelSlots} optional video slots, ${summary.existingPhonemes} phonemes and ${summary.legacyAudioReferences} preserved legacy audio references.`);
