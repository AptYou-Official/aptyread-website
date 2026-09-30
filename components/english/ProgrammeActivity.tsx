'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getProgrammeActivity, type ProgrammeChoice } from '@/lib/english-programme';
import { freshProgrammeState, isProgrammeStepReady, programmeSteps, programmeChoiceOrder, programmeSoundChoices, programmeBookPreparation } from '@/lib/english-programme-progress';
import { updateProgramme } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import useEnglishAudio from './useEnglishAudio';
import ProgrammeScene from './ProgrammeScene';
import LearningCompanion from './LearningCompanion';
import ParentHelp from './ParentHelp';
import Icon from './Icons';
import { programmeInstruction, programmeInstructionName, programmePreparationVisual, programmeModelVisible, programmeVideoModels } from '@/lib/english-programme-media';

export default function ProgrammeActivity({ activityId, suspended = false, onComplete }: { activityId: string; suspended?: boolean; onComplete: () => void }) {
  const activity = getProgrammeActivity(activityId);
  if (!activity) return <p role="alert">This activity could not be loaded. Please return to the learning path.</p>;
  return <ProgrammeRunner key={activityId} activityId={activityId} suspended={suspended} onComplete={onComplete} />;
}

function ProgrammeRunner({ activityId, suspended, onComplete }: { activityId: string; suspended: boolean; onComplete: () => void }) {
  const activity = getProgrammeActivity(activityId)!;
  const steps = programmeSteps(activity);
  const { progress, update } = useEnglish();
  const state = progress.programme?.[activityId] || freshProgrammeState(steps[0]);
  const step = steps[state.task];
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const run = useRef(0);
  const title = useRef<HTMLHeadingElement>(null);
  const modelVideo = useRef<HTMLVideoElement>(null);
  const [feedback, setFeedback] = useState('');
  const [audioFailed, setAudioFailed] = useState(false);
  const [showText, setShowText] = useState(false);
  const halt = useCallback(() => { run.current++; stop(); }, [stop]);
  const act = useCallback((action: Parameters<typeof updateProgramme>[2]) => update(p => updateProgramme(p, activityId, action)), [update, activityId]);
  const cue = (name: string, narration: string) => ({ id: `l1.${activityId}.${step.id}.${name}`, narration });
  const sound = (letter: string) => ({ id: `sound-${letter}` });
  const speak = async (cues: Parameters<typeof sequence>[0], heard = false) => {
    halt(); modelVideo.current?.pause(); const token = run.current;
    const ok = await sequence(cues);
    if (token !== run.current || document.hidden) return;
    setAudioFailed(!ok);
    if (ok && heard) act({ type: 'heard' });
  };
  const done = !!state.complete;
  const ready = isProgrammeStepReady(step, state);
  const instruction = programmeInstruction(step, state.phase, done, ready, state.heard);
  const directionName = programmeInstructionName(step, state.phase, done, ready, state.heard);
  const preparation = step.kind === 'book-cover' ? programmeBookPreparation(step) : [];
  const preparationIndex = state.bookPrep ?? (state.heard ? Math.max(0, preparation.length - 1) : 0);
  const preparationCard = preparation[preparationIndex];
  const morePreparation = step.kind === 'book-cover' && preparationIndex < preparation.length - 1;
  const preparationVisual = preparationCard && programmePreparationVisual(step.id, preparationCard.id);
  const samplePage = step.kind === 'book-cover' ? steps.find(item => item.kind === 'page' && item.bookTitle === step.title && (preparationVisual !== 'punctuation' || item.text.includes(','))) || steps.find(item => item.kind === 'page' && item.bookTitle === step.title) : undefined;
  const videoModel = programmeVideoModels[`l1.${activityId}.${step.id}.model`];

  useEffect(() => {
    halt(); setFeedback(''); setAudioFailed(false); setShowText(false);
    title.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Short directions never pronounce the answer on a child-first reading screen.
    const token = run.current;
    const timer = setTimeout(() => { if (run.current === token && !document.hidden && !suspended) void sequence([{ id: `l1.${activityId}.${step.id}.${directionName}`, narration: instruction }]); }, 180);
    return () => { clearTimeout(timer); halt(); };
    // The phase is the narration boundary; per-tap progress must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.id, state.phase, state.bookPrep, done, activityId, halt, sequence]);
  useEffect(() => { if (suspended) { halt(); modelVideo.current?.pause(); } }, [suspended, halt]);
  useEffect(() => { const pause = () => { if (document.hidden) modelVideo.current?.pause(); }; document.addEventListener('visibilitychange', pause); return () => document.removeEventListener('visibilitychange', pause); }, []);

  function listen() {
    const responsePrompt = !state.heard && (step.kind === 'sound' || step.kind === 'build') && state.phase === 1
      ? [{ ...cue(programmeInstructionName(step, state.phase, false, false, true), programmeInstruction(step, state.phase, false, false, true)), optional: true }] : [];
    // Keep the target sound/word last, so extra speech does not mask what the
    // child needs to hold in mind. Replay goes straight to that target.
    if (step.kind === 'sound') void speak([...responsePrompt, sound(step.letter)], true);
    else if (step.kind === 'build') void speak(state.phase === 0 ? [...step.word].map(sound).concat([cue('meaning', `${step.word}. ${step.meaning}`)]) : [...responsePrompt, cue('word', step.word)], true);
    else if (step.kind === 'book-cover' && preparationCard) void speak([cue(preparationCard.id, preparationCard.text)], true);
    else if (step.kind === 'listen') void speak([cue('story', step.story)], true);
    else if (step.kind === 'page') { act({ type: 'help' }); void speak([cue('page', step.text)]); }
    else if (step.kind === 'read') help();
  }
  function help() {
    act({ type: 'help' });
    if (step.kind === 'sound') { setFeedback('This one. Listen, then try.'); void speak([sound(step.letter)], true); }
    if (step.kind === 'build') {
      setFeedback('Listen to the next sound.');
      void speak(state.phase === 1 ? [cue('word', step.word), sound(step.word[state.built.length])] : [...step.word].map(sound).concat([cue('word', step.word)]), true);
    }
    if (step.kind === 'read') void speak([...step.word.toLowerCase()].map(sound).concat([cue('word', step.word)]));
    if (step.kind === 'page') { setFeedback('Let’s read together.'); void speak([cue('page', step.text)]); }
    if (step.kind === 'listen') { setFeedback('Let’s listen together.'); void speak([cue('story', step.story)], true); }
  }
  function choose(value: string) {
    if (suspended || ready) return;
    halt(); act({ type: 'choose', value });
    const target = step.kind === 'sound' ? step.letter : step.kind === 'build' ? step.word[state.built.length] : 'answer' in step ? step.answer : undefined;
    if (value === target) {
      setFeedback('');
      if (step.kind === 'build') void speak([sound(value)]);
    } else {
      setFeedback(state.misses >= 1 ? 'Let’s do this together.' : 'Listen again. Have another try.');
      if (state.misses >= 1) help();
      else void speak([cue('retry', 'Let’s have another try.')]);
    }
  }
  function next() {
    halt(); setFeedback('');
    if (done) onComplete();
    else if (step.kind === 'book-cover' && morePreparation) act({ type: 'prepare-next' });
    else if (!ready && (step.kind === 'book-cover' || step.kind === 'page' && state.phase === 1 && !step.question)) {
      act({ type: 'continue' }); act({ type: 'next' });
    }
    else act({ type: ready ? 'next' : 'continue' });
  }
  function choices(options: ProgrammeChoice[], answer: string) {
    return <div className="en-programme-choices">{programmeChoiceOrder(options, step.id).map(option => <div key={option.id} className="en-programme-choice-wrap"><button className={`en-programme-choice ${state.misses >= 2 && option.id === answer ? 'is-hint' : ''}`} onClick={() => choose(option.id)} disabled={suspended} aria-label={`Choose ${option.label}`}><ProgrammeScene scene={option.scene} /></button><button className="en-programme-label-audio" aria-label={`Hear this picture: ${option.label}`} onClick={() => { act({ type: 'help' }); void speak([cue(`choice-${option.id}`, option.label)]); }}><Icon name="sound" size={20} /></button></div>)}</div>;
  }
  const targetLetter = step.kind === 'build' ? step.word[state.built.length] : step.kind === 'sound' ? step.letter : '';
  const showHint = step.kind === 'build' && step.mode !== 'encode' || state.hinted || state.misses >= 2;
  const advanceAllowed = ready || step.kind === 'read' && state.phase === 0 || step.kind === 'page' && (state.phase === 0 || !step.question) || step.kind === 'book-cover' && state.heard || state.phase === 0 && state.heard;

  const action = done || ready ? 'next' : step.kind === 'read' && state.phase === 0 || step.kind === 'page' && state.phase === 0 ? 'read' : !state.heard && (step.kind === 'sound' || step.kind === 'build' || step.kind === 'book-cover' || step.kind === 'listen' && state.phase === 0) ? 'listen' : state.phase === 1 ? 'choose' : 'watch';
  return <div className="en-word-activity en-guided-word en-programme-activity" data-programme-task={step.id} data-task-kind={step.kind} data-action={action} data-phase={state.phase}>
    <div className="en-programme-progress" aria-label={`Part ${state.task + 1} of ${steps.length}`}><span>{state.task + 1} / {steps.length}</span><span>{step.kind === 'page' ? `Page ${step.page} of ${step.pages}` : step.kind === 'listen' ? 'Listen & imagine' : step.kind === 'book-cover' ? 'My little book' : step.kind === 'build' && step.mode !== 'encode' || step.kind === 'sound' && step.mode === 'teach' ? 'With Apty' : 'My turn'}</span></div>
    <section className="en-programme-stage">
      <LearningCompanion title={instruction} headingRef={title} speaking={audio.playing} reaction={`${step.id}-${state.phase}-${state.misses}`} />
      {!done && videoModel && programmeModelVisible(step, state.phase, ready) && <video ref={modelVideo} className="en-programme-video" controls playsInline preload="none" poster={videoModel.poster} src={videoModel.src} onPlay={halt} onEnded={() => act({ type: 'heard' })} aria-label="Watch the teaching model" />}
      {done ? <div className="en-programme-finish"><Icon name="star" size={72} /><h2>A lovely place to pause.</h2><p>You can explore this activity again whenever you like.</p></div> : ready ? <div className="en-programme-success">
        {step.kind === 'sound' ? <strong className="en-programme-letter">{step.letter}</strong> : step.kind === 'build' ? <><ProgrammeScene scene={step.scene} /><strong className="en-programme-word">{step.word}</strong><button className="en-text-button" onClick={() => void speak([cue('meaning', `${step.word}. ${step.meaning}`)])}><Icon name="sound" /> Hear my word</button></> : step.kind === 'read' ? <><ProgrammeScene scene={step.choices.find(choice => choice.id === step.answer)!.scene} /><strong className="en-programme-word">{step.word}</strong><button className="en-text-button" onClick={() => void speak([cue('meaning', `${step.word}. ${step.meaning || ''}`)])}><Icon name="sound" /> Hear my word</button></> : step.kind === 'book-cover' ? <Icon name="book" size={100} /> : <ProgrammeScene scene={step.scene} />}
        <span className="en-programme-check"><Icon name="check" size={25} /> {step.kind === 'build' ? 'You made it!' : step.kind === 'sound' ? 'You found it!' : 'Let’s keep exploring.'}</span>
      </div> : <>
        {step.kind === 'sound' && (state.phase === 0 ? <div className="en-programme-model"><strong className="en-programme-letter">{step.letter}</strong>{state.heard && <button className="en-text-button" onClick={listen}><Icon name="sound" /> Listen again</button>}</div> : <div className="en-programme-find">{state.heard && <button className="en-programme-listen" onClick={listen}><Icon name="sound" size={28} /><span>Listen again</span></button>}<div className="en-programme-tiles">{programmeSoundChoices(step).map(letter => <button key={letter} className={`en-letter-tile ${showHint && letter === targetLetter ? 'is-hint' : ''}`} onClick={() => choose(letter)} disabled={!state.heard || suspended} aria-label={`Choose ${letter}`}>{letter}</button>)}</div></div>)}
        {step.kind === 'build' && (state.phase === 0 ? <div className="en-programme-word-model"><ProgrammeScene scene={step.scene} /><strong className="en-programme-word">{step.word}</strong>{state.heard && <button className="en-text-button" onClick={listen}><Icon name="sound" /> Listen again</button>}</div> : <div className="en-programme-build">{state.heard && <button className="en-programme-listen" onClick={listen}><Icon name="sound" size={28} /><span>Hear the word</span></button>}<div className="en-word-slots" aria-label={`${state.built.length} of ${step.word.length} letters placed`}>{[...step.word].map((_, i) => <span key={i} className={state.built[i] ? 'is-filled' : ''}>{state.built[i] || <i className="en-empty-slot" />}</span>)}</div><div className="en-programme-tiles">{step.letters.map(letter => <button key={letter} disabled={!state.heard || suspended} className={`en-letter-tile ${showHint && letter === targetLetter ? 'is-hint' : ''}`} onClick={() => choose(letter)} aria-label={`Choose ${letter}`}>{letter}{showHint && letter === targetLetter && <Icon name="hand" size={25} />}</button>)}</div><div className="en-programme-tools"><button className="en-text-button" disabled={!state.built} onClick={() => { halt(); act({ type: 'undo' }); }}><Icon name="back" /> Undo</button></div></div>)}
        {step.kind === 'read' && <div className="en-programme-read"><strong className="en-programme-word">{step.word}</strong>{state.phase === 0 ? <button className="en-text-button" onClick={help}><Icon name="sound" /> Help me</button> : choices(step.choices, step.answer)}</div>}
        {step.kind === 'book-cover' && preparationCard && <div className="en-programme-book-cover">
          <h2>{step.title}</h2><div className="en-book-prep-dots" aria-label={`Getting ready: ${preparationIndex + 1} of ${preparation.length}`}>{preparation.map((item, index) => <span key={item.id} className={index <= preparationIndex ? 'is-current' : ''} aria-hidden="true" />)}</div>
          <div className="en-book-prep-card" key={preparationCard.id}>
            {preparationCard.scene ? <><ProgrammeScene scene={preparationCard.scene} /><strong className="en-book-prep-name">{preparationCard.text}</strong></> : <>
              {preparationVisual === 'cases' ? <div className="en-book-capitals" aria-label="Two shapes, the same sound">{step.capitals.map(letter => <button key={letter} onClick={() => void speak([sound(letter.toLowerCase())])} aria-label={`Hear the sound for big ${letter} and small ${letter.toLowerCase()}`}>{letter} {letter.toLowerCase()}<Icon name="sound" size={16} /></button>)}</div> : preparationVisual === 'names' ? <div className="en-book-name-model">{step.preparation.map(item => <strong key={item.text}><em>{item.text[0]}</em>{item.text.slice(1)}</strong>)}</div> : samplePage?.kind === 'page' && (preparationVisual === 'tracking' || preparationVisual === 'punctuation') ? <div className={`en-book-print-model is-${preparationVisual}`}><p>{samplePage.text.split(' ').map((word, i) => <span key={i}>{word.replace(/[.,]/g, '')}{/[.,]$/.test(word) && <em>{word.slice(-1)}</em>}</span>)}</p>{preparationVisual === 'tracking' && <span className="en-book-reading-arrow" aria-label="Read from left to right"><Icon name="arrow" size={30} /></span>}</div> : <span className="en-book-prep-icon"><Icon name="book" size={68} /></span>}
              <p className="en-book-prep-caption">{preparationCard.text}</p>
            </>}
          </div>
          {state.heard && <button className="en-text-button" onClick={listen}><Icon name="sound" /> Listen again</button>}
          <details className="en-book-read-together"><summary>Read together</summary><p>{preparationCard.text}</p><button className="en-text-button" onClick={() => { halt(); act({ type: 'help' }); act({ type: 'heard' }); }}>We read this part <Icon name="check" /></button></details>
        </div>}
        {step.kind === 'page' && <div className="en-programme-page">{state.phase === 1 && !step.question && <ProgrammeScene scene={step.scene} />}<p className="en-programme-sentence">{step.text.split(' ').map((word, index) => <button key={index} onClick={() => { act({ type: 'help' }); void speak([cue(`word-${index}`, word)]); }}>{word}</button>)}</p>{state.phase === 0 ? <button className="en-text-button" onClick={listen}><Icon name="sound" /> Read with me</button> : step.question && step.choices && step.answer ? <><button className="en-text-button" onClick={() => void speak([cue('question', step.question!)])}><Icon name="sound" /> Hear the question</button>{choices(step.choices, step.answer)}</> : <button className="en-text-button" onClick={listen}><Icon name="sound" /> Read together</button>}</div>}
        {step.kind === 'listen' && <div className="en-programme-story">{state.phase === 0 ? <><ProgrammeScene scene={step.scene} />{state.heard && <button className="en-text-button" onClick={listen}><Icon name="sound" /> Listen again</button>}{showText && <div><p className="en-programme-story-text">{step.story}</p><button className="en-text-button" onClick={() => { act({ type: 'help' }); act({ type: 'heard' }); }}>We read it together <Icon name="check" /></button></div>}<button className="en-text-button" onClick={() => { setShowText(!showText); act({ type: 'help' }); }}>Read together</button></> : <><button className="en-text-button" onClick={() => void speak([cue('question', step.question)])}><Icon name="sound" /> Hear the question</button>{choices(step.choices, step.answer)}</>}</div>}
      </>}
      {feedback && <p className="en-programme-feedback" role="status">{feedback}</p>}
      {audioFailed && <div className="en-programme-audio-fallback" role="status"><p>The voice could not play. Try Listen again, or read together.</p><button className="en-text-button" onClick={() => { setShowText(true); act({ type: 'help' }); act({ type: 'heard' }); }}>{step.kind === 'build' ? `Read together: ${step.word}` : step.kind === 'sound' ? `Say the sound for ${step.letter} together` : 'We read it together'}</button></div>}
    </section>
    <div className={`en-word-dock en-programme-dock ${action === 'choose' && !advanceAllowed ? 'is-choice' : ''}`}><button className="en-dock-audio" aria-label={audio.playing ? 'Stop listening' : 'Hear the instructions'} onClick={() => audio.playing ? halt() : void speak([cue(directionName, instruction)])}><Icon name={audio.playing ? 'close' : 'sound'} size={24} /></button>{done || advanceAllowed ? <button className="en-button" onClick={next} disabled={suspended}>{done ? 'Next activity' : ready ? 'Keep going' : step.kind === 'read' && state.phase === 0 ? 'I tried it' : step.kind === 'sound' ? 'My turn' : step.kind === 'build' ? 'Let’s make it' : step.kind === 'book-cover' ? morePreparation ? 'Next' : 'Open my book' : step.kind === 'page' && state.phase === 0 ? 'See the story' : 'Next'}<Icon name={step.kind === 'read' && state.phase === 0 ? 'check' : 'arrow'} /></button> : action === 'choose' ? <button className="en-text-button" onClick={help} disabled={suspended}><Icon name="hand" /> Help me</button> : <button className="en-button" onClick={listen} disabled={suspended}><Icon name="sound" /> Listen</button>}</div>
    <ParentHelp kind="application" onOpen={() => { halt(); modelVideo.current?.pause(); }}><p><strong>This activity:</strong> {activity.objective}</p><p>Spoken reading is a child’s opportunity to try, not a scored test. Only sound choices, spelling with tiles, and meaning choices produce a practice record. Help and retries are marked as supported.</p><p>New lesson teaching videos use placeholders until connected. Instructions and whole words use the device voice until recordings are added; individual sounds use recorded phonemes.</p></ParentHelp>
  </div>;
}
