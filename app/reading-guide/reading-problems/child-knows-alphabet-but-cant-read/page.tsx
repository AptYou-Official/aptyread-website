import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import { PATH_URL } from "@/lib/reading-path";

const canonical =
  "https://www.aptyread.ai/reading-guide/reading-problems/child-knows-alphabet-but-cant-read";

export const metadata: Metadata = {
  title: "My Child Knows the Alphabet but Can't Read | AptyRead",
  description:
    "Knowing A, B, C is not the same as reading. Learn why letter sounds matter, how blending works, and why every child starts with Sound Foundations.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "My Child Knows the Alphabet but Can't Read",
    description:
      "Letter names are not reading. Here is what to do when your child knows the alphabet but still cannot read words.",
    url: canonical,
    siteName: "AptyRead",
    type: "article",
  },
};

export default function AlphabetButCantReadArticle() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "My Child Knows the Alphabet but Can't Read. What Should I Do?",
    description:
      "Knowing letter names is not the same as reading words. Why letter sounds and blending matter, and how a sequential path starts with Sound Foundations.",
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
                  { label: "Alphabet but can't read" },
                ]}
              />

              <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
                Reading Problems
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-5 leading-tight">
                My child knows the alphabet but can&apos;t read. What should I
                do?
              </h1>

              <div className="rounded-2xl border border-apty-coral-accent bg-white p-5 md:p-6 mb-10">
                <p className="text-sm font-semibold text-apty-coral mb-2">
                  The short answer
                </p>
                <p className="text-base md:text-lg text-apty-dark leading-relaxed">
                  Teach letter sounds, not only letter names. Then teach blending
                  those sounds into words. Knowing A, B, C is not reading. Start
                  with foundations — even if the alphabet already feels
                  &ldquo;done.&rdquo;
                </p>
              </div>

              <div className="space-y-6 text-base md:text-lg text-apty-dark leading-relaxed">
                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    Knowing letter names is not the same as reading words
                  </h2>
                  <p>
                    Many children can recite the alphabet and still cannot read{" "}
                    <span className="font-semibold">sat</span> or{" "}
                    <span className="font-semibold">map</span>. That is common. It
                    is not a failure. Letter names and reading are different
                    skills.
                  </p>
                  <p className="mt-4">
                    The name of the letter is &ldquo;A.&rdquo; The sound used for
                    reading is closer to /a/. Reading needs the sound.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    Why letter sounds matter
                  </h2>
                  <p>
                    Written English is a code. Children crack the code when they
                    connect letters to sounds, then put those sounds together.
                    Without that, they guess from pictures, memorize a few words,
                    and stall when the page gets harder.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    Connect sounds to letters, then blend
                  </h2>
                  <p>
                    First: clear sounds for letters. Short and pure — /s/, /a/,
                    /t/ — not &ldquo;suh,&rdquo; &ldquo;ay,&rdquo; &ldquo;tee.&rdquo;
                  </p>
                  <p className="mt-4">
                    Next: blending. Say the sounds in order and hold them into a
                    word: /s/ /a/ /t/ → <span className="font-semibold">sat</span>.
                    This takes practice. It is the bridge from knowing letters to
                    reading words.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    Try this with your child
                  </h2>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Point to a letter. Ask for the sound, not the name.</li>
                    <li>
                      Pick three known sounds. Stretch them slowly, then say the
                      word.
                    </li>
                    <li>
                      Keep it short. A few minutes of clear practice beats a long,
                      tired session.
                    </li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    What often slows progress
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Asking only for letter names</li>
                    <li>Encouraging guessing from pictures</li>
                    <li>Jumping to storybooks before sounds are firm</li>
                    <li>Long sessions that end in frustration</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    When to move beyond the foundations
                  </h2>
                  <p>
                    When sounds are clear and simple blending is becoming
                    automatic, first words get easier. Until then, foundations are
                    the work. Rushing ahead looks like progress and creates gaps.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-apty-dark mb-3">
                    How AptyRead starts with Sound Foundations
                  </h2>
                  <p>
                    AptyRead is one path with five levels. Every child starts at
                    Level 1 — Sound Foundations — even if they already know the
                    alphabet. Early lessons can move quickly when a skill is
                    already firm. The path still confirms the foundation before
                    First Reading.
                  </p>
                  <p className="mt-4">
                    See the full sequence on{" "}
                    <Link
                      href={PATH_URL}
                      className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
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
                heading="Start Level 1 — Sound Foundations"
                body="First lessons are free. No account. Sit with them for about fifteen minutes."
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
