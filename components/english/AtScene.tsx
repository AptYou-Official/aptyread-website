import { useId } from 'react';
import { Sam } from './StoryScene';

// The destination is a doorway. Sam remains standing at it after arriving.
export default function AtScene({ story = false }: { story?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <svg className="en-story-scene en-at-scene" viewBox="0 0 400 270" role="img" aria-label={story ? 'Sam walks to the door and stops at the doorway.' : 'Sam is standing at the door.'}>
    <defs>
      <linearGradient id={`${id}-wall`} x2="0" y2="1"><stop stopColor="#FFF8E8" /><stop offset="1" stopColor="#FFF0CF" /></linearGradient>
      <linearGradient id={`${id}-door`} x2="1" y2="1"><stop stopColor="#56BFB4" /><stop offset="1" stopColor="#33978F" /></linearGradient>
      <linearGradient id={`${id}-floor`} x2="0" y2="1"><stop stopColor="#F3DEBC" /><stop offset="1" stopColor="#EACCA5" /></linearGradient>
      <clipPath id={`${id}-scene`}><rect width="400" height="270" rx="24" /></clipPath>
    </defs>
    <g clipPath={`url(#${id}-scene)`}>
    <rect width="400" height="270" rx="24" fill={`url(#${id}-wall)`} />
    <path d="M0 203h400v67H0Z" fill={`url(#${id}-floor)`} />
    <path d="M0 203h400" stroke="#FFFDF6" strokeWidth="7" />
    <path d="M0 243h400M95 209l-18 61m153-61 13 61m91-61 33 61" stroke="#CEA982" strokeWidth="1" opacity=".45" />
    <rect x="234" y="18" width="143" height="190" rx="12" fill="#D3B487" opacity=".3" />
    <path d="M242 204V39q0-15 15-15h98q15 0 15 15v165" fill="#FFFDF6" />
    <rect x="254" y="36" width="104" height="167" rx="7" fill={`url(#${id}-door)`} />
    <path d="M263 43h86v151h-86Z" fill="none" stroke="#C4E7D6" strokeWidth="2" opacity=".7" />
    <rect x="276" y="52" width="60" height="48" rx="13" fill="#BFE8EF" />
    <path d="m281 90 46-33M308 96l23-17" stroke="#FFFFFF" strokeWidth="5" opacity=".55" />
    <circle cx="342" cy="131" r="9" fill="#28796F" opacity=".4" /><circle cx="342" cy="130" r="7" fill="#FFD064" /><circle cx="340" cy="128" r="2.5" fill="#FFF4C9" />
    <rect x="236" y="203" width="140" height="5" rx="2.5" fill="#B39A7B" />
    <rect x="29" y="40" width="103" height="91" rx="15" fill="#A8D8D1" />
    <rect x="35" y="45" width="91" height="80" rx="11" fill="#FFFFFF" />
    <rect x="40" y="50" width="81" height="70" rx="8" fill="#A9E1F2" />
    <circle cx="103" cy="66" r="11" fill="#FFD362" />
    <path d="M47 66h14m-7-5h12" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity=".8" />
    <path d="M41 105q20-34 40-13t40-19v47H41Z" fill="#7EBF89" />
    <path d="M41 113q26-18 48-5t32-2v14H41Z" fill="#A8D698" />
    <path d="M81 48v75M38 85h87" stroke="#FFFDF6" strokeWidth="5" />
    <path d="M25 131h111" stroke="#77BDB8" strokeWidth="6" strokeLinecap="round" />
    <path d="M45 189v-33" stroke="#398872" strokeWidth="4" />
    <ellipse cx="34" cy="164" rx="10" ry="19" fill="#79BF83" transform="rotate(-35 34 164)" /><ellipse cx="55" cy="154" rx="10" ry="21" fill="#44A385" transform="rotate(28 55 154)" />
    <path d="M28 183h35l-5 28H33Z" fill="#A57BCB" /><path d="M28 183h35" stroke="#C9A2E4" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="276" cy="225" rx="43" ry="9" fill="#536A7320" />
    {story ? <>
      <g className="en-story-motion" transform="translate(76,0)"><g><animateTransform attributeName="transform" type="translate" values="-154 0;0 0" dur="1.8s" fill="freeze" /><Sam sitting={false} walking /></g></g>
      <g className="en-story-still" transform="translate(76,0)"><Sam sitting={false} /></g>
    </> : <g transform="translate(76,0)"><Sam sitting={false} /></g>}
    </g>
  </svg>;
}
