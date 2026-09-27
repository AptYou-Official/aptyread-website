'use client';

import Link from './AppLink';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { EnglishLesson } from '@/lib/english-curriculum';
import { completeEnglishActivity, englishAccess, enterEnglishActivity } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import WordBuilder from './WordBuilder';
import FirstWordsReview from './FirstWordsReview';
import LetterPractice from './LetterPractice';
import SoundPractice from './SoundPractice';
import LetterSoundLink from './LetterSoundLink';
import WritingPractice from './WritingPractice';
import LessonVideo from './LessonVideo';
import LessonTopics from './LessonTopics';

export default function LessonPlayer({ lesson }: { lesson: EnglishLesson }) {
  const { ready, progress, update, storageAvailable, offline } = useEnglish();
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
    if (wanted) history.replaceState(history.state, '', window.location.pathname);
  }, [ready, progress, lesson, update]);
  const activity = lesson.activities[step];
  const unlocked = access.activities.has(activity.id);
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
  function advance() {
    if (!unlocked) return;
    const completed = completeEnglishActivity(progress, activity.id);
    if (!completed.completed.includes(activity.id)) return;
    update(p => {
      const next = completeEnglishActivity(p, activity.id);
      return step + 1 < lesson.activities.length ? enterEnglishActivity(next, lesson.id, lesson.activities[step + 1].id) : next;
    });
    if (step + 1 < lesson.activities.length) showStep(step + 1);
    else { setFinished(true); requestAnimationFrame(() => heading.current?.focus()); }
  }
  const explored = lesson.activities.filter(a => access.completed.has(a.id)).length;
  return <div className={`en-player ${loaded && unlocked && !finished ? 'en-guided-player' : ''}`}><a className="en-skip" href="#activity-main">Skip to activity</a><header className="en-player-header"><Link className="en-icon-button" href="/english/dashboard" aria-label="Save and return to learning path"><Icon name="close" /></Link><div className="en-player-title"><span>LEVEL 1</span><strong>{activity.title}</strong></div><button className="en-step-menu" onClick={openSteps} aria-label="Open lesson steps">{step + 1}<span> / {lesson.activities.length}</span><Icon name="book" size={18} /></button></header><div className="en-player-progress" role="progressbar" aria-label="Activities explored" aria-valuenow={explored} aria-valuemin={0} aria-valuemax={lesson.activities.length}><span style={{ width: `${100 * explored / lesson.activities.length}%` }} /></div>
    <main id="activity-main" ref={heading} tabIndex={-1} className="en-player-main">
      {!storageAvailable && <p className="en-notice" role="status">Your progress can only be kept for this visit. Browser storage is unavailable.</p>}{offline && <p className="en-notice" role="status">You’re offline. Letter sounds work after the app is saved. Videos and some voices need internet.</p>}
      {!loaded ? <p className="en-loading" role="status">Getting your little adventure ready…</p> : !unlocked ? <div className="en-locked-topic" role="status"><Icon name="lock" size={42} /><span className="en-eyebrow">ONE TOPIC AT A TIME</span><h1>This topic is coming up.</h1><p>Complete the earlier topics to unlock <strong>{activity.title}</strong>.</p>{access.next && <><p>Your next topic: <strong>{access.next.activity.title}</strong></p><Link className="en-button" href={'/english/learn/' + access.next.lessonId + '?activity=' + access.next.activity.id} onClick={event => { if (access.next?.lessonId === lesson.id) { event.preventDefault(); go(access.next.step); } }}>Continue my learning <Icon name="arrow" /></Link></>}</div> : finished ? <div className="en-lesson-finish"><Image src="/images/apty-mascot.png" width={150} height={175} alt="Apty is cheering you on" unoptimized /><span className="en-eyebrow">A LOVELY PLACE TO PAUSE</span><h1>Look how far you’ve come.</h1><p>{explored} of {lesson.activities.length} steps explored.<br />You can return to these topics whenever you like.</p>{access.next && access.next.lessonId !== lesson.id && <><p>Your next lesson is unlocked.</p><Link className="en-button" href={'/english/learn/' + access.next.lessonId + '?activity=' + access.next.activity.id}>Start the next lesson <Icon name="arrow" /></Link></>}<Link className="en-text-button" href="/english/dashboard">Back to my path <Icon name="arrow" /></Link><button className="en-text-button" onClick={() => go(0)}>Explore this lesson again</button></div> : <div key={activity.id} data-activity={activity.id} className="en-activity-enter">{activity.kind === 'write' && activity.letter === 's' ? <WritingPractice activity={activity} suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'find' && activity.letter ? <LetterSoundLink letter={activity.letter} suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'sound' && activity.letter ? <SoundPractice letter={activity.letter} suspended={stepsOpen} onComplete={advance} /> : activity.kind === 'review' ? <FirstWordsReview onComplete={advance} /> : activity.kind === 'word' ? <WordBuilder word={activity.word!} onComplete={advance} /> : activity.kind === 'video' ? <LessonVideo activity={activity} onComplete={advance} /> : <LetterPractice activity={activity} onComplete={advance} />}</div>}
    </main><footer className="en-player-footer"><Link href="/english/dashboard"><Icon name="back" size={17} /> Take a break</Link><span><Icon name="leaf" size={17} /> Your pace is a good pace.</span></footer>
    <dialog ref={stepsDialog} onClose={() => setStepsOpen(false)} className="en-hub-sheet" aria-labelledby="en-steps-title" onClick={event => { if (event.target === event.currentTarget) stepsDialog.current?.close(); }}><header className="en-sheet-heading"><div><span className="en-hub-kicker">YOUR TOPICS</span><h2 id="en-steps-title">{lesson.id === 'first-words' ? 'Our First Words' : lesson.title}</h2><div className="en-sheet-progress"><span aria-hidden="true"><i style={{width:`${100 * explored / lesson.activities.length}%`}} /></span><small>{explored} / {lesson.activities.length} done</small></div></div><button className="en-icon-button" aria-label="Close lesson steps" onClick={() => stepsDialog.current?.close()}><Icon name="close" /></button></header><div className="en-sheet-scroll"><LessonTopics lesson={lesson} currentId={activity.id} onSelect={go} /></div></dialog>
  </div>;
}
