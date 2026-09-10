import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import {
  ALPHABET_ARTICLE_URL,
  BLEND_SOUNDS_ARTICLE_URL,
  PATH_URL,
  SOUNDS_CANT_READ_WORDS_ARTICLE_URL,
  STRUGGLES_WITH_READING_ARTICLE_URL,
} from "@/lib/reading-path";

export const metadata: Metadata = {
  title: "Reading Guide for Parents | AptyRead",
  description:
    "Learn how children learn to read English, and what you can do at home. Start with the problem you see. Then see how the path fits together.",
  alternates: {
    canonical: "https://www.aptyread.ai/reading-guide",
  },
  openGraph: {
    title: "Reading Guide for Parents | AptyRead",
    description:
      "Learn how children learn to read English, and what you can do at home. Start with the problem you see. Then see how the path fits together.",
    url: "https://www.aptyread.ai/reading-guide",
    siteName: "AptyRead",
    type: "website",
  },
};

const articles = [
  {
    href: ALPHABET_ARTICLE_URL,
    title: "My child knows the alphabet but can't read. What should I do?",
    body: "Letter names are not reading. Here is what to do next, and why Sound Foundations comes first.",
  },
  {
    href: BLEND_SOUNDS_ARTICLE_URL,
    title: "How to teach a child to blend sounds",
    body: "Your child may know the sounds. The next step is putting them together into words.",
  },
  {
    href: SOUNDS_CANT_READ_WORDS_ARTICLE_URL,
    title: "My child knows letter sounds but can't read words. Why?",
    body: "Knowing the sounds separately is not the same as reading the word. Here is how to tell what to practice next.",
  },
  {
    href: STRUGGLES_WITH_READING_ARTICLE_URL,
    title: "How to help a child who struggles with reading",
    body: "Start with the skill your child needs next, not a harder book. A clear way to decide what to practice.",
  },
];

export default function ReadingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-2xl">
            <GuideBreadcrumb
              items={[
                { href: "/", label: "Home" },
                { label: "Reading Guide" },
              ]}
            />

            <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">
              Reading Guide
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-3 leading-relaxed">
              Learn how children learn to read English, and what you can do at
              home.
            </p>
            <p className="text-lg md:text-xl text-apty-gray mb-12 leading-relaxed">
              Start with the problem you see. Then see how the path fits
              together.
            </p>

            <section className="mb-14">
              <Link
                href={PATH_URL}
                className="group block rounded-2xl border border-apty-cyan/25 bg-apty-cyan-accent/40 p-6 md:p-8 hover:border-apty-cyan transition-colors"
              >
                <p className="text-sm font-semibold tracking-wide text-apty-cyan mb-2">
                  Five levels. One path.
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-3 tracking-tight group-hover:text-[#007399] transition-colors">
                  The AptyRead Five-Level Path
                </h2>
                <p className="text-apty-gray leading-relaxed mb-4">
                  Why every child starts at Level 1, and how the sequence works.
                </p>
                <span className="font-semibold text-[#007399]">
                  See the Five-Level Path →
                </span>
              </Link>
            </section>

            <section aria-labelledby="guide-articles-heading">
              <h2
                id="guide-articles-heading"
                className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-3 tracking-tight"
              >
                Start with the parent&apos;s question
              </h2>
              <p className="text-base md:text-lg text-apty-gray leading-relaxed mb-8">
                Begin with what you see at home.
              </p>

              <ul className="space-y-10">
                {articles.map((article) => (
                  <li key={article.href}>
                    <Link href={article.href} className="group block">
                      <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-2 tracking-tight group-hover:text-[#007399] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-apty-gray leading-relaxed mb-2">
                        {article.body}
                      </p>
                      <span className="font-semibold text-[#007399]">
                        Read this →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-14 text-apty-gray leading-relaxed">
              For buying questions, see the{" "}
              <Link
                href="/faq"
                className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
              >
                FAQ
              </Link>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
