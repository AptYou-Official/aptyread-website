const levels = [
  {
    number: 1,
    name: "I Am Learning Letters",
    parentQuote: "My child knows the alphabet but can't read yet.",
    description: "Every letter sound, before any word.",
    featured: false,
    preview: { kind: "letters" as const, items: ["s", "a", "t"] },
  },
  {
    number: 2,
    name: "I Can Read!",
    parentQuote: "My child knows the sounds but can't put them together.",
    description: "First words. First sentences. First stories.",
    featured: true,
    preview: { kind: "words" as const, items: ["cat", "sat"] },
  },
  {
    number: 3,
    name: "I Can Read Big Words!",
    parentQuote: "My child reads simple words but longer words are hard.",
    description: "Letter teams. Blends. Short passages, alone.",
    featured: false,
    preview: { kind: "words" as const, items: ["ship", "that"] },
  },
  {
    number: 4,
    name: "I Am Reading!",
    parentQuote: "My child can read, but not smoothly yet.",
    description: "Paragraphs that get smoother over time.",
    featured: false,
    preview: { kind: "paragraph" as const },
  },
  {
    number: 5,
    name: "I Am a Reader!",
    parentQuote: "I want them to pick up a real book alone.",
    description: "Three real books, cover to cover.",
    featured: false,
    preview: { kind: "books" as const },
  },
];

function LevelPreview({
  preview,
  featured,
}: {
  preview: (typeof levels)[number]["preview"];
  featured: boolean;
}) {
  if (preview.kind === "letters") {
    return (
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {preview.items.map((letter, index) => (
          <span
            key={letter}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold ${
              index === 0
                ? "bg-apty-coral text-white"
                : "border border-apty-coral-accent bg-white text-apty-dark"
            }`}
          >
            {letter}
          </span>
        ))}
      </div>
    );
  }

  if (preview.kind === "words") {
    return (
      <div className="flex flex-wrap items-center gap-2" aria-hidden="true">
        {preview.items.map((word) => (
          <span
            key={word}
            className={`rounded-lg px-3 py-1 text-sm font-semibold ${
              featured
                ? "bg-white text-apty-dark border border-apty-coral/30"
                : "bg-apty-warm text-apty-dark border border-apty-coral-accent"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    );
  }

  if (preview.kind === "paragraph") {
    return (
      <div className="w-28 space-y-1.5" aria-hidden="true">
        <span className="block h-1.5 w-full rounded-full bg-apty-coral/40" />
        <span className="block h-1.5 w-11/12 rounded-full bg-apty-coral/30" />
        <span className="block h-1.5 w-4/5 rounded-full bg-apty-coral/20" />
      </div>
    );
  }

  return (
    <div className="flex items-end gap-1.5" aria-hidden="true">
      <span className="h-8 w-5 rounded-sm bg-apty-coral/80" />
      <span className="h-10 w-5 rounded-sm bg-apty-coral" />
      <span className="h-7 w-5 rounded-sm bg-apty-coral/60" />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-apty-warm py-14 md:py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Five levels. One path.
          </h2>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto leading-relaxed">
            They move to the next level only when ready. No skipping. No gaps.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-5 top-3 bottom-3 w-px bg-apty-coral/25 md:left-6"
          />
          <ol>
            {levels.map((level) => (
            <li
              key={level.number}
              className={`relative flex gap-4 md:gap-5 ${
                level.featured ? "py-2" : "py-1.5"
              }`}
            >
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-apty-coral text-lg font-bold text-white shadow-sm md:h-12 md:w-12 md:text-xl">
                {level.number}
              </div>
              <div
                className={`min-w-0 flex-1 rounded-2xl ${
                  level.featured
                    ? "border-2 border-apty-coral bg-apty-warm p-5 md:p-7 shadow-md"
                    : "border border-apty-coral-accent bg-white p-4 md:p-5 shadow-sm"
                }`}
              >
                <h3
                  className={`font-bold text-apty-dark ${
                    level.featured
                      ? "text-2xl md:text-3xl mb-2"
                      : "text-xl md:text-2xl mb-1"
                  }`}
                >
                  {level.name}
                </h3>
                <p className="text-sm md:text-base text-apty-dark/80 mb-2 leading-relaxed">
                  &ldquo;{level.parentQuote}&rdquo;
                </p>
                <p className="text-apty-gray leading-relaxed mb-3">
                  {level.description}
                </p>
                <LevelPreview preview={level.preview} featured={level.featured} />
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
