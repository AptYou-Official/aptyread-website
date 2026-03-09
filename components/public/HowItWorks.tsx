'use client';

const levels = [
  {
    number: 1,
    name: "Learning the Sounds",
    ages: "Ages 3–5",
    parentQuote: "My child knows the alphabet but can't read yet.",
    description: "Before reading words, a child needs to understand that every letter makes a sound — and that words are built from those sounds. Level 1 teaches all the letter sounds in a sequence your child can master one at a time, with videos, games, and gentle practice that builds real confidence.",
    pills: ["All 26 letter sounds", "Upper & lowercase letters", "Letter writing", "46 lessons"],
    accent: "blue",
  },
  {
    number: 2,
    name: "Reading First Words",
    ages: "Ages 5–6",
    parentQuote: "My child knows the sounds but can't put them together.",
    description: "This is the most magical moment in a child's reading life — when letters stop being shapes and start being words. Level 2 teaches your child to blend sounds together, read real words for the first time, then short sentences and stories. By the end, they read aloud with pride.",
    pills: ["First words & sentences", "Short stories", "~45 common words", "57 lessons"],
    accent: "green",
  },
  {
    number: 3,
    name: "Reading Anything",
    ages: "Ages 6–8",
    parentQuote: "My child reads simple words but struggles with longer texts.",
    description: "English spelling has patterns — and Level 3 teaches them all. Words like cake, night, beach, bird. Your child stops sounding out letter by letter and starts reading in patterns — which is how all fluent readers read. By the end of Level 3, they can pick up a page of text and read it.",
    pills: ["All English spelling patterns", "Paragraphs & passages", "Reading comprehension", "63 lessons"],
    accent: "orange",
  },
  {
    number: 4,
    name: "Reading Real Books",
    ages: "Ages 7–10",
    parentQuote: "My child reads but struggles with longer or harder words.",
    description: "Level 4 is where your child becomes a true, independent reader. They learn to decode long words, understand what they read, and read real published books — including Roald Dahl's The Magic Finger and The Boxcar Children. They finish not just better at reading — but genuinely in love with books.",
    pills: ["Long words decoded", "4 real books read", "Full comprehension", "77 lessons"],
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
            The 4 Levels — One Complete Journey
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            From first sound to fluent reader. Every child starts at the start; no one can join Level 2 or higher without the correct foundation.
          </p>
        </div>

        <div className="space-y-6">
          {levels.map((level, index) => (
            <div
              key={level.number}
              className="bg-white p-8 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-apty-coral to-orange-400 rounded-xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                    {level.number}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-apty-gray mb-1">{level.ages}</p>
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
            Nothing unlocks until your child is truly ready. No pushing forward before mastery; no holding back once they&apos;re ready to grow. Backed by reading science.
          </p>
          <p className="text-base md:text-lg font-semibold text-apty-dark max-w-2xl mx-auto">
            Nobody can join Level 2, 3, or 4 without the correct foundation. Without it, children cannot move on — so every child builds the right base first.
          </p>
        </div>
      </div>
    </section>
  );
}
