'use client';

import Image from 'next/image';
import Link from './AppLink';
import { useEffect, useRef, useState } from 'react';
import { englishLevels, englishLessons, isEnglishLessonPublished } from '@/lib/english-curriculum';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import BrandWordmark from '@/components/public/BrandWordmark';
import { englishAccess } from '@/lib/english-progress';
import LessonCard from './LessonCard';
import WordGarden from './WordGarden';
import ParentProgramme from './ParentProgramme';
import { getFormationLetter } from '@/lib/english-learning-journey';
import { pendingFormationActivity } from './programmePresentation';

export default function Dashboard() {
  const { progress, ready, offline, storageAvailable } = useEnglish();
  const [tab, setTab] = useState<'path' | 'words' | 'grownups'>('path');
  const levelsDialog = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const access = englishAccess(progress);
  const publishedLessons = englishLessons.filter(isEnglishLessonPublished);
  const coreLessons = publishedLessons.filter(lesson => !lesson.supplemental);
  const letterPractice = publishedLessons.filter(lesson => lesson.supplemental && ready && access.lessons.has(lesson.id));
  const completed = access.completed.size;
  const pendingFormation = pendingFormationActivity(progress);
  const next = pendingFormation || access.next;
  const nextLesson = next ? englishLessons.find(lesson => lesson.id === next.lessonId) : null;
  const waiting = !!next && (!nextLesson || !isEnglishLessonPublished(nextLesson));
  const revisit = !next || waiting;
  const resumeLesson = coreLessons.find(l => l.id === next?.lessonId) || coreLessons[0];
  const lastFinished = [...coreLessons].reverse().find(l => l.activities.every(a => access.completed.has(a.id))) || coreLessons[0];
  const featuredLesson = revisit ? lastFinished : resumeLesson;
  const started = completed > 0 || Object.keys(progress.current).length > 0;
  const resumeHref = `/english/learn/${featuredLesson.id}${next && !revisit ? `?activity=${next.activity.id}` : ''}`;
  const featuredDone = featuredLesson.activities.filter(a => access.completed.has(a.id)).length;
  const title = pendingFormation ? `Make ${getFormationLetter(pendingFormation.activity.id)} too` : revisit ? 'Let’s play again!' : next?.activity.title || 'Our First Words';
  const currentLessonIndex = Math.max(0, coreLessons.findIndex(lesson => lesson.id === featuredLesson.id));
  const nearbyLessons = coreLessons.slice(currentLessonIndex, currentLessonIndex + 3);
  const earlierLessons = coreLessons.slice(0, currentLessonIndex).filter(lesson => access.lessons.has(lesson.id));
  const featuredLetters = featuredLesson.forms.split(/\s*/).filter(letter => /[a-z]/i.test(letter)).slice(0, 3);
  useEffect(() => {
    const view = new URLSearchParams(window.location.search).get('view');
    if (view === 'grownups' || view === 'words') setTab(view);
  }, []);

  function practiceChoices(lessons: typeof letterPractice) {
    return <div className="en-child-practice-grid">{lessons.map(lesson => <Link key={lesson.id} href={`/english/lesson/${lesson.id}`} className="en-child-practice-choice" aria-label={`Practise ${lesson.title}`}><span aria-hidden="true">{lesson.forms}</span><Icon name="pencil" size={21} /><strong>{lesson.title}</strong></Link>)}</div>;
  }

  function changeTab(value: typeof tab) {
    setTab(value);
    const url = new URL(window.location.href);
    if (value === 'path') url.searchParams.delete('view'); else url.searchParams.set('view', value);
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => main.current?.focus({ preventScroll: true }));
  }
  const navigation = <>{([
    ['path', 'home', 'Learn'], ['words', 'book', 'My words'],
  ] as const).map(([key, icon, label]) => <button key={key} onClick={() => changeTab(key)} aria-current={tab === key ? 'page' : undefined}><span><Icon name={icon} size={23} /></span><b>{label}</b></button>)}</>;
  return <div className="en-hub">
    <a className="en-skip" href="#english-main">Skip to learning</a>
    <aside className="en-hub-sidebar">
      <a href="/english/dashboard" className="en-hub-brand" aria-label="AptyRead English home"><BrandWordmark /><small>ENGLISH</small></a>
      <nav aria-label="Learning space">{navigation}</nav>
      <div className="en-hub-sidebar-foot"><button className="en-child-adult-link" onClick={() => changeTab('grownups')} aria-current={tab === 'grownups' ? 'page' : undefined}><Icon name="grownups" size={21} /> Grown-ups</button></div>
    </aside>
    <div className="en-hub-body">
      <header className="en-hub-header"><a href="/english/dashboard" className="en-hub-mobile-brand" aria-label="AptyRead English home"><BrandWordmark /></a><span className="en-hub-language"><i /> English</span><button className="en-hub-parent" aria-label="For grown-ups" aria-current={tab === 'grownups' ? 'page' : undefined} onClick={() => changeTab('grownups')}><Icon name="grownups" size={21} /><span>Grown-ups</span></button></header>
      <main id="english-main" ref={main} tabIndex={-1} className="en-hub-main">
        {offline && <p role="status" className="en-notice">You’re offline. Saved activities and letter sounds are available.</p>}
        {!storageAvailable && <p role="status" className="en-notice">Your browser cannot save progress. You can still learn during this visit.</p>}
        {tab === 'path' ? <>
          <div className="en-hub-greeting"><div><h1>Let’s play and read!</h1></div><span className="en-child-level-badge">Level 1</span></div>
          <section className="en-hub-feature" aria-labelledby="next-discovery-title">
            <div className="en-hub-feature-copy"><span className="en-hub-kicker">{revisit ? 'WITH APTY' : started ? 'UP NEXT' : 'START HERE'}</span>
              <h2 id="next-discovery-title">{title}</h2>
              <p>{pendingFormation ? 'Try its shape, or keep reading.' : revisit ? 'Your favourite activities are ready.' : 'One little visit. Ready when you are.'}</p>
              {revisit ? ready ? <Link className="en-hub-cta" href={`/english/lesson/${featuredLesson.id}`}>Play again <span><Icon name="redo" size={28} /></span></Link> : <button className="en-hub-cta" disabled>Getting ready…</button>
                : ready ? <Link className="en-hub-cta" href={resumeHref}>{started ? 'Play next' : 'Let’s play'}<span><Icon name="play" size={28} /></span></Link>
                  : <button className="en-hub-cta" disabled>Getting ready…</button>}
              <div className="en-hub-feature-progress" aria-label={`${featuredDone} of ${featuredLesson.activities.length} topics completed in ${featuredLesson.title}`}><span aria-hidden="true">{featuredLesson.activities.map(a => <i key={a.id} className={access.completed.has(a.id) ? 'is-done' : ''} />)}</span><small>{featuredDone} / {featuredLesson.activities.length}</small></div>
            </div>
            <div className="en-hub-feature-art" aria-hidden="true"><div className="en-hub-orbit" /><span className="en-hub-spark is-one">✦</span><span className="en-hub-spark is-two">✧</span><div className="en-hub-letter-cloud">{featuredLetters.map((letter, index) => <span key={`${index}-${letter}`}>{letter}</span>)}</div><Image className="en-hub-mascot" src="/images/apty-mascot.png" width={270} height={315} alt="" unoptimized priority /><div className="en-hub-art-shadow" /></div>
          </section>
          <section className="en-hub-lessons" aria-labelledby="lesson-list-title"><div className="en-hub-section-heading"><div><h2 id="lesson-list-title">My lessons</h2></div></div>
            <div className="en-hub-lesson-grid">{nearbyLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} index={coreLessons.indexOf(lesson)} href={`/english/lesson/${lesson.id}`} />)}</div>
            {earlierLessons.length > 0 && <details className="en-child-more-lessons"><summary><Icon name="redo" size={22} /> Play an earlier lesson <Icon name="chevron" size={20} /></summary><div className="en-hub-lesson-grid">{earlierLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} index={coreLessons.indexOf(lesson)} href={`/english/lesson/${lesson.id}`} />)}</div></details>}
          </section>
          {letterPractice.length > 0 && <section className="en-hub-lessons en-child-letter-practice" aria-labelledby="en-letter-practice-title"><div className="en-hub-section-heading"><div><h2 id="en-letter-practice-title">Make a letter</h2><p className="en-child-practice-intro">Paper, screen or another day. You choose.</p></div></div>{practiceChoices(letterPractice.slice(-6))}{letterPractice.length > 6 && <details className="en-child-more-lessons"><summary><Icon name="pencil" size={22} /> More letter practice <Icon name="chevron" size={20} /></summary>{practiceChoices(letterPractice.slice(0, -6))}</details>}</section>}
        </> : tab === 'words' ? <WordGarden /> : <ParentProgramme onShowLevels={() => levelsDialog.current?.showModal()} />}
      </main>
    </div>
    <nav className="en-hub-mobile-nav" aria-label="Learning space">{navigation}</nav>
    <dialog ref={levelsDialog} className="en-hub-sheet en-level-sheet" aria-labelledby="en-hub-levels-title" onClick={event => { if (event.target === event.currentTarget) levelsDialog.current?.close(); }}>
      <header className="en-sheet-heading"><div><span className="en-hub-kicker">ONE STEP AT A TIME</span><h2 id="en-hub-levels-title">Your reading journey</h2></div><button className="en-icon-button" aria-label="Close levels" onClick={() => levelsDialog.current?.close()}><Icon name="close" /></button></header>
      <div className="en-sheet-scroll"><p className="en-level-boundary-note">Level 1 is available as an interactive prototype. Later stages need separate content and an adult readiness review; completing activities does not establish mastery.</p><ol className="en-hub-level-map">{englishLevels.map((item, index) => <li key={item.title}>{index === 0 ? <button onClick={() => { levelsDialog.current?.close(); changeTab('path'); }}><span className="en-hub-level-number">1</span><span><small>AVAILABLE PROTOTYPE</small><strong>{item.title}</strong></span><Icon name="arrow" size={21} /></button> : <div><span className="en-hub-level-number">{index + 1}</span><span><small>PLANNED · NOT YET AVAILABLE</small><strong>{item.title}</strong><p>{['', 'Build on comfortable decoding of taught patterns and understanding short books.', 'Introduce new letter patterns after the earlier patterns are secure.', 'Extend reading as pattern knowledge and understanding develop.', 'Broaden independent reading with continued support as needed.'][index]}</p></span><Icon name="lock" size={17} /></div>}</li>)}</ol></div>
    </dialog>
  </div>;
}
