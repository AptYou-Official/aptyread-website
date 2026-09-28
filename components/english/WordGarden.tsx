'use client';

import { englishLessons } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';

export default function WordGarden() {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const plants = [...englishLessons.flatMap((lesson, index) => lesson.activities.filter(activity => activity.word).map(activity => ({ word: activity.word!, id: activity.id, lesson: lesson.id, number: index + 1 }))), { word: 'pan · tap', id: 'more-words-with-apty', lesson: 'more-words', number: 5 }];
  return <section className="en-word-garden"><span className="en-eyebrow">LITTLE WORDS, GROWING CONFIDENCE</span><h1>My word garden</h1><p>Follow your learning path to unlock each word. Return here to practise it again.</p>
    <div className="en-garden-grid">{plants.map(({ word, id, lesson, number }) => {
      const unlocked = ready && access.activities.has(id);
      const completed = access.completed.has(id);
      const content = <><Icon name={unlocked ? 'leaf' : 'lock'} size={35} /><strong>{word}</strong><span>{!unlocked ? `Unlock in Lesson ${number}` : completed ? word.includes('·') ? 'Read these again' : 'Read it again' : word.includes('·') ? 'Try these words' : 'Practise this word'}<Icon name={unlocked ? 'arrow' : 'lock'} size={17} /></span></>;
      return unlocked ? <Link key={word} className={`en-word-plant ${word.includes('·') ? 'is-pair' : ''} ${completed ? 'is-grown' : ''}`} href={`/english/learn/${lesson}?activity=${id}`}>{content}</Link> : <div key={word} className={`en-word-plant is-locked ${word.includes('·') ? 'is-pair' : ''}`} aria-disabled="true">{content}</div>;
    })}</div><p className="en-fine">Your garden remembers practice. It isn’t a reading assessment.</p>
  </section>;
}
