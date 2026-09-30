'use client';

import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { completeEnglishActivity, WordProgress, wordFinishStage } from '@/lib/english-progress';
import { englishPronunciationVideos, ReadingWord } from '@/lib/english-curriculum';
import { englishNarration, narrationCue } from '@/lib/english-narration';
import { freshGuidedWord, guidedWordPrompt, placeGuidedLetter, tryReadingWord, wordSound } from '@/lib/english-word';
import { useEnglish } from './EnglishProvider';
import useEnglishAudio from './useEnglishAudio';
import StoryScene from './StoryScene';
import PinScene from './PinScene';
import AtScene from './AtScene';
import WordPronunciation from './WordPronunciation';
import WordCelebration from './WordCelebration';
import LearningCompanion from './LearningCompanion';
import ParentHelp from './ParentHelp';
import ActivityJourney from './ActivityJourney';
import Icon from './Icons';

export default function WordBuilder({ word, onComplete, nextTopic }: { word: ReadingWord; onComplete: () => void; nextTopic?: string }) {
  const { progress, update } = useEnglish();
  const saved = progress.words[word] || freshGuidedWord();
  const [feedback, setFeedback] = useState('');
  const [blending, setBlending] = useState(false);
  const [blendIndex, setBlendIndex] = useState(-1);
  const [storyRun, setStoryRun] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hintRun, setHintRun] = useState(0);
  const [flight, setFlight] = useState<{ letter: string; index: number; serial: number; style: CSSProperties } | null>(null);
  const board = useRef<HTMLDivElement>(null);
  const flightSerial = useRef(0);
  const closeVideo = useCallback(() => setVideoOpen(false), []);
  const blendRun = useRef(0);
  const title = useRef<HTMLHeadingElement>(null);
  const previousPhase = useRef(saved.stage);
  const audio = useEnglishAudio();
  const phase = saved.stage;
  // Capture the entry state once. A new letter must not replay the introduction.
  const openingCues = useRef(phase === 0 ? guidedWordPrompt(word, saved.built) : null);
  const cancelOpening = useRef(() => {});
  const { sequence } = audio;
  const finishStage = wordFinishStage(word);
  const nextLetter = word[saved.built.length];
  const question = phase === 3 ? 'mat' : 'bench';
  const rightAnswer = saved.answers[question]?.at(-1) === true;
  const pronunciation = englishPronunciationVideos[word];
  const showModel = phase === 1 && saved.reads >= 1 && !!pronunciation;
  const readingPrompt = saved.reads === 2 ? `read-done-${word}` : saved.reads === 1 ? 'read-again' : 'read-turn';
  const journeyStep = phase === 0 ? 0 : phase === 1 ? 1 : phase < finishStage ? 2 : 3;
  const headline = phase === 0 ? nextLetter ? `Tap ${nextLetter}` : 'Put them together.'
    : phase === 1 ? blending ? 'Listen.' : saved.reads < 2 ? 'Read it.' : 'You tried it!'
    : phase === 2 ? 'Look.' : phase < finishStage ? 'Find the picture.' : 'We made a word!';

  useEffect(() => {
    if (previousPhase.current !== phase) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      title.current?.focus({ preventScroll: true });
    }
    previousPhase.current = phase;
  }, [phase]);
  useEffect(() => () => { blendRun.current++; }, []);
  useEffect(() => {
    const cues = openingCues.current;
    if (!cues) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cancel = () => { clearTimeout(timer); document.removeEventListener('visibilitychange', whenVisible); };
    const whenVisible = () => {
      if (document.hidden) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.hidden) return;
        cancel(); void sequence(cues);
      }, 0);
    };
    // Deferring one task lets Strict Mode clean up its rehearsal mount without
    // speaking twice. A child's action or navigation cancels pending playback.
    cancelOpening.current = cancel;
    document.addEventListener('visibilitychange', whenVisible);
    whenVisible();
    return cancel;
  }, [sequence]);

  function save(change: Partial<WordProgress>) {
    update(p => ({ ...p, words: { ...p.words, [word]: { ...(p.words[word] || freshGuidedWord()), ...change, started: true, mode: 'guided', journeyVersion: 2 } } }));
  }
  function stop() {
    cancelOpening.current();
    blendRun.current++; audio.stop(); closeVideo(); setBlending(false); setBlendIndex(-1);
  }
  function directions() {
    stop();
    setHintRun(value => value + 1);
    if (phase === 0) void audio.sequence(guidedWordPrompt(word, saved.built));
    else if (phase === 1) void audio.play(readingPrompt);
    else if (phase === 2) playStory();
    else if (phase < finishStage) void audio.play(`question-${question}`);
    else void audio.play(`celebrate-${word}`);
  }
  function tile(letter: string) {
    const placed = placeGuidedLetter(word, saved, letter);
    if (placed === saved) return;
    cancelOpening.current();
    // Travel from the actual tapped tile to its slot, at every screen size.
    const source = board.current?.querySelector(`[data-letter-tile="${letter}"]`)?.getBoundingClientRect();
    const destination = board.current?.querySelector(`[data-letter-slot="${saved.built.length}"]`)?.getBoundingClientRect();
    const bounds = board.current?.getBoundingClientRect();
    if (source && destination && bounds) setFlight({ letter, index: saved.built.length, serial: ++flightSerial.current, style: {
      left: source.left - bounds.left, top: source.top - bounds.top, width: source.width, height: source.height,
      '--flight-x': `${destination.left - source.left}px`, '--flight-y': `${destination.top - source.top}px`,
    } as CSSProperties });
    save(placed); setFeedback('');
    // One sound confirms the child's tap. The next letter is already shown by
    // the hand and empty slot; its spoken prompt remains available on request.
    void audio.sequence([wordSound(letter)]);
  }
  function undo() {
    if (phase !== 0 || !saved.built) return;
    const built = saved.built.slice(0, -1);
    stop(); setFlight(null); save({ built }); setFeedback('');
    void audio.sequence(guidedWordPrompt(word, built));
  }
  async function blend() {
    if (saved.built !== word) return;
    stop(); setFlight(null);
    const run = ++blendRun.current;
    save({ stage: 1 }); setFeedback(''); setBlending(true); setBlendIndex(0);
    await audio.sequence([...word.split('').map(wordSound), narrationCue(`word-${word}`)], index => {
      if (blendRun.current === run) setBlendIndex(index);
    });
    if (blendRun.current === run) { setBlending(false); setBlendIndex(-1); }
  }
  function read() {
    if (blending || phase !== 1 || saved.reads >= 2) return;
    stop();
    update(p => ({ ...p, words: { ...p.words, [word]: tryReadingWord(p.words[word] || freshGuidedWord()) } }));
    if (saved.reads === 0) void audio.play('read-again');
  }
  function playStory() {
    closeVideo(); setStoryRun(old => old + 1);
    void audio.play(`story-${word}`);
  }
  function next() {
    if (phase < 1 || (phase === 1 && saved.reads < 2) || (phase > 2 && phase < finishStage && !rightAnswer) || phase >= finishStage) return;
    stop(); setFeedback('');
    const stage = phase + 1;
    update(p => {
      const nextProgress = { ...p, words: { ...p.words, [word]: { ...(p.words[word] || freshGuidedWord()), stage, journeyVersion: 2 as const } } };
      return stage === finishStage ? completeEnglishActivity(nextProgress, `build-${word}`) : nextProgress;
    });
    if (stage === finishStage) void audio.play(`celebrate-${word}`);
    else if (stage === 2) playStory();
    else void audio.play(`question-${stage === 3 ? 'mat' : 'bench'}`);
  }
  function choose(correct: boolean) {
    if (rightAnswer) return;
    save({ answers: { ...saved.answers, [question]: [...(saved.answers[question] || []), correct].slice(-100) } });
    setFeedback(correct ? 'You found it!' : 'Who sat down?');
    void audio.play(correct ? 'meaning-correct' : 'meaning-retry');
  }
  return <div className="en-word-activity en-guided-word" data-word-stage={phase} data-word-mode="guided" data-action={phase === 0 ? 'make' : phase === 1 ? blending ? 'listen' : 'read' : phase < finishStage ? 'look' : 'continue'}>
    <ActivityJourney step={journeyStep} />
    <section key={phase} className={`en-word-stage ${phase === finishStage ? 'is-celebrating' : ''}`} aria-label={headline}>
    {phase !== finishStage && <LearningCompanion title={feedback || headline} speaking={audio.playing} headingRef={title} reaction={`${saved.built}-${saved.reads}-${feedback}`} />}
    {phase === 0 ? <>
      <div ref={board} className={`en-build-card ${saved.built === word ? 'is-built' : ''}`}>
        <div className="en-word-slots" aria-label={`Word built: ${saved.built || 'empty'}`}>{word.split('').map((letter, i) => <span key={i} data-letter-slot={i} className={i < saved.built.length ? 'is-filled' : i === saved.built.length ? 'is-next' : ''}>{i < saved.built.length ? <span className={`en-placed-letter ${flight?.index === i ? 'is-arriving' : ''}`}>{letter}</span> : i === saved.built.length ? <span className="en-letter-guide">{letter}</span> : <span className="en-empty-slot" aria-hidden="true" />}</span>)}</div>
        <div className="en-build-bridge" aria-hidden="true">{word.split('').map((letter, index) => <span key={letter} className={index < saved.built.length ? 'is-placed' : letter === nextLetter ? 'is-next' : ''}><Icon name={index < saved.built.length ? 'check' : 'arrow'} size={16} /></span>)}</div>
        <div className="en-letter-bank" aria-label="Build from left to right">{word.split('').map((letter, index) => <button data-letter-tile={letter} className={`en-letter-tile ${letter === nextLetter ? 'is-hint' : ''} ${index < saved.built.length ? 'is-used' : ''}`} key={letter} onClick={() => tile(letter)} disabled={letter !== nextLetter} aria-label={`Add ${letter}`} aria-current={letter === nextLetter ? 'step' : undefined}>{letter}{index < saved.built.length ? <Icon name="check" size={22} /> : letter === nextLetter ? <span key={hintRun} className="en-tap-demonstration" aria-hidden="true"><Icon name="hand" size={32} /></span> : null}</button>)}</div>
        {flight && <span key={flight.serial} className="en-travelling-letter" style={flight.style} aria-hidden="true" onAnimationEnd={() => setFlight(current => current?.serial === flight.serial ? null : current)}>{flight.letter}</span>}
      </div>
    </> : phase === 1 ? <>
      <div className={`en-reading-studio ${saved.reads === 2 ? 'is-tried' : ''}`}>
      <div className={`en-word-reading-row ${showModel ? 'has-model' : ''}`}>
        <button className={`en-big-word en-blending-word ${blending && blendIndex < word.length ? 'is-spaced' : ''}`} onClick={() => { stop(); void audio.play(`word-${word}`); }} aria-label={`Hear ${word}`}>
          <span className="en-blend-letters" aria-hidden="true">{word.split('').map((letter, i) => <span key={i} className={blending && blendIndex === i ? 'is-sounding' : ''}>{letter}</span>)}</span><span className="en-word-speaker"><Icon name="sound" size={24} /></span>
        </button>
        {showModel && pronunciation && <WordPronunciation word={word} video={pronunciation} open={videoOpen} onOpen={() => { stop(); setVideoOpen(true); }} onClose={closeVideo} />}
      </div>
      <div className="en-read-dots" aria-label={`${saved.reads} of 2 reading tries`}>{[0, 1].map(i => <span key={i} className={saved.reads > i ? 'is-done' : ''}>{saved.reads > i ? <Icon name="check" size={19} /> : i + 1}</span>)}</div>
      <button className="en-text-button en-repeat-blend" onClick={() => void blend()}><Icon name="redo" size={17} /> Hear the sounds</button>
      </div>
    </> : phase === 2 ? <>
      <div className={`en-meaning-studio ${word === 'at' ? 'en-at-meaning' : ''}`}><span className="en-meaning-word">{word}</span>
      <button className="en-story-frame en-story-replay" onClick={playStory} aria-label={`Watch again: ${englishNarration[`story-${word}`]}`}>{word === 'pin' ? <PinScene key={storyRun} story /> : word === 'at' ? <AtScene key={storyRun} story /> : <StoryScene key={storyRun} story />}<span className="en-scene-replay-label"><Icon name="redo" size={17} /> Again</span></button>
      </div>
    </> : phase < finishStage && word === 'sat' ? <>
      <span className="en-meaning-word">sat</span>
      <div className="en-picture-choices">{(phase === 3 ? [false, true] : [true, false]).map((sitting, index) => <button key={String(sitting)} aria-label={`Picture ${index + 1}: Sam ${sitting ? 'sitting' : 'standing'} ${sitting ? 'on' : 'by'} the ${question}`} disabled={rightAnswer} onClick={() => choose(sitting)} className={rightAnswer && sitting ? 'is-correct' : ''}><StoryScene place={question} sitting={sitting} /><span>{rightAnswer && sitting ? <Icon name="check" size={21} /> : index + 1}</span></button>)}</div>
    </> : <WordCelebration word={word} headingRef={title} onReplay={() => { stop(); save(freshGuidedWord()); setFeedback(''); void audio.sequence(guidedWordPrompt(word, '')); }} />}
    <p className="en-sr-only" role="status">{feedback}</p>
    </section>
    {audio.notice && !(audio.blocked && phase === 0) && <p className="en-audio-note" role="status">{audio.notice}</p>}
    <div className="en-word-dock" aria-label="Your next action">
      <button className={`en-dock-audio ${audio.playing ? 'is-playing' : ''}`} aria-label={audio.playing ? 'Stop listening' : phase === 2 ? 'Play the story again' : 'Hear the instructions'} onClick={audio.playing ? stop : directions}><Icon name={audio.playing ? 'pause' : 'sound'} size={26} /><small>{audio.playing ? 'Stop' : 'Listen'}</small></button>
      {phase === 0 ? nextLetter ? <div className="en-build-next-action" role="status"><Icon name="hand" size={26} /><span>Tap <strong>{nextLetter}</strong></span></div> : <button className="en-button en-word-build-cta" disabled={audio.playing} onClick={() => void blend()} aria-label={`Hear ${word} together`}><Icon name="sound" size={25} /><strong>{word}</strong><Icon name="arrow" size={20} /></button> :
        phase === 1 ? <>{saved.reads < 2 ? <button className="en-button en-word-read-cta" disabled={blending || audio.playing} onClick={read} aria-label={`I tried reading ${word}`}><Icon name="check" size={27} /><span>I tried it</span><span className="en-word-read-dots" aria-hidden="true">{saved.reads === 0 ? '○ ○' : '● ○'}</span></button> : <button className="en-button" onClick={next}>Next <Icon name="arrow" size={20} /></button>}</> :
        phase === 2 ? <button className="en-button" onClick={next}>{word !== 'sat' ? 'Next' : 'Let’s find a picture'} <Icon name="arrow" size={20} /></button> :
        phase < finishStage ? rightAnswer ? <button className="en-button" onClick={next}>Next <Icon name="arrow" size={20} /></button> : <div className="en-action-prompt" role="status"><span className="en-action-symbol"><Icon name="hand" size={25} /></span><span>Tap a picture</span></div> :
        <button className="en-button en-next-topic" onClick={() => { stop(); onComplete(); }}><span className="en-next-topic-copy"><small>Next topic</small><strong>{nextTopic || 'Keep going'}</strong></span><span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>}
    </div>
    <ParentHelp kind="word" onOpen={stop}>
      {phase === 0 && <button className="en-text-button" disabled={!saved.built.length} onClick={undo}><Icon name="back" size={17} /> Undo</button>}
    </ParentHelp>
  </div>;
}
