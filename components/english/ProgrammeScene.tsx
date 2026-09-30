import { useId, type ReactNode } from 'react';

// Original, reusable vector artwork. Illustrations communicate meaning; they
// never contain printed answers or introduce a sharp-object action.
const ink = '#354352';
const coral = '#EF705A';
const teal = '#329C91';
const purple = '#9070C5';
const blue = '#4779C8';
const gold = '#FFC65A';

const wordDescriptions: Record<string, string> = {
  cat: 'A ginger cat.', mat: 'A purple and teal mat.', net: 'A net with a round hoop and a handle.',
  pen: 'A blue pen.', hat: 'A sunny yellow hat.', hen: 'A hen.', pig: 'A pink pig.',
  rag: 'A soft cloth rag.', rat: 'A small grey rat with a long tail.', dog: 'A friendly brown dog.',
  kid: 'A smiling child.', mop: 'A mop with a long handle and soft strands.', dig: 'A child digging soil with a small garden trowel.',
  bed: 'A bed with a pillow and a colourful blanket.', fan: 'A fan with its blades inside a protective grille.',
  bag: 'A red bag with handles.', lip: 'A mouth with pink lips.', sun: 'The sun with rays of light.',
  jug: 'A blue jug with a handle and a pouring spout.', cup: 'A purple cup with a handle.',
  wet: 'A child with wet clothes and raindrops.', van: 'A green van.', zip: 'A zip on a yellow jacket.',
  vet: 'A vet gently checking a dog with a stethoscope.', yes: 'A child smiling and giving a thumbs up.',
  pan: 'An empty cooking pan with a handle.', tap: 'A child taps a drum gently with one finger.',
  pin: 'A closed safety pin. Its point is covered.', sit: 'A child sitting on a mat.', sat: 'A child sitting on a mat.',
  at: 'A child standing at a doorway.', hop: 'A child hopping on one foot.',
  fin: 'A fish with a clear fin.', log: 'A wooden log.', hug: 'Two children sharing a hug.',
  yam: 'A yam, with a cut piece showing its orange inside.', jet: 'A jet flying in the sky.',
  sad: 'A child with a sad expression.', red: 'A red bag.', big: 'A large bag beside a small bag.',
};

const storyDescriptions: Record<string, string> = {
  'pat-sat': 'Pat sat on a mat.', 'pip-sit': 'Pip sits on a mat.', 'pip-sat': 'Pip sat on a mat.',
  'pat-standing': 'Pat is standing.', 'pip-standing': 'Pip is standing.',
  'pat-tap': 'Pat taps a drum gently with one finger.', 'pip-tap': 'Pip taps a drum gently with one finger.',
  'pat-and-pip-sit': 'Pat and Pip sit together.', 'sam-ran': 'Sam runs along a path.',
  'pat-ran': 'Pat runs along a path.', 'sam-sat': 'Sam sat on a mat.',
  'pat-and-sam-at-mat': 'Pat and Sam are at a mat.', 'dog-dig': 'A dog digs in soft soil.',
  'dog-in-pit': 'A dog stands in a shallow pit.', 'pat-at-pit': 'Pat stands beside a shallow pit.',
  'kim-dig': 'Kim digs in soft soil with a small garden trowel.', 'pat-dig': 'Pat digs in soft soil with a small garden trowel.',
  'pat-hot': 'Pat feels hot in the sunshine.', 'ben-has-bag': 'Ben holds a red bag.',
  'ben-bag-on-bed': 'Ben is beside a bag on a bed.', 'ben-nap': 'Ben naps in bed.',
  'bag-on-bed': 'A red bag is on a bed.', 'bag-in-bin': 'A red bag is inside an open storage bin.',
  'bag-on-mat': 'A red bag is on a mat.', 'jug-in-sun': 'A jug is in the sunshine.',
  'wet-jug': 'A wet jug with water drops on it.', 'wet-cup': 'A wet cup with water drops on it.', 'dry-cup': 'A dry cup.',
  'jim-wet': 'Jim is wet in the rain.', 'jim-ran': 'Jim runs along a path.',
  'jim-sat': 'Jim sat on a covered seat.', 'jim-fun': 'Jim laughs on the covered seat after getting a little wet.',
  'van-in-sun': 'A van is in the sunshine.', 'vet-in-van': 'A vet sits inside a parked van.',
  'vet-pat-dog': 'A vet gently pats a dog.', 'zed-yap': 'Zed the small dog barks.',
  'zed-ran': 'Zed the small dog runs.', 'zed-wet': 'Zed the small dog runs through a puddle and gets wet.',
  'zed-sat': 'Zed the small dog sits.', 'pat-jog': 'Pat jogs along a path.',
  'pat-wet': 'Pat is wet in the rain.', 'red-bag': 'A red bag.',
  'big-bag': 'A large red bag beside a small red bag.', 'bag-in-van': 'A red bag is inside a parked van.',
};

export const supportedProgrammeScenes = [...Object.keys(wordDescriptions), ...Object.keys(storyDescriptions)];

function Eyes({ x = 0, y = 0, gap = 24 }: { x?: number; y?: number; gap?: number }) {
  return <g fill={ink}><circle cx={x - gap / 2} cy={y} r="3.5" /><circle cx={x + gap / 2} cy={y} r="3.5" /><circle cx={x - gap / 2 + 1} cy={y - 1.2} r="1" fill="white" /><circle cx={x + gap / 2 + 1} cy={y - 1.2} r="1" fill="white" /></g>;
}
function Shadow({ x = 200, y = 230, rx = 95 }: { x?: number; y?: number; rx?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry="10" fill="#406C6820" />;
}
function Sky({ rain = false }: { rain?: boolean }) {
  return <><path d="M0 212Q100 184 200 210T400 207V270H0Z" fill="#D1E9C9" /><path d="M0 246q170-28 400-5v29H0Z" fill="#B5D9B3" />{rain ? <><path d="M40 71q-12-18 10-27 7-29 34-14 27-14 38 13 24 6 16 28Z" fill="#A8C7D9" /><path d="m53 90-6 14m32-12-6 14m32-17-6 14m240-15-6 14m-15-37-6 14" stroke="#63ACD5" strokeWidth="5" strokeLinecap="round" /></> : <><circle cx="337" cy="47" r="28" fill="#FFEAB1" /><circle cx="337" cy="47" r="20" fill={gold} /><path d="M46 49h37m-23-9h29" stroke="white" strokeWidth="13" strokeLinecap="round" /></>}</>;
}
function Rug() {
  return <><ellipse cx="200" cy="232" rx="130" ry="25" fill={purple} /><ellipse cx="200" cy="230" rx="114" ry="18" fill="#7DCBC3" /><ellipse cx="200" cy="230" rx="91" ry="12" fill="none" stroke="#DFF4D8" strokeWidth="3" /></>;
}
function Drops() {
  return <g fill="#63B7DD"><path d="M145 113q-13 20 0 20t0-20M254 143q-13 20 0 20t0-20M287 187q-13 20 0 20t0-20" /><ellipse cx="201" cy="237" rx="79" ry="11" opacity=".4" /></g>;
}

function Person({ name = 'Sam', pose = 'stand', sad = false, vet = false }: { name?: string; pose?: string; sad?: boolean; vet?: boolean }) {
  const shirts: Record<string, string> = { Sam: coral, Pat: teal, Pip: purple, Ben: blue, Kim: '#D2689D', Jim: '#DF953C' };
  const shirt = vet ? '#A5DAD1' : shirts[name] || coral;
  const sitting = pose === 'sit';
  const onBench = pose === 'bench';
  const running = pose === 'run' || pose === 'hop';
  const dy = sitting ? 24 : 0;
  return <g>
    <path d={sitting ? 'M186 182L159 209L198 220M213 182L243 209L213 220' : onBench ? 'M186 173L175 191V222M214 173L227 191V222' : running ? 'M186 174L168 197L145 191M213 174L231 193L225 225' : 'M187 174V222M213 174V222'} fill="none" stroke="#4166B4" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
    <path d={sitting ? 'M196 223h14m4 0h12' : onBench ? 'M175 226h-12m64 0h12' : running ? 'M145 191l-9-3m88 37h13' : 'M187 226h-14m40 0h14'} stroke={gold} strokeWidth="12" strokeLinecap="round" />
    <g transform={`translate(0 ${dy})`}>
      <path d="M181 109q19-9 38 0l9 66q-29 12-56 0Z" fill={shirt} />
      <path d="M193 96v17q7 8 14 0V96" fill="#D99366" />
      <circle cx="168" cy="74" r="7" fill="#EDAD7C" /><circle cx="232" cy="74" r="7" fill="#EDAD7C" />
      <ellipse cx="200" cy="70" rx="32" ry="35" fill="#F2B985" />
      {name === 'Pip' || name === 'Kim' ? <><circle cx="165" cy="42" r="15" fill="#49342D" /><circle cx="235" cy="42" r="15" fill="#49342D" /><path d="M168 64q-4-37 32-34 37-3 32 37l-12-19q-26 13-42 0Z" fill="#49342D" /><circle cx="170" cy="48" r="5" fill={gold} /><circle cx="230" cy="48" r="5" fill={gold} /></> : <path d="M168 61q-5-33 23-31 35-7 41 33l-13-18q-20 12-38 0l-9 20Z" fill="#49342D" />}
      <Eyes x={200} y={72} />
      <ellipse cx="179" cy="83" rx="6" ry="3" fill="#EA9076" opacity=".65" /><ellipse cx="221" cy="83" rx="6" ry="3" fill="#EA9076" opacity=".65" />
      <path d={sad ? 'M192 94q8-9 16 0' : 'M192 89q8 8 16 0'} stroke="#985340" strokeWidth="3" fill="none" strokeLinecap="round" />
      {vet && <><path d="M187 115v19q13 21 26 0v-19" fill="none" stroke={ink} strokeWidth="4" /><circle cx="213" cy="142" r="7" fill="#FFF" stroke={ink} strokeWidth="3" /></>}
    </g>
    <path d={sitting ? 'M178 138L167 177L182 196M222 138L234 177L220 196' : onBench ? 'M178 114L161 145L177 163M222 114L239 145L222 163' : pose === 'yes' ? 'M178 115L162 147L150 118M222 115L234 149' : pose === 'pet' ? 'M178 114L165 139L165 155M222 114L249 132L287 141' : pose === 'tap' ? 'M179 115L163 145L198 158M222 115L237 133L255 133' : pose === 'dig' ? 'M179 115L163 145L198 158M222 115L237 143L255 147' : running ? 'M178 114L158 128L142 117M222 114L240 135L232 151' : 'M178 114L165 139L165 155M222 114L235 139L235 155'} stroke="#F2B985" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {pose === 'yes' && <path d="M148 119v-14m-1 15h-8v-9" fill="none" stroke="#F2B985" strokeWidth="8" strokeLinecap="round" />}
    {pose === 'hot' && <><path d="m226 83 3 8" stroke="#65B4DA" strokeWidth="4" strokeLinecap="round" /><path d="M249 103q8-8 0-16m11 10q8-8 0-16" stroke="#E6B363" strokeWidth="3" fill="none" strokeLinecap="round" /></>}
    {running && <path d="M117 165h22m-30 15h20" stroke="#86B1AE" strokeWidth="4" strokeLinecap="round" />}
  </g>;
}

function Cat() {
  return <g><path d="M246 192q47-31 28-62" fill="none" stroke="#E9A34D" strokeWidth="19" strokeLinecap="round" /><ellipse cx="198" cy="183" rx="53" ry="43" fill="#EDAB57" /><path d="m152 122-3-52 38 24m24 0 37-24-4 52" fill="#EDAB57" stroke="#BD7940" strokeWidth="3" strokeLinejoin="round" /><path d="m159 99-2-17 15 12m60 5 4-17-16 13" fill="#F3B2A0" /><ellipse cx="199" cy="130" rx="53" ry="42" fill="#F4BC6F" /><Eyes x={199} y={126} gap={35} /><path d="m192 139 7 6 7-6" fill="#A85E57" /><path d="M199 145v5m0 0q-7 8-15 0m15 0q7 8 15 0" fill="none" stroke="#865745" strokeWidth="2.5" strokeLinecap="round" /><path d="m147 137 28 7m-30 6 30 1m48-7 27-7m-26 14 29-1" stroke="#865745" strokeWidth="2" /><path d="M184 103v10m15-13v10m14-8v10" stroke="#CC8644" strokeWidth="5" strokeLinecap="round" /><ellipse cx="177" cy="219" rx="22" ry="10" fill="#F4BC6F" /><ellipse cx="222" cy="219" rx="22" ry="10" fill="#F4BC6F" /></g>;
}
function Dog({ pose = 'stand' }: { pose?: string }) {
  const sitting = pose === 'sit';
  const digging = pose === 'dig';
  return <g>
    <path d={pose === 'run' ? 'M122 165q-25-30-7-50' : sitting ? 'M167 211q-49 8-47-23' : 'M125 172q-38-7-30-42'} stroke="#B37B50" strokeWidth="16" fill="none" strokeLinecap="round" />
    {sitting ? <><ellipse cx="196" cy="181" rx="42" ry="47" transform="rotate(25 196 181)" fill="#D9A475" /><circle cx="169" cy="199" r="25" fill="#D9A475" /></> : <ellipse cx="181" cy="176" rx="65" ry="37" fill="#D9A475" />}
    <path d={pose === 'run' ? 'M141 192l-22 21m52-19 17 26m28-23 22 20' : sitting ? 'M159 219h15m32-38 9 41m19-44 8 44' : digging ? 'M138 191v30m32-25v25m40-32 32 31m-14-39 36 30' : 'M138 191v30m32-25v25m40-32v32m24-36v36'} stroke="#B98055" strokeWidth="17" strokeLinecap="round" />
    <g transform={digging ? 'translate(15 43) rotate(10 231 137)' : undefined}>
      <ellipse cx="231" cy="137" rx="40" ry="40" fill="#E7B98A" /><ellipse cx="199" cy="133" rx="16" ry="33" fill="#936147" transform="rotate(17 199 133)" /><ellipse cx="258" cy="131" rx="13" ry="27" fill="#936147" transform="rotate(-12 258 131)" /><Eyes x={234} y={131} gap={25} /><ellipse cx="240" cy="153" rx="23" ry="15" fill="#F7DABD" /><ellipse cx="240" cy="147" rx="8" ry="6" fill={ink} /><path d="M233 158q7 7 14 0" stroke="#985A46" strokeWidth="2.5" fill="none" strokeLinecap="round" /><path d="M212 175q22 8 40-3" fill="none" stroke={teal} strokeWidth="8" /><circle cx="236" cy="179" r="6" fill={gold} />
    </g>
    {pose === 'yap' && <path d="m283 137 12-6m-10 19h14m-16 13 12 7" stroke="#CB9A4D" strokeWidth="4" strokeLinecap="round" />}
    {pose === 'run' && <path d="M87 189h24m-31 15h22" stroke="#84ABA6" strokeWidth="4" strokeLinecap="round" />}
    {digging && <><path d="m293 211 8-8m-4 20 12-2" stroke="#B78D65" strokeWidth="4" strokeLinecap="round" /><circle cx="320" cy="205" r="5" fill="#B78D65" /><circle cx="310" cy="192" r="3" fill="#B78D65" /></>}
  </g>;
}
function Pig() {
  return <g><path d="M130 177q-29-4-17-22 15-8 14 7" fill="none" stroke="#D77FA0" strokeWidth="7" strokeLinecap="round" /><ellipse cx="190" cy="175" rx="67" ry="43" fill="#EDA1BA" /><path d="M150 196v27m41-22v22m42-26v26" stroke="#D67E9F" strokeWidth="17" strokeLinecap="round" /><path d="m201 111-8-32 33 15 28-10 10 38" fill="#D77FA0" strokeLinejoin="round" /><circle cx="231" cy="138" r="43" fill="#F3B3C8" /><Eyes x={231} y={133} gap={26} /><ellipse cx="233" cy="156" rx="22" ry="15" fill="#DC879F" /><circle cx="225" cy="156" r="4" fill="#9A4D6B" /><circle cx="241" cy="156" r="4" fill="#9A4D6B" /></g>;
}
function Hen() {
  return <g><path d="M180 208v17m33-18v18m-41 0h16m17 0h17" stroke="#CF8B37" strokeWidth="6" strokeLinecap="round" /><path d="m141 169-27-51 36 10-7-24 38 29" fill="#BD6C43" strokeLinejoin="round" /><ellipse cx="192" cy="169" rx="57" ry="48" fill="#FAE8B8" /><path d="M169 151q51-8 49 32-33 18-53-11" fill="#EAC27B" /><path d="M216 116q-22-40-7-47 10-4 16 12 4-22 14-15 9 9 2 27 24-9 24 4-2 16-31 23" fill="#E46563" /><circle cx="232" cy="124" r="29" fill="#FAE8B8" /><circle cx="240" cy="118" r="4" fill={ink} /><path d="m258 124 21 9-22 7" fill="#E0A13F" /><path d="M247 145q12 22-5 23-9-8-5-21" fill="#E46563" /></g>;
}
function Bag({ colour = coral }: { colour?: string }) {
  return <g><path d="M165 110V90q0-32 35-32t35 32v20" fill="none" stroke="#A55049" strokeWidth="14" /><rect x="130" y="101" width="140" height="126" rx="23" fill={colour} /><path d="M148 120v84m104-84v84" stroke="#FFC2A1" strokeWidth="5" strokeLinecap="round" /><rect x="170" y="150" width="60" height="48" rx="12" fill="#F69878" /><path d="M177 163h46" stroke="#B75C4D" strokeWidth="4" strokeLinecap="round" /></g>;
}
function Bed() {
  return <g><path d="M94 118v112m212-46v46" stroke="#B68560" strokeWidth="15" strokeLinecap="round" /><rect x="94" y="158" width="212" height="54" rx="12" fill="#BCA0D9" /><rect x="101" y="141" width="195" height="52" rx="16" fill="#EADFF2" /><rect x="105" y="135" width="59" height="37" rx="11" fill="#FFFEF2" /><path d="M168 145h113q15 0 15 16v31H168Z" fill="#73BEB5" /><path d="M182 153v32m20-32v32m20-32v32m20-32v32m20-32v32" stroke="#B8E3CA" strokeWidth="7" strokeLinecap="round" /></g>;
}
function Jug() {
  return <g><path d="M250 110q63-7 54 53-6 28-54 27" stroke="#387EAB" strokeWidth="18" fill="none" /><path d="M140 84h117l-6 103q-3 39-53 39t-54-39V106l-21-22Z" fill="#65B8D2" /><ellipse cx="196" cy="86" rx="56" ry="10" fill="#C1E8E9" /><path d="M163 111v69q0 25 15 27" stroke="#A6DDE7" strokeWidth="10" fill="none" strokeLinecap="round" /><path d="M171 146h56m-56 26h56" stroke="#E3F5E5" strokeWidth="6" strokeLinecap="round" /></g>;
}
function Cup() {
  return <g><path d="M260 111q53-4 46 40-3 24-47 25" fill="none" stroke="#8061AE" strokeWidth="17" /><path d="M126 94h140l-10 98q-3 28-60 28t-60-28Z" fill="#AC8ACC" /><ellipse cx="196" cy="94" rx="70" ry="13" fill="#D4BBE5" /><ellipse cx="196" cy="94" rx="56" ry="7" fill="#87639F" /><path d="M150 115l5 60" stroke="#D3B8E8" strokeWidth="9" strokeLinecap="round" /><path d="M150 186q46 12 91 0" stroke="#E4D4EC" strokeWidth="6" fill="none" /></g>;
}
function Van({ inside }: { inside?: ReactNode }) {
  return <g><path d="M57 132q0-23 23-23h173l45 41h26q19 0 19 18v38H57Z" fill="#55B1A0" /><rect x="73" y="122" width="136" height="71" rx="10" fill="#D8F0E5" /><path d="M224 123h23l36 31h-59Z" fill="#BDE4EF" /><path d="M75 203h247" stroke="#2E817A" strokeWidth="11" strokeLinecap="round" /><circle cx="115" cy="208" r="25" fill={ink} /><circle cx="115" cy="208" r="12" fill="#BCD0D7" /><circle cx="288" cy="208" r="25" fill={ink} /><circle cx="288" cy="208" r="12" fill="#BCD0D7" /><rect x="319" y="168" width="20" height="12" rx="4" fill={gold} />{inside}</g>;
}

function ObjectArt({ word }: { word: string }) {
  switch (word) {
    case 'cat': return <Cat />;
    case 'dog': return <Dog />;
    case 'pig': return <Pig />;
    case 'hen': return <Hen />;
    case 'bag': case 'red': return <Bag />;
    case 'bed': return <Bed />;
    case 'jug': return <Jug />;
    case 'cup': return <Cup />;
    case 'van': return <Van />;
    case 'mat': return <g transform="translate(0 -20)"><Rug /></g>;
    case 'rat': return <><path d="M139 187q-52-23-61 8-2 18 20 18" fill="none" stroke="#D6A0A3" strokeWidth="8" strokeLinecap="round" /><ellipse cx="191" cy="179" rx="61" ry="38" fill="#A5ABB9" /><path d="M221 143q37-6 66 34-8 27-65 32Z" fill="#B9BFCA" /><circle cx="226" cy="136" r="24" fill="#A5ABB9" /><circle cx="226" cy="136" r="14" fill="#E3B3B4" /><circle cx="257" cy="166" r="4" fill={ink} /><circle cx="285" cy="179" r="6" fill="#A86F82" /><path d="m274 185 24 6m-24-5 23-11" stroke={ink} strokeWidth="2" /><path d="M166 210h-11m78 1h12" stroke="#D6A0A3" strokeWidth="9" strokeLinecap="round" /></>;
    case 'net': return <g transform="rotate(-24 200 142)"><path d="M200 148v89" stroke="#AD7E5F" strokeWidth="16" strokeLinecap="round" /><path d="M138 79q0 119 62 119t62-119" fill="#DAEEE780" stroke="#85B9AF" strokeWidth="3" /><path d="m145 101 100 40m-99-16 82 48m-78-25 64 44m39-95-103 45m102-23-79 50m71-27-58 49" stroke="#93BFB8" strokeWidth="2" /><ellipse cx="200" cy="79" rx="66" ry="29" fill="#EAF6EE" stroke={teal} strokeWidth="12" /></g>;
    case 'pen': return <g transform="rotate(35 200 141)"><rect x="184" y="64" width="32" height="146" rx="11" fill={blue} /><path d="M184 183h32l-12 29h-8Z" fill="#CDD9E0" /><path d="M195 210h10l-5 10Z" fill={ink} /><rect x="183" y="50" width="34" height="60" rx="12" fill="#325D9E" /><path d="M208 63v56" stroke="#A7D5E4" strokeWidth="5" strokeLinecap="round" /><path d="M192 123v48" stroke="#8AB6E6" strokeWidth="4" strokeLinecap="round" /></g>;
    case 'hat': return <><ellipse cx="200" cy="188" rx="113" ry="29" fill="#D9A945" /><path d="M126 172l18-90q4-19 28-9l29 13 32-13q21-9 25 12l17 87Z" fill={gold} /><path d="m133 143-7 29q75 29 149 0l-6-30q-70 22-136 1Z" fill={coral} /><path d="M150 94l-8 36" stroke="#FFE09A" strokeWidth="7" strokeLinecap="round" /></>;
    case 'rag': return <><path d="m113 79 131-15 48 133-129 35-46-77Z" fill="#73C4BC" stroke="#43988F" strokeWidth="3" /><path d="m118 95 129-15m-121 40 129-16m-119 43 128-18m-121 43 128-21m-118 45 128-26" stroke="#C5EBDD" strokeWidth="7" /><path d="m148 77 43 144m-9-148 42 139m-9-143 40 135" stroke="#FFF6CE" strokeWidth="7" /><path d="m115 157 6 4m44 73 2 7m20-12 2 8m20-14 2 8m20-14 2 8m20-14 2 8m20-14 2 8" stroke="#43988F" strokeWidth="3" strokeLinecap="round" /></>;
    case 'mop': return <g transform="rotate(14 200 148)"><path d="M200 43v135" stroke="#B98A5D" strokeWidth="13" strokeLinecap="round" /><path d="M181 173h38l16 19h-70Z" fill={coral} /><path d="M172 192l-20 44m31-44-8 48m20-48v49m13-49 8 48m4-48 21 44" stroke="#A1D0D4" strokeWidth="12" strokeLinecap="round" /></g>;
    case 'fan': return <><path d="M200 173v48" stroke="#65AAA5" strokeWidth="15" /><ellipse cx="200" cy="225" rx="62" ry="12" fill={teal} /><circle cx="200" cy="114" r="76" fill="#E0F0EB" stroke={teal} strokeWidth="9" /><path d="M200 111q-58-60-20-61 47 0 29 63m-10 0q83-16 65 18-24 42-68-9m1-6q-22 83-44 52-26-39 41-51" fill="#79B9D9" /><circle cx="200" cy="114" r="14" fill={gold} /><g stroke="#639E99" strokeWidth="2" fill="none"><circle cx="200" cy="114" r="55" /><circle cx="200" cy="114" r="34" /><path d="M125 114h150M200 39v150m-53-128 106 106m0-106L147 167" /></g></>;
    case 'lip': return <><path d="M103 144q46-60 97-21 52-39 97 21-93 106-194 0Z" fill="#D86B82" /><path d="M103 144q94 22 194 0-96 56-194 0Z" fill="#973E5D" /><path d="M139 154q60 7 123-1-67 26-123 1Z" fill="#F9CAD4" /><path d="M159 130q13-7 29-1" stroke="#F2A7B8" strokeWidth="7" strokeLinecap="round" /></>;
    case 'sun': return <><g stroke={gold} strokeWidth="9" strokeLinecap="round"><path d="M200 37v18m0 151v18M106 131h18m151 0h18M134 65l13 13m106 106 13 13m0-132-13 13M147 184l-13 13" /></g><circle cx="200" cy="131" r="67" fill="#FFD36D" /><circle cx="187" cy="116" r="49" fill="#FFDD89" opacity=".6" /></>;
    case 'zip': return <><path d="m126 65 49-20q25 26 50 0l49 20 41 66-42 29-10-18v87H137v-87l-10 18-42-29Z" fill={gold} /><path d="M190 68v160h20V68" fill="#F2E4C5" /><path d="M194 86h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12m-12 12h12" stroke="#7D8591" strokeWidth="4" /><rect x="189" y="114" width="22" height="27" rx="5" fill="#547D93" /><rect x="194" y="130" width="12" height="25" rx="5" fill="#ADC8D0" stroke="#547D93" strokeWidth="3" /><path d="M156 178h20m48 0h20" stroke="#D79F42" strokeWidth="4" strokeLinecap="round" /></>;
    case 'pan': return <><path d="m254 131 77-26" stroke="#3D6878" strokeWidth="25" strokeLinecap="round" /><path d="M81 137q0 69 90 69t90-69" fill="#567F8E" /><ellipse cx="171" cy="135" rx="91" ry="38" fill="#A8CBD1" stroke="#3D6878" strokeWidth="8" /><ellipse cx="171" cy="136" rx="70" ry="24" fill="#DAEBE7" /></>;

    case 'pin': return <g transform="rotate(29 200 133)"><path d="M179 88v111q0 21 21 21t21-21V92" fill="none" stroke="#879FAA" strokeWidth="12" /><path d="M181 200q19-29 38 0" fill="none" stroke="#B7C9D1" strokeWidth="6" /><path d="M178 88V68q0-15 21-15t22 15v39h-25V88Z" fill="#75B9D1" stroke="#387E98" strokeWidth="5" /><path d="M194 66h11" stroke="#CCE8ED" strokeWidth="5" strokeLinecap="round" /></g>;
    case 'fin': return <><path d="m269 136 51-37v93l-51-28" fill="#EDA866" /><ellipse cx="193" cy="146" rx="83" ry="53" fill="#73BCCD" /><path d="m166 103 15-49 43 47" fill={coral} stroke="#C86455" strokeWidth="3" strokeLinejoin="round" /><path d="m181 171 42 11-23 36" fill="#458DA7" /><circle cx="139" cy="136" r="6" fill={ink} /><path d="M113 154q12 8 17-2" fill="none" stroke="#337890" strokeWidth="3" /><path d="M162 122q13 23 0 43" fill="none" stroke="#478A9E" strokeWidth="4" /></>;
    case 'log': return <><path d="M126 99h162v110H126Z" fill="#B8875A" /><ellipse cx="289" cy="154" rx="35" ry="55" fill="#CDA473" /><ellipse cx="124" cy="154" rx="44" ry="58" fill="#EDC996" stroke="#AD784F" strokeWidth="5" /><ellipse cx="124" cy="154" rx="28" ry="40" fill="none" stroke="#C49568" strokeWidth="4" /><ellipse cx="124" cy="154" rx="12" ry="20" fill="none" stroke="#C49568" strokeWidth="3" /><path d="M174 118h74m-72 39h82m-70 30h52" stroke="#966740" strokeWidth="5" strokeLinecap="round" /></>;
    case 'yam': return <><path d="M93 177q8-51 99-74 73-15 61 42-11 48-110 63-51 9-50-31Z" fill="#BE7655" /><path d="m126 170 8-5m37-13 9-4m33-16 7-3" stroke="#945B43" strokeWidth="5" strokeLinecap="round" /><ellipse cx="272" cy="183" rx="49" ry="38" transform="rotate(-18 272 183)" fill="#BD7957" /><ellipse cx="270" cy="178" rx="42" ry="31" transform="rotate(-18 270 178)" fill="#F5BA62" /><ellipse cx="270" cy="178" rx="28" ry="20" transform="rotate(-18 270 178)" fill="#FFD98B" /></>;
    case 'jet': return <g transform="rotate(-10 200 142)"><path d="m88 147 45-16 20-42h23l-2 36 118-15q40-3 39 13t-39 25l-115 13-36 52h-27l15-48-36 4Z" fill="#74BAD0" stroke="#4B89A4" strokeWidth="3" strokeLinejoin="round" /><path d="m177 131-22-66h24l55 59" fill="#4D87AD" /><path d="M280 116q13-5 22 3l-16 8" fill="#DCECEF" /><path d="M242 136h7m-25 2h7m-25 2h7" stroke="#EEF8EE" strokeWidth="7" strokeLinecap="round" /></g>;
    default: return null;
  }
}

function Drum() {
  return <><path d="M250 161v53m53-53v53" stroke="#B68B5E" strokeWidth="9" strokeLinecap="round" /><path d="M237 153h78v51q-40 17-78 0Z" fill="#C88C57" /><path d="m241 160 17 37 18-37 18 37 17-37" fill="none" stroke="#FFDC93" strokeWidth="4" /><ellipse cx="276" cy="152" rx="43" ry="12" fill="#FFE9B5" stroke="#A9784F" strokeWidth="4" /></>;
}
function Soil({ child = true }: { child?: boolean }) {
  return <><ellipse cx="271" cy="224" rx="60" ry="17" fill="#A57E5E" /><ellipse cx="271" cy="222" rx="35" ry="9" fill="#745643" />{child && <><path d="m253 150 20 55" stroke="#AF855F" strokeWidth="8" strokeLinecap="round" /><path d="m261 187 23-7 4 30-9 12-12-8Z" fill="#84A7AF" /></>}<path d="m311 219 13-13 18 18m-116 4-10-10-14 15" fill="#BD9770" /></>;
}

function SceneContent({ scene }: { scene: string }): ReactNode {
  if (['cat', 'dog', 'pig', 'hen', 'rat'].includes(scene)) return <><Sky /><Shadow /><ObjectArt word={scene} /></>;
  if (scene.startsWith('zed-')) return <><Sky /><Shadow />{scene === 'zed-wet' && <ellipse cx="201" cy="230" rx="109" ry="13" fill="#9BD8E2" />}<Dog pose={scene === 'zed-ran' || scene === 'zed-wet' ? 'run' : scene === 'zed-yap' ? 'yap' : 'sit'} />{scene === 'zed-wet' && <g fill="#63B7DD"><path d="M102 200q-10 15 0 15t0-15M268 195q-10 15 0 15t0-15M292 210q-7 11 0 11t0-11" /><path d="m122 222-10-4m142 4 11-4" fill="none" stroke="#63B7DD" strokeWidth="4" strokeLinecap="round" /></g>}</>;
  if (scene === 'dog-dig' || scene === 'dog-in-pit') return <><Sky /><Soil child={false} /><g transform={scene === 'dog-in-pit' ? 'translate(70 23) scale(.83)' : 'translate(9 -3)'}><Dog pose={scene === 'dog-dig' ? 'dig' : 'stand'} /></g>{scene === 'dog-in-pit' && <path d="M223 233q49-11 91 0" stroke="#A57E5E" strokeWidth="13" fill="none" />}</>;
  if (scene === 'vet' || scene === 'vet-pat-dog') return <><Sky /><g transform="translate(105 79) scale(.65)"><Dog pose="sit" /></g><g transform="translate(-20 2)"><Person vet pose="pet" /></g>{scene === 'vet' && <><path d="M192 144C188 185 225 222 248 205" stroke={ink} strokeWidth="4" fill="none" /><circle cx="248" cy="205" r="8" fill="#FFFEF2" stroke={ink} strokeWidth="3" /></>}</>;
  if (scene === 'jim-sat' || scene === 'jim-fun') return <><Sky rain /><path d="M93 43v197m214-197v197" stroke="#B98C62" strokeWidth="12" strokeLinecap="round" /><path d="m66 51 134-35 134 35Z" fill={teal} /><rect x="117" y="143" width="166" height="43" rx="9" fill="#C69B6B" /><path d="M121 191h158m-142 3v40m126-40v40" fill="none" stroke="#9E7654" strokeWidth="12" strokeLinecap="round" /><g transform="translate(32 30) scale(.84)"><Person name="Jim" pose="bench" /><path d="M177 137q25 9 47-2l3 32q-27 12-55 0Z" fill="#244F633F" />{scene === 'jim-fun' && <path d="M190 88q10 24 20 0Z" fill="#985340" />}</g></>;
  if (scene === 'at') return <><rect x="217" y="32" width="130" height="192" rx="12" fill="#B9DAD1" /><rect x="228" y="41" width="107" height="181" rx="7" fill={teal} /><rect x="245" y="62" width="73" height="46" rx="9" fill="#BDE6ED" /><circle cx="318" cy="142" r="7" fill={gold} /><g transform="translate(13 0)"><Person /></g></>;
  if (scene === 'hug') return <><Shadow /><g transform="translate(5 25) scale(.85)"><Person name="Pat" /></g><g transform="translate(55 25) scale(.85)"><Person name="Pip" /></g><path d="M156 130q12 37 62 17m25-17q-12 37-63 22" fill="none" stroke="#F2B985" strokeWidth="11" strokeLinecap="round" /></>;
  if (scene === 'pat-and-pip-sit' || scene === 'pat-and-sam-at-mat') return <><Rug /><g transform="translate(-66 23) scale(.85)"><Person name="Pat" pose={scene === 'pat-and-pip-sit' ? 'sit' : 'stand'} /></g><g transform="translate(127 23) scale(.85)"><Person name={scene === 'pat-and-sam-at-mat' ? 'Sam' : 'Pip'} pose={scene === 'pat-and-pip-sit' ? 'sit' : 'stand'} /></g></>;
  if (scene === 'bag-on-bed' || scene === 'ben-bag-on-bed' || scene === 'ben-nap') return <><Bed />{scene === 'ben-nap' ? <><ellipse cx="132" cy="146" rx="22" ry="20" fill="#F2B985" /><path d="M111 139q1-29 31-18l12 20-15-8-18 9Z" fill="#49342D" /><path d="M126 146q5 4 9 0" fill="none" stroke={ink} strokeWidth="2" /></> : <g transform="translate(142 69) scale(.45)"><Bag /></g>}{scene === 'ben-bag-on-bed' && <g transform="translate(-18 80) scale(.65)"><Person name="Ben" /></g>}</>;
  if (scene === 'bag-in-bin') return <><g transform="translate(49 -8) scale(.76)"><Bag /></g><path d="m100 147 18 86h164l18-86Z" fill="#7AB8C6" /><ellipse cx="200" cy="148" rx="100" ry="15" fill="none" stroke="#4D8D9E" strokeWidth="8" /><rect x="173" y="173" width="54" height="19" rx="8" fill="#BEE3E5" /></>;
  if (scene === 'bag-on-mat') return <><Rug /><g transform="translate(45 43) scale(.78)"><Bag /></g></>;
  if (scene === 'big' || scene === 'big-bag') return <><g transform="translate(-24 0)"><Bag /></g><g transform="translate(223 114) scale(.45)"><Bag /></g></>;
  if (scene === 'red-bag') return <Bag />;
  if (scene === 'van-in-sun' || scene === 'bag-in-van' || scene === 'vet-in-van') return <><Sky /><Van inside={scene === 'bag-in-van' ? <g transform="translate(32 89) scale(.44)"><Bag /></g> : scene === 'vet-in-van' ? <g transform="translate(63 105) scale(.38)"><Person vet pose="sit" /></g> : undefined} /></>;
  if (scene === 'dry-cup') return <><Shadow /><Cup /></>;
  if (scene === 'jug-in-sun' || scene === 'wet-jug' || scene === 'wet-cup') return <>{scene === 'jug-in-sun' && <Sky />}<ObjectArt word={scene === 'wet-cup' ? 'cup' : 'jug'} />{scene.startsWith('wet-') && <Drops />}</>;
  const match = /^(pat|pip|sam|kim|ben|jim)-(sat|sit|standing|ran|jog|wet|hot|tap|dig|fun|has-bag|at-pit)$/.exec(scene);
  if (match || ['kid', 'yes', 'sad', 'wet', 'sit', 'sat', 'hop', 'dig', 'tap'].includes(scene)) {
    const name = match ? match[1][0].toUpperCase() + match[1].slice(1) : 'Sam';
    const action = match?.[2] || scene;
    const seated = action === 'sat' || action === 'sit';
    const outdoors = ['ran', 'jog', 'wet', 'hot', 'dig', 'at-pit', 'hop', 'fun'].includes(action);
    return <>{outdoors ? <Sky rain={action === 'wet'} /> : <Shadow />}{seated && <Rug />}<Person name={name} sad={action === 'sad'} pose={seated ? 'sit' : action === 'ran' || action === 'jog' ? 'run' : action} />{action === 'tap' && <><Drum /><path d="M255 133l11 1v17" fill="none" stroke="#F2B985" strokeWidth="6" strokeLinecap="round" /><path d="m278 144 4-6m-8-4 1-6" stroke="#D1A356" strokeWidth="2.5" strokeLinecap="round" /></>}{(action === 'dig' || action === 'at-pit') && <Soil child={action === 'dig'} />}{action === 'wet' && <><path d="M177 136q25 9 47-2l3 32q-27 12-55 0Z" fill="#244F633F" /><Drops /></>}{action === 'has-bag' && <g transform="translate(161 68) scale(.58)"><Bag /></g>}{action === 'fun' && <><circle cx="291" cy="210" r="28" fill={gold} /><path d="M265 204q26-1 48 23m-18-44q-9 21-3 51" stroke={coral} strokeWidth="5" fill="none" /></>}</>;
  }
  if (wordDescriptions[scene]) return <>{scene !== 'sun' && scene !== 'jet' && <Shadow />}<ObjectArt word={scene} /></>;
  // Unknown scene IDs stay visibly neutral and carry an honest label. The
  // programme data validator can use supportedProgrammeScenes to reject them.
  return <><path d="M87 79q64-17 113 11 49-28 113-11v134q-61-17-113 10-49-27-113-10Z" fill="#B8DDD4" stroke={teal} strokeWidth="6" strokeLinejoin="round" /><path d="M200 91v129" stroke={teal} strokeWidth="5" /></>;
}

export default function ProgrammeScene({ scene, className = '' }: { scene: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`en-programme-scene ${className}`.trim()} data-scene={scene} viewBox="0 0 400 270" role="img" aria-label={wordDescriptions[scene] || storyDescriptions[scene] || 'An open book.'} style={{ display: 'block', width: '100%', height: 'auto' }}>
    <defs><clipPath id={`${id}-frame`}><rect width="400" height="270" rx="25" /></clipPath></defs>
    <g clipPath={`url(#${id}-frame)`}><rect width="400" height="270" fill="#FFF6E3" /><SceneContent scene={scene} /></g>
  </svg>;
}
