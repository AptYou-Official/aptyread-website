'use client';

const levels = [
  {
    number: 1,
    name: "I am Learning Letters",
    parentQuote: "My child knows the alphabet but can't read yet.",
    description: "Children build sound foundations first. They learn letter sounds, letter forms, and early decoding confidence.",
    pills: ["All 26 letter sounds", "Upper & lowercase letters", "Letter writing", "46 lessons"],
    accent: "blue",
  },
  {
    number: 2,
    name: "I Can Read!",
    parentQuote: "My child knows the sounds but can't put them together.",
    description: "Children blend sounds into words, then read sentences and short stories. This is where reading starts to click.",
    pills: ["First words & sentences", "Short stories", "~45 common words", "57 lessons"],
    accent: "green",
  },
  {
    number: 3,
    name: "I Am Reading!",
    parentQuote: "My child reads simple words but struggles with longer texts.",
    description: "Children learn key reading patterns and read longer passages with stronger fluency and comprehension.",
    pills: ["Key spelling patterns", "Paragraph reading", "Comprehension checks", "63 lessons"],
    accent: "orange",
  },
  {
    number: 4,
    name: "I Am a Reader!",
    parentQuote: "My child reads but struggles with longer or harder words.",
    description: "Children build independent reading habits for longer texts and real books with stronger understanding.",
    pills: ["Long-word strategies", "Real book reading", "Independent confidence", "77 lessons"],
    accent: "purple",
  },
];

const pillColors: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-green-100 text-green-800 border-green-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
};

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-apty-warm to-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            The 4 Levels: One Complete Journey
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            From first sound to fluent reader. Every child starts at Level 1 and moves forward with the right foundation.
          </p>
        </div>

        <div className="relative space-y-6">
          {/* Timeline line (runs beside level numbers on desktop) */}
          <div className="absolute left-[4.5rem] top-6 bottom-6 w-0.5 bg-apty-coral/25 hidden md:block" aria-hidden />
          {levels.map((level, index) => (
            <div
              key={level.number}
              className="relative bg-white p-8 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-apty-coral to-orange-400 rounded-xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                    {level.number}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-apty-dark mb-2">
                      {level.name}
                    </h3>
                    <p className="text-base md:text-lg italic text-apty-coral mb-3">
                      &ldquo;{level.parentQuote}&rdquo;
                    </p>
                    <p className="text-apty-gray leading-relaxed mb-4">
                      {level.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {level.pills.map((pill) => (
                        <span
                          key={pill}
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${pillColors[level.accent]}`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                    {index < levels.length - 1 && (
                      <p className="text-sm text-apty-coral font-medium mt-4">
                        Then your child is ready for Level {level.number + 1} →
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center space-y-4">
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto">
            Lessons unlock in order. Children progress when they are ready, not when a timer says so.
          </p>
          <p className="text-base md:text-lg font-semibold text-apty-dark max-w-2xl mx-auto">
            No direct entry to Level 2, 3, or 4. Strong foundations come first.
          </p>
        </div>
      </div>
    </section>
  );
}
