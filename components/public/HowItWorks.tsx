'use client';

const levels = [
  {
    number: 1,
    name: "Learning Letters",
    lessons: 46,
    timeline: "2-4 months",
    description: "33 letter lessons + 13 reviews + 2 assessments. Master all letters before moving forward.",
  },
  {
    number: 2,
    name: "Reading Words",
    lessons: 45,
    timeline: "2-4 months",
    description: "Letters become words. Your child reads their first words.",
  },
  {
    number: 3,
    name: "Story Read",
    lessons: 40,
    timeline: "2-4 months",
    description: "Simple stories they can actually read. Not guess. Not memorize.",
  },
  {
    number: 4,
    name: "Story Master",
    lessons: 35,
    timeline: "2-4 months",
    description: "Independent reading with understanding. This is real literacy.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
            Four Levels. One Step at a Time.
          </h2>
          <p className="text-lg text-apty-gray max-w-2xl mx-auto mb-2">
            Complete Level 1 before accessing Level 2. Sequential unblocking ensures proper foundation.
          </p>
          <p className="text-sm text-apty-gray italic">
            English Reading & Writing Course
          </p>
        </div>

        <div className="space-y-4">
          {levels.map((level, index) => (
            <div
              key={level.number}
              className="bg-apty-warm p-6 rounded-xl border border-apty-coral-accent hover:border-apty-coral transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-apty-coral to-orange-400 rounded-lg flex items-center justify-center text-2xl font-bold text-white">
                    {level.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-apty-dark">
                      {level.name}
                    </h3>
                    <div className="flex gap-3 text-sm text-apty-gray mt-1">
                      <span>{level.lessons} lessons</span>
                      <span>•</span>
                      <span>{level.timeline}</span>
                    </div>
                  </div>
                </div>
                <p className="md:ml-auto text-apty-gray flex-1">
                  {level.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
