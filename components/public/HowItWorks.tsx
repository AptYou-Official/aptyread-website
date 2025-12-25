'use client';

const levels = [
  {
    number: 1,
    name: "Learning Letters",
    lessons: 46,
    description: "Each letter&apos;s sound and shape. Trace, hear, speak until it&apos;s natural.",
    gradient: "from-apty-coral to-orange-400",
  },
  {
    number: 2,
    name: "Reading Words",
    lessons: 48,
    description: "Letters become words. Your child reads their first words and feels the joy.",
    gradient: "from-apty-cyan to-blue-400",
  },
  {
    number: 3,
    name: "Story Read",
    lessons: 60,
    description: "Simple stories they can actually read. Not guess. Not memorize. Read.",
    gradient: "from-apty-gold to-yellow-400",
  },
  {
    number: 4,
    name: "Story Master",
    lessons: 60,
    description: "Independent reading with understanding. This is real literacy.",
    gradient: "from-green-400 to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-apty-warm to-white py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-apty-dark mb-4">
            The Journey
          </h2>
          <p className="text-xl text-apty-gray max-w-2xl mx-auto">
            Four levels. One step at a time. Real progress you can see.
          </p>
        </div>

        <div className="space-y-6">
          {levels.map((level, index) => (
            <div
              key={level.number}
              className="group relative"
            >
              {/* Connecting line (hidden on last item) */}
              {index < levels.length - 1 && (
                <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-apty-coral-accent to-transparent hidden md:block"></div>
              )}
              
              <div className="relative bg-white p-8 md:p-10 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${level.gradient} rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                      {level.number}
                      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-3xl md:text-4xl font-bold text-apty-dark mb-2 md:mb-0">
                        {level.name}
                      </h3>
                      <span className="inline-block px-4 py-2 bg-apty-warm text-apty-dark rounded-full text-sm font-semibold">
                        {level.lessons} lessons
                      </span>
                    </div>
                    <p className="text-lg md:text-xl text-apty-gray leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What's in Every Lesson */}
        <div className="mt-16 bg-gradient-to-br from-apty-warm to-white p-10 rounded-3xl border-2 border-apty-coral-accent shadow-xl">
          <h3 className="text-3xl font-bold text-apty-dark mb-8 text-center">
            Every Lesson Includes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Environmental sounds for natural learning",
              "Letter tracing for muscle memory",
              "Word building that makes sense",
              "Speaking practice with instant feedback",
              "Stories at the perfect level",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white/60 rounded-xl">
                <span className="text-2xl text-apty-coral flex-shrink-0">✓</span>
                <span className="text-apty-dark font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
