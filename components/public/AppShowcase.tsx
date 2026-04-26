"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

const IMG_W = 800;
const IMG_H = 1731;

const shots: { n: string; alt: string }[] = [
  {
    n: "01",
    alt: "AptyRead: structured 4-level course from early phonics to independent reading",
  },
  {
    n: "02",
    alt: "AptyRead: parent settings for a healthy pace—one or two new lessons per day",
  },
  {
    n: "03",
    alt: "AptyRead: letter sounds taught with real-world context and short videos",
  },
  {
    n: "04",
    alt: "AptyRead: each lesson breaks skills into clear steps to build confidence",
  },
  {
    n: "05",
    alt: "AptyRead: writing practice to build letter shapes and muscle memory",
  },
  {
    n: "06",
    alt: "AptyRead: progress and mastery so you can see where your child is strong",
  },
  {
    n: "07",
    alt: "AptyRead: positive milestones and stars that reward steady practice",
  },
  {
    n: "08",
    alt: "AptyRead: Your Learning Path—structured letter sequence, free lessons to begin, and continue where you left off",
  },
];

/** Order for /gcc, /us, /in, /download: core story (01–04) plus the learning-path screen (08). */
export const LANDING_APP_SHOWCASE_ORDER = ["01", "02", "03", "04", "08"] as const;

type AppShowcaseProps = {
  /** Use fewer shots on long ad landing pages so the page does not feel endless. Ignored if `shotOrder` is set. */
  maxShots?: number;
  /**
   * Exact shot numbers to show, in order. Use on landing pages to include e.g. 08 (learning path)
   * without showing every intermediate marketing frame.
   */
  shotOrder?: readonly string[];
  /** e.g. hide bottom border when another white section follows */
  className?: string;
};

function resolveShotList(
  maxShots: number,
  shotOrder: readonly string[] | undefined
): { n: string; alt: string }[] {
  if (shotOrder?.length) {
    return shotOrder
      .map((id) => shots.find((s) => s.n === id))
      .filter((item): item is (typeof shots)[number] => Boolean(item));
  }
  return shots.slice(0, maxShots);
}

export default function AppShowcase({
  maxShots = 8,
  shotOrder,
  className = "",
}: AppShowcaseProps) {
  const list = resolveShotList(maxShots, shotOrder);
  const isCompact = list.length <= 5;

  const gridClass =
    list.length === 5
      ? "md:grid-cols-2 lg:grid-cols-5"
      : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      className={`bg-white px-4 border-b border-apty-coral-accent/30 ${
        isCompact ? "py-12 md:py-16" : "py-14 md:py-20"
      } ${className}`.trim()}
      aria-labelledby="app-showcase-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center max-w-2xl mx-auto ${isCompact ? "mb-8" : "mb-10"}`}>
          <h2
            id="app-showcase-heading"
            className="text-3xl md:text-4xl font-bold text-apty-dark"
          >
            See inside the app
          </h2>
        </div>

        <div
          className={[
            "flex flex-nowrap gap-4 md:gap-5",
            "overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain",
            "snap-x snap-mandatory scroll-px-4 scroll-smooth pb-2 md:pb-0",
            "md:overflow-x-visible",
            "md:grid", gridClass, "-mx-4", "px-4", "md:mx-0", "md:px-0", "md:snap-none",
            // subtle scrollbar on small screens; hidden on iOS is optional—thin is fine
            "[scrollbar-width:thin] md:[scrollbar-width:auto]",
            "[&::-webkit-scrollbar]:h-1.5 md:[&::-webkit-scrollbar]:h-0",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-apty-coral/25",
          ].join(" ")}
          style={
            {
              WebkitOverflowScrolling: "touch",
              scrollbarGutter: "stable",
            } as CSSProperties
          }
          role="region"
          aria-label="App screenshots, swipe on mobile to see more"
        >
          {list.map(({ n, alt }) => (
            <div
              key={n}
              className="flex-shrink-0 w-[min(78vw,300px)] md:w-auto snap-center min-w-0"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-apty-coral-accent/40 bg-apty-warm">
                <Image
                  src={`/images/app-screenshots/${n}.webp`}
                  alt={alt}
                  width={IMG_W}
                  height={IMG_H}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 78vw, (max-width: 1024px) 40vw, 20vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="md:hidden text-center text-sm text-apty-gray mt-3">
          Swipe sideways to see all screens
        </p>
      </div>
    </section>
  );
}
