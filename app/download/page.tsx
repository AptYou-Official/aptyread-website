import type { Metadata } from "next";
import Image from "next/image";
import SupportShell from "@/components/public/SupportShell";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import { softwareApplicationJsonLd } from "@/lib/schema";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import "./download.css";

const title = "Download AptyRead | 9 Free Reading Lessons";
const description = "Download AptyRead for Android and iPhone. Interactive English reading for ages 4–10, with 9 free lessons and a first story. First 4 lessons need no account.";
const pageUrl = "https://www.aptyread.ai/download";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, siteName: "AptyRead", type: "website", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
};

function Check() {
  return <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m4 10 4 4 8-8" /></svg>;
}

function Arrow() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function DownloadPage() {
  return (
    <SupportShell currentPage="download" className="apty-download-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd(pageUrl)).replace(/</g, "\\u003c") }} />
      <section className="download-page-hero support-wrap" aria-labelledby="download-page-title">
        <div className="download-page-copy">
          <p className="support-eyebrow">English literacy for ages 4–10</p>
          <h1 id="download-page-title">A reading journey.<br /><span>Start it together.</span></h1>
          <p className="download-page-intro">Download AptyRead for Android and iPhone. Help your child build words and discover their meaning, from Lesson 1.</p>
          <p className="download-page-offer">Explore 9 lessons free, including your child’s first story.</p>
          <div className="download-page-stores">
            <PlayStoreLink platform="android" aria-label="Download AptyRead on Google Play"><Image src="/homepage/store-google.png" width={188} height={56} alt="Get it on Google Play" unoptimized /></PlayStoreLink>
            <PlayStoreLink platform="ios" aria-label="Download AptyRead on the App Store"><Image src="/homepage/store-apple.svg" width={168} height={56} alt="Download on the App Store" unoptimized /></PlayStoreLink>
          </div>
          <p className="download-page-access">First 4 lessons need no account. Create a free parent account to continue through Lesson 9.</p>
          <div className="download-page-reassurance"><span><Check />No advertisements</span><span><Check />No recurring subscription</span></div>
        </div>
        <figure className="download-page-preview">
          <div className="download-page-screens">
            <Image className="download-page-word-screen" src="/homepage/app-words.webp" width={660} height={1434} alt="Build and read sat in AptyRead Lesson 1" priority unoptimized />
            <Image className="download-page-story-screen" src="/homepage/app-first-story.webp" width={660} height={1434} alt="Pat sat, a page from the Pat and Pip story in Lesson 9" priority unoptimized />
          </div>
          <figcaption>Actual app screens · Build a word. Read a story.</figcaption>
        </figure>
      </section>
      <section className="download-page-learning" aria-labelledby="download-learning-title">
        <div className="support-wrap">
          <div className="download-page-section-heading"><p className="support-eyebrow">Listen. Build. Understand.</p><h2 id="download-learning-title">Little steps.<br />More to discover.</h2></div>
          <div className="download-page-features">
            <div><span>01</span><h3>One step builds on another.</h3><p>Five progressive levels form a structured journey. Lessons open in order, bringing earlier learning into each new step.</p></div>
            <div><span>02</span><h3>Your child takes part.</h3><p>Listen, choose letters, build words and explore their meanings. Interactive activities give your child a turn throughout.</p></div>
            <div><span>03</span><h3>First words become a story.</h3><p>Meet <em>Pat and Pip</em> in Lesson 9. Earned books in My library are there to enjoy together again.</p></div>
          </div>
        </div>
      </section>
      <aside className="download-page-next support-wrap" aria-labelledby="download-next-title">
        <Image src="/homepage/apty-mascot.webp" width={120} height={120} alt="" unoptimized />
        <div>
          <h2 id="download-next-title">A clear choice when you’re ready.</h2>
          <p>From Lesson 10, continue with a one-time level purchase in the app. Levels are bought separately, with no expiry or recurring subscription. Your store shows the price before you buy.</p>
          <div className="download-page-stores">
            <PlayStoreLink platform="android" aria-label="Download AptyRead on Google Play"><Image src="/homepage/store-google.png" width={188} height={56} alt="Get it on Google Play" unoptimized /></PlayStoreLink>
            <PlayStoreLink platform="ios" aria-label="Download AptyRead on the App Store"><Image src="/homepage/store-apple.svg" width={168} height={56} alt="Download on the App Store" unoptimized /></PlayStoreLink>
          </div>
          <a className="download-page-help" href="/faq">Questions before you start? <Arrow /></a>
        </div>
      </aside>
    </SupportShell>
  );
}
