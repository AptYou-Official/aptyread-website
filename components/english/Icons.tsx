type IconName = 'home' | 'book' | 'grownups' | 'arrow' | 'play' | 'pause' | 'sound' | 'close' | 'check' | 'star' | 'download' | 'leaf' | 'back' | 'pencil' | 'redo' | 'lock' | 'chevron' | 'headphones' | 'hand';
export default function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    hand: <path d="M8 13V4a2 2 0 0 1 4 0v7l2-1 2 1 2-1 3 2v5q0 5-5 5h-3q-3 0-5-3l-4-5a2 2 0 0 1 3-2l3 3" />,
    home: <><path d="m3 10 9-7 9 7v10H3Z" /><path d="M9 20v-7h6v7" /></>,
    book: <><path d="M12 5v16M12 6Q7 2 2 4v15q5-2 10 2 5-4 10-2V4q-5-2-10 2Z" /></>,
    grownups: <><circle cx="9" cy="7" r="3" /><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 3q4 1 4 7" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    back: <path d="M20 12H4m6-6-6 6 6 6" />,
    play: <path d="m8 4 12 8-12 8Z" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    sound: <><path d="m11 4-6 5H2v6h3l6 5ZM15 8q5 4 0 8m3-12q9 8 0 16" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    check: <path d="m4 12 5 5L20 6" />,
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" />,
    download: <><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M12 6v9m-4-4 4 4 4-4M10 19h4" /></>,
    leaf: <><path d="M20 3C5 1 1 10 6 17c8 7 16-2 14-14ZM4 21 16 8" /></>,
    pencil: <path d="m4 16-1 5 5-1L20 8l-4-4ZM13 7l4 4" />,
    redo: <><path d="M4 9a8 8 0 1 1 0 7M4 3v6h6" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V6a4 4 0 0 1 8 0v4" /></>,
    chevron: <path d="m9 5 7 7-7 7" />,
    headphones: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><rect x="2" y="12" width="5" height="9" rx="2" /><rect x="17" y="12" width="5" height="9" rx="2" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
