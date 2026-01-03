'use client';

const levels = [
  {
    number: 1,
    name: "Learning Letters",
    outcome: "Your child masters all letters - sounds, shapes, and writing",
    description: "They learn each letter completely before moving forward. No guessing, no rushing.",
    timeline: "2-4 months",
  },
  {
    number: 2,
    name: "Reading Words",
    outcome: "Your child reads their first words independently",
    description: "Letters become words. Your child feels the joy of real reading - not memorization, actual reading.",
    timeline: "2-4 months",
  },
  {
    number: 3,
    name: "Reading Stories",
    outcome: "Your child reads simple stories with understanding",
    description: "Stories they can actually read. Not guess. Not memorize. Real reading with comprehension.",
    timeline: "2-4 months",
  },
  {
    number: 4,
    name: "Independent Reading",
    outcome: "Your child reads independently with confidence",
    description: "This is real literacy. Your child can read and understand what they read. They&apos;re ready for school.",
    timeline: "2-4 months",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-apty-warm to-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            Your Child&apos;s Reading Journey
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            A clear path from letters to independent reading. Each level builds on the previous one.
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
                      Timeline: {level.timeline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto">
            Your child completes each level before moving forward. This ensures they actually learn, not just move forward quickly.
          </p>
        </div>
      </div>
    </section>
  );
}
