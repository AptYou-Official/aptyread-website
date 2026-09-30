import { useId } from 'react';

// Literal meaning pictures: Sam visibly lowers his body and bends his legs to sit.
// The animated and still poses share the same character and background.
export function Sam({ sitting, animate = false, walking = false }: { sitting: boolean; animate?: boolean; walking?: boolean }) {
  const standingLegs = 'M187 160 L187 189 L187 216 M212 160 L212 189 L212 216';
  const seatedLegs = 'M187 180 L159 207 L194 219 M212 180 L241 207 L213 219';
  const standingFeet = 'M187 217 L175 217 M212 217 L224 217';
  const seatedFeet = 'M194 220 L207 221 M213 220 L223 221';
  const standingArms = 'M180 107 L164 127 L163 147 M219 107 L235 127 L236 147';
  const seatedArms = 'M180 127 L166 166 L181 190 M219 127 L234 166 L219 190';
  const strideLegs = 'M187 160 L180 189 L171 216 M212 160 L218 189 L228 216';
  const strideFeet = 'M171 217 L159 217 M228 217 L240 217';
  const motion = (attributeName: string, from: string, to: string) => animate
    ? <animate attributeName={attributeName} values={`${from};${from};${to}`} keyTimes="0;0.22;1" dur="2.2s" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" fill="freeze" />
    : null;
  return <>
    <path d={sitting ? seatedLegs : standingLegs} fill="none" stroke="#3766C6" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round">{motion('d', standingLegs, seatedLegs)}{walking && <animate attributeName="d" values={`${standingLegs};${strideLegs};${standingLegs}`} dur="0.6s" repeatCount="3" fill="freeze" />}</path>
    <path d={sitting ? seatedFeet : standingFeet} stroke="#FFC64B" strokeWidth="12" strokeLinecap="round">{motion('d', standingFeet, seatedFeet)}{walking && <animate attributeName="d" values={`${standingFeet};${strideFeet};${standingFeet}`} dur="0.6s" repeatCount="3" fill="freeze" />}</path>
    <g transform={sitting ? undefined : 'translate(0,-20)'}>
      {animate && <animateTransform attributeName="transform" type="translate" values="0 -20;0 -20;0 0" keyTimes="0;0.22;1" dur="2.2s" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" fill="freeze" />}
      <path d="M184 116q16-10 32 0l11 66q-25 15-54 0Z" fill="#EF705A" />
      <path d="M182 176q17 7 36 0" fill="none" stroke="#CF5147" strokeWidth="3" strokeLinecap="round" />
      <rect x="191" y="102" width="17" height="21" rx="8" fill="#DA9668" />
      <path d="M189 116q10 10 20 0" fill="none" stroke="#FFD69E" strokeWidth="4" strokeLinecap="round" />
      <circle cx="168" cy="88" r="7" fill="#EDAD7C" /><circle cx="230" cy="88" r="7" fill="#EDAD7C" />
      <ellipse cx="199" cy="84" rx="32" ry="35" fill="#F2B985" />
      <path d="M167 77q-8-33 20-35l-1-1q12-2 19 0 31-1 27 41l-12-21q-23 11-39-1l-10 22Z" fill="#49342D" />
      <path d="M178 51q9-8 23-3" fill="none" stroke="#715043" strokeWidth="4" strokeLinecap="round" />
      <path d="M183 77q5-3 10 0m13 0q5-3 10 0" fill="none" stroke="#6C4937" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="188" cy="85" rx="5" ry="6" fill="#FFFFFF" /><ellipse cx="211" cy="85" rx="5" ry="6" fill="#FFFFFF" />
      <circle cx="189" cy="86" r="3.2" fill="#39303D" /><circle cx="210" cy="86" r="3.2" fill="#39303D" />
      <circle cx="190" cy="84" r="1" fill="#FFFFFF" /><circle cx="211" cy="84" r="1" fill="#FFFFFF" />
      <ellipse cx="178" cy="96" rx="6" ry="3.5" fill="#ED9078" opacity=".6" /><ellipse cx="221" cy="96" rx="6" ry="3.5" fill="#ED9078" opacity=".6" />
      <path d="M197 91q-3 5 3 5" fill="none" stroke="#D28C63" strokeWidth="2" strokeLinecap="round" />
      <path d="M191 101q8 8 16 0" stroke="#9A503F" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    <path d={sitting ? seatedArms : standingArms} stroke="#F2B985" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">{motion('d', standingArms, seatedArms)}</path>
  </>;
}

export default function StoryScene({ place = 'mat', sitting = true, story = false }: { place?: 'mat' | 'bench'; sitting?: boolean; story?: boolean }) {
  const id = useId().replace(/:/g, '');
  const description = story ? 'Sam stands, then sits down on the mat.' : `Sam ${sitting ? 'sitting on' : 'standing beside'} a ${place}`;
  return <svg className="en-story-scene" viewBox="0 0 400 270" role="img" aria-label={description}>
    <defs><clipPath id={`${id}-scene`}><rect width="400" height="270" rx="24" /></clipPath></defs>
    <g clipPath={`url(#${id}-scene)`}>
      <rect width="400" height="270" fill={place === 'mat' ? '#FFF4DC' : '#DDF4FC'} />
      {place === 'mat' ? <>
        <rect x="27" y="26" width="102" height="105" rx="15" fill="#E7C6A3" opacity=".45" />
        <rect x="29" y="23" width="98" height="104" rx="13" fill="#A8D8D1" />
        <rect x="37" y="31" width="82" height="88" rx="8" fill="#A9E1F2" />
        <circle cx="100" cy="49" r="12" fill="#FFD362" />
        <path d="M38 96q21-22 42-7t38-6v35H38Z" fill="#7EBF89" />
        <path d="M38 110q25-21 47-5t33-1v14H38Z" fill="#A8D698" />
        <path d="M47 52h13m-8-5h16" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity=".8" />
        <path d="M78 31v88M37 74h82" stroke="#FFFEF4" strokeWidth="6" />
        <path d="M25 126h106" stroke="#77BDB8" strokeWidth="6" strokeLinecap="round" />
        <path d="M0 181h400v89H0" fill="#F0D9B3" />
        <path d="M0 181h400" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M0 243h400M58 187l-18 83m307-83 18 83" stroke="#DCBD91" strokeWidth="1.5" opacity=".5" />
        <path d="M319 170v-52" stroke="#398872" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="307" cy="120" rx="14" ry="27" fill="#79BF83" transform="rotate(-35 307 120)" />
        <ellipse cx="332" cy="108" rx="14" ry="25" fill="#44A385" transform="rotate(30 332 108)" />
        <path d="m304 120 15 21 12-30" stroke="#B5DE9D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="m300 158 6 31h28l6-31" fill="#A57BCB" /><path d="M300 158h40" stroke="#C9A2E4" strokeWidth="6" strokeLinecap="round" />
      </> : <>
        <circle cx="335" cy="42" r="30" fill="#FFEDAC" /><circle cx="335" cy="42" r="22" fill="#FFD064" />
        <path d="M112 37h33m-21-8h32" stroke="#FFFFFF" strokeWidth="13" strokeLinecap="round" opacity=".9" />
        <path d="M0 154Q80 100 150 150T400 139v131H0" fill="#AED997" />
        <path d="M0 209q106-35 209 0t191-8v69H0Z" fill="#95C77E" />
        <path d="M42 157V61" stroke="#B98459" strokeWidth="12" strokeLinecap="round" />
        <path d="m42 104 20-19m-20 0L27 70" fill="none" stroke="#B98459" strokeWidth="7" strokeLinecap="round" />
        <circle cx="42" cy="57" r="37" fill="#53AA80" /><circle cx="25" cy="49" r="24" fill="#72BF87" /><circle cx="59" cy="42" r="26" fill="#72BF87" />
        <ellipse cx="201" cy="218" rx="103" ry="13" fill="#47815F" opacity=".12" />
        <path d="M127 210v-44h154v44" fill="none" stroke="#4F8581" strokeWidth="10" strokeLinecap="round" />
        <path d="M119 141h168m-168 25h168" stroke="#C9945D" strokeWidth="17" strokeLinecap="round" />
        <path d="M122 137h162m-162 25h162" stroke="#EBC08A" strokeWidth="4" strokeLinecap="round" />
      </>}
      {place === 'mat' && <>
        <ellipse cx="198" cy="227" rx="125" ry="30" fill="#AA876C" opacity=".17" />
        <ellipse cx="198" cy="220" rx="122" ry="29" fill="#8061BB" />
        <ellipse cx="198" cy="220" rx="110" ry="23" fill="#78C6C0" />
        <ellipse cx="198" cy="220" rx="90" ry="16" fill="none" stroke="#D3F0D8" strokeWidth="3" />
      </>}
      <g transform={place === 'bench' && sitting ? 'translate(0,-38)' : undefined}>
        {story ? <><g className="en-story-motion"><Sam sitting animate /></g><g className="en-story-still"><Sam sitting /></g></> : <Sam sitting={sitting} />}
      </g>
    </g>
  </svg>;
}
