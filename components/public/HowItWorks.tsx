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

export default function HowItWorks() {
  return (
    <section className="bg-white py-14 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-apty-dark mb-3 tracking-tight">
            Five levels. One path.
          </h2>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto leading-relaxed">
            Every child starts at Level 1. Each level builds on the skills
            developed in the previous one. They move forward when ready.
          </p>
        </div>

        {/* Instant sequential cue: 01 → 02 → 03 → 04 → 05 */}
        <ol className="mb-10 md:mb-14 flex items-start justify-between gap-1 sm:gap-2 max-w-3xl mx-auto">
          {levels.map((level, index) => (
            <li
              key={level.number}
              className="relative flex flex-1 flex-col items-center text-center min-w-0"
            >
              {index < levels.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+1.1rem)] right-[-50%] top-5 h-px bg-apty-coral/35 hidden sm:block"
                />
              ) : null}
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-apty-coral text-sm font-bold text-white md:h-11 md:w-11 md:text-base">
                {String(level.number).padStart(2, "0")}
              </span>
              <span className="mt-3 text-[11px] sm:text-xs md:text-sm font-semibold text-apty-dark leading-snug px-0.5">
                {level.name}
              </span>
            </li>
          ))}
        </ol>

        <ol className="space-y-0 divide-y divide-apty-border max-w-3xl mx-auto">
          {levels.map((level) => (
            <li key={level.number} className="py-5 md:py-6 first:pt-0">
              <div className="flex gap-4 md:gap-5">
                <span className="text-sm font-bold text-apty-coral tabular-nums pt-1 w-8 flex-shrink-0">
                  {String(level.number).padStart(2, "0")}
                </span>
                <div className="min-w-0">
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
              </div>
            </li>
          ))}
        </ol>

        <p className="text-center mt-10 md:mt-12">
          <Link
            href="/reading-guide/the-aptyread-path"
            className="text-base md:text-lg font-semibold text-apty-coral hover:text-apty-dark transition-colors"
          >
            See the full Five-Level Path →
          </Link>
        </p>
      </div>
    </section>
  );
}
