import Image from 'next/image';
import { RefObject } from 'react';

export default function LearningCompanion({ title, speaking = false, headingRef, reaction }: {
  title: string; speaking?: boolean; headingRef?: RefObject<HTMLHeadingElement>; reaction?: string;
}) {
  return <div className={`en-word-companion ${speaking ? 'is-speaking' : ''}`}>
    <div key={reaction} className={`en-companion-portrait ${reaction ? 'has-reacted' : ''}`} aria-hidden="true">
      <span className="en-companion-halo" /><Image src="/images/apty-mascot.png" width={136} height={136} alt="" unoptimized priority />
      <span className="en-companion-spark en-spark-one">✦</span><span className="en-companion-spark en-spark-two">✧</span>
    </div>
    <div className="en-companion-bubble"><h1 ref={headingRef} tabIndex={-1} aria-live="polite">{title}</h1><span className="en-speaking-bars" aria-hidden="true"><i /><i /><i /></span></div>
  </div>;
}
