import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import {
  BLEND_SOUNDS_ARTICLE_URL,
  PATH_URL,
  SOUNDS_CANT_READ_WORDS_ARTICLE_URL,
} from "@/lib/reading-path";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";

const canonical =
  "https://www.aptyread.ai/reading-guide/reading-problems/child-reads-words-but-struggles-with-sentences";

export const metadata: Metadata = {
  title: "My Child Can Read Words but Struggles With Sentences | AptyRead",
  description:
    "Your child can read words but finds sentences slow or difficult? Learn what to practise next and how to build reading confidence step by step.",
  alternates: { canonical },
  openGraph: {
    title: "My Child Can Read Words but Struggles With Sentences",
    description:
      "Reading words is an important step. Here is how to help a child begin reading sentences with more ease.",
    url: canonical,
    siteName: "AptyRead",
    type: "article",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Child Can Read Words but Struggles With Sentences | AptyRead",
    description:
      "What to practise when a child can read words but finds sentences difficult.",
    images: [socialImageUrl],
  },
};

export default function WordsToSentencesArticle() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "My Child Can Read Words but Struggles With Sentences",
    description:
      "What to practise when a child can read individual words but finds sentences slow or difficult.",
    dateModified: "2026-09-16",
    author: { "@type": "Organization", name: "AptyRead" },
    publisher: {
      "@type": "Organization",
      name: "AptyRead",
      url: "https://www.aptyread.ai",
    },
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <div className="min-h-screen bg-apty-cream">
        <Header />
        <main>
          <article className="px-4 py-14 md:py-20">
            <div className="container mx-auto max-w-2xl">
              <GuideBreadcrumb items={[{ href: "/", label: "Home" }, { href: "/reading-guide", label: "Reading Guide" }, { label: "Words and sentences" }]} />
              <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">My child can read words but struggles with sentences. What next?</h1>
              <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">Reading a word and reading a whole sentence are different jobs.</p>
              <p className="text-base md:text-lg text-apty-dark mb-12 leading-relaxed">Your child may read <span className="font-semibold">cat</span>, <span className="font-semibold">sat</span>, and <span className="font-semibold">mat</span> one at a time, then lose their place or become tired when those words appear together in a sentence. That is a normal next step in learning to read.</p>

              <div className="space-y-10 text-base md:text-lg text-apty-dark leading-relaxed">
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">First make sure the words are secure</h2>
                  <p>Sentences ask a child to read several words, hold them in order, and understand what they say. If each word still takes a lot of effort, the sentence will feel hard.</p>
                  <p className="mt-4">Choose a few simple words your child knows and let them read them calmly. Then return to the words that cause hesitation. Stronger word reading makes sentences easier.</p>
                  <p className="mt-4">If they still need help putting sounds together, start with <Link href={BLEND_SOUNDS_ARTICLE_URL} className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors">blending sounds</Link> or read <Link href={SOUNDS_CANT_READ_WORDS_ARTICLE_URL} className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors">why children can know sounds but struggle with words</Link>.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Start with very short sentences</h2>
                  <p>Use a sentence made from words your child can already read, such as: <span className="font-semibold">Sam sat.</span></p>
                  <p className="mt-4">Point under each word as your child reads. Give them time. When they reach the end, ask them to say the whole sentence again. The aim is to connect the words into one idea, not to race through the line.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Read it again, with less effort</h2>
                  <p>After your child has worked out a short sentence, let them read the same sentence once more. The second reading often feels smoother because the words are no longer new.</p>
                  <p className="mt-4">This is not memorising a page. It is giving a child a chance to practise reading words together, until they can give more attention to meaning.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Keep the next step small</h2>
                  <p>Do not move from one simple sentence to a difficult storybook overnight. Add one new word, one longer sentence, or one short passage at a time.</p>
                  <p className="mt-4">A child who reads slowly is still reading. Stay close, keep the practice kind, and work for about fifteen minutes rather than pushing through frustration.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">How AptyRead helps</h2>
                  <p>After Sound Foundations, AptyRead moves into First Reading: words, first sentences, and first stories. Lessons unlock in order, so children practise the skills underneath a sentence before asking them to read more.</p>
                  <p className="mt-4">The path stays gradual: sounds, words, sentences, then longer reading. See <Link href={PATH_URL} className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors">the AptyRead Five-Level Path</Link>.</p>
                </section>
              </div>
              <p className="mt-10 text-sm text-apty-gray">Updated 16 September 2026 · AptyRead</p>
              <GuideCta heading="Build from words to sentences" body="Start with words your child can read, then try one short sentence at a time. AptyRead guides that next step through First Reading. First lessons are free. No account needed." />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
