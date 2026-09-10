import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import {
  ALPHABET_ARTICLE_URL,
  PATH_LEVELS,
  PATH_URL,
} from "@/lib/reading-path";

export const metadata: Metadata = {
  title: "Reading Guide for Parents | AptyRead",
  description:
    "Plain answers for parents about how children learn to read English. Start with the problem you see at home, then see the Five-Level Path.",
  alternates: {
    canonical: "https://www.aptyread.ai/reading-guide",
  },
  openGraph: {
    title: "Reading Guide for Parents | AptyRead",
    description:
      "Plain answers for parents about how children learn to read English. Start with the problem you see at home, then see the Five-Level Path.",
    url: "https://www.aptyread.ai/reading-guide",
    siteName: "AptyRead",
    type: "website",
  },
};

const publishedArticles = [
  {
    href: ALPHABET_ARTICLE_URL,
    title: "My child knows the alphabet but can't read. What should I do?",
    body: "Knowing A, B, C is not the same as reading words. Here is what is missing, and what to do next.",
  },
];

const nextQuestions = [
  "How do I teach my child to blend sounds into words?",
  "My child is struggling to read English. What can I do?",
  "How do we teach reading at home in a simple daily routine?",
  "How do I choose a reading program for my child?",
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

            <p className="text-sm font-semibold tracking-wide text-apty-cyan mb-4">
              For parents
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-apty-dark mb-5 leading-tight tracking-tight">
              Reading Guide
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-4 leading-relaxed">
              Children do not learn to read English by guessing. Sounds come
              before words. Words come before books.
            </p>
            <p className="text-lg md:text-xl text-apty-gray mb-12 leading-relaxed">
              This guide helps you see what your child needs right now. Then it
              shows how those skills fit on one clear path.
            </p>

            <section className="mb-14" aria-labelledby="path-heading">
              <h2
                id="path-heading"
                className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight"
              >
                The Five-Level Path
              </h2>
              <p className="text-base md:text-lg text-apty-dark leading-relaxed mb-6">
                AptyRead is one path from letter sounds to real books. Every
                child starts at Level 1. No skipping. No gaps.
              </p>
              <ol className="space-y-3 mb-6">
                {PATH_LEVELS.map((level) => (
                  <li
                    key={level.id}
                    className="flex gap-3 text-base md:text-lg text-apty-dark"
                  >
                    <span className="font-bold text-apty-cyan tabular-nums w-8 flex-shrink-0">
                      {level.id}
                    </span>
                    <span>
                      <span className="font-semibold">{level.name}.</span>{" "}
                      <span className="text-apty-gray">{level.outcome}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Link
                href={PATH_URL}
                className="inline-flex items-center gap-1.5 text-base md:text-lg font-semibold text-[#007399] underline underline-offset-4 decoration-[#007399]/35 hover:decoration-[#007399] hover:text-apty-dark transition-colors"
              >
                Read the full Five-Level Path
                <span aria-hidden="true">→</span>
              </Link>
            </section>

            <section className="mb-14" aria-labelledby="problems-heading">
              <h2
                id="problems-heading"
                className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight"
              >
                Start with what you see at home
              </h2>
              <p className="text-base md:text-lg text-apty-gray leading-relaxed mb-8">
                Most parents do not need a long course first. They need a clear
                answer to the problem in front of them.
              </p>

              <ul className="space-y-8">
                {publishedArticles.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className="group block"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-2 group-hover:text-[#007399] transition-colors tracking-tight">
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

            <section className="mb-4" aria-labelledby="next-heading">
              <h2
                id="next-heading"
                className="text-2xl md:text-3xl font-extrabold text-apty-dark mb-4 tracking-tight"
              >
                Questions we are writing next
              </h2>
              <p className="text-base md:text-lg text-apty-gray leading-relaxed mb-6">
                These come up often. We are answering them one by one, carefully,
                not as a pile of SEO posts.
              </p>
              <ul className="space-y-3">
                {nextQuestions.map((question) => (
                  <li
                    key={question}
                    className="text-base md:text-lg text-apty-dark leading-relaxed pl-4 border-l-2 border-apty-cyan/30"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </section>

            <GuideCta
              primary="path"
              heading="See how the path fits together"
              body="If you want the full picture first, start with the Five-Level Path. When you are ready to try, Lesson 1 is free. No account."
            />

            <p className="mt-10 text-apty-gray leading-relaxed">
              Looking for buying questions? See the{" "}
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
