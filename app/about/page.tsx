import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import CTA from "@/components/public/CTA";

export const metadata: Metadata = {
  title: "A Letter to Parents | AptyRead",
  description:
    "Why we built AptyRead. An English reading program for children aged 4 to 10. Five levels. 238 lessons. Every child reads.",
  alternates: {
    canonical: "https://www.aptyread.ai/about",
  },
  openGraph: {
    title: "A Letter to Parents | AptyRead",
    description:
      "Why we built AptyRead. An English reading program for children aged 4 to 10. Every child reads.",
    url: "https://www.aptyread.ai/about",
    siteName: "AptyRead",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              AptyRead
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-3 leading-tight">
              A Letter to Parents
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-12">
              Why we built this.
            </p>

            <div className="space-y-6 text-base md:text-lg text-apty-dark leading-relaxed">
              <p>
                In 2020, parents came to us with children who struggled to read
                English. We watched. We listened. We understood one thing.
              </p>

              <p className="text-xl md:text-2xl font-semibold text-apty-dark leading-snug border-l-4 border-apty-coral pl-5 py-1">
                What the child gets should not depend on who happens to teach
                them that day.
              </p>

              <p>
                That was not good enough. Every child deserves a structured,
                consistent, always available foundation.
              </p>

              <p className="font-semibold">So we built AptyRead.</p>

              <p className="font-semibold">Our mission: Every child reads.</p>

              <p>
                An English reading program for ages 4 to 10. Five levels. 238
                lessons. One path. Built on the Science of Reading.
              </p>

              <p>
                Reading is a skill. They move to the next lesson only when they
                are ready. No skipping. No gaps. Confidence from finishing, not
                from being pushed.
              </p>

              <p>
                We are parents too. You set a daily limit: 1 or 2 new lessons.
                About fifteen minutes. Then they are done. The rest of the day
                is theirs.
              </p>

              <p>
                No ads. No subscription. Open the app and start Lesson 1. Buy a
                level once, when you are ready.
              </p>

              <p>Thank you for trusting us with this.</p>
            </div>

            <p className="mt-12 text-apty-dark font-semibold">
              The AptyRead Team
            </p>
          </div>
        </article>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
