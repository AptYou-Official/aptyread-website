import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MakeSatLauncher from "@/components/public/MakeSatLauncher";
import UAEStoreActions from "@/components/public/UAEStoreActions";
import SiteFooter from "@/components/public/SiteFooter";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import styles from "./uae.module.css";

const title = "English Reading for Kids in the UAE | AptyRead";
const description = "Help your child connect sounds, words and meaning. Ages 4–10. Try 9 lessons free. Level 1 is AED 109.99 on Google Play in the UAE, with a one-time purchase.";
const pageUrl = "https://www.aptyread.ai/uae";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, siteName: "AptyRead", locale: "en_AE", type: "website", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
};

function Arrow({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function Check() {
  return <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>;
}

const questions = [
  {
    question: "Is this the right starting point for my child?",
    answer: "AptyRead is for children aged 4–10 beginning to read English, including those who know letters but need help joining sounds into words. Every reader begins at Lesson 1. Your child does not need to know the alphabet first. Explore the free lessons together to see how they respond.",
  },
  {
    question: "Exactly what is free, and when do we pay?",
    answer: "Lessons 1–4 need no account. Create a free parent account to continue through Lesson 9, including the first story, Pat and Pip. To continue from Lesson 10, purchase Level 1 in the app. You can also buy earlier after registering. The purchase gives access to all 40 Level 1 lessons, including the nine free lessons; lessons still open in order.",
  },
  {
    question: "Is AED 109.99 the price on both stores?",
    answer: "AED 109.99 is the Level 1 price on Google Play for the UAE. The Apple App Store price may differ; check the local price in the app before buying. Each level is a separate one-time purchase with no recurring subscription or scheduled expiry. Your store’s payment sheet shows the final price before you confirm.",
  },
  {
    question: "Can my children share one purchase?",
    answer: "Yes. Up to three reader profiles on one parent account share each purchased level. Each child has their own progress and follows the lessons in order. Completed lessons, collected words and earned books can be revisited. New levels are separate purchases.",
  },
  {
    question: "How much help will I need to give?",
    answer: "Stay nearby for younger children and help them listen, try and talk about meaning. Grown-up guidance is available in English, Hindi and Malayalam; reading activities are in English. Start with a short session and pause when your child needs a break. Speaking practice is not recorded or graded, and activity completion is not a measure of reading fluency.",
  },
];

export default function UAEPage() {
  return (
    <div className={styles.page} lang="en-AE">
      <a className={styles.skipLink} href="#uae-main">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/" prefetch={false} className={styles.wordmark} aria-label="AptyRead home"><span>Apty</span><span>Read</span></Link>
          <nav className={styles.navLinks} aria-label="Page navigation">
            <a href="#how-it-works">See how it works</a>
            <a href="#start">Level 1 &amp; price</a>
          </nav>
          <a className={styles.navAction} href="#start">Try 9 lessons free <Arrow /></a>
        </div>
      </header>

      <main id="uae-main">
        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="uae-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.dot} /> For families in the UAE · Ages 4–10</p>
            <h1 id="uae-title">From knowing letters.<br /><span>To reading words.</span></h1>
            <p className={styles.heroIntro}>Help your child connect letter sounds, build English words and discover what they mean.</p>
            <p className={styles.heroDetail}>A step-by-step reading programme in the AptyRead app, for children beginning to read or finding it hard to put sounds together.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#start">Explore 9 lessons free <Arrow /></a>
              <a className={styles.textLink} href="#how-it-works">See a first word come together <Arrow /></a>
            </div>
            <p className={styles.heroFreeDetail}>First 4 lessons without an account.</p>
            <div className={styles.heroPrice}>
              <span className={styles.heroPriceLabel}>Then continue with Level 1</span>
              <p><strong>AED 109.99</strong><span>one time · Google Play UAE</span></p>
              <span className={styles.appleNote}>iPhone and iPad: local App Store price may differ.</span>
            </div>
          </div>

          <figure className={styles.heroVisual}>
            <div className={styles.visualBackdrop} />
            <div className={styles.screenOne}>
              <span className={styles.screenLabel}>LESSON 1</span>
              <Image src="/homepage/app-words-480.webp" width={480} height={1043} alt="In Lesson 1, children join s, a and t to read sat" priority unoptimized />
              <p>A word they build.</p>
            </div>
            <span className={styles.betweenScreens} aria-hidden="true"><Arrow /></span>
            <div className={styles.screenTwo}>
              <span className={styles.screenLabel}>LESSON 9</span>
              <Image src="/homepage/app-first-story-480.webp" width={480} height={1043} alt="Pat sat, a page in Pat and Pip, the first story in Lesson 9" priority unoptimized />
              <p>A story to read.</p>
            </div>
            <figcaption>Actual AptyRead app screens</figcaption>
          </figure>
        </section>

        <div className={styles.assurance} aria-label="Family purchase benefits">
          <div className={styles.wrap}>
            <span><Check /> One-time level purchase</span>
            <span><Check /> Up to three readers</span>
            <span><Check /> No advertisements</span>
          </div>
        </div>

        <section id="how-it-works" className={`${styles.wrap} ${styles.learning}`} aria-labelledby="learning-title">
          <div className={styles.learningHeading}>
            <div><p className={styles.eyebrow}>A little look inside Lesson 1</p><h2 id="learning-title">A word to make.<br />A meaning to discover.</h2></div>
            <p>Your child takes a turn throughout. Listen, choose letters, practise reading and explore what happens.</p>
          </div>
          <ol className={styles.learningSteps}>
            <li>
              <div className={styles.stepTop}><span>01</span><div className={styles.letterTiles} aria-hidden="true"><i>s</i><i>a</i><i>t</i></div></div>
              <h3>Build.</h3><p>Learn the sounds for <em>s</em>, <em>a</em> and <em>t</em>. Put the letters together to make a word.</p>
            </li>
            <li>
              <div className={styles.stepTop}><span>02</span><span className={styles.blendWord} aria-hidden="true">sat<svg viewBox="0 0 100 16" fill="none"><path d="M3 3c25 13 65 13 92 0m-8 0h8v8" /></svg></span></div>
              <h3>Read.</h3><p>Listen as the sounds come together. Then give your child time to try reading the word aloud.</p>
            </li>
            <li>
              <div className={styles.stepTop}><span>03</span><span className={styles.meaningWord} aria-hidden="true">sat<span>an action to explore</span></span></div>
              <h3>Understand.</h3><p>See what <em>sat</em> means. Connect the word with an action, then choose the matching picture.</p>
            </li>
          </ol>
          <div className={styles.demoInvitation}>
            <div><p>Try those little steps yourself.</p><span>A short activity preview. No account needed.</span></div>
            <MakeSatLauncher />
          </div>
        </section>

        <section id="start" className={`${styles.wrap} ${styles.offer}`} aria-labelledby="offer-title">
          <div className={styles.offerCopy}>
            <p className={styles.eyebrow}>The complete Level 1 journey</p>
            <h2 id="offer-title">First sounds.<br />First words.<br /><span>Seven little stories.</span></h2>
            <p>Give those first discoveries somewhere to go. A connected sequence brings new sounds into words, activities and stories, with familiar learning to return to.</p>
            <dl className={styles.courseFacts}>
              <div><dt>40</dt><dd>lessons in total<br /><span>including the 9 free lessons</span></dd></div>
              <div><dt>7</dt><dd>story lessons<br /><span>including Pat and Pip</span></dd></div>
              <div><dt>3</dt><dd>reader profiles<br /><span>each with separate progress</span></dd></div>
            </dl>
            <p className={styles.offerSmall}>Optional letter writing. Collected words and earned books in My library. Completed lessons to enjoy again.</p>
          </div>
          <div className={styles.pricePanel}>
            <div className={styles.pricePanelTop}><span>LEVEL 1 · FAMILY ACCESS</span><span className={styles.storeRegion}>UAE</span></div>
            <p className={styles.price}><span>AED</span> 109.99</p>
            <p className={styles.pricePlatform}>One-time purchase on Google Play in the UAE</p>
            <ul className={styles.priceBenefits}>
              <li><Check /> Share the level with up to three readers</li>
              <li><Check /> No expiry or recurring subscription</li>
              <li><Check /> Purchase securely inside the app</li>
            </ul>
            <p className={styles.applePrice}><strong>Using an iPhone or iPad?</strong> Your local App Store price may differ. The app shows the price before you buy.</p>
            <div className={styles.freeStart}>
              <h3>Begin with 9 free lessons.</h3>
              <p>Lessons 1–4 need no account. A free parent account adds Lessons 5–9. Purchase Level 1 to continue from Lesson 10.</p>
            </div>
            <UAEStoreActions placement="offer" className={styles.storeActions} />
            <p className={styles.paymentNote}>Download the app, then start Lesson 1.<br />Each level is purchased separately. Your store confirms the final price.</p>
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.parentSupport}`} aria-labelledby="parent-title">
          <Image src="/homepage/apty-mascot.webp" width={180} height={180} alt="" unoptimized />
          <div><p className={styles.eyebrow}>A little help for the grown-ups</p><h2 id="parent-title">You can learn alongside them.</h2><p>Activity guidance explains what your child is trying and how you can help, in <strong>English, Hindi and Malayalam.</strong> The reading activities stay in English.</p></div>
          <a className={styles.textLink} href="/reading-guide">Explore the parent guide <Arrow /></a>
        </section>

        <section className={`${styles.wrap} ${styles.faq}`} aria-labelledby="faq-title">
          <div className={styles.faqHeading}><p className={styles.eyebrow}>Before you begin</p><h2 id="faq-title">A few things<br />parents ask.</h2><p>Something else on your mind?</p><a className={styles.textLink} href="/contact">Talk to us <Arrow /></a></div>
          <div className={styles.questions}>
            {questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.closing}`} aria-label="Start learning together">
          <p>One small word is a place to begin.</p>
          <a className={styles.primaryButton} href="#start">Explore 9 lessons free <Arrow /></a>
        </section>
      </main>
      <SiteFooter currentPage="uae" />
    </div>
  );
}
