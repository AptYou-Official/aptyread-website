import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "For Educators & Schools | AptyRead Literacy Program",
  description: "AptyRead for schools and tutors. Complete literacy program — 4 levels, 243 lessons. Placement, outcomes, and how to use AptyRead in class or recommend to families.",
  alternates: {
    canonical: "https://www.aptyread.ai/educators",
  },
};

export default function EducatorsPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-apty-coral-accent shadow-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
              For Educators & Schools
            </h1>
            <p className="text-xl text-apty-gray max-w-2xl mx-auto">
              A complete literacy program you can recommend or use with your students. 4 levels, 243 lessons, backed by reading science.
            </p>
          </div>

          <div className="space-y-10 text-apty-gray">
            <section>
              <h2 className="text-2xl font-bold text-apty-dark mb-4">
                Why Educators Choose AptyRead
              </h2>
              <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-apty-coral font-bold">•</span>
                  <span><strong className="text-apty-dark">Structured program, not an app.</strong> A clear sequence from first sound to first book — the kind of curriculum that used to exist only in specialist settings.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-apty-coral font-bold">•</span>
                  <span><strong className="text-apty-dark">Mastery-based.</strong> Nothing unlocks until the child is ready. No pushing ahead; no holding back. Ideal for differentiation.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-apty-coral font-bold">•</span>
                  <span><strong className="text-apty-dark">Built for ESL and global learners.</strong> Designed for children who learn English as a second language — Asia, Africa, Middle East, and everywhere English is learned, not just spoken at home.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-apty-coral font-bold">•</span>
                  <span><strong className="text-apty-dark">Reading science.</strong> The sequence follows decades of research. Every step is in the right order; nothing is skipped or random.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-apty-dark mb-4">
                How You Can Use AptyRead
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-apty-coral-accent bg-apty-warm/50">
                  <h3 className="font-bold text-apty-dark mb-2">Recommend to families</h3>
                  <p className="text-sm md:text-base">
                    Suggest AptyRead to parents for at-home practice. Try 4 lessons free — no registration. Parents can start immediately and enroll level-by-level.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-apty-coral-accent bg-apty-warm/50">
                  <h3 className="font-bold text-apty-dark mb-2">In class or tutoring</h3>
                  <p className="text-sm md:text-base">
                    Use the program as a consistent supplement: one lesson per day, clear placement by level. Same sequence for every child, at their own pace.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-apty-dark mb-4">
                Placement & Levels
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                Every child starts where they are. The program has 4 levels: <strong className="text-apty-dark">Level 1</strong> (Learning the Sounds, 46 lessons), <strong className="text-apty-dark">Level 2</strong> (Reading First Words, 57 lessons), <strong className="text-apty-dark">Level 3</strong> (Reading Anything, 63 lessons), <strong className="text-apty-dark">Level 4</strong> (Reading Real Books, 77 lessons). The app guides placement; you can also direct families to start at Level 1 if unsure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-apty-dark mb-4">
                Outcomes
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                By the end of the program, children read independently — including real published books such as <em>The Magic Finger</em> and <em>The Boxcar Children</em>. The goal is real literacy: decoding, comprehension, and a lasting love of reading.
              </p>
            </section>

            <section className="border-t border-apty-coral-accent pt-10">
              <h2 className="text-2xl font-bold text-apty-dark mb-4">
                Get in Touch
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                For schools, tutoring centres, or bulk licensing, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-apty-coral text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
                <a
                  href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-apty-coral text-apty-coral px-6 py-3 rounded-xl font-semibold hover:bg-apty-warm transition-colors"
                >
                  Try the Program
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
