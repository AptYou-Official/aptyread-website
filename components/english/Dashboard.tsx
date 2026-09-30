'use client';

import Image from 'next/image';
import Link from './AppLink';
import { useRef, useState } from 'react';
import { englishLevels, englishLessons, englishVideos, isEnglishLessonPublished } from '@/lib/english-curriculum';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import PwaInstall from './PwaInstall';
import BrandWordmark from '@/components/public/BrandWordmark';
import { englishAccess } from '@/lib/english-progress';
import LessonCard from './LessonCard';
import WordGarden from './WordGarden';

export default function Dashboard() {
  const { progress, ready, offline, storageAvailable } = useEnglish();
  const [tab, setTab] = useState<'path' | 'words' | 'grownups'>('path');
  const levelsDialog = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const access = englishAccess(progress);
  const publishedLessons = englishLessons.filter(isEnglishLessonPublished);
  const completed = access.completed.size;
  const next = access.next;
  const nextLesson = next ? englishLessons.find(lesson => lesson.id === next.lessonId) : null;
  const waiting = !!next && (!nextLesson || !isEnglishLessonPublished(nextLesson) || (next.activity.kind === 'video' && !englishVideos[next.activity.id] && !next.activity.audioIntroduction && !next.activity.practicePreview));
  const revisit = !next || waiting;
  const resumeLesson = publishedLessons.find(l => l.id === next?.lessonId) || publishedLessons[0];
  const lastFinished = [...publishedLessons].reverse().find(l => l.activities.every(a => access.completed.has(a.id))) || publishedLessons[0];
  const featuredLesson = revisit ? lastFinished : resumeLesson;
  const started = completed > 0 || Object.keys(progress.current).length > 0;
  const resumeHref = `/english/learn/${featuredLesson.id}${next && !revisit ? `?activity=${next.activity.id}` : ''}`;
  const featuredDone = featuredLesson.activities.filter(a => access.completed.has(a.id)).length;
  const title = revisit ? 'Let’s play again!' : next?.activity.title || 'Our First Words';

  function changeTab(value: typeof tab) {
    setTab(value);
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
              <p>{revisit ? 'Your favourite activities are ready.' : 'Apty is ready. Let’s go!'}</p>
              {revisit ? ready ? <Link className="en-hub-cta" href={`/english/lesson/${featuredLesson.id}`}>Play again <span><Icon name="redo" size={28} /></span></Link> : <button className="en-hub-cta" disabled>Getting ready…</button>
                : ready ? <Link className="en-hub-cta" href={resumeHref}>{started ? 'Play next' : 'Let’s play'}<span><Icon name="play" size={28} /></span></Link>
                  : <button className="en-hub-cta" disabled>Getting ready…</button>}
              <div className="en-hub-feature-progress" aria-label={`${featuredDone} of ${featuredLesson.activities.length} topics completed in ${featuredLesson.title}`}><span aria-hidden="true">{featuredLesson.activities.map(a => <i key={a.id} className={access.completed.has(a.id) ? 'is-done' : ''} />)}</span><small>{featuredDone} / {featuredLesson.activities.length}</small></div>
            </div>
            <div className="en-hub-feature-art" aria-hidden="true"><div className="en-hub-orbit" /><span className="en-hub-spark is-one">✦</span><span className="en-hub-spark is-two">✧</span><div className="en-hub-letter-cloud">{(featuredLesson.id.startsWith('explore-') ? featuredLesson.forms.split('') : featuredLesson.id === 'more-words' ? ['p', 'i', 'n'] : ['s', 'a', 't']).map(letter => <span key={letter}>{letter}</span>)}</div><Image className="en-hub-mascot" src="/images/apty-mascot.png" width={270} height={315} alt="" unoptimized priority /><div className="en-hub-art-shadow" /></div>
          </section>
          <section className="en-hub-lessons" aria-labelledby="lesson-list-title"><div className="en-hub-section-heading"><div><h2 id="lesson-list-title">My lessons</h2></div></div>
            <div className="en-hub-lesson-grid">{publishedLessons.map((lesson, index) => <LessonCard key={lesson.id} lesson={lesson} index={index} href={`/english/lesson/${lesson.id}`} />)}</div>
          </section>
        </> : tab === 'words' ? <WordGarden /> : <section className="en-grownups" translate="yes"><h1>For grown-ups</h1><p className="en-intro">A little insight into their reading journey.</p><div className="en-parent-grid"><article><Icon name="book" size={28} /><h2>Reading with meaning</h2><p>Children read words using sounds they have met. Spoken sentences and pictures help them understand. Help and replay are always welcome.</p></article><article><Icon name="leaf" size={28} /><h2>Progress without pressure</h2><p>Topics open in order. Completed topics stay available. Small turn indicators help children see their place; stickers celebrate completed activities. These are encouragement, not reading scores.</p></article><article><Icon name="home" size={28} /><h2>Their place, saved here</h2><p>Progress stays in this browser on this device. Clearing browser data clears progress.</p><strong>{completed} of {publishedLessons.reduce((count, lesson) => count + lesson.activities.length, 0)} released topics completed</strong></article><article><Icon name="sound" size={28} /><h2>About this learning path</h2><p>The learning path opens one topic at a time. Videos and some voices need internet.</p><p>Pronunciation and handwriting are not scored.</p></article></div><div className="en-parent-install"><div><h2>Ready on your home screen</h2><p>Add AptyRead for easy access.</p></div><PwaInstall /></div><div className="en-parent-links"><a href="/privacy">Privacy</a><a href="/contact">Contact</a><a href="/malayalam">Malayalam <Icon name="arrow" size={16} /></a></div></section>}
        {tab === 'grownups' && <div className="en-child-adult-tools"><button onClick={() => levelsDialog.current?.showModal()}>View learning levels <Icon name="arrow" size={18} /></button><a href="/">AptyRead home <Icon name="home" size={18} /></a></div>}
      </main>
    </div>
    <nav className="en-hub-mobile-nav" aria-label="Learning space">{navigation}</nav>
    <dialog ref={levelsDialog} className="en-hub-sheet en-level-sheet" aria-labelledby="en-hub-levels-title" onClick={event => { if (event.target === event.currentTarget) levelsDialog.current?.close(); }}>
      <header className="en-sheet-heading"><div><span className="en-hub-kicker">ONE STEP AT A TIME</span><h2 id="en-hub-levels-title">Your reading journey</h2></div><button className="en-icon-button" aria-label="Close levels" onClick={() => levelsDialog.current?.close()}><Icon name="close" /></button></header>
      <div className="en-sheet-scroll"><ol className="en-hub-level-map">{englishLevels.map((item, index) => <li key={item.title}>{index === 0 ? <button onClick={() => { levelsDialog.current?.close(); changeTab('path'); }}><span className="en-hub-level-number">1</span><span><small>YOU ARE HERE</small><strong>{item.title}</strong></span><Icon name="arrow" size={21} /></button> : <div><span className="en-hub-level-number">{index + 1}</span><span><small>LOCKED</small><strong>{item.title}</strong></span><Icon name="lock" size={17} /></div>}</li>)}</ol></div>
    </dialog>
  </div>;
}
