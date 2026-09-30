/* Actual player callbacks: paced instructions, print-first audio and cancellation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true };
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: options }).outputText, file);
const programme = require('../lib/english-programme.ts');
const model = require('../lib/english-programme-progress.ts');
const progressModel = require('../lib/english-progress.ts');
const media = require('../lib/english-programme-media.ts');
const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../components/english/ProgrammeActivity.tsx'), 'utf8'), { compilerOptions: options }).outputText;
const sameDeps = (a, b) => a && b && a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
function nodes(node, predicate) {
  if (!node || typeof node !== 'object') return [];
  return [...(predicate(node) ? [node] : []), ...React.Children.toArray(node.props?.children).flatMap(child => nodes(child, predicate))];
}
function text(node) { return typeof node === 'string' ? node : typeof node === 'object' && node ? React.Children.toArray(node.props?.children).map(text).join('') : ''; }
const hasClass = (node, name) => (node.props?.className || '').split(/\s+/).includes(name);
const tick = async () => { await Promise.resolve(); await Promise.resolve(); };

function session(activityId, task = 0, patch = {}) {
  const activity = programme.getProgrammeActivity(activityId), steps = model.programmeSteps(activity);
  let progress = { ...progressModel.createEnglishPreviewProgress(), programme: { [activityId]: { ...model.freshProgrammeState(steps[task], task), ...patch } } };
  const states = [], refs = [], effects = [], callbacks = [], queuedEffects = [], timers = new Map(), calls = [];
  let stateIndex = 0, refIndex = 0, effectIndex = 0, callbackIndex = 0, timerId = 0, activeCall, suspended = false, completionCount = 0;
  const update = updater => { progress = updater(progress); };
  const hooks = {
    useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial; return [states[index], next => { states[index] = typeof next === 'function' ? next(states[index]) : next; }]; },
    useRef(initial) { const index = refIndex++; return refs[index] || (refs[index] = { current: initial }); },
    useCallback(callback, deps) { const index = callbackIndex++; if (!sameDeps(callbacks[index]?.deps, deps)) callbacks[index] = { callback, deps }; return callbacks[index].callback; },
    useEffect(effect, deps) { const index = effectIndex++; if (!sameDeps(effects[index]?.deps, deps)) queuedEffects.push(() => { effects[index]?.cleanup?.(); effects[index] = { deps, cleanup: effect() }; }); },
  };
  const audio = {
    playing: false,
    stop() { audio.playing = false; activeCall = undefined; },
    sequence(cues) {
      audio.playing = true;
      // A cancelled operation may report success late. The component's run token
      // must reject that callback rather than relying only on the player mock.
      return new Promise(resolve => {
        const call = { cues, settled: false, resolve(ok) { assert.equal(call.settled, false); call.settled = true; if (activeCall === call) { activeCall = undefined; audio.playing = false; } resolve(ok); } };
        activeCall = call; calls.push(call);
      });
    },
  };
  function Scene() { return null; }
  function Companion() { return null; }
  function Placeholder() { return null; }
  const document = { hidden: false, addEventListener() {}, removeEventListener() {} };
  const load = id => id === 'react' ? hooks : id === '@/lib/english-programme' ? programme : id === '@/lib/english-programme-progress' ? model : id === '@/lib/english-progress' ? progressModel : id === '@/lib/english-programme-media' ? media : id === './EnglishProvider' ? { useEnglish: () => ({ progress, update }) } : id === './useEnglishAudio' ? { __esModule: true, default: () => audio } : id === './ProgrammeScene' ? { __esModule: true, default: Scene } : id === './LearningCompanion' ? { __esModule: true, default: Companion } : id === './ParentHelp' || id === './Icons' ? { __esModule: true, default: Placeholder } : require(id);
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'document', 'window', 'setTimeout', 'clearTimeout', source)(load, module, module.exports, document, { scrollTo() {} }, callback => { timers.set(++timerId, callback); return timerId; }, id => timers.delete(id));
  function render(nextSuspended = suspended) {
    suspended = nextSuspended;
    stateIndex = refIndex = effectIndex = callbackIndex = 0;
    const wrapper = module.exports.default({ activityId, suspended, onComplete() { completionCount++; } });
    const tree = wrapper.type(wrapper.props);
    while (queuedEffects.length) queuedEffects.shift()();
    return tree;
  }
  function button(label) {
    const found = nodes(render(), node => node.type === 'button' && (text(node).trim() === label || node.props['aria-label'] === label));
    assert.equal(found.length, 1, `${activityId}: one button for ${label}`);
    return found[0];
  }
  function flushTimers() { const pending = [...timers.values()]; timers.clear(); pending.forEach(callback => callback()); }
  return { render, button, flushTimers, calls, audio, document, Scene, Companion, get progress() { return progress; }, get state() { return progress.programme[activityId]; }, get completions() { return completionCount; }, replaceState(value) { progress = { ...progress, programme: { ...progress.programme, [activityId]: value } }; } };
}

async function settle(call, ok = true) { call.resolve(ok); await tick(); }
const primary = tree => nodes(tree, node => node.type === 'button' && hasClass(node, 'en-button'));
const tiles = tree => nodes(tree, node => node.type === 'button' && hasClass(node, 'en-letter-tile'));

async function main() {
  for (const task of [0, 2]) {
    const test = session('sat-use-words', task);
    let tree = test.render();
    assert.deepEqual(primary(tree).map(button => text(button).trim()), ['Listen'], 'Unheard retrieval has one primary Listen action');
    assert.ok(tiles(tree).every(tile => tile.props.disabled), 'Unheard targets cannot be chosen');
    assert.ok(tiles(tree).every(tile => !hasClass(tile, 'is-hint')), 'No initial answer hint');
    test.flushTimers();
    assert.equal(test.calls.length, 1);
    assert.equal(test.calls[0].cues.length, 1);
    assert.equal(test.calls[0].cues[0].narration, 'Tap Listen.');
    await settle(test.calls[0]);
    assert.equal(test.state.heard, false, 'Hearing directions is not hearing the stimulus');
    test.button('Listen').props.onClick();
    const stimulus = test.calls.at(-1);
    assert.equal(stimulus.cues.length, 2, 'One current action cue, then the stimulus');
    assert.equal(stimulus.cues[0].narration, task === 0 ? 'Tap the letter.' : 'Make the word.');
    assert.equal(stimulus.cues[1].id, task === 0 ? 'sound-a' : 'l1.sat-use-words.sat-use-build.word', 'The target is last so a trailing direction does not mask it');
    await settle(stimulus);
    tree = test.render(); test.flushTimers();
    assert.equal(test.calls.length, 2, 'The heard update does not queue another procedural announcement');
    assert.equal(test.state.heard, true);
    assert.equal(primary(tree).length, 0, 'Choosing is now the action, not a competing Next/Listen button');
    assert.equal(nodes(tree, node => node.type === test.Companion).length, 1);
    assert.equal(nodes(tree, node => node.type === test.Companion)[0].props.title, task === 0 ? 'Tap the letter.' : 'Make the word.');
    assert.ok(tiles(tree).every(tile => !tile.props.disabled && !hasClass(tile, 'is-hint')), 'Enabled choices remain uncued');
    test.button(task === 0 ? 'Listen again' : 'Hear the word').props.onClick();
    assert.equal(test.calls.at(-1).cues.length, 1, 'Replay repeats the stimulus without repeating directions');
    await settle(test.calls.at(-1));
    assert.equal(test.progress.evidence?.length || 0, 0, 'Listening/replay never creates answer evidence');
  }

  let printScreens = 0;
  for (const activity of programme.allProgrammeActivities) {
    for (const [task, step] of model.programmeSteps(activity).entries()) {
      if (!['read', 'page'].includes(step.kind)) continue;
      const test = session(activity.id, task), tree = test.render();
      assert.equal(nodes(tree, node => node.type === test.Scene || node.type === 'video').length, 0, `${step.id}: print first has no answer picture/model`);
      test.flushTimers();
      assert.equal(test.calls.length, 1);
      assert.equal(test.calls[0].cues.length, 1);
      const cue = test.calls[0].cues[0];
      for (const word of (step.kind === 'read' ? step.word : step.text).toLowerCase().match(/[a-z]+/g)) assert.ok(!new RegExp(`\\b${word}\\b`, 'i').test(cue.narration), `${step.id}: direction must not pronounce ${word}`);
      assert.match(cue.id, /\.directions-0$/);
      await settle(test.calls[0]);
      assert.equal(test.progress.evidence?.length || 0, 0);
      printScreens++;
    }
  }

  const bookId = 'first-book-story', cover = model.programmeSteps(programme.getProgrammeActivity(bookId))[0], cards = model.programmeBookPreparation(cover);
  const book = session(bookId);
  for (const [index, card] of cards.entries()) {
    const tree = book.render();
    assert.equal(book.state.bookPrep, index);
    assert.equal(book.state.heard, false);
    assert.equal(primary(tree).length, 1);
    assert.equal(text(primary(tree)[0]).trim(), 'Listen');
    book.button('Listen').props.onClick();
    const current = book.calls.at(-1);
    assert.deepEqual(current.cues, [{ id: `l1.${bookId}.${cover.id}.${card.id}`, narration: card.text }], 'Only the current name/convention plays, with its own stable recording ID');
    await settle(current);
    assert.equal(book.state.heard, true);
    book.button(index === cards.length - 1 ? 'Open my book' : 'Next').props.onClick();
    if (index < cards.length - 1) {
      assert.equal(book.state.heard, false, 'Next requires listening to the new card');
      assert.equal(book.state.task, 0, 'Preparation stays inside the existing cover task');
    }
  }
  assert.equal(book.state.task, 1);
  assert.equal(book.state.bookPrep, undefined);
  assert.equal(book.progress.evidence?.length || 0, 0, 'Preparation is not reading mastery');

  const legacy = session(bookId);
  const old = { ...model.freshProgrammeState(cover), heard: true }; delete old.bookPrep;
  legacy.replaceState(old);
  legacy.button('Open my book').props.onClick();
  assert.equal(legacy.state.task, 1, 'Previously heard joined preparation can still open the book');

  const stopped = session(bookId);
  stopped.button('Listen').props.onClick();
  const lateStopped = stopped.calls.at(-1);
  stopped.button('Stop listening').props.onClick();
  await settle(lateStopped);
  assert.equal(stopped.state.heard, false, 'A late successful callback after Stop must not mark the card heard');
  assert.equal(text(primary(stopped.render())[0]).trim(), 'Listen');

  const replay = session(bookId);
  replay.button('Listen').props.onClick(); await settle(replay.calls.at(-1));
  replay.button('Listen again').props.onClick();
  const lateReplay = replay.calls.at(-1);
  replay.button('Next').props.onClick(); replay.render();
  await settle(lateReplay);
  assert.equal(replay.state.bookPrep, 1);
  assert.equal(replay.state.heard, false, 'Previous-card replay cannot mark the new card heard');
  replay.button('Listen').props.onClick();
  const suspended = replay.calls.at(-1);
  replay.render(true);
  await settle(suspended);
  assert.equal(replay.state.heard, false, 'Opening another panel invalidates the pending audio callback');

  const failed = session(bookId);
  failed.button('Listen').props.onClick(); await settle(failed.calls.at(-1), false);
  assert.equal(failed.state.heard, false, 'Failed playback creates no preparation credit');
  const hidden = session(bookId);
  hidden.button('Listen').props.onClick(); hidden.document.hidden = true;
  await settle(hidden.calls.at(-1));
  assert.equal(hidden.state.heard, false, 'Hidden-page completion does not silently count as heard');
  console.log(`PASS: actual instruction/audio callbacks, ${printScreens} print-first screens, ${cards.length} paced book cards, legacy opening, replay/stop/panel cancellation and failed playback.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
