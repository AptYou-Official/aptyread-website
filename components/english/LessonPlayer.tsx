'use client';

import Link from './AppLink';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { EnglishLesson } from '@/lib/english-curriculum';
import { completeEnglishActivity, englishAccess, enterEnglishActivity, offerEnglishFormation, finishEnglishFormation, recordEnglishFormationTry } from '@/lib/english-progress';
import { getFormationLetter } from '@/lib/english-learning-journey';
import { EnglishPreviewProvider, useEnglish } from './EnglishProvider';
import Icon from './Icons';
import WordBuilder from './WordBuilder';
import FirstWordsReview from './FirstWordsReview';
import SentenceReview from './SentenceReview';
import MoreWords from './MoreWords';
import LetterPractice from './LetterPractice';
import LetterCases from './LetterCases';
import { isExploreLetter } from '@/lib/english-curriculum';
import SoundPractice from './SoundPractice';
import LetterSoundLink from './LetterSoundLink';
import WritingPractice from './WritingPractice';
import LessonVideo from './LessonVideo';
import LessonTopics from './LessonTopics';
import ProgrammeActivity from './ProgrammeActivity';
import FormationPractice from './FormationPractice';

export default function LessonPlayer({ lesson }: { lesson: EnglishLesson }) {
  const [preview, setPreview] = useState<boolean | null>(null);
  useEffect(() => { setPreview(new URLSearchParams(window.location.search).get('preview') === '1'); }, []);
  if (preview === null) return <p className="en-loading">Getting ready…</p>;
  return preview ? <EnglishPreviewProvider><Player lesson={lesson} /></EnglishPreviewProvider> : <Player lesson={lesson} />;
}

function Player({ lesson }: { lesson: EnglishLesson }) {
  const { ready, progress, update, storageAvailable, offline, preview } = useEnglish();
  const initialized = useRef(false);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);
  const stepsDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLElement>(null);
  const access = englishAccess(progress);
  useEffect(() => {
    if (!ready || initialized.current) return;
    initialized.current = true;
    const wanted = new URLSearchParams(window.location.search).get('activity');
    const requested = lesson.activities.findIndex(item => item.id === wanted);
    const initial = requested >= 0 ? requested : enterEnglishActivity(progress, lesson.id).current[lesson.id] || 0;
    setStep(initial); setLoaded(true);
    update(p => enterEnglishActivity(p, lesson.id, wanted));
    // The query is an entry point, not a command to override subsequent resume state.
    if (wanted) history.replaceState(history.state, '', window.location.pathname + (preview ? '?preview=1' : ''));
  }, [ready, progress, lesson, update, preview]);
  const activity = lesson.activities[step];
  const unlocked = access.activities.has(activity.id);
  const formationLetter = getFormationLetter(activity.id);
  const formationOpen = !!formationLetter && progress.formationOffers?.[activity.id]?.status === 'pending';
  function openSteps() {
    setStepsOpen(true);
    stepsDialog.current?.showModal();
    requestAnimationFrame(() => stepsDialog.current?.querySelector('[aria-current="step"]')?.scrollIntoView({ block: 'center', behavior: 'instant' }));
  }
  function showStep(index: number) {
    setStep(index); setFinished(false); setStepsOpen(false);
    stepsDialog.current?.close();
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => heading.current?.focus());
  }
  function go(index: number) {
    if (!access.activities.has(lesson.activities[index].id)) return;
    update(p => enterEnglishActivity(p, lesson.id, lesson.activities[index].id));
    showStep(index);
  }
  function finishActivity(forms?: string[]) {
    if (!unlocked) return;
    const completed = completeEnglishActivity(progress, activity.id);
    if (!completed.completed.includes(activity.id)) return;
    update(p => {
      const withFormation = forms === undefined ? p : finishEnglishFormation(p, activity.id, forms);
      const next = completeEnglishActivity(withFormation, activity.id);
      return step + 1 < lesson.activities.length ? enterEnglishActivity(next, lesson.id, lesson.activities[step + 1].id) : next;
    });
    if (step + 1 < lesson.activities.length) showStep(step + 1);
    else { setFinished(true); requestAnimationFrame(() => heading.current?.focus()); }
  }
  function advance() {
    if (!formationLetter) { finishActivity(); return; }
    if (!unlocked || !completeEnglishActivity(progress, activity.id).completed.includes(activity.id)) return;
    update(p => offerEnglishFormation(completeEnglishActivity(p, activity.id), activity.id));
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => heading.current?.focus());
  }
  function finishOptionalFormation(forms: string[] = []) {
    if (forms.length) finishActivity();
    else { setFinished(true); requestAnimationFrame(() => heading.current?.focus()); }
  }
  const explored = lesson.activities.filter(a => access.completed.has(a.id)).length;
  const nextTopic = formationLetter ? `Make ${formationLetter}` : lesson.activities[step + 1]?.title;
  return <div className={`en-player ${loaded && unlocked && !finished ? 'en-guided-player' : ''}`}>{preview && <div className="en-preview-banner"><strong>Grown-up preview</strong><span>Child progress is unchanged.</span><Link href="/english/dashboard?view=grownups">Leave preview</Link></div>}<a className="en-skip" href="#activity-main">Skip to activity</a><header className="en-player-header"><Link className="en-icon-button" href="/english/dashboard" aria-label="Back to learning path"><Icon name="home" /></Link><div className="en-player-title"><span>LEVEL 1</span><strong>{formationOpen ? `Make ${formationLetter}` : activity.title}</strong></div><button className="en-step-menu" onClick={openSteps} aria-label="Open lesson steps">{step + 1}<span> / {lesson.activities.length}</span><Icon name="book" size={18} /></button><div id="en-player-grownups" /></header><div className="en-player-progress" role="progressbar" aria-label="Activities explored" aria-valuenow={explored} aria-valuemin={0} aria-valuemax={lesson.activities.length}><span style={{ width: `${100 * explored / lesson.activities.length}%` }} /></div>
    <main id="activity-main" ref={heading} tabIndex={-1} className="en-player-main">
      {!storageAvailable && <p className="en-notice" role="status">Your progress can only be kept for this visit. Browser storage is unavailable.</p>}{offline && <p className="en-notice" role="status">You’re offline. Letter sounds work after the app is saved. Videos and some voices need internet.</p>}
      {!loaded ? <p className="en-loading" role="status">Getting your little adventure ready…</p> : !unlocked ? <div className="en-locked-topic" role="status"><Icon name="lock" size={42} /><span className="en-eyebrow">ONE TOPIC AT A TIME</span><h1>This topic is locked.</h1><p>Complete the earlier topics to unlock <strong>{activity.title}</strong>.</p>{access.next && <><p>Your next topic: <strong>{access.next.activity.title}</strong></p><Link className="en-button" href={'/english/learn/' + access.next.lessonId + '?activity=' + access.next.activity.id + (preview ? '&preview=1' : '')} onClick={event => { if (access.next?.lessonId === lesson.id) { event.preventDefault(); go(access.next.step); } }}>Continue my learning <Icon name="arrow" /></Link></>}</div> : finished ? <div className="en-lesson-finish"><Image src="/images/apty-mascot.png" width={150} height={175} alt="Apty is cheering you on" unoptimized /><span className="en-eyebrow">A LOVELY PLACE TO PAUSE</span><h1>{lesson.supplemental && explored === 0 ? "A lovely place to pause." : "Look how far you’ve come."}</h1><p>{explored} of {lesson.activities.length} steps explored.<br />You can return to these topics whenever you like.</p>{access.next && access.next.lessonId !== lesson.id && <><p>Your next lesson is unlocked.</p><Link className="en-button" href={'/english/learn/' + access.next.lessonId + '?activity=' + access.next.activity.id + (preview ? '&preview=1' : '')}>Start the next lesson <Icon name="arrow" /></Link></>}{!preview && !access.next && !lesson.supplemental && <p>You explored Level 1. Enjoy your books again, and share your reading with a grown-up. Level 2 will build on these sounds and words.</p>}<Link className="en-text-button" href="/english/dashboard">Back to my path <Icon name="arrow" /></Link><button className="en-text-button" onClick={() => go(0)}>Explore this lesson again</button></div> : <div key={activity.id} data-activity={activity.id} className="en-activity-enter">{formationOpen && formationLetter ? <FormationPractice key={`offer-${activity.id}`} letter={formationLetter} invitation suspended={stepsOpen} onTryForm={form => update(p => recordEnglishFormationTry(p, activity.id, form))} onComplete={forms => finishActivity(forms || [])} /> : activity.kind === 'practice' ? <ProgrammeActivity activityId={activity.id} suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'formation' && activity.practiceLetter ? <FormationPractice letter={activity.practiceLetter} suspended={stepsOpen} onComplete={finishOptionalFormation} /> : activity.kind === 'cases' && activity.letter && isExploreLetter(activity.letter) ? <LetterCases letter={activity.letter} suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'write' && activity.letter ? <WritingPractice activity={activity} suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'find' && activity.letter ? <LetterSoundLink letter={activity.letter} suspended={stepsOpen} onComplete={advance} nextTopic={nextTopic} /> : activity.kind === 'sound' && activity.letter ? <SoundPractice letter={activity.letter} suspended={stepsOpen} onComplete={advance} nextTopic={nextTopic} /> : activity.kind === 'apply' ? <MoreWords suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'review' ? activity.id === 'our-first-words' ? <SentenceReview finishLabel={step === lesson.activities.length - 1 ? 'Finish lesson' : 'Next topic'} onComplete={advance} /> : <FirstWordsReview finishLabel={step === lesson.activities.length - 1 ? 'Finish lesson' : 'Next topic'} pair="more" onComplete={advance} /> : activity.kind === 'word' ? <WordBuilder word={activity.word!} onComplete={advance} nextTopic={nextTopic} /> : activity.kind === 'video' ? <LessonVideo activity={activity} suspended={stepsOpen} onComplete={advance} nextTopic={nextTopic} /> : <LetterPractice activity={activity} onComplete={advance} />}</div>}
    </main><footer className="en-player-footer"><Link href="/english/dashboard"><Icon name="back" size={17} /> Take a break</Link><span><Icon name="leaf" size={17} /> Your pace is a good pace.</span></footer>
    <dialog ref={stepsDialog} onClose={() => setStepsOpen(false)} className="en-hub-sheet" aria-labelledby="en-steps-title" onClick={event => { if (event.target === event.currentTarget) stepsDialog.current?.close(); }}><header className="en-sheet-heading"><div><span className="en-hub-kicker">YOUR TOPICS</span><h2 id="en-steps-title">{lesson.id === 'first-words' ? 'Our First Words' : lesson.title}</h2><div className="en-sheet-progress"><span aria-hidden="true"><i style={{width:`${100 * explored / lesson.activities.length}%`}} /></span><small>{explored} / {lesson.activities.length} done</small></div></div><button className="en-icon-button" aria-label="Close lesson steps" onClick={() => stepsDialog.current?.close()}><Icon name="close" /></button></header><div className="en-sheet-scroll"><LessonTopics lesson={lesson} currentId={activity.id} onSelect={go} /></div></dialog>
  </div>;
}
