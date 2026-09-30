'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { APPLICATION_ID, ApplicationAction, applicationTiles, applicationWord, freshApplication } from '@/lib/english-application';
import { englishPronunciationVideos } from '@/lib/english-curriculum';
import { enterEnglishActivity, updateApplication } from '@/lib/english-progress';
import { englishNarration, narrationCue } from '@/lib/english-narration';
import { useEnglish } from './EnglishProvider';
import useEnglishAudio from './useEnglishAudio';
import ActivityJourney from './ActivityJourney';
import ApplicationScene from './ApplicationScene';
import LearningCompanion from './LearningCompanion';
import WordPronunciation from './WordPronunciation';
import WordCelebration from './WordCelebration';
import ParentHelp from './ParentHelp';
import Icon from './Icons';

export default function MoreWords({ suspended = false, onComplete }: { suspended?: boolean; onComplete: () => void }) {
  const { progress, update } = useEnglish();
  const saved = progress.application || freshApplication();
  const word = applicationWord(saved), trial = saved.words[word], phase = saved.step % 5, done = saved.step === 10;
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const [working, setWorking] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const [storyRun, setStoryRun] = useState(0);
  const title = useRef<HTMLHeadingElement>(null);
  const run = useRef(0);
  const cancelOpening = useRef(() => {});
  const closeVideo = useCallback(() => setVideoOpen(false), []);
  const halt = useCallback(() => { cancelOpening.current(); run.current++; stop(); setWorking(false); closeVideo(); }, [stop, closeVideo]);
  const openingPrompt = useRef(done ? null : phase === 3 ? 'discover-build' : phase === 4 ? 'discover-read-back' : phase === 2 ? `story-${word}` : phase === 1 ? `word-${word}` : 'discover-read');
  const model = englishPronunciationVideos[word];
  const busy = working || suspended;
  const full = trial.built === word;
  const headline = done ? '' : phase === 0 ? 'Read it.' : phase === 1 ? 'Say it.' : phase === 2 ? 'Look.' : phase === 3 ? full ? 'You made it!' : feedback || (trial.heard && !working ? 'Make the word.' : 'Listen.') : 'Read it.';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    title.current?.focus({ preventScroll: true });
    setFeedback(''); setHint(null);
  }, [saved.step]);
  useEffect(() => {
    const prompt = openingPrompt.current;
    let timer: ReturnType<typeof setTimeout>;
    const cancel = () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); };
    const visible = () => { if (!document.hidden && prompt) { clearTimeout(timer); timer = setTimeout(() => { cancel(); void sequence([narrationCue(prompt)]); }, 0); } };
    cancelOpening.current = cancel;
    document.addEventListener('visibilitychange', visible); visible();
    return cancel;
  }, [sequence]);
  useEffect(() => {
    const playback = run;
    const hidden = () => { if (document.hidden) halt(); };
    document.addEventListener('visibilitychange', hidden);
    window.addEventListener('pagehide', halt);
    return () => { playback.current++; stop(); document.removeEventListener('visibilitychange', hidden); window.removeEventListener('pagehide', halt); };
  }, [halt, stop]);
  useEffect(() => { if (suspended) halt(); }, [suspended, halt]);

  function save(action: ApplicationAction) { update(p => updateApplication(p, action)); }
  function requiredWord() { return { id: `word-${word}`, narration: englishNarration[`word-${word}`] }; }
  function sounds() { return [...word].map(letter => ({ id: `sound-${letter}` })); }
  async function speak(cues: Parameters<typeof sequence>[0]) {
    halt(); const token = run.current; setWorking(true);
    const played = await sequence(cues);
    if (token !== run.current || document.hidden) return false;
    setWorking(false); return played;
  }
  async function listenToBuild() {
    halt(); const token = run.current; setWorking(true); setFeedback('');
    let played = await sequence([requiredWord()]);
    if (token !== run.current || document.hidden) return;
    if (!played) {
      // Recorded sounds keep the task usable if the device has no spoken voice.
      save({ type: 'build-help' });
      played = await sequence(sounds());
    }
    if (token !== run.current || document.hidden) return;
    setWorking(false);
    if (played) save({ type: 'heard' });
    else setFeedback('Tap to listen again.');
  }
  function helpReading() {
    if (phase === 0) save({ type: 'read-help' });
    void speak([...sounds(), requiredWord()]);
  }
  function helpBuilding() {
    save({ type: 'build-help' }); setHint(word[trial.built.length]);
    void speak([{ id: `sound-${word[trial.built.length]}` }]);
  }
  function choose(letter: string) {
    if (busy || !trial.heard || full) return;
    save({ type: 'choose', letter });
    if (letter === word[trial.built.length]) {
      setHint(null); setFeedback(''); void speak([{ id: `sound-${letter}` }]);
    } else {
      setFeedback('Let’s try again.');
      if (trial.misses >= 1) helpBuilding();
      else void speak([requiredWord()]);
    }
  }
  function next() {
    halt(); setHint(null);
    if (phase === 0) { save({ type: 'tried' }); void speak([requiredWord()]); }
    if (phase === 1) { save({ type: 'model-tried' }); void speak([narrationCue(`story-${word}`)]); }
    if (phase === 2) { save({ type: 'meaning-next' }); void listenToBuild(); }
    if (phase === 3) { save({ type: 'read-built' }); void speak([narrationCue('discover-read-back')]); }
    if (phase === 4) { save({ type: 'read-back' }); void speak(word === 'pan' ? [narrationCue('discover-read')] : [narrationCue('discover-finish')]); }
  }
  function directions() {
    if (phase === 3 && !done) { void listenToBuild(); return; }
    void speak([narrationCue(done ? 'discover-finish' : phase === 0 ? 'discover-read' : phase === 1 ? `word-${word}` : phase === 2 ? `story-${word}` : 'discover-read-back')]);
  }
  function replay() {
    halt(); update(p => enterEnglishActivity(p, 'more-words', APPLICATION_ID));
    void speak([narrationCue('discover-read')]);
  }
  return <div className="en-word-activity en-guided-word en-review-studio en-word-discovery" data-discovery-step={saved.step} data-action={done ? 'continue' : phase === 0 || phase === 4 ? 'read' : phase === 1 ? 'say' : phase === 2 ? 'look' : trial.heard && !working ? 'make' : 'listen'}>
    <ActivityJourney step={done ? 3 : phase <= 1 ? 0 : phase === 2 ? 1 : 2} application />
    <section className={`en-word-stage ${done ? 'is-celebrating' : ''}`}>
      {!done && <>
        <LearningCompanion title={headline} speaking={audio.playing} headingRef={title} reaction={`${saved.step}-${trial.built}`} />
        <div className="en-discovery-count" aria-label={`Word ${word === 'pan' ? 1 : 2} of 2`}><span className={word === 'pan' ? 'is-current' : 'is-done'}>{word === 'pan' ? '1' : <Icon name="check" size={14} />}</span><i /><span className={word === 'tap' ? 'is-current' : ''}>2</span></div>
      </>}
      {done ? <WordCelebration word="discovery-words" headingRef={title} onReplay={replay} /> : phase === 0 || phase === 4 ? <div className="en-review-reading">
        <div className="en-review-reading-halo" aria-hidden="true" />
        <p className="en-review-reading-word">{word}</p>
        <button className="en-text-button en-review-reading-help" onClick={helpReading}><Icon name="sound" size={20} /> Hear the sounds</button>
      </div> : phase === 1 ? <div className={`en-word-reading-row ${model ? 'has-model' : ''}`}>
        <button className="en-big-word" onClick={() => void speak([requiredWord()])} aria-label={`Hear ${word}`}>{word}<Icon name="sound" size={22} /></button>
        {model && <WordPronunciation word={word} video={model} open={videoOpen} onOpen={() => { halt(); setVideoOpen(true); }} onClose={closeVideo} />}
      </div> : phase === 2 ? <div className="en-meaning-studio">
        <button className="en-story-frame en-story-replay" onClick={() => { setStoryRun(v => v + 1); void speak([narrationCue(`story-${word}`)]); }} aria-label="See and hear it again"><ApplicationScene key={storyRun} word={word} /><span className="en-scene-replay-label"><Icon name="redo" size={16} /> Again</span></button>
        <span className="en-meaning-word">{word}</span>
      </div> : <div className="en-discovery-build">
        <button className="en-discovery-listen" onClick={() => void listenToBuild()}><Icon name="sound" size={22} /> Hear the word</button>
        <div className="en-word-slots" aria-label={`${trial.built.length} of 3 sounds placed`}>{[0, 1, 2].map(i => <span key={i} className={trial.built[i] ? 'is-filled' : ''}>{trial.built[i] ? <span className="en-placed-letter">{trial.built[i]}</span> : <i className="en-empty-slot" />}</span>)}</div>
        <div className="en-discovery-tiles">{applicationTiles[word].map(letter => <button className={`en-letter-tile ${hint === letter ? 'is-hint' : ''}`} key={letter} disabled={busy || !trial.heard || trial.built.includes(letter)} onClick={() => choose(letter)} aria-label={`Choose ${letter}`}>{letter}</button>)}</div>
        <div className="en-discovery-tools"><button className="en-text-button" disabled={!trial.built || busy} onClick={() => { halt(); setHint(null); save({ type: 'undo' }); }}><Icon name="back" size={18} /> Undo</button><button className="en-text-button" disabled={!trial.heard || full || busy} onClick={helpBuilding}><Icon name="sound" size={18} /> Help me</button></div>
      </div>}
    </section>
    {audio.notice && !audio.blocked && <p className="en-audio-note" role="status">{audio.notice}</p>}
    <div className="en-word-dock" aria-label="Your next action">
      <button className={`en-dock-audio ${audio.playing ? 'is-playing' : ''}`} aria-label={audio.playing || working ? 'Stop listening' : 'Hear the instructions'} onClick={audio.playing || working ? halt : directions}><Icon name={audio.playing || working ? 'close' : 'sound'} size={23} /></button>
      {done ? <button className="en-button en-next-topic" onClick={() => { halt(); onComplete(); }}>Finish lesson <Icon name="arrow" size={23} /></button> : phase === 3 && !full ? !trial.heard ? <button className="en-button" disabled={suspended} onClick={() => void listenToBuild()}><Icon name="sound" size={20} /> Listen</button> : <div className="en-action-prompt" role="status"><span className="en-action-symbol"><Icon name={working ? 'sound' : 'hand'} size={25} /></span><span>{working ? 'Listen' : 'Tap a letter'}</span></div> : <button className="en-button" onClick={next} disabled={suspended}>{phase === 0 || phase === 4 ? 'I tried it' : phase === 1 ? 'I tried again' : phase === 2 ? 'Make it' : 'Read it'}<Icon name={phase <= 1 || phase === 4 ? 'check' : 'arrow'} size={21} /></button>}
    </div>
    <ParentHelp kind="application" onOpen={halt} />
  </div>;
}
