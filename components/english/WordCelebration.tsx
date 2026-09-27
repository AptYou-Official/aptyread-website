import Image from 'next/image';
import { CSSProperties, RefObject } from 'react';
import AchievementStars from './AchievementStars';
import Icon from './Icons';

export default function WordCelebration({ word, headingRef, onReplay }: {
  word: 'at' | 'sat' | 'first-words'; headingRef: RefObject<HTMLHeadingElement>; onReplay: () => void;
}) {
  return <div className={`en-word-celebration ${word === 'first-words' ? 'en-two-word-celebration' : ''}`}>
    <h1 ref={headingRef} tabIndex={-1}>{word === 'first-words' ? 'Your first words!' : 'You did it!'}</h1>
    <div className="en-success-art">
      <div className="en-success-halo" aria-hidden="true" />
      <div className="en-success-confetti" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--spark-index': i } as CSSProperties} />)}</div>
      <AchievementStars count={5} />
      {word === 'first-words' ? <div className="en-two-keepsakes" aria-label="Your words: at and sat"><div><strong>at</strong></div><div><strong>sat</strong></div></div> : <div className="en-word-keepsake"><strong>{word}</strong></div>}
      <Image className="en-success-apty" src="/images/apty-mascot.png" width={116} height={116} alt="Apty is celebrating with you" unoptimized />
      <span className="en-success-glint en-success-glint-one" aria-hidden="true">✦</span>
      <span className="en-success-glint en-success-glint-two" aria-hidden="true">✦</span>
    </div>
    <button className="en-text-button en-success-replay" onClick={onReplay}><Icon name="redo" size={20} /> {word === 'first-words' ? 'Play again' : 'Make it again'}</button>
  </div>;
}
