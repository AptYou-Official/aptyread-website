'use client';

import Link from './AppLink';
import { englishLessons, englishVideos, EnglishLesson } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import LessonTopics from './LessonTopics';

export default function LessonOverview({ lesson }: { lesson: EnglishLesson }) {
  const { progress, ready, offline } = useEnglish();
  const access = englishAccess(progress);
  const lessonNumber = englishLessons.indexOf(lesson) + 1;
  const completed = lesson.activities.filter(activity => access.completed.has(activity.id)).length;
  const done = completed === lesson.activities.length;
  const unlocked = ready && access.lessons.has(lesson.id);
  const next = lesson.activities.find(activity => access.activities.has(activity.id) && !access.completed.has(activity.id));
  const unavailable = !!next && next.kind === 'video' && !englishVideos[next.id] && !next.audioIntroduction && !next.practicePreview;
  const continueHref = next ? `/english/learn/${lesson.id}?activity=${next.id}` : `/english/learn/${lesson.id}`;
  const title = lesson.id === 'first-words' ? 'Our First Words' : lesson.title;

  return <div className="en-lesson-overview">
    <a className="en-skip" href="#lesson-overview-main">Skip to topics</a>
    <header className="en-overview-header">
      <Link className="en-overview-back" href="/english/dashboard" aria-label="Back to learning path"><Icon name="back" size={19} /><span>Learning path</span></Link>
      <div className="en-overview-heading">
        <span className="en-hub-kicker">LEVEL 1 · LESSON {lessonNumber}</span>
        <h1>{title}</h1>
        <div className="en-overview-progress" aria-label={`${completed} of ${lesson.activities.length} topics completed`}>
          <span><i style={{ width: `${100 * completed / lesson.activities.length}%` }} /></span>
          <small>{completed} of {lesson.activities.length} complete</small>
        </div>
      </div>
      <span className="en-hub-language"><i /> English</span>
    </header>
    <main id="lesson-overview-main" className="en-overview-main" tabIndex={-1}>
      {offline && <p role="status" className="en-notice">You’re offline. Saved activities and letter sounds are available.</p>}
      <section className={`en-overview-continue ${done ? 'is-done' : unavailable ? 'is-waiting' : !unlocked ? 'is-locked' : ''}`} aria-labelledby="continue-title">
        <div>
          <span className="en-hub-kicker">{done ? 'LESSON COMPLETE' : unavailable ? 'KEEP GOING' : !unlocked ? 'LOCKED' : next ? 'CONTINUE HERE' : 'START HERE'}</span>
          <h2 id="continue-title">{done ? 'Look how far you’ve come.' : unavailable ? next.title : !unlocked ? `Finish Lesson ${lessonNumber - 1} first.` : next ? next.title : 'Choose a topic to practise.'}</h2>
          <p>{done ? 'Every topic is ready to revisit whenever you like.' : unavailable ? 'Your place is saved.' : !unlocked ? 'This lesson will open when the earlier lessons are complete.' : next ? 'One small step is waiting for you.' : 'Pick any finished topic and try it again.'}</p>
        </div>
        {unlocked && next && !unavailable ? <Link className="en-hub-cta" href={continueHref}>{completed ? 'Continue' : 'Let’s begin'}<span><Icon name="arrow" size={24} /></span></Link> : done ? <Link className="en-overview-secondary" href={`/english/learn/${lesson.id}`}>Practise again <Icon name="redo" size={18} /></Link> : <span className="en-overview-state"><Icon name="lock" size={18} />{unavailable ? 'Locked' : `After Lesson ${lessonNumber - 1}`}</span>}
      </section>
      <section className="en-overview-topics" aria-labelledby="topics-title">
        <div className="en-overview-section-heading"><div><span className="en-hub-kicker">ONE STEP AT A TIME</span><h2 id="topics-title">Topics in this lesson</h2></div><span>{completed} / {lesson.activities.length}</span></div>
        <LessonTopics lesson={lesson} />
      </section>
    </main>
  </div>;
}
