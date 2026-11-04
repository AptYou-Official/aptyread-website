import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import SiteFooter from "@/components/public/SiteFooter";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import "./about.css";

const title = "About AptyRead | Every Child Reads";
const description =
  "Why we created AptyRead: a structured English literacy journey for children aged 4 to 10, with reading, meaning and support for the grown-ups beside them.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.aptyread.ai/about" },
  openGraph: {
    title,
    description,
    url: "https://www.aptyread.ai/about",
    siteName: "AptyRead",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageUrl],
  },
};

function Wordmark() {
  return (
    <Link className="about-wordmark" href="/" prefetch={false} aria-label="AptyRead home">
      <span>Apty</span><span>Read</span>
    </Link>
  );
}

function ReadingArrow() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="apty-about">
      <a className="about-skip" href="#about-main">Skip to content</a>
      <header className="about-header">
        <div className="about-nav">
          <Wordmark />
          <nav aria-label="Main navigation">
            <Link href="/" prefetch={false}>Home</Link>
            <Link href="/#how-it-works" prefetch={false}>How it works</Link>
            <a href="/about" aria-current="page">About us</a>
          </nav>
          <a className="about-button" href="#about-get-the-app">Start learning free</a>
        </div>
      </header>

      <main id="about-main">
        <section className="about-hero about-wrap" aria-labelledby="about-title">
          <p className="about-eyebrow">About AptyRead · Our mission</p>
          <h1 id="about-title">Every Child <span>Reads.</span></h1>
          <p className="about-hero-lead">Helping children read English.<br />And understand what they read.</p>
          <p className="about-hero-note">For children aged 4 to 10. For the grown-ups beside them.</p>
        </section>

        <section className="about-origin about-wrap" aria-labelledby="about-origin-title">
          <div>
            <p className="about-eyebrow">Why we began</p>
            <h2 id="about-origin-title">It began<br />with listening.</h2>
          </div>
          <div className="about-origin-copy">
            <p>AptyRead began by listening to families whose children needed support learning to read English. Those conversations shaped a simple purpose: to make a clear, structured reading journey easier for families to access.</p>
            <p>Parents and teachers bring care, encouragement and understanding to a child’s learning. AptyRead supports that shared effort with interactive practice for children and guidance for the grown-ups beside them.</p>
            <p className="about-signature">The AptyRead team</p>
          </div>
        </section>

        <section className="about-meaning" aria-labelledby="about-meaning-title">
          <div className="about-wrap about-meaning-grid">
            <figure className="about-story">
              <div className="about-story-frame">
                <Image
                  src="/homepage/app-first-story.webp"
                  alt="Pat sat. An illustrated page from Pat and Pip, the first AptyRead story."
                  width={660}
                  height={1434}
                  sizes="(max-width: 600px) 206px, 226px"
                  unoptimized
                />
              </div>
              <figcaption>Little words. A story to understand.<span>An actual screen from AptyRead</span></figcaption>
            </figure>
            <div className="about-meaning-copy">
              <p className="about-eyebrow">Why understanding matters</p>
              <h2 id="about-meaning-title">Reading brings<br /><span>meaning.</span></h2>
              <p>A story to enjoy. Instructions to follow. A new idea to explore. Reading with understanding helps children make sense of the words around them.</p>
              <p>From Lesson 1, children use the sounds they learn to build words and explore what those words mean.</p>
              <div className="about-reading-path" role="group" aria-label="Sounds, words and meaning grow together">
                <span>Sounds</span><ReadingArrow /><span>Words</span><ReadingArrow /><span>Meaning</span>
              </div>
              <p>Five progressive levels give the journey its structure. Each lesson builds on earlier learning, with opportunities to practise and return to familiar words and stories.</p>
              <Link className="about-text-link" href="/#learning-journey" prefetch={false}>Explore the learning journey <ReadingArrow /></Link>
            </div>
          </div>
        </section>

        <section className="about-start about-wrap" id="about-get-the-app" aria-labelledby="about-start-title">
          <div className="about-start-card">
            <Image className="about-mascot" src="/homepage/apty-mascot.webp" alt="Apty, your reading companion" width={120} height={120} unoptimized />
            <p className="about-eyebrow">A little time together. A place to begin.</p>
            <h2 id="about-start-title">Make a start together.</h2>
            <p className="about-start-copy">Explore a lesson with your child. Listen, build a word<br className="about-desktop-break" /> and enjoy the little discoveries together.</p>
            <p className="about-platforms">Download for Android and iPhone.</p>
            <div className="about-store-links">
              <PlayStoreLink platform="android" aria-label="Get AptyRead on Google Play">
                <Image src="/homepage/store-google.png" alt="Get it on Google Play" width={188} height={56} unoptimized />
              </PlayStoreLink>
              <PlayStoreLink platform="ios" aria-label="Download AptyRead on the App Store">
                <Image src="/homepage/store-apple.svg" alt="Download on the App Store" width={168} height={56} unoptimized />
              </PlayStoreLink>
            </div>
            <p className="about-free-offer">9 free lessons, including your child’s first AptyRead story.</p>
            <p className="about-access">First 4 without an account. A free parent account lets you continue through Lesson 9.</p>
            <p className="about-reassurance">No advertisements. No recurring subscription.</p>
          </div>
          <p className="about-company">Created by AptYou Services Pvt Ltd.<br /><a href="mailto:support@aptyread.ai">A question about your child’s first steps? We’re here to help.</a></p>
        </section>
      </main>

      <SiteFooter currentPage="about" />
    </div>
  );
}
