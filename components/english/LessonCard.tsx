'use client';

import { EnglishLesson, englishVideos } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';

export default function LessonCard({ lesson, index, onOpen, href }: { lesson: EnglishLesson; index: number; onOpen?: () => void; href?: string }) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const completed = lesson.activities.filter(item => access.completed.has(item.id)).length;
  const done = completed === lesson.activities.length;
  const unlocked = ready && access.lessons.has(lesson.id);
  const upcoming = lesson.activities.some(item => item.kind === 'video' && !englishVideos[item.id] && !item.audioIntroduction && !item.practicePreview);
  const current = access.next?.lessonId === lesson.id && !upcoming;
  const label = `View topics in ${lesson.title}${done ? ', completed' : !unlocked || upcoming ? ', locked' : current ? ', continue here' : ''}`;
  const status = done ? 'Ready to revisit' : !unlocked || upcoming ? `Unlocks after Lesson ${index}` : current ? (completed ? `Continue here · ${completed} of ${lesson.activities.length}` : 'Start here') : completed ? `${completed} of ${lesson.activities.length} topics` : `${lesson.activities.length} topics`;
  const content = <>
    <span className={`en-hub-cover is-cover-${index}`} aria-hidden="true"><span>{index === 0 ? 'sat' : lesson.forms}</span><i /><b>{String(index + 1).padStart(2, '0')}</b></span>
    <span className="en-hub-lesson-copy"><span className="en-hub-kicker">LESSON {String(index + 1).padStart(2, '0')}</span>
      <strong>{index === 0 ? 'Our First Words' : lesson.title}</strong>
      <span className={`en-hub-lesson-status ${current ? 'is-current' : ''} ${done ? 'is-done' : ''}`}>
        {done ? <Icon name="check" size={14} /> : !unlocked || upcoming ? <Icon name="lock" size={13} /> : current ? <Icon name="arrow" size={13} /> : null}
        {status}
      </span>
      {!done && unlocked && !upcoming && <span className="en-hub-lesson-track" aria-hidden="true"><i style={{width:`${100 * completed / lesson.activities.length}%`}} /></span>}
    </span>
    <span className="en-hub-lesson-arrow" aria-hidden="true"><Icon name={done ? 'redo' : !unlocked || upcoming ? 'lock' : 'chevron'} size={19} /></span>
  </>;
  const className = `en-hub-lesson ${current ? 'is-current' : ''} ${done ? 'is-done' : ''} ${!unlocked || upcoming ? 'is-later' : ''}`;
  return href && ready ? <Link className={className} href={href} aria-label={label}>{content}</Link> : <button className={className} onClick={onOpen} disabled={!ready} aria-label={label}>{content}</button>;
}
