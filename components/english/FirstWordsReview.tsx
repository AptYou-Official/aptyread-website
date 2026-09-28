'use client';

import { useEffect, useRef, useState } from 'react';
import { updateFirstWords } from '@/lib/english-progress';
import { FirstWord, freshFirstWords, reviewReadingWord, ReviewPair, reviewWords } from '@/lib/english-review';
import { englishNarration, narrationCue } from '@/lib/english-narration';
import { useEnglish } from './EnglishProvider';
import useEnglishAudio from './useEnglishAudio';
import PinScene from './PinScene';
import AtScene from './AtScene';
import StoryScene from './StoryScene';
import Icon from './Icons';
import ActivityJourney from './ActivityJourney';
import LearningCompanion from './LearningCompanion';
import WordCelebration from './WordCelebration';

export default function FirstWordsReview({ pair = 'first', finishLabel = 'Finish lesson', onComplete }: { pair?: ReviewPair; finishLabel?: string; onComplete: () => void }) {
  const { progress, update } = useEnglish();
  const saved = (pair === 'first' ? progress.firstWords : progress.moreWords) || freshFirstWords();
  const words = reviewWords[pair];
  const intro = pair === 'first' ? 'review-intro' : 'more-review-intro';
  const stage = saved.stage;
  const audio = useEnglishAudio();
  const [feedback, setFeedback] = useState('');
  const [selected, setSelected] = useState<FirstWord | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStage = useRef(stage);
  const opening = useRef(stage === 0);
  const cancelOpening = useRef(() => {});
  const { sequence } = audio;
  const target: FirstWord = stage === 2 ? words[0] : words[1];
  const matched = saved.matched.includes(target);
  const questionAtFirst = saved.questionOrders[stage === 2 ? 0 : 1];
  const readingWord = reviewReadingWord(saved, pair);
  const promptId = stage === 0 ? intro : stage === 1 ? 'review-listen' : stage === 2 || stage === 3 ? `review-find-${target}` : stage === 4 ? 'review-read' : stage === 5 ? 'review-read-next' : 'review-finish';
  const journey = stage <= 1 ? 0 : stage <= 3 ? 1 : stage <= 5 ? 2 : 3;
  const headline = stage <= 1 ? saved.heard.length === 2 ? 'Two little words!' : 'Tap a word.' : stage <= 3 ? matched ? 'You found it!' : feedback || 'Which word?' : 'Your turn to read.';

  useEffect(() => {
    if (previousStage.current !== stage) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      heading.current?.focus({ preventScroll: true });
      setFeedback(''); setSelected(null);
    }
    previousStage.current = stage;
  }, [stage]);
  useEffect(() => {
    if (!opening.current) return;
    let timer: ReturnType<typeof setTimeout>;
    const cancel = () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); };
    const visible = () => {
      if (document.hidden) return;
      clearTimeout(timer);
      timer = setTimeout(() => { if (!document.hidden) { cancel(); void sequence([narrationCue(intro)]); } }, 0);
    };
    cancelOpening.current = cancel;
    document.addEventListener('visibilitychange', visible); visible();
    return cancel;
  }, [sequence, intro]);

  function stop() { cancelOpening.current(); audio.stop(); }
  function startAction() { return { type: 'start' as const, questionOrders: [Math.random() < .5, Math.random() < .5] as [boolean, boolean], readAtFirst: Math.random() < .5 }; }
  function replay() {
    stop(); update(p => updateFirstWords(p, startAction(), pair));
    void audio.play(intro);
  }
  function hear(word: FirstWord) {
    cancelOpening.current();
    update(p => updateFirstWords(stage === 0 ? updateFirstWords(p, startAction(), pair) : p, { type: 'hear', word }, pair));
    setSelected(word); void audio.play(`word-${word}`);
  }
  function choose(word: FirstWord) {
    if (matched) return;
    update(p => updateFirstWords(p, { type: 'choose', word }, pair));
    const correct = word === target;
    setSelected(word); setFeedback(correct ? 'You found it!' : 'Try again.');
    void audio.play(correct ? `review-correct-${word}` : 'review-retry');
  }
  function next() {
    stop(); update(p => updateFirstWords(p, { type: 'next' }, pair));
    void audio.play(stage === 1 ? `review-find-${words[0]}` : stage === 2 ? `review-find-${words[1]}` : 'review-read');
  }
  function triedReading() {
    stop(); update(p => updateFirstWords(p, { type: 'read' }, pair));
    // No picture or automatic model of the word during either reading turn.
    void audio.play(stage === 4 ? 'review-read-next' : 'review-finish');
  }
  function directions() { stop(); void audio.play(promptId); }

  return <div className="en-word-activity en-guided-word en-first-words en-review-studio" data-review-stage={stage}>
    <ActivityJourney step={journey} review />
    <section key={stage === 0 ? 1 : stage} className={`en-word-stage ${stage === 6 ? 'is-celebrating' : ''}`}>
      {stage < 6 && <LearningCompanion title={headline} speaking={audio.playing} headingRef={heading} reaction={`${saved.heard.length}-${saved.matched.length}-${saved.read.length}`} />}
      {stage <= 1 ? <div className="en-review-listening">
        <div className="en-review-word-grid">{words.map(word => <button key={word} className={`en-review-word-card ${saved.heard.includes(word) ? 'is-explored' : ''} ${audio.playing && selected === word ? 'is-speaking' : ''}`} onClick={() => hear(word)} aria-label={`Hear ${word}`}>
          <span>{word}</span><span className="en-review-sound-icon"><Icon name="sound" size={23} /></span>
          {saved.heard.includes(word) && <span className="en-review-card-check" aria-label="Explored"><Icon name="check" size={16} /></span>}
        </button>)}</div>
        <div className="en-read-dots" aria-label={`${saved.heard.length} of 2 words explored`}>{words.map(word => <span key={word} className={saved.heard.includes(word) ? 'is-done' : ''}>{saved.heard.includes(word) ? <Icon name="check" size={18} /> : <Icon name="sound" size={17} />}</span>)}</div>
      </div> : stage <= 3 ? <div className={`en-review-match ${matched ? 'is-matched' : ''}`}>
        <button className="en-review-picture" onClick={() => audio.play(`review-find-${target}`)} aria-label="Hear the picture clue">{target === 'pin' ? <PinScene /> : target === 'at' ? <AtScene /> : <StoryScene sitting />}<span className="en-picture-sound"><Icon name="sound" size={21} /></span></button>
        <div className="en-review-word-grid en-review-choices">{((questionAtFirst ? words : [...words].reverse()) as FirstWord[]).map(word => <button key={word} className={`en-review-word-card ${matched && word === target ? 'is-correct' : ''} ${!matched && selected === word ? 'is-retry' : ''}`} onClick={() => choose(word)} disabled={matched} aria-label={`Choose ${word}`}><span>{word}</span>{matched && word === target && <span className="en-review-card-check"><Icon name="check" size={19} /></span>}</button>)}</div>
      </div> : stage <= 5 ? <div className="en-review-reading">
        <div className="en-review-reading-halo" aria-hidden="true" />
        <p className="en-review-reading-word">{readingWord}</p>
        <button className="en-text-button en-review-reading-help" onClick={() => audio.play(`word-${readingWord}`)}><Icon name="sound" size={20} /> Hear the word</button>
        <div className="en-read-dots" aria-label={`${saved.read.length} of 2 words tried`}>{[0, 1].map(i => <span key={i} className={saved.read.length > i ? 'is-done' : ''}>{saved.read.length > i ? <Icon name="check" size={19} /> : i + 1}</span>)}</div>
      </div> : <WordCelebration word={pair === 'first' ? 'first-words' : 'more-words'} headingRef={heading} onReplay={replay} />}
      <p className="en-sr-only" role="status">{feedback}</p>
    </section>
    {audio.notice && !audio.blocked && <p className="en-audio-note" role="status">{audio.notice}</p>}
    <div className="en-word-dock" aria-label="Your next action">
      <button className={`en-dock-audio ${audio.playing ? 'is-playing' : ''}`} aria-label={audio.playing ? 'Stop listening' : 'Hear the instructions'} onClick={audio.playing ? stop : directions}><Icon name={audio.playing ? 'close' : 'sound'} size={23} /></button>
      {stage <= 1 ? audio.blocked ? <button className="en-button" onClick={directions}><Icon name="sound" size={20} /> Tap to listen</button> : <button className="en-button" disabled={saved.heard.length !== 2} onClick={next}>Let’s explore <Icon name="arrow" size={21} /></button> : stage <= 3 ? matched ? <button className="en-button" onClick={next}>{stage === 2 ? 'One more' : 'My turn to read'} <Icon name="arrow" size={21} /></button> : <p>Tap the matching word.</p> : stage <= 5 ? <button className="en-button" onClick={triedReading}>I tried it <Icon name="check" size={21} /></button> : <button className="en-button en-next-topic" onClick={() => { stop(); onComplete(); }}>{finishLabel} <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>}
    </div>
    <details className="en-word-support" onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}>
      <summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>Let your child listen to both words, match each picture, then try reading each word. Tap the picture to hear its clue again. Pause and talk in your home language whenever you like.</p>
      <p>The final reading turns have no picture or automatic answer. Hear the word offers help if needed. The stars celebrate taking part, not a test of pronunciation.</p>
      <p><strong>Spoken words:</strong> {englishNarration[promptId]}</p>
    </details>
  </div>;
}
