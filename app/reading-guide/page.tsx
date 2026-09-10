import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import {
  ALPHABET_ARTICLE_URL,
  PATH_URL,
} from "@/lib/reading-path";

export const metadata: Metadata = {
  title: "Reading Guide for Parents | AptyRead",
  description:
    "Learn how children learn to read English — and what you can do at home. Parent questions, reading problems, and the AptyRead five-level path.",
  alternates: {
    canonical: "https://www.aptyread.ai/reading-guide",
  },
  openGraph: {
    title: "Reading Guide for Parents | AptyRead",
    description:
      "Learn how children learn to read English — and what you can do at home.",
    url: "https://www.aptyread.ai/reading-guide",
    siteName: "AptyRead",
    type: "website",
  },
};

const featured = {
  href: PATH_URL,
  title: "The AptyRead Five-Level Path",
  body: "Five levels. One path. Why every child starts at Level 1 — and how the sequence works.",
};

const articles = [
  {
    href: ALPHABET_ARTICLE_URL,
    category: "Reading Problems",
    title: "My child knows the alphabet but can't read. What should I do?",
    body: "Letter names are not reading. Here is what to do next — and why Sound Foundations comes first.",
  },
];

export default function ReadingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl">
            <GuideBreadcrumb
              items={[
                { href: "/", label: "Home" },
                { label: "Reading Guide" },
              ]}
            />

            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              Reading Guide
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-12 leading-relaxed">
              Learn how children learn to read English — and what you can do at
              home. Start with the problem you see. Then see how the path fits
              together.
            </p>

            <section className="mb-12">
              <Link
                href={featured.href}
                className="block rounded-2xl border-2 border-apty-coral bg-white p-6 md:p-8 hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-semibold tracking-wide text-apty-coral mb-2">
                  Featured
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-3">
                  {featured.title}
                </h2>
                <p className="text-apty-gray leading-relaxed mb-4">
                  {featured.body}
                </p>
                <span className="font-semibold text-apty-coral">
                  See the Five-Level Path →
                </span>
              </Link>
            </section>

            <section aria-labelledby="guide-articles-heading">
              <h2
                id="guide-articles-heading"
                className="text-2xl md:text-3xl font-bold text-apty-dark mb-6"
              >
                Start with the parent&apos;s question
              </h2>
              <ul className="space-y-4">
                {articles.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className="block rounded-2xl border border-apty-coral-accent bg-white p-5 md:p-6 hover:border-apty-coral transition-colors"
                    >
                      <p className="text-sm font-semibold text-apty-coral mb-2">
                        {article.category}
                      </p>
                      <h3 className="text-xl font-bold text-apty-dark mb-2">
                        {article.title}
                      </h3>
                      <p className="text-apty-gray leading-relaxed">
                        {article.body}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-12 text-apty-gray leading-relaxed">
              More guide articles will follow. For buying questions, see the{" "}
              <Link
                href="/faq"
                className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
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
