import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import { BLEND_SOUNDS_ARTICLE_URL } from "@/lib/reading-path";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";

const canonical =
  "https://www.aptyread.ai/reading-guide/reading-problems/how-to-teach-letter-sounds";

export const metadata: Metadata = {
  title: "How to Teach Letter Sounds at Home | AptyRead",
  description:
    "Learn a simple way to teach letter sounds at home. What to say, what to practise, and how to help your child get ready to read words.",
  alternates: { canonical },
  openGraph: {
    title: "How to Teach Letter Sounds at Home",
    description:
      "A calm, practical way to introduce letter sounds before asking a child to read words.",
    url: canonical,
    siteName: "AptyRead",
    type: "article",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Teach Letter Sounds at Home | AptyRead",
    description:
      "A simple, practical way to introduce letter sounds before reading words.",
    images: [socialImageUrl],
  },
};

export default function TeachLetterSoundsArticle() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Teach Letter Sounds at Home",
    description:
      "Learn a simple way to teach letter sounds at home and help your child get ready to read words.",
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
              <GuideBreadcrumb items={[{ href: "/", label: "Home" }, { href: "/reading-guide", label: "Reading Guide" }, { label: "Teach letter sounds" }]} />
              <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">How to teach letter sounds at home</h1>
              <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">Before children can read words, they need to hear and say the sounds that letters represent.</p>
              <p className="text-base md:text-lg text-apty-dark mb-12 leading-relaxed">This does not need a long lesson. A few clear sounds, a little repetition, and your attention are enough to begin.</p>

              <div className="space-y-10 text-base md:text-lg text-apty-dark leading-relaxed">
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Start with the sound, not the letter name</h2>
                  <p>When you show <span className="font-semibold">S</span>, say the sound: <span className="font-semibold">/s/</span>. Do not begin with the letter name, &ldquo;ess.&rdquo;</p>
                  <p className="mt-4">Letter names are useful. But reading starts when a child connects what they see with the sound it makes. Keep the sound short and clear: /m/, /s/, /t/.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Use a simple routine</h2>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>Point to one letter.</li>
                    <li>Say its sound clearly.</li>
                    <li>Ask your child to say the sound with you.</li>
                    <li>Repeat it once or twice, then stop.</li>
                  </ol>
                  <p className="mt-4">You can add a picture or a familiar word after the sound. For example, <span className="font-semibold">S</span> says /s/ like the first sound in <span className="font-semibold">sun</span>. The letter and its sound should stay at the centre.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Keep practice short</h2>
                  <p>Three sounds practised well are more useful than a large alphabet chart rushed through once. Stop while your child is still interested.</p>
                  <p className="mt-4">A short daily sitting works well. Watch the sound, say it together, then let your child try. About fifteen minutes is enough.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">Do not move to words too soon</h2>
                  <p>A child may recognise a few letters before the sounds are firm. Give them time to hear, say, and remember those sounds first.</p>
                  <p className="mt-4">When they know a small set of sounds, the next step is putting them together. Read <Link href={BLEND_SOUNDS_ARTICLE_URL} className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors">how to teach a child to blend sounds</Link>.</p>
                </section>
                <section>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight">How AptyRead helps</h2>
                  <p>AptyRead begins with Sound Foundations. Children see the letter, hear the sound, watch how it is made, and practise before moving on.</p>
                  <p className="mt-4">Topics and lessons unlock in order, so early reading does not rest on missing sounds.</p>
                </section>
              </div>
              <p className="mt-10 text-sm text-apty-gray">Updated 16 September 2026 · AptyRead</p>
              <GuideCta heading="Start with sound foundations" body="Begin with a few clear letter sounds. Keep practice short, sit with your child, and build from there. First lessons are free. No account needed." />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
