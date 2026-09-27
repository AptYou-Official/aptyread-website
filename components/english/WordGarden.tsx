'use client';

import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';

export default function WordGarden() {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  return <section className="en-word-garden"><span className="en-eyebrow">LITTLE WORDS, GROWING CONFIDENCE</span><h1>My word garden</h1><p>Follow your learning path to unlock each word. Return here to practise it again.</p>
    <div className="en-garden-grid">{(['at', 'sat'] as const).map(word => {
      const unlocked = ready && access.activities.has(`build-${word}`);
      const completed = access.completed.has(`build-${word}`);
      const content = <><Icon name={unlocked ? 'leaf' : 'lock'} size={35} /><strong>{word}</strong><span>{!unlocked ? 'Unlock in Lesson 1' : completed ? 'Read it again' : 'Practise this word'}<Icon name={unlocked ? 'arrow' : 'lock'} size={17} /></span></>;
      return unlocked ? <Link key={word} className={`en-word-plant ${completed ? 'is-grown' : ''}`} href={`/english/learn/first-words?activity=build-${word}`}>{content}</Link> : <div key={word} className="en-word-plant is-locked" aria-disabled="true">{content}</div>;
    })}</div><p className="en-fine">Your garden remembers practice. It isn’t a reading assessment.</p>
  </section>;
}
