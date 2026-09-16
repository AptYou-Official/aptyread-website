import Link from "next/link";
import PathJourneyCue from "@/components/public/PathJourneyCue";

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
    <section className="relative overflow-hidden bg-apty-cream py-14 md:py-20 px-4">
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

        <PathJourneyCue className="mb-10 md:mb-14" />

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
