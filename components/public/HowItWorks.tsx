import Link from "next/link";

const levels = [
  {
    number: 1,
    name: "Sound Foundations",
    parentQuote: "My child knows the alphabet but can't read yet.",
    description: "Every letter sound, before any word.",
  },
  {
    number: 2,
    name: "First Reading",
    parentQuote: "My child knows the sounds but can't put them together.",
    description: "First words. First sentences. First stories.",
  },
  {
    number: 3,
    name: "Confident Reading",
    parentQuote: "My child reads simple words but longer words are hard.",
    description: "Letter teams. Blends. Short passages, alone.",
  },
  {
    number: 4,
    name: "Building Fluency",
    parentQuote: "My child can read, but not smoothly yet.",
    description: "Paragraphs that get smoother over time.",
  },
  {
    number: 5,
    name: "Independent Reading",
    parentQuote: "I want them to pick up a real book alone.",
    description: "Three real books, cover to cover.",
  },
];

function PathSpark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5l1.35 7.2L20.5 10 13.35 11.3 12 18.5l-1.35-7.2L3.5 10l7.15-1.3L12 1.5z" />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-apty-cream py-14 md:py-20 px-4">
      {/* Soft sky wash — fades into cream, no hard section edge */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-apty-cream via-apty-sky/80 to-apty-cream"
        aria-hidden="true"
      />
      <div className="container relative mx-auto max-w-5xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-apty-dark mb-3 tracking-tight">
            Five levels. One path.
          </h2>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto leading-relaxed">
            Every child starts at Level 1. Each level builds on the skills
            developed in the previous one. They move forward when ready.
          </p>
        </div>

        {/* Journey cue: same 01–05 structure, orbit-curved path */}
        <div className="relative mb-10 md:mb-14 max-w-3xl mx-auto px-1 sm:px-2">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-3 hidden h-14 w-full sm:block md:top-3.5 md:h-16"
            viewBox="0 0 1000 80"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            {/* Soft glow trail */}
            <path
              d="M70 44 C170 10, 230 10, 300 44 S430 78, 500 40 S630 6, 700 44 S830 78, 900 36 L955 28"
              stroke="#00B8D9"
              strokeOpacity="0.14"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Main curved journey line */}
            <path
              d="M70 44 C170 10, 230 10, 300 44 S430 78, 500 40 S630 6, 700 44 S830 78, 900 36 L955 28"
              stroke="#00B8D9"
              strokeOpacity="0.45"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Path arrow */}
            <path
              d="M940 20 L958 28 L940 40"
              stroke="#00B8D9"
              strokeOpacity="0.55"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <PathSpark className="pointer-events-none absolute left-[18%] top-0 hidden h-2.5 w-2.5 text-apty-cyan/50 sm:block" />
          <PathSpark className="pointer-events-none absolute left-[52%] top-12 hidden h-2 w-2 text-apty-indigo/30 sm:block" />
          <PathSpark className="pointer-events-none absolute right-[14%] top-1 hidden h-2.5 w-2.5 text-apty-cyan/40 sm:block" />

          <ol className="relative z-10 flex items-start justify-between gap-1 sm:gap-2">
            {levels.map((level) => (
              <li
                key={level.number}
                className="flex flex-1 flex-col items-center text-center min-w-0"
              >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-apty-cyan text-sm font-bold text-white shadow-[0_0_0_6px_rgba(230,246,251,0.95)] md:h-12 md:w-12 md:text-base md:shadow-[0_0_0_7px_rgba(230,246,251,0.95)]">
                  {String(level.number).padStart(2, "0")}
                </span>
                <span className="mt-3 text-[11px] sm:text-xs md:text-sm font-bold text-apty-dark leading-snug px-0.5">
                  {level.name}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <ol className="max-w-3xl mx-auto space-y-6 md:space-y-7">
          {levels.map((level) => (
            <li key={level.number} className="flex gap-4 md:gap-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-apty-cyan text-xs font-bold text-white shadow-[0_0_0_5px_rgba(230,246,251,0.9)] md:h-10 md:w-10 md:text-sm">
                {String(level.number).padStart(2, "0")}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-lg md:text-xl font-bold text-apty-dark mb-1 tracking-tight">
                  {level.name}
                </h3>
                <p className="text-sm md:text-base text-apty-gray mb-1.5 leading-relaxed">
                  &ldquo;{level.parentQuote}&rdquo;
                </p>
                <p className="text-apty-dark/80 leading-relaxed">
                  {level.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-center mt-10 md:mt-12">
          <Link
            href="/reading-guide/the-aptyread-path"
            className="text-base md:text-lg font-semibold text-apty-cyan hover:text-apty-dark transition-colors"
          >
            See the full Five-Level Path →
          </Link>
        </p>
      </div>
    </section>
  );
}
