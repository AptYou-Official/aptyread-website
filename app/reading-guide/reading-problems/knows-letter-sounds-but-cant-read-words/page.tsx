import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import {
  ALPHABET_ARTICLE_URL,
  BLEND_SOUNDS_ARTICLE_URL,
} from "@/lib/reading-path";

const canonical =
  "https://www.aptyread.ai/reading-guide/reading-problems/knows-letter-sounds-but-cant-read-words";

export const metadata: Metadata = {
  title: "My Child Knows Letter Sounds but Can't Read Words | AptyRead",
  description:
    "Your child knows letter sounds but still struggles to read words? Learn what may be missing, what to practice, and what to do next.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "My Child Knows Letter Sounds but Can't Read Words",
    description:
      "Knowing individual letter sounds is not the same as reading words. Here is how to tell what your child needs, and what to practice next.",
    url: canonical,
    siteName: "AptyRead",
    type: "article",
  },
};

export default function KnowsSoundsCantReadWordsArticle() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "My Child Knows Letter Sounds but Can't Read Words",
    description:
      "Your child knows letter sounds but still struggles to read words. What may be missing, what to practice, and what to do next.",
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
      <div className="min-h-screen bg-apty-cream">
        <Header />
        <main>
          <article className="px-4 py-14 md:py-20">
            <div className="container mx-auto max-w-2xl">
              <GuideBreadcrumb
                items={[
                  { href: "/", label: "Home" },
                  { href: "/reading-guide", label: "Reading Guide" },
                  { label: "Knows letter sounds but can't read words" },
                ]}
              />

              <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">
                My child knows letter sounds but can&apos;t read words. Why?
              </h1>

              <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">
                Your child knows the sounds. You ask, &ldquo;What sound does this
                letter make?&rdquo; They answer.
              </p>
              <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">
                But when you show a simple word like{" "}
                <span className="font-semibold text-apty-dark">sat</span>, they
                get stuck. They may say /s/ /a/ /t/. They still cannot read{" "}
                <span className="font-semibold text-apty-dark">sat</span>.
              </p>
              <p className="text-base md:text-lg text-apty-dark mb-12 leading-relaxed">
                If this sounds familiar, the gap is often simple: knowing
                individual letter sounds is not the same as being able to blend
                those sounds into a word.
              </p>

              <div className="space-y-10 text-base md:text-lg text-apty-dark leading-relaxed">
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Knowing sounds is only one part of reading
                  </h2>
                  <p>
                    Learning letter sounds gives a child an important foundation.
                    They also need to learn how to use those sounds together.
                  </p>
                  <p className="mt-4">
                    A child may know that{" "}
                    <span className="font-semibold">s</span> is /s/,{" "}
                    <span className="font-semibold">a</span> is /a/, and{" "}
                    <span className="font-semibold">t</span> is /t/. The next
                    step is /s/ /a/ /t/ →{" "}
                    <span className="font-semibold">sat</span>.
                  </p>
                  <p className="mt-4">
                    That step is blending. A child can know the sounds correctly
                    and still need time and practice to develop this skill.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    How can you tell what your child needs?
                  </h2>
                  <p>
                    Try a simple word using letters and sounds your child already
                    knows. For example:{" "}
                    <span className="font-semibold">m-a-p</span>.
                  </p>
                  <p className="mt-4">
                    Ask your child to say the sounds: /m/ /a/ /p/. Then see what
                    happens.
                  </p>
                  <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>
                      If they blend the sounds and say{" "}
                      <span className="font-semibold">map</span>, they are
                      beginning to connect sounds into words.
                    </li>
                    <li>
                      If they say each sound separately but cannot put them
                      together, blending is probably the skill to practice.
                    </li>
                    <li>
                      If they are unsure of the sounds themselves, go back to the
                      sound foundations first. See{" "}
                      <Link
                        href={ALPHABET_ARTICLE_URL}
                        className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                      >
                        My child knows the alphabet but can&apos;t read
                      </Link>
                      .
                    </li>
                  </ul>
                  <p className="mt-4">
                    This distinction matters. You want to practice the skill your
                    child is actually ready to learn.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    What should you do at home?
                  </h2>
                  <p>Keep it simple.</p>
                  <p className="mt-4">
                    Choose a few sounds your child knows well and use them to make
                    short words. For example:{" "}
                    <span className="font-semibold">sat</span>,{" "}
                    <span className="font-semibold">mat</span>,{" "}
                    <span className="font-semibold">map</span>,{" "}
                    <span className="font-semibold">pin</span>.
                  </p>
                  <p className="mt-4">
                    Have your child say the sounds, then blend them into the word.
                    Give them time to try before helping. If they get stuck, model
                    the word and let them try again.
                  </p>
                  <p className="mt-4">
                    Keep practice short and calm. There is no need to turn every
                    reading attempt into a long lesson.
                  </p>
                  <p className="mt-4">
                    For more detailed guidance, see{" "}
                    <Link
                      href={BLEND_SOUNDS_ARTICLE_URL}
                      className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                    >
                      how to teach a child to blend sounds
                    </Link>
                    .
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Don&apos;t teach your child to guess the word
                  </h2>
                  <p>
                    When a child gets stuck, it can be tempting to say:
                    &ldquo;Look at the picture. What do you think it says?&rdquo;
                  </p>
                  <p className="mt-4">
                    Guessing should not replace reading the letters. If the word
                    is <span className="font-semibold">cat</span>, the child
                    should learn to use the letters and sounds — /c/ /a/ /t/ —
                    and blend them to read{" "}
                    <span className="font-semibold">cat</span>.
                  </p>
                  <p className="mt-4">
                    This gives children a way to work out words they have not
                    learned yet.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Don&apos;t move ahead too quickly
                  </h2>
                  <p>
                    If your child can say individual sounds but cannot yet blend
                    simple words, longer words and stories may be frustrating.
                  </p>
                  <p className="mt-4 font-semibold">
                    Sounds → Blending → Words → Reading
                  </p>
                  <p className="mt-4">
                    Each step supports the next. When a child is struggling, it
                    often helps to strengthen the earlier skill rather than move
                    on to harder material.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Why AptyRead follows this sequence
                  </h2>
                  <p>
                    AptyRead is one structured path from sounds to independent
                    reading. Every child starts at Level 1: Sound Foundations.
                  </p>
                  <p className="mt-4">
                    The early lessons establish the sound foundations children
                    need. Then, in First Reading, children begin putting those
                    sounds together to read words and sentences.
                  </p>
                  <p className="mt-4">
                    A child who already knows some sounds may move through
                    familiar lessons quickly. Strengthening the foundation can
                    help reduce gaps later. No skipping. No gaps.
                  </p>
                </section>
              </div>

              <p className="mt-10 text-sm text-apty-gray">
                Updated 10 September 2026 · AptyRead
              </p>

              <GuideCta
                primary="lesson"
                heading="Start at Level 1"
                body="If your child knows letter sounds but cannot yet read simple words, check the next skill: blending. Start with a few sounds they know. Use simple words. Let them practice bringing the sounds together. If the sounds themselves are still uncertain, strengthen those first. If you want a structured path that builds reading skills in order, begin with Sound Foundations. First lessons are free. No account. Sit with them for about fifteen minutes."
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
