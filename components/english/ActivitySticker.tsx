import Image from 'next/image';
import { CSSProperties, RefObject } from 'react';

export type ActivityStickerKind = 'sound' | 'finder' | 'link' | 'write' | 'word' | 'sentence' | 'video' | 'garden';

type ActivityStickerProps = {
  kind: ActivityStickerKind;
  title: string;
  detail: string;
  sticker: string;
  headingRef?: RefObject<HTMLHeadingElement>;
  compact?: boolean;
};

const sparkColors = ['#24B5C7', '#F0C85A', '#7E9BD0', '#24B5C7', '#F0C85A', '#7E9BD0', '#24B5C7', '#F0C85A'];

export function StickerToken({ kind, sticker, label }: { kind: ActivityStickerKind; sticker: string; label: string }) {
  return <span className={`en-sticker-token is-${kind}`} aria-label={`Sticker: ${label}`}>
    <strong>{sticker}</strong>
    <span>{label}</span>
  </span>;
}

export default function ActivitySticker({ kind, title, detail, sticker, headingRef, compact = false }: ActivityStickerProps) {
  return <div className={`en-sticker-celebration is-${kind} ${compact ? 'is-compact' : ''}`} role="status" aria-label={`${title} ${detail}`}>
    <div className="en-sticker-stage" aria-hidden="true">
      <div className="en-sticker-confetti">{sparkColors.map((color, index) => <i key={index} style={{ '--sticker-color': color, '--sticker-index': index } as CSSProperties} />)}</div>
      <div className="en-sticker-badge">
        <small>APTY STICKER</small>
        <strong>{sticker}</strong>
        <span>✦</span>
      </div>
      <Image className="en-sticker-apty" src="/images/apty-mascot.png" width={116} height={116} alt="Apty is celebrating with you" unoptimized />
      <span className="en-sticker-spark en-sticker-spark-one">✦</span>
      <span className="en-sticker-spark en-sticker-spark-two">✧</span>
    </div>
    {headingRef ? <h1 ref={headingRef} tabIndex={-1}>{title}</h1> : <h2>{title}</h2>}
    <p>{detail}</p>
  </div>;
}
