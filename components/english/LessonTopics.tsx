'use client';

import { Activity, EnglishLesson } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { getFormationLetter } from '@/lib/english-learning-journey';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';
import { programmeGroupTitle, programmePicture } from './programmePresentation';

/** Recognisable pictures let emerging readers find an activity before reading its name. */
export function TopicPicture({ activity }: { activity: Activity }) {
  const baseLetter = activity.letter || activity.practiceLetter;
  const letter = activity.uppercase ? baseLetter?.toUpperCase() : baseLetter;
  const listening = activity.kind === 'video' && activity.audioIntroduction;
  if (activity.kind === 'practice') {
    const picture = programmePicture(activity);
    return <span className={`en-topic-picture is-practice ${picture.mark ? 'has-mark' : ''}`} aria-hidden="true">
      {picture.mark ? <><span className={picture.mark.length > 1 ? 'en-topic-picture-word' : 'en-topic-picture-letter'}>{picture.mark}</span><span className="en-topic-picture-corner"><Icon name={picture.icon} size={22} /></span></> : <Icon name={picture.icon} size={39} />}
    </span>;
  }
  return <span className={`en-topic-picture is-${listening ? 'listen' : activity.kind}`} aria-hidden="true">
    {activity.kind === 'word' || activity.kind === 'review' || activity.kind === 'apply' ? <><span className="en-topic-picture-word">{activity.word || (activity.id === 'our-first-words' ? 'sat' : 'pin')}</span><span className="en-topic-picture-underline" /></>
      : activity.kind === 'sound' ? <svg viewBox="0 0 64 64" width="58" height="58" fill="none"><path d="M10 27q22 10 44 0c-1 17-12 26-22 26S11 44 10 27Z" fill="#d54d67" stroke="#903550" strokeWidth="2.5" strokeLinejoin="round" /><path d="M15 30q17 7 34 0l-3 9H18Z" fill="#fff" /><path d="M23 49q9-11 18 0" fill="#ff9caf" /><path d="m8 16-4-4m14 1-1-6m31 9 4-4m-14 1 1-6" stroke="#903550" strokeWidth="3" strokeLinecap="round" /></svg>
        : activity.kind === 'write' || activity.kind === 'formation' ? <><span className="en-topic-picture-letter">{letter}</span><span className="en-topic-picture-corner"><Icon name="pencil" size={26} /></span></>
          : activity.kind === 'cases' ? <span className="en-topic-picture-cases">{activity.letter?.toUpperCase()}{activity.letter}</span>
            : activity.kind === 'find' ? <><span className="en-topic-picture-letter">{letter}</span><span className="en-topic-picture-corner"><Icon name="hand" size={27} /></span></>
              : <><span className="en-topic-picture-letter">{letter}</span><span className="en-topic-picture-corner"><Icon name={listening ? 'sound' : 'play'} size={23} /></span></>}
  </span>;
}

export function getLessonTopicGroups(lesson: EnglishLesson) {
  if (lesson.id === 'first-words') {
    const episodes = [
      { title: 'Meet s', first: 'meet-s' },
      { title: 'Meet a', first: 'meet-a' },
      { title: 'Meet t', first: 'meet-t' },
      { title: 'Make and read', first: 'build-at' },
      { title: 'Our turn', first: 'our-first-words' },
    ].map(episode => ({ title: episode.title, start: lesson.activities.findIndex(activity => activity.id === episode.first) }));
    if (episodes.every(episode => episode.start >= 0)) return episodes.map((episode, index) => ({ ...episode, end: episodes[index + 1]?.start ?? lesson.activities.length }));
  }
  const groups: { title: string; start: number; end: number }[] = [];
  let title = 'Listen together';
  for (const [index, activity] of lesson.activities.entries()) {
    if (/^meet-[a-z]$/.test(activity.id)) title = `Meet ${activity.letter}`;
    else if (activity.kind === 'word') title = 'Our words';
    else if (activity.kind === 'review' || activity.kind === 'apply') title = 'Have a go';
    else if (activity.id.endsWith('-cases') && activity.kind === 'video') title = 'Big and small';
    else if (activity.id.endsWith('-capital') && activity.kind === 'video') title = `Big ${activity.letter?.toUpperCase()}`;
    else if (activity.id.endsWith('-lowercase') && activity.kind === 'video') title = `Small ${activity.letter}`;
    else if (activity.kind === 'practice') title = programmeGroupTitle(activity);
    else if (activity.kind === 'formation') title = 'Make your letter';
    const last = groups[groups.length - 1];
    if (last && last.title === title && last.end - last.start < 3) last.end = index + 1;
    else groups.push({ title, start: index, end: index + 1 });
  }
  return groups;
}

/** The same topic navigation on the learning home and inside a lesson. */
export default function LessonTopics({ lesson, currentId, onSelect, groupIndex, showHeading = true }: {
  lesson: EnglishLesson; currentId?: string; onSelect?: (index: number) => void; groupIndex?: number; showHeading?: boolean;
}) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const groups = getLessonTopicGroups(lesson).filter((_, index) => groupIndex === undefined || index === groupIndex);
  return <div className="en-topic-route">
    {groups.map(group => <section className="en-topic-group" key={group.start} aria-label={group.title}>
    {showHeading && <h3><span className="en-topic-group-picture" aria-hidden="true">{/^Meet [a-z]$/.test(group.title) ? group.title.slice(-1) : <Icon name={/letter|Big|Small/.test(group.title) ? 'pencil' : /Listen|sound/.test(group.title) ? 'sound' : 'book'} size={22} />}</span>{group.title}</h3>}<ol start={group.start + 1}>
      {lesson.activities.slice(group.start, group.end).map((activity, offset) => {
        const index = group.start + offset;
        const done = access.completed.has(activity.id);
        const reached = ready && access.activities.has(activity.id);
        const canOpen = reached;
        const next = access.next?.activity.id === activity.id && canOpen;
        const selected = currentId === activity.id;
        const formationLetter = getFormationLetter(activity.id);
        const type = activity.id === 'our-first-words' ? 'Find together' : activity.kind === 'practice' ? programmePicture(activity).label : activity.kind === 'video' ? activity.audioIntroduction ? 'Listen' : 'Watch' : activity.kind === 'word' || activity.kind === 'review' || activity.kind === 'apply' ? 'Read' : activity.kind === 'write' || activity.kind === 'formation' ? 'Draw' : activity.kind === 'sound' ? 'Say' : 'Find';
        const status = selected && canOpen ? 'You are here' : done ? 'Play again' : !ready ? 'Getting ready…' : next ? 'Play next' : !reached ? 'Play in order' : type;
        const state = !canOpen ? 'is-locked' : selected ? 'is-selected' : done ? 'is-done' : next ? 'is-next' : 'is-available';
        const className = `en-route-topic ${state} ${!canOpen ? 'is-locked' : ''}`;
        const content = <><TopicPicture activity={activity} />
          <span className="en-route-copy"><strong>{activity.title}</strong><small><span className={`en-route-status ${state}`}>{done && <Icon name="check" size={16} />}{status}</span></small>{formationLetter && <span className="en-topic-formation-note"><Icon name="pencil" size={15} /> Make {formationLetter} too</span>}</span>
          <span className="en-route-type" aria-hidden="true"><Icon name={done ? 'redo' : !canOpen ? 'lock' : 'play'} size={24} /></span></>;
        const label = `${activity.title}, ${selected && canOpen ? 'current topic' : done ? 'finished, practise again' : next ? 'continue here' : !reached ? 'locked, finish earlier topics first' : type}${formationLetter ? `. Includes an optional turn to make ${formationLetter}` : ''}`;
        return <li key={activity.id} data-topic-id={activity.id}>{!canOpen ? <div className={className} aria-disabled="true" aria-label={label}>{content}</div>
          : onSelect ? <button className={className} onClick={() => onSelect(index)} aria-current={selected ? 'step' : undefined} aria-label={label}>{content}</button>
          : <Link className={className} href={`/english/learn/${lesson.id}?activity=${activity.id}`} aria-current={selected ? 'step' : undefined} aria-label={label}>{content}</Link>}</li>;
      })}
    </ol>
  </section>)}
  </div>;
}
