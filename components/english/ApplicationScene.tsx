import type { ApplicationWord } from '@/lib/english-curriculum';

export default function ApplicationScene({ word }: { word: ApplicationWord }) {
  return <svg className={`en-application-scene is-${word}`} viewBox="0 0 400 280" role="img" aria-label={word === 'pan' ? 'An empty cooking pan with a handle' : 'A hand tapping the table'}>
    <rect width="400" height="280" rx="28" fill="#EDF8F8" />
    <circle cx="198" cy="128" r="101" fill="#D9EFF1" />
    {word === 'pan' ? <>
      <ellipse cx="190" cy="223" rx="115" ry="12" fill="#BCDDE2" opacity=".6" />
      <path d="M237 158l112-63q15-8 21 4t-8 19l-114 68" fill="#204477" />
      <path d="M72 147q-1 63 89 68t92-64" fill="#008FA6" />
      <ellipse cx="162" cy="146" rx="93" ry="47" fill="#A7D5DE" />
      <ellipse cx="162" cy="144" rx="84" ry="39" fill="#244570" />
      <ellipse cx="161" cy="144" rx="69" ry="29" fill="#375B83" />
      <path d="M104 133q20-18 50-16" fill="none" stroke="#7293AE" strokeWidth="5" strokeLinecap="round" />
    </> : <>
      <path d="M53 203h294v22H53z" fill="#C89066" />
      <path d="M53 203h294" stroke="#EBB990" strokeWidth="9" strokeLinecap="round" />
      <path d="M81 225v30m238-30v30" stroke="#A57050" strokeWidth="15" strokeLinecap="round" />
      <g className="en-tap-contact" fill="none" stroke="#00AFC9" strokeWidth="4" strokeLinecap="round">
        <path d="M163 181l-10-5m81 5 10-5M174 169l-5-11m54 11 5-11" />
        <ellipse cx="200" cy="202" rx="29" ry="5" />
      </g>
      <g className="en-tapping-hand">
        <path d="M205 39l47 10-9 38q20 13 12 39l-18 34q-5 9-14 6l-9-3v23q0 15-13 15t-13-15v-67l-14 10q-13 8-20-3t5-21l35-28z" fill="#DBA47E" stroke="#BC835F" strokeWidth="3" strokeLinejoin="round" />
        <path d="M205 27l53 11-6 30-54-11z" fill="#008DA7" />
        <path d="M216 110l-2 53m17-47-5 27m-27 40v9" fill="none" stroke="#BC835F" strokeWidth="3" strokeLinecap="round" />
      </g>
    </>}
  </svg>;
}
