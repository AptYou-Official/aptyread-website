"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

const IMG_W = 800;
const IMG_H = 1731;

const shots: { n: string; alt: string; caption: string }[] = [
  {
    n: "03",
    alt: "AptyRead: a child in Lesson 1, learning the letter S sound",
    caption: "In the lesson. First sound.",
  },
  {
    n: "06",
    alt: "AptyRead: parent view of where the child is now",
    caption: "A parent glance. Where they are now.",
  },
  {
    n: "08",
    alt: "AptyRead: the five-level learning path",
    caption: "Five levels. One path.",
  },
  {
    n: "05",
    alt: "AptyRead: writing practice for letter shapes",
    caption: "Writing. The first-word moment starts here.",
  },
];

const HOMEPAGE_SHOTS = ["03", "06", "08", "05"] as const;

/** Four live-app screens for landing pages. */
export const LANDING_APP_SHOWCASE_ORDER = HOMEPAGE_SHOTS;

type AppShowcaseProps = {
  maxShots?: number;
  shotOrder?: readonly string[];
  className?: string;
};

function resolveShotList(
  maxShots: number,
  shotOrder: readonly string[] | undefined
): { n: string; alt: string; caption: string }[] {
  const source = shotOrder?.length
    ? shotOrder
        .map((id) => shots.find((s) => s.n === id))
        .filter((item): item is (typeof shots)[number] => Boolean(item))
    : shots.slice(0, maxShots);
  return source;
}

export default function AppShowcase({
  maxShots = 4,
  shotOrder,
  className = "",
}: AppShowcaseProps) {
  const list = resolveShotList(maxShots, shotOrder);

  return (
    <section
      className={`bg-white px-4 py-12 md:py-16 ${className}`.trim()}
      aria-labelledby="app-showcase-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2
            id="app-showcase-heading"
            className="text-3xl md:text-4xl font-bold text-apty-dark mb-3"
          >
            See the app.
          </h2>
          <p className="text-base md:text-lg text-apty-gray">
            A lesson. A glance. The path. Then writing.
          </p>
        </div>

        <div
          className={[
            "flex flex-nowrap gap-4 md:gap-5",
            "overflow-x-auto [touch-action:pan-x_pan-y] overscroll-x-contain",
            "snap-x snap-mandatory scroll-px-4 scroll-smooth pb-2 md:pb-0",
            "md:overflow-x-visible",
            "md:grid md:grid-cols-4",
            "-mx-4",
            "px-4",
            "md:mx-0",
            "md:px-0",
            "md:snap-none",
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
          {list.map(({ n, alt, caption }) => (
            <div
              key={n}
              className="flex-shrink-0 w-[min(78vw,300px)] md:w-auto snap-center min-w-0"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-apty-cyan/20 bg-apty-warm">
                <Image
                  src={`/images/app-screenshots/${n}.webp`}
                  alt={alt}
                  width={IMG_W}
                  height={IMG_H}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 78vw, 22vw"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm md:text-base font-semibold text-apty-dark text-center">
                {caption}
              </p>
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
