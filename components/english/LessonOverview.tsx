'use client';

import Link from './AppLink';
import { englishLessons, EnglishLesson } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import LessonTopics, { getLessonTopicGroups, TopicPicture } from './LessonTopics';
import LessonJourney from './LessonJourney';
import { getFormationLetter } from '@/lib/english-learning-journey';
import { pendingFormationActivity } from './programmePresentation';

export default function LessonOverview({ lesson }: { lesson: EnglishLesson }) {
  const { progress, ready, offline } = useEnglish();
  const access = englishAccess(progress);
  const lessonNumber = englishLessons.filter(item => !item.supplemental).findIndex(item => item.id === lesson.id) + 1;
  const completed = lesson.activities.filter(activity => access.completed.has(activity.id)).length;
  const pendingFormation = pendingFormationActivity(progress, lesson.id);
  const done = completed === lesson.activities.length && !pendingFormation;
  const unlocked = ready && access.lessons.has(lesson.id);
  const next = pendingFormation?.activity || lesson.activities.find(activity => access.activities.has(activity.id) && !access.completed.has(activity.id));
  const continueHref = next ? `/english/learn/${lesson.id}?activity=${next.id}` : `/english/learn/${lesson.id}`;
  const title = lesson.id === 'first-words' ? 'Our First Words' : lesson.title;
  const replayHref = `/english/learn/${lesson.id}?activity=${lesson.activities[0].id}`;
  const routeHref = access.next ? `/english/learn/${access.next.lessonId}?activity=${access.next.activity.id}` : '/english/dashboard';
  const groups = getLessonTopicGroups(lesson);

  return <div className="en-lesson-overview">
    <a className="en-skip" href="#lesson-overview-main">Skip to topics</a>
    <header className="en-overview-header">
      <Link className="en-overview-back" href="/english/dashboard" aria-label="Back to learning home"><Icon name="home" size={26} /><span>Home</span></Link>
      <div className="en-overview-heading">
        <span className="en-hub-kicker">{lesson.supplemental ? 'LEVEL 1 · LETTER PRACTICE' : `LEVEL 1 · LESSON ${lessonNumber}`}</span>
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
      <section className={`en-overview-continue ${done ? 'is-done' : !unlocked ? 'is-locked' : ''}`} aria-labelledby="continue-title">
        <div className="en-overview-next-copy">
          {next && unlocked && <TopicPicture activity={next} />}
          <div><span className="en-hub-kicker">{!ready ? 'WELCOME' : done ? 'YOU DID IT!' : !unlocked ? 'COMING UP' : next ? 'UP NEXT' : 'PLAY AGAIN'}</span>
          <h2 id="continue-title">{!ready ? 'Getting ready…' : done ? 'Let’s play again!' : !unlocked ? lesson.supplemental ? 'Meet the sound first.' : 'One little step at a time.' : pendingFormation ? `Make ${getFormationLetter(pendingFormation.activity.id)} too` : next ? next.title : 'Choose an activity.'}</h2>
          <p>{!ready ? 'Your activities will be ready in a moment.' : done ? 'Pick a favourite below.' : !unlocked ? 'Your next activity is ready on your path.' : pendingFormation ? 'Try its shape, or keep reading.' : lesson.supplemental ? 'Try a letter whenever you like.' : next ? 'A little today. More another day.' : 'You can try it again.'}</p></div>
        </div>
        {unlocked && next ? <Link className="en-hub-cta" href={continueHref}>{completed ? 'Play next' : 'Let’s play'}<span><Icon name="play" size={28} /></span></Link> : ready && done ? <Link className="en-hub-cta" href={replayHref}>Play again <span><Icon name="redo" size={26} /></span></Link> : ready && !unlocked ? <Link className="en-overview-secondary" href={routeHref}>Back to my next step <Icon name="arrow" size={20} /></Link> : null}
      </section>
      <section className="en-overview-topics" aria-labelledby="topics-title">
        <div className="en-overview-section-heading"><div><h2 id="topics-title">{lesson.supplemental ? 'Let’s make letters' : 'My little journey'}</h2></div><span>{groups.length} little {groups.length === 1 ? 'stop' : 'stops'}</span></div>
        {groups.length > 1 ? <LessonJourney lesson={lesson} /> : <LessonTopics lesson={lesson} />}
      </section>
    </main>
  </div>;
}
