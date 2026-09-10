import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import {
  BLEND_SOUNDS_ARTICLE_URL,
} from "@/lib/reading-path";

const canonical =
  "https://www.aptyread.ai/reading-guide/reading-problems/child-knows-alphabet-but-cant-read";

export const metadata: Metadata = {
  title: "My Child Knows the Alphabet but Can't Read | AptyRead",
  description:
    "Your child can say A, B, C but still cannot read words. That is common. Here is what is missing, what to do at home, and why reading starts with letter sounds.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "My Child Knows the Alphabet but Can't Read",
    description:
      "Letter names are not reading. Here is what is missing when your child knows the alphabet but still cannot read words.",
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
      "Your child can say A, B, C but still cannot read words. What is missing, what to do at home, and why reading starts with letter sounds.",
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

              <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">
                My child knows the alphabet but can&apos;t read. What should I
                do?
              </h1>

              <p className="text-lg md:text-xl text-apty-gray mb-8 leading-relaxed">
                You hear the alphabet song. They point to letters. Then you open a
                simple word, and they freeze. That gap is real. And there is a
                clear way to work on it.
              </p>

              <div className="border-l-4 border-apty-cyan pl-5 py-1 mb-12">
                <p className="text-base md:text-lg text-apty-dark leading-relaxed font-semibold mb-2">
                  The short answer
                </p>
                <p className="text-base md:text-lg text-apty-dark leading-relaxed">
                  Teach letter sounds, not only letter names. Then teach your
                  child to blend those sounds into words. Knowing A, B, C is not
                  reading yet.
                </p>
              </div>

              <div className="space-y-10 text-base md:text-lg text-apty-dark leading-relaxed">
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Why knowing ABC is not the same as reading
                  </h2>
                  <p>
                    Many children can recite the alphabet and still cannot read{" "}
                    <span className="font-semibold">sat</span> or{" "}
                    <span className="font-semibold">map</span>. That does not mean
                    they are behind. It means they have learned one skill, and
                    reading needs another.
                  </p>
                  <p className="mt-4">
                    The letter name is &ldquo;A.&rdquo; The sound used for reading
                    is the sound we hear in words like apple. Names help you talk
                    about letters. Sounds help you read.
                  </p>
                  <p className="mt-4">
                    So when a parent says, &ldquo;They know the alphabet, why
                    can&apos;t they read?&rdquo; the honest answer is: the alphabet
                    was never the whole job.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    What skill is missing
                  </h2>
                  <p>
                    Written English is a code. Children begin to unlock that code
                    when they can do two things:
                  </p>
                  <ol className="list-decimal pl-5 space-y-3 mt-4">
                    <li>
                      <span className="font-semibold">
                        Hear and say the sounds clearly.
                      </span>{" "}
                      For example: /s/, /a/, /t/ — rather than saying the letter
                      names &ldquo;ess,&rdquo; &ldquo;ay,&rdquo; and
                      &ldquo;tee.&rdquo;
                    </li>
                    <li>
                      <span className="font-semibold">Blend those sounds</span> in
                      order until they become a word: /s/ /a/ /t/ →{" "}
                      <span className="font-semibold">sat</span>.
                    </li>
                  </ol>
                  <p className="mt-4">
                    Without that, children often guess from pictures, memorize a
                    few words, and stall when the page gets harder. The missing
                    piece is often the sound-to-word bridge, not motivation.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    What you can do at home
                  </h2>
                  <p className="mb-4">
                    You do not need a long program to start helping tonight.
                  </p>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      Point to a letter. Ask for the{" "}
                      <span className="font-semibold">sound</span>, not the name.
                    </li>
                    <li>
                      Pick three sounds your child knows. Stretch them slowly,
                      then say the word together.
                    </li>
                    <li>
                      Keep it short. A few clear minutes beat a long, tired
                      session.
                    </li>
                    <li>
                      Sit with them. Reading this early is not a solo phone
                      activity.
                    </li>
                  </ol>
                  <p className="mt-4">
                    If they already know some sounds, they may move quickly. That
                    is fine. Confirm the foundation before you rush into
                    storybooks. When the sounds are clearer, the next skill is
                    blending. See{" "}
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
                    What often slows children down
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Asking only for letter names</li>
                    <li>Encouraging guessing from pictures</li>
                    <li>Jumping to storybooks before sounds are firm</li>
                    <li>Long sessions that end in frustration</li>
                    <li>
                      Skipping ahead because the alphabet &ldquo;feels done&rdquo;
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">
                    Why AptyRead starts at Level 1
                  </h2>
                  <p>
                    AptyRead is one path with five levels. Every child starts at
                    Level 1: Sound Foundations. That is true even if they already
                    know the alphabet song.
                  </p>
                  <p className="mt-4">
                    Level 1 is not a punishment for knowing letters. It confirms
                    the sounds and prepares blending, so First Reading does not
                    rest on gaps. Children who already have some skills often move
                    through the early lessons quickly. The point is to leave
                    nothing missing.
                  </p>
                </section>
              </div>

              <p className="mt-10 text-sm text-apty-gray">
                Updated 10 September 2026 · AptyRead
              </p>

              <GuideCta
                primary="lesson"
                heading="Start at Level 1"
                body="Start with sounds. Practice a little each day. If you want a structured path that builds those skills in order, begin with Sound Foundations. First lessons are free. No account. Sit with them for about fifteen minutes."
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
