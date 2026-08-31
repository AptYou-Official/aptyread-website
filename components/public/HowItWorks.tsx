'use client';

const levels = [
  {
    number: 1,
    name: "I Am Learning Letters",
    parentQuote: "My child knows the alphabet but can't read yet.",
    description: "Every letter sound, before any word.",
  },
  {
    number: 2,
    name: "I Can Read!",
    parentQuote: "My child knows the sounds but can't put them together.",
    description: "First words. First sentences. First stories.",
  },
  {
    number: 3,
    name: "I Can Read Big Words!",
    parentQuote: "My child reads simple words but longer words are hard.",
    description: "Letter teams. Blends. Short passages, alone.",
  },
  {
    number: 4,
    name: "I Am Reading!",
    parentQuote: "My child can read, but not smoothly yet.",
    description: "Paragraphs that get smoother over time.",
  },
  {
    number: 5,
    name: "I Am a Reader!",
    parentQuote: "I want them to pick up a real book alone.",
    description: "Three real books, cover to cover.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-apty-warm py-14 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Five levels. One path.
          </h2>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto leading-relaxed">
            They move to the next level only when ready. No skipping. No gaps.
          </p>
        </div>

        <div className="space-y-4">
          {levels.map((level) => (
            <div
              key={level.number}
              className="bg-white p-5 md:p-6 rounded-2xl border border-apty-coral-accent hover:border-apty-coral transition-colors shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 ${
                    level.number % 2 === 0 ? "bg-apty-cyan" : "bg-apty-coral"
                  }`}
                >
                  {level.number}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-1">
                    {level.name}
                  </h3>
                  <p className="text-sm md:text-base italic text-apty-coral mb-2">
                    &ldquo;{level.parentQuote}&rdquo;
                  </p>
                  <p className="text-apty-gray leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
