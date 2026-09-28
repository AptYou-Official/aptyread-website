import Image from 'next/image';
import { CSSProperties, RefObject } from 'react';
import AchievementStars from './AchievementStars';
import Icon from './Icons';

export default function WordCelebration({ word, headingRef, onReplay }: {
  word: 'at' | 'sat' | 'pin' | 'sit' | 'first-words' | 'more-words' | 'discovery-words'; headingRef: RefObject<HTMLHeadingElement>; onReplay: () => void;
}) {
  const review = word === 'first-words' || word === 'more-words' || word === 'discovery-words';
  const words = word === 'discovery-words' ? ['pan', 'tap'] : word === 'more-words' ? ['pin', 'sit'] : ['at', 'sat'];
  return <div className={`en-word-celebration ${review ? 'en-two-word-celebration' : ''}`}>
    <h1 ref={headingRef} tabIndex={-1}>{review ? word === 'first-words' ? 'Your first words!' : 'More words. More smiles!' : 'You did it!'}</h1>
    <div className="en-success-art">
      <div className="en-success-halo" aria-hidden="true" />
      <div className="en-success-confetti" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--spark-index': i } as CSSProperties} />)}</div>
      <AchievementStars count={5} />
      {review ? <div className="en-two-keepsakes" aria-label={`Your words: ${words.join(' and ')}`}>{words.map(value => <div key={value}><strong>{value}</strong></div>)}</div> : <div className="en-word-keepsake"><strong>{word}</strong></div>}
      <Image className="en-success-apty" src="/images/apty-mascot.png" width={116} height={116} alt="Apty is celebrating with you" unoptimized />
      <span className="en-success-glint en-success-glint-one" aria-hidden="true">✦</span>
      <span className="en-success-glint en-success-glint-two" aria-hidden="true">✦</span>
    </div>
    <button className="en-text-button en-success-replay" onClick={onReplay}><Icon name="redo" size={20} /> {review ? 'Play again' : 'Make it again'}</button>
  </div>;
}
