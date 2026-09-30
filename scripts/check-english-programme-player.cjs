/* Meaningful presentation boundaries: no visual answer key or premature model. */
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
const { allProgrammeActivities } = require('../lib/english-programme.ts');
const { programmeSteps, freshProgrammeState } = require('../lib/english-programme-progress.ts');
const { createEnglishPreviewProgress } = require('../lib/english-progress.ts');
const { programmeVideoModels } = require('../lib/english-programme-media.ts');
let progress = createEnglishPreviewProgress();
require('../components/english/EnglishProvider.tsx').useEnglish = () => ({ progress, update() { throw new Error('Render must not write progress'); }, ready: true, storageAvailable: true, offline: false, preview: true });
const Activity = require('../components/english/ProgrammeActivity.tsx').default;
function render(activity, task, patch = {}) {
  const step = programmeSteps(activity)[task];
  progress = { ...createEnglishPreviewProgress(), programme: { [activity.id]: { ...freshProgrammeState(step, task), ...patch } } };
  return renderToStaticMarkup(React.createElement(Activity, { activityId: activity.id, onComplete() {} }));
}
const images = html => (html.match(/role="img"/g) || []).length;
let checked = 0;
for (const activity of allProgrammeActivities) {
  programmeSteps(activity).forEach((step, task) => {
    const key = `l1.${activity.id}.${step.id}.model`;
    // A registered future model must obey the same demand boundaries as today's
    // unrecorded prototype. The test URL is never contacted by static rendering.
    programmeVideoModels[key] = { src: '/english/media/test-only-model.mp4' };
    if (step.kind === 'read' || step.kind === 'page') {
      const first = render(activity, task);
      assert.equal(images(first), 0, `${step.id}: child-first print has no illustration`);
      assert.ok(!first.includes('<video'), `${step.id}: no pronunciation video before the child's opportunity`);
      if (step.kind === 'read' || step.question) {
        const options = render(activity, task, { phase: 1 });
        assert.equal(images(options), step.choices.length, `${step.id}: exactly the choices, without a duplicate correct scene`);
        assert.ok(!options.includes('<video'), `${step.id}: no video answer during a meaning response`);
        assert.ok(!options.includes('en-programme-choice is-hint'), `${step.id}: no initial correct-choice cue`);
      }
    }
    if (step.kind === 'sound' && step.mode === 'check' || step.kind === 'build' && step.mode === 'encode') {
      const initial = render(activity, task, { heard: true });
      assert.ok(!initial.includes('<video'), `${step.id}: unresolved retrieval has no model`);
      assert.ok(!initial.includes('en-letter-tile is-hint'), `${step.id}: no initial answer tile hint`);
      const firstMiss = render(activity, task, { heard: true, misses: 1, supported: true });
      assert.ok(!firstMiss.includes('en-letter-tile is-hint'), `${step.id}: recording an error does not prematurely reveal the answer`);
      const help = render(activity, task, { heard: true, supported: true, hinted: true });
      assert.ok(help.includes('en-letter-tile is-hint'), `${step.id}: requested help gives a clear tile cue`);
      assert.match(initial, />\s*Help me<\/button>/, `${step.id}: help does not require making errors first`);
    }
    delete programmeVideoModels[key];
    checked++;
  });
}
console.log(`Programme player: ${checked} rendered steps; child-first print, question pictures, voluntary help and future video boundaries passed.`);
