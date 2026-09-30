'use client';

import Link from './AppLink';
import { englishLessons, englishVideos, EnglishLesson } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import LessonTopics, { TopicPicture } from './LessonTopics';
import LessonJourney from './LessonJourney';

export default function LessonOverview({ lesson }: { lesson: EnglishLesson }) {
  const { progress, ready, offline } = useEnglish();
  const access = englishAccess(progress);
  const lessonNumber = englishLessons.findIndex(item => item.id === lesson.id) + 1;
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
      <Link className="en-overview-back" href="/english/dashboard" aria-label="Back to learning home"><Icon name="home" size={26} /><span>Home</span></Link>
      <div className="en-overview-heading">
        <span className="en-hub-kicker">LEVEL 1 · LESSON {lessonNumber}</span>
        <h1>{title}</h1>
        <div className="en-overview-progress" aria-label={`${completed} of ${lesson.activities.length} topics completed`}>
          <span><i style={{ width: `${100 * completed / lesson.activities.length}%` }} /></span>
          <small>{completed} / {lesson.activities.length}</small>
        </div>
      </div>
      <span className="en-hub-language"><i /> English</span>
    </header>
    <main id="lesson-overview-main" className="en-overview-main" tabIndex={-1}>
      {offline && <p role="status" className="en-notice">You’re offline. Saved activities and letter sounds are available.</p>}
      <section className={`en-overview-continue ${done ? 'is-done' : unavailable ? 'is-waiting' : !unlocked ? 'is-locked' : ''}`} aria-labelledby="continue-title">
        <div className="en-overview-next-copy">
          {next && unlocked && <TopicPicture activity={next} />}
          <div><span className="en-hub-kicker">{!ready ? 'WELCOME' : done ? 'YOU DID IT!' : unavailable ? 'KEEP PLAYING' : !unlocked ? 'COMING UP' : next ? 'UP NEXT' : 'PLAY AGAIN'}</span>
          <h2 id="continue-title">{!ready ? 'Getting ready…' : done ? 'Let’s play again!' : unavailable ? next.title : !unlocked ? `First, play Lesson ${Math.max(1, lessonNumber - 1)}.` : next ? next.title : 'Choose an activity.'}</h2>
          <p>{!ready ? 'Your activities will be ready in a moment.' : done ? 'Pick a favourite below.' : unavailable ? 'Your place is saved.' : !unlocked ? 'Then this lesson will be ready for you.' : next ? 'Ready when you are.' : 'You can try it again.'}</p></div>
        </div>
        {unlocked && next && !unavailable ? <Link className="en-hub-cta" href={continueHref}>{completed ? 'Play next' : 'Let’s play'}<span><Icon name="play" size={28} /></span></Link> : ready && done ? <Link className="en-hub-cta" href={`/english/learn/${lesson.id}`}>Play again <span><Icon name="redo" size={26} /></span></Link> : ready ? <span className="en-overview-state"><Icon name="lock" size={20} />{unavailable ? 'Coming later' : `After Lesson ${Math.max(1, lessonNumber - 1)}`}</span> : null}
      </section>
      <section className="en-overview-topics" aria-labelledby="topics-title">
        <div className="en-overview-section-heading"><div><h2 id="topics-title">{lesson.id === 'first-words' ? 'My little journey' : 'Let’s explore'}</h2></div>{lesson.id !== 'first-words' && <span>{lesson.activities.length} activities</span>}</div>
        {lesson.id === 'first-words' ? <LessonJourney lesson={lesson} /> : <LessonTopics lesson={lesson} />}
      </section>
    </main>
  </div>;
}
