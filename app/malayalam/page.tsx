import type { Metadata } from 'next';
import Image from 'next/image';
import { HillScene, Icon, MalayalamBrand } from '@/components/malayalam/Shared';
import InstallApp from '@/components/malayalam/InstallApp';
import { malayalamSocialImage } from '@/lib/malayalam-metadata';

export const metadata: Metadata = {
  title: 'AptyMalayalam — Little steps. A world of words.',
  description: 'Discover a child-led Malayalam literacy programme for Malayalam-speaking beginners, around age five and up. Explore the early learning preview.',
  alternates: { canonical: 'https://www.aptyread.ai/malayalam' },
  openGraph: { title: 'AptyMalayalam — Little steps. A world of words.', description: 'From familiar spoken words to reading Malayalam. Explore our early preview.', url: 'https://www.aptyread.ai/malayalam', siteName: 'AptyMalayalam by AptyRead', type: 'website', images: [malayalamSocialImage] },
  twitter: { card: 'summary_large_image', title: 'AptyMalayalam', description: 'Little steps. A world of Malayalam words.', images: [malayalamSocialImage.url] },
  robots: { index: false, follow: false },
};

const levels = [
  ['01', 'വാക്കുകൾ വായിക്കാം', 'First Words'],
  ['02', 'വാക്കുകളുടെ ലോകം', 'Building Reading Skills'],
  ['03', 'വാക്യങ്ങൾ വായിക്കാം', 'Reading Sentences'],
  ['04', 'കഥകൾ വായിക്കാം', 'Reading Stories'],
  ['05', 'സ്വയം വായിക്കാം, എഴുതാം', 'Independent Reading & Writing'],
];

export default function MalayalamHome() {
  return <>
    <a className="ml-skip" href="#main">Skip to content</a>
    <header className="ml-header"><div className="ml-container ml-header-inner">
      <MalayalamBrand />
      <nav aria-label="Malayalam programme"><a className="ml-nav-detail" href="#approach">How it works</a><a className="ml-nav-detail" href="#journey">The learning journey</a><a className="ml-btn ml-btn-small" href="/malayalam/dashboard">Try the preview <Icon name="arrow" size={18} /></a></nav>
    </div></header>
    <main id="main">
      <section className="ml-hero ml-container">
        <div className="ml-hero-copy">
          <span className="ml-eyebrow"><span /> A FAMILIAR LANGUAGE. A NEW ADVENTURE.</span>
          <h1>So many words<br />they already know.<br /><em>Let’s help them<br className="ml-desktop-break" /> read them.</em></h1>
          <p>Bring the Malayalam your child speaks into the words they can read. One sound, one word, one little discovery at a time.</p>
          <a className="ml-btn ml-btn-large" href="/malayalam/dashboard">Explore AptyMalayalam <Icon name="arrow" size={21} /></a>
          <div className="ml-hero-note"><span><Icon name="check" size={16} /> No sign-up</span><span><Icon name="check" size={16} /> Learn at their pace</span></div>
          <p className="ml-preview-note">An early preview for curious families. Lessons and recordings are being developed.</p>
        </div>
        <div className="ml-hero-art" aria-label="A preview of Malayalam letters becoming a word">
          <div className="ml-art-ring" /><span className="ml-art-spark ml-spark-one">✦</span><span className="ml-art-spark ml-spark-two">✧</span>
          <span className="ml-art-tag" lang="ml">നമുക്ക് വായിക്കാം!</span>
          <div className="ml-word-window">
            <div className="ml-window-bar"><span /><span /><span /><small>A little word. A new discovery.</small></div>
            <div className="ml-word-window-body"><HillScene /><span className="ml-word-result" lang="ml">മല</span><span className="ml-word-gloss">A hill. A word. A beginning.</span><div className="ml-letter-equation" lang="ml"><span>മ</span><b>+</b><span>ല</span><b>→</b><strong>മല</strong></div></div>
          </div>
          <Image className="ml-hero-mascot" src="/images/apty-mascot.png" width={230} height={230} alt="Apty, our friendly blue learning companion" priority />
          <div className="ml-art-caption"><Icon name="leaf" size={18} /> Small steps. Growing confidence.</div>
        </div>
      </section>

      <div className="ml-intro-strip"><div className="ml-container"><span>For Malayalam-speaking beginners</span><i /><span>Around age 5 and up</span><i /><span>Child leads. You can join.</span></div></div>

      <section id="approach" className="ml-section ml-container">
        <div className="ml-section-heading"><span className="ml-eyebrow">MORE THAN KNOWING THE LETTERS</span><h2>The lovely moment when<br />a word starts to make sense.</h2><p>Our aim is simple: help children connect sounds, print and meaning—and gradually read for themselves.</p></div>
        <div className="ml-feature-grid">
          <article><div className="ml-feature-visual ml-listen-visual"><Icon name="sound" size={30} /><span lang="ml">ത</span><span className="ml-sound-wave">)))</span></div><small>01 · HEAR & NOTICE</small><h3>Start with what’s familiar.</h3><p>Connect spoken Malayalam with a few carefully chosen letters. Listen, notice and try.</p></article>
          <article><div className="ml-feature-visual ml-build-visual" lang="ml"><span>ത</span><b>+</b><span>റ</span><b>→</b><strong>തറ</strong></div><small>02 · JOIN & READ</small><h3>Make a word of their own.</h3><p>Bring taught letters together into meaningful words, with support whenever it’s needed.</p></article>
          <article><div className="ml-feature-visual ml-write-visual"><span lang="ml">റ</span><Icon name="pencil" size={35} /></div><small>03 · TRY & EXPLORE</small><h3>Make room for little hands.</h3><p>Watch a writing model, then try on paper or practise on screen. Pause and return when ready.</p></article>
        </div>
      </section>

      <section className="ml-parent-section"><div className="ml-container ml-parent-grid">
        <div className="ml-parent-image"><Image src="/images/parent-child-reading.png" alt="A parent and child sharing a happy moment with a book" width={1672} height={941} sizes="(max-width: 760px) 100vw, 50vw" /><span>Room to try. Someone to cheer.</span></div>
        <div><span className="ml-eyebrow">THEIR DISCOVERY. YOUR DELIGHT.</span><h2>“I can read this!”<br />That’s the moment<br />we’re working towards.</h2><p>You don’t have to become the teacher. The programme is being designed to guide your child through small activities, with replay, gentle help and space to try again.</p><p>Join in when they invite you. Celebrate a new word. Let them lead the next little step.</p><a className="ml-text-link" href="/malayalam/dashboard">Take a look inside <Icon name="arrow" size={20} /></a></div>
      </div></section>

      <section id="journey" className="ml-section ml-container">
        <div className="ml-section-heading"><span className="ml-eyebrow">A LITTLE TODAY. MORE TOMORROW.</span><h2>A path from first words<br />to their own stories.</h2><p>Five planned levels, with reading, understanding and writing growing together. We’re starting with a small Level 1 preview.</p></div>
        <ol className="ml-level-path">{levels.map(([number, ml, en], i) => <li key={number} className={i === 0 ? 'ml-level-current' : ''}><span className="ml-level-number">{number}</span><h3 lang="ml">{ml}</h3><p>{en}</p><small>{i === 0 ? 'Opening preview' : 'Planned'}</small></li>)}</ol>
      </section>

      <section className="ml-faq-section ml-container"><div><span className="ml-eyebrow">A FEW THINGS YOU MAY WONDER</span><h2>Made for children. <br />Thought through <br />for parents.</h2></div><div className="ml-faq-list">
        {[
          ['Who is AptyMalayalam for?', 'The programme is being designed for children who already speak or understand Malayalam and are beginning to read it, often around age five. Older beginners can explore the same foundations. It is not a course for learning spoken Malayalam from scratch.'],
          ['Does my child need to know the alphabet first?', 'No. The proposed opening introduces a few selected forms and joins them into words. It does not require memorising the whole alphabetical sequence before beginning to read.'],
          ['Will I need to sit beside my child?', 'An adult is welcome, but the learning experience is being designed for children to navigate with spoken guidance and demonstrations. This early interface preview does not yet include those recordings, so it cannot yet demonstrate independent learning.'],
          ['What can we try today?', 'You can explore the child dashboard and three opening lesson previews. Formation videos and spoken guidance are placeholders. The full programme is still in development; this preview does not assess your child’s reading.'],
          ['Do we need to download an app or create an account?', 'No download or sign-up is needed for this preview. Your last preview position is saved in this browser when storage is available. It does not sync across devices.'],
        ].map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
      </div></section>

      <section className="ml-last-cta ml-container"><div><span className="ml-eyebrow">LET CURIOSITY TAKE THE FIRST STEP</span><h2>A little word.<br />A whole new world.</h2><p>Come and see the beginning of AptyMalayalam.</p><a className="ml-btn ml-btn-large" href="/malayalam/dashboard">Try the learning preview <Icon name="arrow" /></a><small>No sign-up. No download. Just a first look.</small></div><Image src="/images/apty-mascot.png" width={240} height={240} alt="Apty welcomes you to explore" /></section>
    </main>
    <div className="ml-install-section ml-container"><InstallApp /></div>
    <footer className="ml-footer ml-container"><MalayalamBrand /><p>A little closer to the language they call home.</p><nav aria-label="Footer"><a href="/">AptyRead</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a></nav></footer>
  </>;
}
