/** A clear whole-object meaning model. No additional print to decode. */
export default function PinScene({ story = false }: { story?: boolean }) {
  return <svg viewBox="0 0 400 270" role="img" aria-label="A pin with a round blue head and a silver point" className={story ? 'en-pin-scene is-revealing' : 'en-pin-scene'}>
    <rect width="400" height="270" rx="24" fill="#EAF5F2" />
    <circle cx="330" cy="48" r="55" fill="#D9EEE7" />
    <path d="M0 216Q150 170 400 219V270H0Z" fill="#D5E8DE" />
    <rect x="49" y="35" width="302" height="207" rx="22" fill="#F9F5E9" transform="rotate(-4 200 135)" />
    <rect x="61" y="47" width="278" height="183" rx="16" fill="none" stroke="#E0D6BB" strokeWidth="2" strokeDasharray="4 6" transform="rotate(-4 200 135)" />
    <ellipse cx="206" cy="194" rx="65" ry="13" fill="#315277" opacity=".10" />
    <g className="en-pin-object" transform="rotate(28 200 132)">
      <path d="M193 114H207L204 192L200 211L196 192Z" fill="#9AACBA" />
      <path d="M196 116H200V203L198 192Z" fill="#F0F6FA" />
      <circle cx="200" cy="93" r="37" fill="#17647F" />
      <circle cx="197" cy="88" r="33" fill="#16A9C4" />
      <ellipse cx="187" cy="75" rx="12" ry="8" fill="#A8E7ED" transform="rotate(-28 187 75)" />
    </g>
  </svg>;
}
