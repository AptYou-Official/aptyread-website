'use client';

import { CSSProperties, useId } from 'react';

// Rounded reward artwork, separate from the small navigation star icon.
export default function AchievementStars({ count = 5, earned = count, variant = 'celebration' }: {
  count?: 2 | 3 | 4 | 5; earned?: number; variant?: 'celebration' | 'progress';
}) {
  const id = useId().replace(/:/g, '');
  const filled = Math.max(0, Math.min(count, Math.floor(earned)));
  const names = { 2: 'two', 3: 'three', 4: 'four', 5: 'five' };
  const label = variant === 'progress' ? `${filled} of ${count} practice stars earned`
    : count === 5 ? 'Five celebration stars' : `${count} stars for completed practice`;
  const outline = 'M32 5C34 5 35 7 36 10L42 23L56 25C61 26 62 29 58 33L47 43L50 57C51 62 48 64 44 62L32 55L20 62C16 64 13 62 14 57L17 43L6 33C2 29 3 26 8 25L22 23L28 10C29 7 30 5 32 5Z';
  return <div className={`en-achievement-stars is-${names[count]} ${variant === 'progress' ? 'is-progress' : ''}`} role="img" aria-label={label}>
    {Array.from({ length: count }, (_, i) => <span key={`${i}-${i < filled}`} className={i < filled ? 'is-earned' : 'is-waiting'} style={{ '--star-order': i } as CSSProperties}>
      <svg viewBox="0 0 64 68" fill="none" aria-hidden="true">
        {i < filled ? <><defs><linearGradient id={`${id}-gold-${i}`} x1="18" y1="8" x2="47" y2="64" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE9A1" /><stop offset=".46" stopColor="#FFD15A" /><stop offset="1" stopColor="#EDA52C" /></linearGradient></defs>
        <path d={outline} transform="translate(0 2)" fill="#CC8C28" />
        <path d={outline} fill={`url(#${id}-gold-${i})`} stroke="#E6AE3C" strokeWidth=".7" />
        <path d="M32 10L32 35L9 28L25 27Z" fill="white" opacity=".38" />
        <path d="M32 35L46 57L32 50L18 57Z" fill="#BE771D" opacity=".12" />
        <path d="M32 11L38 25" stroke="#FFF5CF" strokeWidth="2.5" strokeLinecap="round" opacity=".8" /></>
          : <path d={outline} fill="#F0F7F8" stroke="#9DBFC9" strokeWidth="2.5" />}
      </svg>
    </span>)}
  </div>;
}
