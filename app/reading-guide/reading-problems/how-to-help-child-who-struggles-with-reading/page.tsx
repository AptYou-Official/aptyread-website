import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import {
  ALPHABET_ARTICLE_URL,
  BLEND_SOUNDS_ARTICLE_URL,
  PATH_URL,
  SOUNDS_CANT_READ_WORDS_ARTICLE_URL,
} from "@/lib/reading-path";

const canonical =
  "https://www.aptyread.ai/reading-guide/reading-problems/how-to-help-child-who-struggles-with-reading";

export const metadata: Metadata = {
  title: "How to Help a Child Who Struggles With Reading | AptyRead",
  description:
    "Is your child struggling to read? Learn how to identify the reading skill they need next and how to support them step by step.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "How to Help a Child Who Struggles With Reading",
    description:
      "When reading is hard, start with the skill your child needs next, not a harder book. Clear steps for parents.",
    url: canonical,
    siteName: "AptyRead",
    type: "article",
  },
};

export default function StrugglesWithReadingArticle() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Help a Child Who Struggles With Reading",
    description:
      "Is your child struggling to read? Learn how to identify the reading skill they need next and how to support them step by step.",
    dateModified: "2026-09-10",
    author: {
      "@type": "Organization",
      name: "AptyRead",
    },
    publisher: {
      "@type": "Organization",
      name: "AptyRead",
      url: "https://www.aptyread.ai",
    },
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <article className="px-4 py-14 md:py-20">
            <div className="container mx-auto max-w-2xl">
              <GuideBreadcrumb
                items={[
                  { href: "/", label: "Home" },
                  { href: "/reading-guide", label: "Reading Guide" },
                  { label: "Help a child who struggles with reading" },
                ]}
              />

              <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">
                How to help a child who struggles with reading
              </h1>

              <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">
                You sit down with a book, and your child struggles with the
                words.
              </p>
              <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">
                Maybe they know some letters. Maybe they know some letter sounds.
                Maybe they can read a few simple words but get stuck when the
                words get harder.
              </p>
              <p className="text-base md:text-lg text-apty-dark mb-12 leading-relaxed">
                You may wonder why reading feels so difficult. The first step is
                not to push them into harder books. It is to understand which
                reading skill they need to work on next.
              </p>

              <div className="space-y-10 text-base md:text-lg text-apty-dark leading-relaxed">
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Start with the skill, not the book
                  </h2>
                  <p>
                    Reading is not one skill that children suddenly learn. It
                    develops step by step.
                  </p>
                  <p className="mt-4 font-semibold">
                    Sounds → Blending → Words → Reading → Independent Reading
                  </p>
                  <p className="mt-4">
                    A child who struggles with reading may have difficulty at one
                    of these steps. For example:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>They know letter names but not the sounds.</li>
                    <li>
                      They know sounds but cannot blend them into words.
                    </li>
                    <li>
                      They can read simple words but struggle with longer ones.
                    </li>
                    <li>
                      They can read words but find sentences slow and difficult.
                    </li>
                    <li>
                      They can read short texts but are not yet comfortable
                      reading independently.
                    </li>
                  </ul>
                  <p className="mt-4">
                    Knowing where the difficulty starts helps you choose what to
                    practice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    If your child knows the alphabet but can&apos;t read
                  </h2>
                  <p>
                    Knowing the alphabet is an important beginning. Letter names
                    alone are not reading.
                  </p>
                  <p className="mt-4">
                    Your child needs to learn the sounds represented by letters
                    and begin connecting those sounds to words. If this is where
                    they are struggling, start with sound foundations.
                  </p>
                  <p className="mt-4">
                    See{" "}
                    <Link
                      href={ALPHABET_ARTICLE_URL}
                      className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                    >
                      My child knows the alphabet but can&apos;t read. What should
                      I do?
                    </Link>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    If your child knows letter sounds but can&apos;t read words
                  </h2>
                  <p>
                    Your child may be able to say /s/ /a/ /t/ but still not
                    recognize{" "}
                    <span className="font-semibold">sat</span>. In that case,
                    blending may be the next skill to strengthen.
                  </p>
                  <p className="mt-4">
                    Start with simple words made from sounds your child already
                    knows. Let them say the sounds and bring them together to read
                    the word.
                  </p>
                  <p className="mt-4">
                    See{" "}
                    <Link
                      href={BLEND_SOUNDS_ARTICLE_URL}
                      className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                    >
                      how to teach a child to blend sounds
                    </Link>
                    , and{" "}
                    <Link
                      href={SOUNDS_CANT_READ_WORDS_ARTICLE_URL}
                      className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                    >
                      My child knows letter sounds but can&apos;t read words
                    </Link>
                    .
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    If your child can read some words but gets stuck on harder
                    ones
                  </h2>
                  <p>
                    As children progress, the words they meet become more complex.
                    They may need to learn blends, letter teams, longer words, and
                    new spelling patterns.
                  </p>
                  <p className="mt-4">
                    Do not assume that a child who can read simple words is ready
                    for every type of text. Build the next skill gradually.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Keep practice short and focused
                  </h2>
                  <p>
                    When a child is struggling, longer practice is not always
                    better.
                  </p>
                  <p className="mt-4">
                    Choose a small number of words or sentences that match the
                    skill they are learning. Let your child try. Give them time.
                    If they make a mistake, help them work through the letters and
                    sounds rather than simply telling them the answer. Then move
                    on.
                  </p>
                  <p className="mt-4">
                    A short, focused practice session can be more useful than a
                    long session that leaves your child frustrated.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Don&apos;t make guessing the main strategy
                  </h2>
                  <p>
                    When a child gets stuck, it is tempting to say: &ldquo;Look at
                    the picture.&rdquo; Or: &ldquo;What word would make sense
                    here?&rdquo;
                  </p>
                  <p className="mt-4">
                    Understanding the story matters. Children also need a reliable
                    way to work out the words themselves. Letters and sounds give
                    them that way.
                  </p>
                  <p className="mt-4">
                    The goal is to help children read words from the print in
                    front of them, rather than depending on pictures, guessing, or
                    remembering every word.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Don&apos;t rush to harder books
                  </h2>
                  <p>
                    A harder book is not necessarily better practice. If the words
                    are beyond what your child has been taught, they may spend
                    more time guessing or becoming frustrated than practicing the
                    skill they need.
                  </p>
                  <p className="mt-4">
                    Choose material that gives your child a chance to succeed
                    while still providing an appropriate challenge. As their
                    skills grow, the reading can become more difficult.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Why AptyRead follows one path
                  </h2>
                  <p>
                    AptyRead is built around a simple idea: reading skills build
                    on one another.
                  </p>
                  <p className="mt-4">
                    Every child starts at Level 1: Sound Foundations. From there,
                    the path moves through Sound Foundations, First Reading,
                    Confident Reading, Building Fluency, and Independent Reading.
                  </p>
                  <p className="mt-4">
                    The sequence is intentional. A child who already knows some
                    skills may move through familiar material quickly.
                    Strengthening the foundation before moving ahead can help
                    reduce gaps later.
                  </p>
                  <p className="mt-4">
                    Five levels. One path. No skipping. No gaps.
                  </p>
                  <p className="mt-4">
                    See{" "}
                    <Link
                      href={PATH_URL}
                      className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                    >
                      the AptyRead Five-Level Path
                    </Link>
                    .
                  </p>
                </section>
              </div>

              <p className="mt-10 text-sm text-apty-gray">
                Updated 10 September 2026 · AptyRead
              </p>

              <GuideCta
                primary="lesson"
                heading="Start at Level 1"
                body="If your child is struggling with reading, don't start by asking how many books they should finish. Ask what they can do now, and where they get stuck. Start with the skill that needs strengthening, then build from there. If you want a structured path from sounds to independent reading, begin with Sound Foundations. First lessons are free. No account. Sit with them for about fifteen minutes."
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
