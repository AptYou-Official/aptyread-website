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
    <path d={sitting ? seatedLegs : standingLegs} fill="none" stroke="#375C79" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round">{motion('d', standingLegs, seatedLegs)}{walking && <animate attributeName="d" values={`${standingLegs};${strideLegs};${standingLegs}`} dur="0.6s" repeatCount="3" fill="freeze" />}</path>
    <path d={sitting ? seatedFeet : standingFeet} stroke="#F0B185" strokeWidth="11" strokeLinecap="round">{motion('d', standingFeet, seatedFeet)}{walking && <animate attributeName="d" values={`${standingFeet};${strideFeet};${standingFeet}`} dur="0.6s" repeatCount="3" fill="freeze" />}</path>
    <g transform={sitting ? undefined : 'translate(0,-20)'}>
      {animate && <animateTransform attributeName="transform" type="translate" values="0 -20;0 -20;0 0" keyTimes="0;0.22;1" dur="2.2s" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" fill="freeze" />}
      <path d="M184 116q16-10 32 0l11 66q-25 15-54 0Z" fill="#E8B74F" />
      <rect x="191" y="102" width="17" height="21" rx="8" fill="#E5A277" /><ellipse cx="199" cy="84" rx="32" ry="35" fill="#F0B185" /><circle cx="168" cy="88" r="7" fill="#F0B185" /><circle cx="230" cy="88" r="7" fill="#F0B185" /><path d="M167 77q-8-37 31-36 38-2 34 41l-12-21q-23 11-39-1l-10 22Z" fill="#4E3830" /><circle cx="188" cy="85" r="3" fill="#45332C" /><circle cx="211" cy="85" r="3" fill="#45332C" /><path d="M191 99q8 7 16 0" stroke="#A65D43" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    <path d={sitting ? seatedArms : standingArms} stroke="#F0B185" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">{motion('d', standingArms, seatedArms)}</path>
  </>;
}

export default function StoryScene({ place = 'mat', sitting = true, story = false }: { place?: 'mat' | 'bench'; sitting?: boolean; story?: boolean }) {
  const description = story ? 'Sam stands, then sits down on the mat.' : `Sam ${sitting ? 'sitting on' : 'standing beside'} a ${place}`;
  return <svg className="en-story-scene" viewBox="0 0 400 270" role="img" aria-label={description}>
    <rect width="400" height="270" rx="24" fill={place === 'mat' ? '#EDF5EF' : '#EBF5FC'} />
    {place === 'mat' ? <><rect x="30" y="28" width="94" height="98" rx="12" fill="#D4E8DD" /><rect x="39" y="37" width="76" height="80" rx="7" fill="#F9FBEE" /><path d="M77 37v80M39 77h76" stroke="#D4E8DD" strokeWidth="7" /><path d="M0 181h400v89H0" fill="#E5D8BD" /><path d="M319 170v-52" stroke="#5C8764" strokeWidth="6" /><ellipse cx="307" cy="120" rx="14" ry="27" fill="#8BB692" transform="rotate(-35 307 120)" /><ellipse cx="332" cy="108" rx="14" ry="25" fill="#719F78" transform="rotate(30 332 108)" /><path d="m300 158 6 31h28l6-31" fill="#BC7860" /></> : <><circle cx="335" cy="42" r="23" fill="#F4D985" /><path d="M0 154Q80 100 150 150T400 139v131H0" fill="#C9DFC4" /><path d="M42 151V61" stroke="#9A8060" strokeWidth="12" /><circle cx="42" cy="57" r="39" fill="#A4C5A1" /><path d="M127 210v-44h154v44" fill="none" stroke="#6E735A" strokeWidth="9" /><path d="M119 141h168m-168 25h168" stroke="#B48B61" strokeWidth="15" strokeLinecap="round" /></>}
    {place === 'mat' && <><ellipse cx="198" cy="226" rx="123" ry="30" fill="#B88A65" opacity=".12" /><ellipse cx="198" cy="220" rx="122" ry="29" fill="#C7835D" /><ellipse cx="198" cy="220" rx="99" ry="20" fill="none" stroke="#E9BD92" strokeWidth="3" /><ellipse cx="198" cy="220" rx="72" ry="13" fill="none" stroke="#E9BD92" strokeWidth="2" /></>}
    <g transform={place === 'bench' && sitting ? 'translate(0,-38)' : undefined}>
      {story ? <><g className="en-story-motion"><Sam sitting animate /></g><g className="en-story-still"><Sam sitting /></g></> : <Sam sitting={sitting} />}
    </g>
  </svg>;
}
