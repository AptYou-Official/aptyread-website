import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SupportShell from "@/components/public/SupportShell";
import {
  GuideArrow,
  GuideBreadcrumb,
  GuideByline,
  GuideCta,
  GuideSchema,
} from "@/components/public/ReadingGuideShared";
import { ALPHABET_ARTICLE_URL, PATH_LEVELS } from "@/lib/reading-path";
import { socialImageFor } from "@/lib/site-metadata";
import "@/app/reading-guide/reading-guide.css";

const pageUrl = "https://www.aptyread.ai/reading-guide/the-aptyread-path";
const pathImage = socialImageFor("the-aptyread-path", "From first sounds. To reading with meaning. AptyRead's five-level journey.");
const description =
  "Explore AptyRead's five-level English literacy journey for ages 4 to 10. Sounds, word building and meaning begin in Lesson 1, with stories from Level 1.";

export const metadata: Metadata = {
  title: "The AptyRead Five-Level Reading Path | AptyRead",
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "The AptyRead Five-Level Reading Path",
    description,
    url: pageUrl,
    siteName: "AptyRead",
    type: "website",
    images: [pathImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The AptyRead Five-Level Reading Path",
    description,
    images: [pathImage.url],
  },
};

export default function AptyReadPathPage() {
  return (
    <SupportShell currentPage="reading-guide" className="reading-guide-page">
      <GuideSchema
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: "The AptyRead Five-Level Reading Path",
          description,
          inLanguage: "en",
          dateModified: "2026-11-03",
          publisher: {
            "@type": "Organization",
            name: "AptYou Services Pvt Ltd",
            url: "https://www.aptyread.ai",
          },
        }}
      />
      <article className="support-wrap">
        <GuideBreadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/reading-guide", label: "Reading Guide" },
            { label: "The AptyRead path" },
          ]}
        />

        <header className="guide-page-header">
          <p className="support-eyebrow">Five levels. One connected journey.</p>
          <h1>From first sounds.<br />To reading with meaning.</h1>
          <p className="guide-intro">
            AptyRead brings sounds, words and understanding together from the
            beginning. Each step gives your child something to use in the next.
          </p>
          <GuideByline minutes={3} />
        </header>

        <section className="guide-path-intro" aria-labelledby="reading-begins-heading">
          <div className="guide-section-heading">
            <p className="support-eyebrow">Reading begins in Lesson 1</p>
            <h2 id="reading-begins-heading">A few sounds.<br />Their first words.</h2>
            <p>
              Your child does not need to learn every letter before reading a
              word. In Lesson 1, they meet <strong>s, a and t</strong>, then build
              and read <strong>at</strong> and <strong>sat</strong> with the
              app&apos;s help.
            </p>
            <p>
              The words have meaning, too. Children listen, choose, build and
              explore what happens. By Lesson 9, those early sounds lead to
              <em> Pat and Pip</em>, their first little story.
            </p>
            <p>
              This is the pattern throughout the journey: learn something,
              put it into practice, and return to it in a new context.
            </p>
          </div>
          <figure className="guide-path-screen">
            <Image
              src="/homepage/app-first-story.webp"
              alt="Pat sat. An illustrated page from Pat and Pip, the first AptyRead story."
              width={660}
              height={1434}
              sizes="(max-width: 700px) 240px, 270px"
            />
            <figcaption>Pat and Pip. The first story, in Lesson 9.</figcaption>
          </figure>
        </section>

        <section className="guide-path-levels" aria-labelledby="path-levels-heading">
          <div className="guide-section-heading">
            <p className="support-eyebrow">The five-level path</p>
            <h2 id="path-levels-heading">More to read.<br />More to understand.</h2>
            <p>
              These are the teaching focuses of the five levels. Reading,
              vocabulary and meaning grow together throughout.
            </p>
          </div>
          {PATH_LEVELS.map((level) => (
            <article className="guide-level" key={level.id}>
              <span className="guide-level-number" aria-label={`Level ${level.number}`}>
                {level.id}
              </span>
              <div className="guide-level-copy">
                <h3>{level.name}</h3>
                <p>{level.outcome}</p>
              </div>
            </article>
          ))}
        </section>

        <aside className="guide-parent-note">
          <h2>A clear route, at your child&apos;s pace.</h2>
          <p>
            Every reader begins at Level 1. Lessons open in order as required
            activities are completed. Finished lessons, collected words and
            earned books are there to enjoy again.
          </p>
          <p>
            Completing an activity records participation. It does not mean every
            word is fluent yet. A little replay, a clearer model or another
            reading together can be part of moving forward.
          </p>
        </aside>

        <section aria-labelledby="alongside-heading">
          <div className="guide-section-heading">
            <p className="support-eyebrow">Your part in the journey</p>
            <h2 id="alongside-heading">Be close. Be curious.</h2>
          </div>
          <div className="guide-path-practice">
            <div>
              <h3>Let them have a turn.</h3>
              <p>
                Give your child time to look, listen and respond. Replay the
                model when helpful, without turning practice into a test.
              </p>
            </div>
            <div>
              <h3>Talk about the meaning.</h3>
              <p>
                Ask what happened, act out a word, or find something similar
                nearby. You can talk in the language your family knows best.
              </p>
            </div>
            <div>
              <h3>Keep it comfortable.</h3>
              <p>
                Pause when your child needs a break. Writing is optional, and
                grown-up guidance is available in English, Hindi and Malayalam.
              </p>
            </div>
          </div>
          <Link className="guide-text-link" href={ALPHABET_ARTICLE_URL}>
            Knows the alphabet, but not yet reading? <GuideArrow />
          </Link>
        </section>
      </article>
      <GuideCta />
    </SupportShell>
  );
}
