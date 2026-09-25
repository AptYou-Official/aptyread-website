// Purpose-built illustrations: the floor is a room surface, not a separate mat.
export function FloorScene({ focus = false }: { focus?: boolean }) {
  return <svg viewBox="0 0 360 260" role="img" aria-label="A room with a clear tiled floor" className="ml-lesson-scene">
    <rect width="360" height="260" rx="22" fill="#f4f1e7" />
    <path d="M0 160H360V260H0Z" fill={focus ? '#b8ded5' : '#d4e7e0'} />
    <path d="M0 160H360M0 210H360M80 160 40 260M160 160 145 260M240 160 255 260M320 160 360 260" fill="none" stroke="#729d92" strokeWidth="3" />
    <rect x="35" y="32" width="84" height="85" rx="8" fill="#b9e0ef" stroke="#fff" strokeWidth="8" />
    <path d="M77 34V115M37 74H117" stroke="#fff" strokeWidth="5" />
    <circle cx="97" cy="52" r="10" fill="#f5d477" />
    <rect x="263" y="83" width="57" height="79" rx="6" fill="#c68e65" />
    <path d="M291 86V160M268 111H316M268 137H316" stroke="#a47454" strokeWidth="3" />
    {focus && <path d="M156 192H228V236H156Z" fill="#fff" opacity=".3" />}
  </svg>;
}
export function HeadScene() {
  return <svg viewBox="0 0 360 260" role="img" aria-label="A child's whole head" className="ml-lesson-scene">
    <rect width="360" height="260" rx="22" fill="#f4f1e7" />
    <circle cx="114" cy="134" r="19" fill="#bc805d" /><circle cx="246" cy="134" r="19" fill="#bc805d" />
    <path d="M112 107C112 25 248 25 248 107V160C248 242 112 242 112 160Z" fill="#dca67c" />
    <path d="M110 118C82 20 261 6 250 119L229 93 219 69C203 101 148 103 124 91Z" fill="#433d3c" />
    <circle cx="151" cy="139" r="5" fill="#34394d" /><circle cx="209" cy="139" r="5" fill="#34394d" />
    <path d="M178 144 171 165H185M157 183Q180 201 204 183" fill="none" stroke="#965945" strokeWidth="5" strokeLinecap="round" />
  </svg>;
}
