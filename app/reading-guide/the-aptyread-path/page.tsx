import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import GuideBreadcrumb from "@/components/public/GuideBreadcrumb";
import GuideCta from "@/components/public/GuideCta";
import { PATH_LEVELS } from "@/lib/reading-path";

export const metadata: Metadata = {
  title: "The AptyRead Five-Level Path | AptyRead",
  description:
    "AptyRead is one structured path to English reading. Five levels. One path. Every child starts at Level 1. No skipping. No gaps.",
  alternates: {
    canonical: "https://www.aptyread.ai/reading-guide/the-aptyread-path",
  },
  openGraph: {
    title: "The AptyRead Five-Level Path",
    description:
      "Five levels. One path. Every child starts with Sound Foundations, then moves forward when ready.",
    url: "https://www.aptyread.ai/reading-guide/the-aptyread-path",
    siteName: "AptyRead",
    type: "website",
  },
};

export default function AptyReadPathPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />
      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl">
            <GuideBreadcrumb
              items={[
                { href: "/", label: "Home" },
                { href: "/reading-guide", label: "Reading Guide" },
                { label: "Five-Level Path" },
              ]}
            />

            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              Five Levels. One Path.
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-5 leading-tight">
              The AptyRead Five-Level Path
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-10 leading-relaxed">
              AptyRead is one structured path to English reading. Every child
              starts with the foundations, then moves forward as the skills are
              ready. Five levels. One path. No skipping. No gaps.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                Why reading is built step by step
              </h2>
              <div className="space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
                <p>
                  Reading English is a skill. Sounds come before words. Words
                  come before sentences. Sentences come before books. Each level
                  builds on the skills developed in the previous one.
                </p>
                <p>
                  That is why AptyRead is not five separate courses. It is one
                  path. Every child starts at Level 1.
                </p>
              </div>
            </section>

            <section className="mb-12" aria-labelledby="path-levels-heading">
              <h2
                id="path-levels-heading"
                className="text-2xl md:text-3xl font-bold text-apty-dark mb-6"
              >
                Five Levels. One Path.
              </h2>
              <ol className="relative space-y-4">
                <div
                  aria-hidden="true"
                  className="absolute left-5 top-3 bottom-3 w-px bg-apty-coral/25 md:left-6"
                />
                {PATH_LEVELS.map((level) => (
                  <li key={level.id} className="relative flex gap-4 md:gap-5">
                    <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-apty-coral text-sm font-bold text-white shadow-sm md:h-12 md:w-12 md:text-base">
                      {level.id}
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl border border-apty-coral-accent bg-white p-4 md:p-5 shadow-sm">
                      <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-1">
                        Level {level.number} — {level.name}
                      </h3>
                      <p className="text-sm md:text-base text-apty-dark/80 mb-2 leading-relaxed">
                        &ldquo;{level.parentProblem}&rdquo;
                      </p>
                      <p className="text-apty-gray leading-relaxed">
                        {level.outcome}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-12 space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                Why children do not skip levels
              </h2>
              <p>
                Skipping looks faster. It leaves gaps. A child who jumps ahead
                often guesses, stalls on longer words, or loses confidence later.
                The path is cumulative on purpose.
              </p>
            </section>

            <section className="mb-12 space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                What if my child already knows some of these skills?
              </h2>
              <p>
                They still start at Level 1. Knowing letter names is not the same
                as reading sounds into words. Level 1 confirms the foundations.
                Many children move through the early lessons quickly when the
                skill is already firm. The point is not to slow them down. The
                point is to leave nothing missing.
              </p>
            </section>

            <section className="mb-12 space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                How progress works
              </h2>
              <p>
                They move to the next lesson when ready. You set a daily limit of
                1 or 2 new lessons — about fifteen minutes. Then they stop. Review
                of finished lessons does not count against that limit.
              </p>
            </section>

            <section className="mb-4 space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                What a typical sitting looks like
              </h2>
              <p>
                Watch the sound. Say it. Try it. Write it. You sit with them.
                Then they read — not the phone alone.
              </p>
              <p>
                For more on why alphabet knowledge is not enough to start later
                in the path, read{" "}
                <Link
                  href="/reading-guide/reading-problems/child-knows-alphabet-but-cant-read"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  My child knows the alphabet but can&apos;t read
                </Link>
                .
              </p>
            </section>

            <GuideCta
              primary="lesson"
              heading="Start at Level 1"
              body="First lessons are free. No account. Every child begins with Sound Foundations."
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
