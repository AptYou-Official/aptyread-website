'use client';

const levels = [
  {
    number: 1,
    name: "Learning the Sounds",
    ages: "Ages 3–5",
    outcome: "All 26 letter sounds, upper & lowercase, letter writing",
    description: "Before reading words, a child needs to know that every letter makes a sound and that words are built from those sounds. Level 1 teaches letter sounds in a sequence your child can master one at a time.",
    lessons: "46 lessons",
    timeline: "2–4 months",
  },
  {
    number: 2,
    name: "Reading First Words",
    ages: "Ages 5–6",
    outcome: "First words & sentences, short stories, ~45 common words",
    description: "The moment letters become words. Your child learns to blend sounds, read real words, then short sentences and stories. By the end they read aloud with pride.",
    lessons: "57 lessons",
    timeline: "2–4 months",
  },
  {
    number: 3,
    name: "Reading Anything",
    ages: "Ages 6–8",
    outcome: "All English spelling patterns, paragraphs, comprehension",
    description: "English spelling has patterns — cake, night, beach, bird. Your child stops sounding out letter by letter and starts reading in patterns, like fluent readers do.",
    lessons: "63 lessons",
    timeline: "2–4 months",
  },
  {
    number: 4,
    name: "Reading Real Books",
    ages: "Ages 7–10",
    outcome: "Long words decoded, 4 real books read, full comprehension",
    description: "Your child becomes an independent reader. They decode long words, understand what they read, and read real published books — including classics like The Magic Finger and The Boxcar Children.",
    lessons: "77 lessons",
    timeline: "2–4 months",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-apty-warm to-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            The 4 Levels — One Complete Journey
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            From first sound to first book. Every child starts where they are and ends as a reader.
          </p>
        </div>

        <div className="space-y-6">
          {levels.map((level, index) => (
            <div
              key={level.number}
              className="bg-white p-8 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-apty-coral to-orange-400 rounded-xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                    {level.number}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-apty-coral mb-1">{level.ages}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-apty-dark mb-2">
                      {level.name}
                    </h3>
                    <p className="text-lg font-semibold text-apty-coral mb-2">
                      {level.outcome}
                    </p>
                    <p className="text-apty-gray leading-relaxed">
                      {level.description}
                    </p>
                    <p className="text-sm text-apty-gray mt-3">
                      {level.lessons} · Timeline: {level.timeline}
                      {index < levels.length - 1 && (
                        <span className="block mt-2 text-apty-coral font-medium">
                          Then your child is ready for Level {level.number + 1} →
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto">
            Nothing unlocks until your child is truly ready. No pushing forward before mastery; no holding back once they&apos;re ready to grow. Backed by reading science.
          </p>
        </div>
      </div>
    </section>
  );
}
