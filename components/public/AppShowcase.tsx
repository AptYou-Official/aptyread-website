"use client";

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
    alt: "AptyRead: a clear path through letters and lessons with a simple start",
  },
];

type AppShowcaseProps = {
  /** Use fewer shots on long ad landing pages so the page does not feel endless. */
  maxShots?: number;
  /** e.g. hide bottom border when another white section follows */
  className?: string;
};

export default function AppShowcase({ maxShots = 8, className = "" }: AppShowcaseProps) {
  const list = shots.slice(0, maxShots);
  const isCompact = maxShots <= 4;

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
          className="flex gap-4 md:gap-5 overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none"
          style={{ scrollbarGutter: "stable" }}
        >
          {list.map(({ n, alt }) => (
            <div
              key={n}
              className="flex-shrink-0 w-[min(75vw,280px)] md:w-auto snap-center"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-apty-coral-accent/40 bg-apty-warm">
                <Image
                  src={`/images/app-screenshots/${n}.webp`}
                  alt={alt}
                  width={IMG_W}
                  height={IMG_H}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 75vw, (max-width: 1024px) 40vw, 25vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
