/* eslint-disable @next/next/no-img-element -- Preserve the approved app screenshot. */
import SupportShell from "@/components/public/SupportShell";
import { GuideArrow, GuideBreadcrumb, GuideCta, GuideSchema, GuideWordExample } from "@/components/public/ReadingGuideShared";
import { guideArticles, guideArticleUrl, guideMetadata, GUIDE_ORIGIN } from "@/lib/reading-guide";
import "./reading-guide.css";

export const metadata = guideMetadata("Reading Guide for Parents | AptyRead", "Practical ways to help your child read English and understand it. Explore letter sounds, blending, word meaning and shared stories, with activities to try at home.", "/reading-guide");

const cards = [
  { slug: "child-knows-alphabet-but-cant-read", title: "They know the alphabet. What comes next?", description: "Help familiar letters become sounds your child can use in words." },
  { slug: "how-to-teach-letter-sounds", title: "How can we practise letter sounds?", description: "A few sounds, clear examples and simple activities with paper cards." },
  { slug: "how-to-teach-child-to-blend-sounds", title: "How do sounds become a word?", description: "Model blending, take a turn together and bring the word to life." },
  { slug: "knows-letter-sounds-but-cant-read-words", title: "They know the sounds, but the word is hard.", description: "Notice the sticking point and choose the help your child needs next." },
  { slug: "child-reads-words-but-struggles-with-sentences", title: "They read the words. Do they understand?", description: "Bring a sentence together and explore what it tells you." },
  { slug: "how-to-help-child-who-struggles-with-reading", title: "What if reading feels difficult?", description: "Make practice calmer and find a next step with your child’s teacher." },
];

export default function ReadingGuidePage() {
  return <SupportShell currentPage="reading-guide" className="reading-guide-page">
    <GuideSchema data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Reading Guide for Parents", description: "Practical guidance on English reading, word meaning and shared stories for families.", url: `${GUIDE_ORIGIN}/reading-guide`, dateModified: "2026-11-08", mainEntity: { "@type": "ItemList", itemListElement: [...guideArticles.map((article) => ({ name: article.title, url: `${GUIDE_ORIGIN}${guideArticleUrl(article.slug)}` })), { name: "The AptyRead five-level reading journey", url: `${GUIDE_ORIGIN}/reading-guide/the-aptyread-path` }].map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) } }} />
    <div className="support-wrap">
      <GuideBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Reading guide", href: "/reading-guide" }]} />
      <section className="guide-hub-hero" aria-labelledby="guide-hero-title">
        <div><p className="support-eyebrow">The reading guide · For parents</p><h1 id="guide-hero-title">Little words.<br /><span>Big discoveries.</span></h1><p className="guide-intro">Help your child read English and make sense of it. Simple ideas for the sounds, words and stories you explore together.</p><a className="guide-text-link" href="#parent-questions">Find your next small step <GuideArrow /></a></div>
        <GuideWordExample example={{ label: "A word to read. An idea to explore.", tiles: ["s", "a", "t"], word: "sat", meaning: "A little word you can bring to life.", prompt: "After reading sat together, sit a favourite toy on a chair. Talk about what the toy did." }} />
      </section>
      <section className="guide-question-section" id="parent-questions" aria-labelledby="parent-questions-title"><div className="guide-section-heading"><div><p className="support-eyebrow">Start where your child is</p><h2 id="parent-questions-title">A familiar question.<br />A useful next step.</h2></div><p>You do not need all the answers. Choose what you are noticing, and try one small idea together.</p></div>
        <div className="guide-question-grid">{cards.map((card, index) => <a className="guide-question-card" key={card.slug} href={guideArticleUrl(card.slug)}><span className="guide-card-number">0{index + 1}</span><div><h3>{card.title}</h3><p>{card.description}</p><span className="guide-card-meta">4 min read <GuideArrow /></span></div></a>)}</div>
      </section>
    </div>
    <section className="guide-home-moments"><div className="support-wrap"><div className="guide-section-heading"><div><p className="support-eyebrow">Beyond the practice</p><h2>Make room for meaning.</h2></div><p>Reading has a place in the little conversations you already share.</p></div><div className="guide-moments-grid"><div><span>01</span><h3>Talk about a word.</h3><p>Point, draw or act it out. If an English word is new, explain it in a language your child knows, then connect it back to the word.</p></div><div><span>02</span><h3>Keep sharing stories.</h3><p>Read aloud while your child listens and joins in. They can enjoy a wonderful story long before they can read every word themselves.</p></div><div><span>03</span><h3>Stay on the same team.</h3><p>Ask their teacher which sounds or books to practise. Share what you notice at home, and choose a manageable next step together.</p></div></div><a className="guide-text-link" href={guideArticleUrl("child-reads-words-but-struggles-with-sentences")}>Explore words and understanding <GuideArrow /></a></div></section>
    <section className="guide-hub-path support-wrap" aria-labelledby="guide-path-title">
      <figure className="guide-story-figure"><img src="/homepage/app-first-story.webp" alt="Pat sat, a page from the AptyRead story Pat and Pip" width="270" height="600" loading="lazy" /><figcaption>Pat and Pip · Your child’s first story in Lesson 9</figcaption></figure>
      <div><p className="support-eyebrow">AptyRead English Reading Program</p><h2 id="guide-path-title">One small step.<br />Then another.</h2><p>Step-by-step learning for ages 4–10, in the AptyRead app. Children begin with letters and sounds, and build simple words from Lesson 1.</p><p>Five progressive levels connect first words with sentences, stories and reading with understanding.</p><a className="guide-text-link" href="/reading-guide/the-aptyread-path">Explore the five-level journey <GuideArrow /></a></div>
    </section>
    <div className="guide-editorial-note support-wrap"><p>Written by the <a href="/about">AptyRead team</a>. Our guides bring together practical home activities and published reading guidance. You will find sources and further reading in each article.</p><a href="/contact" className="guide-text-link">Have a question? We’re here <GuideArrow /></a></div>
    <GuideCta />
  </SupportShell>;
}
