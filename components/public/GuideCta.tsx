"use client";

import Link from "next/link";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import { PATH_URL } from "@/lib/reading-path";

type GuideCtaProps = {
  /** Match intent: path for research, lesson for high intent. */
  primary?: "lesson" | "path";
  /** Hide secondary link (e.g. Path page should not link to itself). */
  showSecondary?: boolean;
  heading?: string;
  body?: string;
};

export default function GuideCta({
  primary = "lesson",
  showSecondary = true,
  heading = "Ready to try?",
  body = "Every child starts at Level 1. First lessons are free. No account needed.",
}: GuideCtaProps) {
  return (
    <aside className="mt-14 rounded-2xl border border-apty-cyan/20 bg-white p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-apty-dark mb-2 tracking-tight">
        {heading}
      </h2>
      <p className="text-apty-gray leading-relaxed mb-6">{body}</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        {primary === "lesson" ? (
          <>
            <PlayStoreLink
              platform="auto"
              className="inline-flex items-center justify-center rounded-xl bg-apty-cyan px-6 py-3 text-base font-semibold text-white hover:bg-apty-cyan-dark transition-colors"
            >
              Start Lesson 1
            </PlayStoreLink>
            {showSecondary ? (
              <Link
                href={PATH_URL}
                className="inline-flex items-center justify-center font-semibold text-apty-dark hover:text-apty-cyan transition-colors"
              >
                See the Five-Level Path
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <Link
              href={PATH_URL}
              className="inline-flex items-center justify-center rounded-xl bg-apty-cyan px-6 py-3 text-base font-semibold text-white hover:bg-apty-cyan-dark transition-colors"
            >
              See the Five-Level Path
            </Link>
            {showSecondary ? (
              <PlayStoreLink
                platform="auto"
                className="inline-flex items-center justify-center font-semibold text-apty-dark hover:text-apty-cyan transition-colors"
              >
                Start Lesson 1
              </PlayStoreLink>
            ) : null}
          </>
        )}
      </div>
    </aside>
  );
}
