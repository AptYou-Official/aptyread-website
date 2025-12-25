const levels = [
  {
    number: 1,
    name: "Learning Letters",
    lessons: 46,
    description: "Your child learns each letter's sound and shape. They trace, hear, and speak each one until it's natural.",
  },
  {
    number: 2,
    name: "Reading Words",
    lessons: 48,
    description: "Now letters become words. Your child reads their first words and feels the joy of real reading.",
  },
  {
    number: 3,
    name: "Story Read",
    lessons: 60,
    description: "Simple stories that your child can actually read. Not guess. Not memorize. Read.",
  },
  {
    number: 4,
    name: "Story Master",
    lessons: 60,
    description: "Your child reads independently and understands what they read. This is real literacy.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-apty-warm py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-apty-dark text-center mb-4">
          How Your Child Learns
        </h2>
        <p className="text-xl text-apty-gray text-center mb-16 max-w-2xl mx-auto">
          Four levels. One step at a time. Real progress.
        </p>
        <div className="space-y-8">
          {levels.map((level) => (
            <div
              key={level.number}
              className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-apty-coral text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {level.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-2xl font-semibold text-apty-dark">
                      Level {level.number}: {level.name}
                    </h3>
                    <span className="text-apty-gray text-sm mt-2 md:mt-0">
                      {level.lessons} lessons
                    </span>
                  </div>
                  <p className="text-apty-gray leading-relaxed text-lg">
                    {level.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-white p-8 rounded-lg border border-apty-coral-accent">
          <h3 className="text-2xl font-semibold text-apty-dark mb-4 text-center">
            Every Lesson Has
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-apty-gray">
            <div className="flex items-start gap-3">
              <span className="text-apty-coral">✓</span>
              <span>Environmental sounds that teach letter sounds naturally</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-apty-coral">✓</span>
              <span>Letter tracing for muscle memory</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-apty-coral">✓</span>
              <span>Word building that makes sense</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-apty-coral">✓</span>
              <span>Speaking practice with instant feedback</span>
            </div>
            <div className="flex items-start gap-3 md:col-span-2 justify-center">
              <span className="text-apty-coral">✓</span>
              <span>Stories at exactly the right level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

