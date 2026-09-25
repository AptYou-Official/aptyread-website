'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { firstLessonSteps, FIRST_LESSON_KEY, freshFirstLesson, newAttempt, readFirstLesson, type FirstLessonRecord, type StepId, type Attempt } from '@/lib/malayalam-first-lesson';
import type { MalayalamAudioId } from '@/lib/malayalam-audio';
import useLessonAudio from './useLessonAudio';
import { Icon, MalayalamBrand } from './Shared';
import { FloorScene, HeadScene } from './LessonScenes';
import ConnectionNotice from './ConnectionNotice';

export default function FirstWordLesson() {
  const [record, setRecord] = useState<FirstLessonRecord>(freshFirstLesson);
  const current = useRef(record);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const audio = useLessonAudio();
  const step = firstLessonSteps.find(s => s.id === record.step)!;
  const stepIndex = firstLessonSteps.indexOf(step);
  const attempt = record.attempts[step.id];
  const choiceStep = ['match-ra', 'find-tha', 'meaning-choice'].includes(step.id);
  const checkedStep = choiceStep || step.id === 'build';

  useEffect(() => {
    try { const saved = readFirstLesson(localStorage.getItem(FIRST_LESSON_KEY)); current.current = saved; setRecord(saved); }
    catch { setStorageAvailable(false); }
    setReady(true);
  }, []);
  useEffect(() => { if (running) heading.current?.focus(); }, [record.step, running]);

  function persist(next: FirstLessonRecord) {
    current.current = next;
    setRecord(next);
    try { localStorage.setItem(FIRST_LESSON_KEY, JSON.stringify(next)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); }
  }
  function log(kind: string, value?: string, id: StepId = current.current.step) {
    const r = current.current;
    persist({ ...r, events: [...r.events, { step: id, kind, at: Date.now(), value }].slice(-300) });
  }
  function updateAttempt(update: (a: Attempt) => Attempt, id = current.current.step) {
    const r = current.current;
    persist({ ...r, attempts: { ...r.attempts, [id]: update(r.attempts[id] || newAttempt(id)) } });
  }
  function speak(clips: MalayalamAudioId[], id = current.current.step) {
    audio.play(clips, {
      onStart: clip => log('audio_started', clip, id),
      onError: clip => log('audio_failed', clip, id),
      onEnd: clip => {
        log('audio_finished', clip, id);
        if ((id === 'find-tha' && clip === 'A18') || (id === 'meaning-choice' && clip === 'W01')) updateAttempt(a => ({ ...a, inputHeard: true }), id);
      },
    });
  }
  function enter(id: StepId) {
    audio.stop();
    const r = current.current;
    const next = firstLessonSteps.find(s => s.id === id)!;
    persist({ ...r, step: id, visited: Array.from(new Set([...r.visited, id])), attempts: { ...r.attempts, [id]: r.attempts[id] || newAttempt(id) }, reachedEnd: r.reachedEnd || id === 'finish' });
    log('screen_exposed', next.evidence, id);
    setRunning(true);
    speak(next.audio, id);
  }
  function advance() {
    const r = current.current;
    log('continue', checkedStep && !r.attempts[r.step]?.selected ? 'no_submitted_response' : 'child_chose_continue');
    if (stepIndex < firstLessonSteps.length - 1) enter(firstLessonSteps[stepIndex + 1].id);
  }
  function exit() { audio.stop(); log('stop', 'position_saved'); }
  function help() {
    updateAttempt(a => ({ ...a, helped: true, revealed: true }));
    log('help', 'answer_model');
    // Supply the intended listening input too if a child missed it initially.
    const clips = step.id === 'find-tha' ? ['A03', 'F02', 'A18'] : step.id === 'meaning-choice' ? ['A03', 'A15', 'W01', 'A20'] : step.help;
    speak(clips as MalayalamAudioId[]);
  }
  function answer(value: string) {
    const a = current.current.attempts[step.id]!;
    if (a.selected !== null) return;
    const correct = value === (step.id === 'match-ra' ? 'റ' : step.id === 'find-tha' ? 'ത' : step.id === 'build' ? 'തറ' : 'floor');
    const supported = a.helped || step.id === 'build' || step.id === 'meaning-choice';
    updateAttempt(previous => ({ ...previous, selected: value, first: previous.first ?? value, responses: [...previous.responses, { answer: value, correct, supported, at: Date.now() }], helped: previous.helped || !correct, revealed: previous.revealed || !correct }));
    log('response', JSON.stringify({ value, correct, supported, evidence: step.evidence }));
    speak(correct ? ['A06'] : ['A08', ...(step.id === 'match-ra' ? ['F01'] : step.id === 'find-tha' ? ['F02'] : step.id === 'build' ? ['J01'] : ['A15'])] as MalayalamAudioId[]);
  }
  function retryChoice() {
    updateAttempt(a => ({ ...a, selected: null, built: [], retryUsed: true, helped: true, revealed: false, options: [...a.options].reverse() }));
    log('retry', 'supported');
    speak(step.audio);
  }
  function addTile(tile: string) {
    const a = current.current.attempts[step.id]!;
    if (a.selected !== null || a.built.length >= 2) return;
    updateAttempt(previous => ({ ...previous, built: [...previous.built, tile] }));
    if (a.built.length === 1) speak(['U07']);
  }
  const result = attempt?.responses.at(-1);
  const inputReady = !['find-tha', 'meaning-choice'].includes(step.id) || attempt?.inputHeard;
  const selected = attempt?.selected !== null && attempt?.selected !== undefined;

  return <div className="ml-first-lesson">
    <header className="ml-lesson-header"><MalayalamBrand compact /><a href="/malayalam/dashboard" onClick={exit} className="ml-lesson-exit" aria-label="Stop lesson and save"><Icon name="home" size={21} /><span lang="ml">ഇവിടെ നിർത്താം</span></a></header>
    <main className="ml-lesson-main">
      <ConnectionNotice />
      {!running ? <section className="ml-lesson-start">
        <span className="ml-eyebrow">LEVEL 1 · MY FIRST READING STEPS</span>
        <Image src="/images/apty-mascot.png" alt="" width={170} height={170} priority />
        <h1 lang="ml">നമുക്ക് തുടങ്ങാം!</h1>
        <p>A little listening. A little reading. Your own pace.</p>
        <button className="ml-btn ml-btn-large" disabled={!ready} onClick={() => enter(current.current.step)} aria-label="Start first lesson"><span lang="ml">{record.visited.length ? 'തുടരാം' : 'തുടങ്ങാം'}</span><Icon name="arrow" /></button>
        <details className="ml-lesson-info"><summary>About this lesson</summary><p>This is the first reading lesson in development. It includes meaning, letter models, choices and guided word building. Handwriting videos and tracing await approved movement models. Reaching the end records a visit, not mastery. Observations are saved only in this browser; no child name, microphone or parent score is required.</p></details>
      </section> : <section className="ml-lesson-panel" data-step={step.id}>
        <div className="ml-lesson-progress" aria-label={`Activity ${stepIndex + 1} of ${firstLessonSteps.length}`}><span style={{ width: `${(stepIndex + 1) / firstLessonSteps.length * 100}%` }} /></div>
        <h1 ref={heading} tabIndex={-1} lang="ml">{step.heading}</h1>
        <div className="ml-lesson-board">
          {(step.id === 'meaning' || step.id === 'finish') && <div className="ml-meaning-scene"><FloorScene focus /><span className="ml-scene-label" lang="ml">തറ</span></div>}
          {(step.id === 'ra' || step.id === 'tha') && <div className="ml-teaching-form" lang="ml">{step.id === 'ra' ? 'റ' : 'ത'}</div>}
          {step.id === 'pause' && <div className="ml-rest-scene"><Image src="/images/apty-mascot.png" alt="" width={170} height={170} /><p lang="ml">തുടരാം. വേണമെങ്കിൽ ഇവിടെ നിർത്താം.</p></div>}
          {step.id === 'join' && <div className="ml-joining-model"><div lang="ml"><span>ത</span><span>റ</span></div><Icon name="arrow" size={28} /><strong lang="ml">തറ</strong></div>}
          {step.id === 'match-ra' && <span className="ml-choice-reference" lang="ml">റ</span>}
          {step.id === 'meaning-choice' && <span className="ml-choice-reference" lang="ml">തറ</span>}
          {choiceStep && <div className={`ml-lesson-choices ${step.id === 'meaning-choice' ? 'ml-picture-choices' : ''}`}>
            {attempt?.options.map(option => {
              const target = step.id === 'match-ra' ? 'റ' : step.id === 'find-tha' ? 'ത' : 'floor';
              const showTarget = attempt.revealed && option === target;
              return <button key={option} disabled={selected || !inputReady} onClick={() => answer(option)} aria-label={option === 'floor' ? 'Choose the floor picture' : option === 'head' ? 'Choose the head picture' : `Choose ${option}`} className={showTarget ? 'ml-revealed-choice' : ''}>
                {step.id === 'meaning-choice' ? option === 'floor' ? <FloorScene /> : <HeadScene /> : <span lang="ml">{option}</span>}
                {showTarget && <span className="ml-choice-cue"><Icon name="check" size={22} /></span>}
              </button>;
            })}
          </div>}
          {step.id === 'build' && <div className="ml-lesson-build">
            <span className="ml-choice-reference" lang="ml">തറ</span>
            <div className="ml-word-slots" lang="ml" aria-label={`Your word: ${attempt?.built.join('') || 'empty'}`}>{[0, 1].map(i => <span key={i}>{attempt?.built[i] || '·'}</span>)}</div>
            <div className="ml-choice-tiles">{attempt?.options.map(tile => <button key={tile} lang="ml" aria-label={`Add ${tile}`} disabled={selected || attempt.built.length === 2} onClick={() => addTile(tile)}>{tile}</button>)}</div>
            <div className="ml-build-actions"><button className="ml-lesson-soft" aria-label="Undo last letter" disabled={selected || !attempt?.built.length} onClick={() => { updateAttempt(a => ({ ...a, built: a.built.slice(0, -1) })); speak(['U06']); }}><span aria-hidden="true">↶</span><span lang="ml">മാറ്റാം</span></button><button className="ml-btn" aria-label="Check my word" disabled={selected || attempt?.built.length !== 2} onClick={() => answer(attempt!.built.join(''))}><Icon name="check" /><span lang="ml">തയ്യാറായി</span></button></div>
          </div>}
        </div>
        <div className="ml-lesson-feedback" role="status">
          {selected && result && <><span lang="ml">{result.correct ? 'ശരി.' : 'നമുക്ക് ഒരുമിച്ച് നോക്കാം.'}</span>{!result.correct && !attempt?.retryUsed && <button onClick={retryChoice} className="ml-lesson-soft" aria-label="Try once more"><span lang="ml">ഒന്നുകൂടി നോക്കാം</span><Icon name="arrow" size={18} /></button>}</>}
          {!selected && attempt?.revealed && <span lang="ml">നമുക്ക് ഒരുമിച്ച് നോക്കാം.</span>}
        </div>
        <div className="ml-lesson-audio">
          <button className="ml-lesson-soft" disabled={audio.muted} onClick={() => { log('instruction_replay'); speak(step.id === 'meaning-choice' && attempt?.inputHeard ? ['A20'] : step.audio); }} aria-label="Listen again"><Icon name="sound" /><span lang="ml">വീണ്ടും കേൾക്കാം</span></button>
          {checkedStep && <button className="ml-lesson-soft" disabled={audio.muted} onClick={help} aria-label="Show me help"><Icon name="play" /><span lang="ml">കാണിച്ചുതരൂ</span></button>}
          <button className="ml-lesson-soft ml-sound-toggle" onClick={audio.toggleMute} aria-pressed={audio.muted} aria-label={audio.muted ? 'Turn lesson sound on' : 'Mute lesson sound'}><Icon name="sound" /><span lang="ml">{audio.muted ? 'ഓൺ' : 'ഓഫ്'}</span></button>
        </div>
        <div className="ml-lesson-audio-status" role="status">
          {audio.status === 'error' ? <><span lang="ml">ശബ്ദം കേൾക്കാനായില്ല.</span><button className="ml-lesson-soft" onClick={audio.retry} aria-label="Retry lesson audio"><Icon name="play" /><span lang="ml">വീണ്ടും ശ്രമിക്കാം</span></button></> : audio.status === 'loading' ? <span lang="ml">ഒരു നിമിഷം…</span> : !inputReady && audio.muted ? <span lang="ml">കേൾക്കാൻ ശബ്ദം ഓണാക്കൂ.</span> : null}
        </div>
        <footer className="ml-lesson-footer"><a href="/malayalam/dashboard" onClick={exit} className="ml-text-button" aria-label="Save and return to my path"><Icon name="home" size={20} /><span lang="ml">എന്റെ വഴി</span></a>
          {step.id !== 'finish' ? <button className="ml-btn" onClick={advance} aria-label="Continue lesson"><span lang="ml">തുടരാം</span><Icon name="arrow" /></button> : <button className="ml-btn" aria-label="Explore the lesson again" onClick={() => { const events = current.current.events; persist({ ...freshFirstLesson(), events }); log('restart', 'new_practice_visit'); enter('meaning'); }}><span lang="ml">വീണ്ടും നോക്കാം</span><Icon name="arrow" /></button>}
        </footer>
      </section>}
      {!storageAvailable && <p className="ml-storage-note" role="status">Your place is kept for this visit only. Browser storage is unavailable.</p>}
    </main>
  </div>;
}
