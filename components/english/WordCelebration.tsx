import { RefObject } from 'react';
import ActivitySticker from './ActivitySticker';
import Icon from './Icons';

export default function WordCelebration({ word, headingRef, onReplay }: {
  word: 'at' | 'sat' | 'pin' | 'sit' | 'first-words' | 'more-words' | 'discovery-words'; headingRef: RefObject<HTMLHeadingElement>; onReplay: () => void;
}) {
  const review = word === 'first-words' || word === 'more-words' || word === 'discovery-words';
  const words = word === 'discovery-words' ? ['pan', 'tap'] : word === 'more-words' ? ['pin', 'sit'] : ['at', 'sat'];
  const title = review ? word === 'first-words' ? 'First words!' : 'Word garden!' : 'Word builder!';
  const detail = review ? `You found ${words.join(' and ')}.` : `You made ${word}.`;
  return <div className={`en-word-celebration ${review ? 'en-two-word-celebration' : ''}`}>
    <ActivitySticker kind={review ? 'sentence' : 'word'} title={title} detail={detail} sticker={review ? words.join(' · ') : word} headingRef={headingRef} />
    <button className="en-text-button en-success-replay" onClick={onReplay}><Icon name="redo" size={20} /> {review ? 'Play again' : 'Make it again'}</button>
  </div>;
}
