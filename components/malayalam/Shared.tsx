import Image from 'next/image';

export function Icon({ name, size = 24 }: { name: 'arrow' | 'play' | 'book' | 'home' | 'sound' | 'pencil' | 'close' | 'check' | 'sun' | 'leaf' | 'floor' | 'head' | 'hill' | 'install'; size?: number }) {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    play: <path d="m9 5 11 7-11 7V5Z" />,
    book: <><path d="M12 5v16M12 6C8 3 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-1-10 2Z" /></>,
    home: <><path d="m3 10 9-7 9 7v11h-7v-7h-4v7H3V10Z" /></>,
    sound: <><path d="m11 4-6 5H2v6h3l6 5V4ZM15 8c3 2 3 6 0 8M18 4c6 5 6 11 0 16" /></>,
    pencil: <><path d="m4 16-1 5 5-1L20 8l-4-4L4 16ZM13 7l4 4" /></>,
    close: <path d="m6 6 12 12M6 18l12-12" />,
    check: <path d="m4 12 5 5L20 6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" /></>,
    leaf: <><path d="M20 3C8 2 1 8 5 16s17 3 15-13ZM5 20 16 8" /></>,
    floor: <><path d="m6 6-4 14h20L18 6H6ZM4 13h16M10 6l-1 14M14 6l1 14" /></>,
    head: <><path d="M5 10C5 0 19 0 19 10c4-1 3 5 0 5-1 9-13 9-14 0-3 0-4-6 0-5Z" /><path d="M8 11h.1M16 11h.1M9 16q3 3 6 0M5 8q5 0 6-4 2 4 8 4" /></>,
    hill: <><path d="m2 21 8-13 4 5 3-9 5 17H2ZM14 13l3 2 3-2" /></>,
    install: <><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M12 6v9m-4-4 4 4 4-4M10 19h4" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function MalayalamBrand({ compact = false }: { compact?: boolean }) {
  return <a href="/malayalam" className={`ml-brand ${compact ? 'ml-brand-compact' : ''}`} aria-label="AptyMalayalam home">
    <Image src="/images/apty-mascot.png" alt="" width={48} height={48} />
    <span><span className="ml-wordmark">Apty<span>Malayalam</span></span><small>by AptyRead</small></span>
  </a>;
}

export function HillScene({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'ml-hill-small' : 'ml-hill'} viewBox="0 0 340 180" role="img" aria-label="A hill beneath the sun">
    <rect width="340" height="180" rx="22" fill="#E6F6FB" />
    <circle cx="266" cy="40" r="19" fill="#F4D677" />
    <path d="M0 150 87 72q11-12 23 1l95 98H0Z" fill="#82C9BE" />
    <path d="m90 180 100-135q12-15 24 0l126 135Z" fill="#3F9E97" />
    <path d="m171 71 19-26q12-15 24 0l23 29-22-7-12 10-14-14Z" fill="#D3EDE5" />
    <path d="M0 163q75-24 148 1t192-2v18H0Z" fill="#246F6D" />
  </svg>;
}
