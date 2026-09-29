'use client';

import { useEffect, useRef, useState } from 'react';
import { englishNarration, narrationCue } from '@/lib/english-narration';
import { freshSentenceReview, SentenceTarget } from '@/lib/english-sentence-review';
import { parentHelpLanguages, sentenceParentHelp } from '@/lib/english-parent-help';
import { updateParentHelpLanguage, updateSentenceReview } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import useEnglishAudio from './useEnglishAudio';
import ActivityJourney from './ActivityJourney';
import LearningCompanion from './LearningCompanion';
import WordCelebration from './WordCelebration';
import Icon from './Icons';

const sentences = [
  { id: 'sat' as const, target: 'sat' as const, words: ['Sam', 'sat', 'on', 'a', 'mat'] },
  { id: 'at' as const, target: 'at' as const, words: ['Sam', 'is', 'at', 'the', 'door'] },
];

function targetForStep(step: number): SentenceTarget | null {
  return step === 1 ? 'sat' : step === 2 ? 'at' : null;
}

export default function SentenceReview({ finishLabel = 'Finish lesson', onComplete }: { finishLabel?: string; onComplete: () => void }) {
  const { progress, update } = useEnglish();
  const saved = progress.sentenceReview || freshSentenceReview();
  const helpLanguage = progress.parentHelpLanguage || 'en';
  const help = sentenceParentHelp[helpLanguage];
  const step = saved.step;
  const target = targetForStep(step);
  const audio = useEnglishAudio();
  const heading = useRef<HTMLHeadingElement>(null);
  const opening = useRef(step === 0);
  const cancelOpening = useRef(() => {});
  const previousStep = useRef(step);
  const [feedback, setFeedback] = useState('');
  const { sequence } = audio;

  useEffect(() => {
    if (previousStep.current !== step) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      heading.current?.focus({ preventScroll: true });
      setFeedback('');
    }
    previousStep.current = step;
  }, [step]);

  useEffect(() => {
    if (!opening.current || step !== 0) return;
    let timer: ReturnType<typeof setTimeout>;
    const cancel = () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); };
    const visible = () => {
      if (document.hidden) return;
      clearTimeout(timer);
      timer = setTimeout(() => { if (!document.hidden) { cancel(); void sequence([narrationCue('sentence-intro')]); } }, 0);
    };
    cancelOpening.current = cancel;
    document.addEventListener('visibilitychange', visible);
    visible();
    return cancel;
  }, [sequence, step]);

  function stop() { cancelOpening.current(); audio.stop(); }

  function speakSentence(id: 'sat' | 'at') {
    stop();
    void audio.sequence([narrationCue(`sentence-${id}`), narrationCue(`sentence-find-${id}`)]);
  }

  function start() {
    stop();
    opening.current = false;
    update(p => updateSentenceReview(p, { type: 'start' }));
    void audio.sequence([narrationCue('sentence-sat'), narrationCue('sentence-find-sat')]);
  }

  function choose(sentenceId: 'sat' | 'at', word: string) {
    if (!target || audio.playing) return;
    if (sentenceId !== target || word !== target) {
      setFeedback('Listen again.');
      void audio.sequence([narrationCue('sentence-retry'), narrationCue(`sentence-find-${target}`)]);
      return;
    }
    stop();
    update(p => updateSentenceReview(p, { type: 'find', word: target }));
    if (target === 'sat') {
      void audio.sequence([narrationCue('sentence-correct-sat'), narrationCue('sound-practice-star'), narrationCue('sentence-at'), narrationCue('sentence-find-at')]);
    } else {
      void audio.sequence([narrationCue('sentence-correct-at'), narrationCue('sound-practice-star'), narrationCue('sound-practice-complete')]);
    }
  }

  function replay() {
    stop();
    opening.current = false;
    update(p => ({ ...p, sentenceReview: freshSentenceReview() }));
    void audio.play('sentence-intro');
  }

  const headline = step === 0 ? 'Listen.' : step === 1 ? 'Find sat.' : step === 2 ? 'Find at.' : 'You found both!';
  const promptId = step === 0 ? 'sentence-intro' : target ? `sentence-find-${target}` : 'sentence-finish';
  const journey = step === 0 ? 0 : step === 1 ? 1 : step === 2 ? 2 : 3;

  return <div className="en-word-activity en-guided-word en-first-words en-review-studio en-sentence-review" data-sentence-step={step}>
    <ActivityJourney step={journey} sentence />
    <section key={step} className={`en-word-stage ${step === 3 ? 'is-celebrating' : ''}`}>
      {step < 3 && <LearningCompanion title={headline} speaking={audio.playing} headingRef={heading} reaction={`${step}-${saved.found.join('-')}-${feedback}`} />}
      {step < 3 ? <div className="en-sentence-list" aria-label="Two sentences">
        {sentences.map((sentence, index) => {
          const current = sentence.target === target;
          const found = saved.found.includes(sentence.target);
          const active = current || (step === 0 && index === 0);
          return <article key={sentence.id} className={`en-sentence-card ${active ? 'is-current' : ''} ${found ? 'is-found' : ''} ${step === 0 && index === 1 ? 'is-next' : ''}`}>
            <div className="en-sentence-card-heading"><span>{index + 1}</span>{step > 0 && current && <button className="en-sentence-hear" onClick={() => speakSentence(sentence.id)} aria-label="Hear the sentence again"><Icon name="sound" size={19} /> Hear</button>}</div>
            <p className="en-sentence-line">
              {sentence.words.map(word => <button key={word} className={`en-sentence-word ${word === sentence.target ? 'is-target' : ''} ${found && word === sentence.target ? 'is-found' : ''}`} onClick={() => choose(sentence.id, word)} disabled={step === 0 || !current || found || audio.playing} aria-label={`Word ${word}`}>{word}</button>)}
            </p>
            {found && <span className="en-sentence-found"><Icon name="check" size={16} /> Found</span>}
          </article>;
        })}
      </div> : <WordCelebration word="first-words" headingRef={heading} onReplay={replay} />}
      <p className="en-sr-only" role="status">{feedback}</p>
    </section>
    {audio.notice && !audio.blocked && <p className="en-audio-note" role="status">{audio.notice}</p>}
    <div className="en-word-dock" aria-label="Your next action">
      {step === 0 ? <button className="en-button" onClick={start}><Icon name="sound" size={20} /> Listen <Icon name="arrow" size={20} /></button> : step < 3 ? audio.playing ? <div className="en-sentence-action-cue is-listening" role="status"><Icon name="sound" size={23} /><span>Listen…</span></div> : <div className="en-sentence-action-cue" role="status"><Icon name="hand" size={23} /><span>Tap one</span></div> : <button className="en-button en-next-topic" onClick={() => { stop(); onComplete(); }}>{finishLabel} <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>}
    </div>
    <details className="en-word-support" translate="yes" onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}><summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <div className="en-help-language"><label htmlFor="sentence-help-language">Help language</label><select id="sentence-help-language" value={helpLanguage} onChange={event => update(p => updateParentHelpLanguage(p, event.target.value as typeof helpLanguage))}>{parentHelpLanguages.map(language => <option key={language.id} value={language.id}>{language.label}</option>)}</select></div>
      <p>{help.instructions}</p>
      <p>{help.reassurance}</p>
      <p>The other words help your child hear the whole sentence. They do not need to read every word yet.</p>
      <p><strong>{help.label}:</strong> {englishNarration[promptId]}</p>
    </details>
  </div>;
}
