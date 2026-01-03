'use client';

const highlights = [
  {
    stat: "12 Topics",
    label: "Per Letter",
    description: "Recognition, sound, pronunciation, words, writing",
  },
  {
    stat: "460+",
    label: "Learning Activities",
    description: "In Level 1 alone",
  },
  {
    stat: "70%",
    label: "Mastery Required",
    description: "To move forward",
  },
  {
    stat: "1 Lesson",
    label: "Per Day",
    description: "Healthy learning pace",
  },
];

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-white to-apty-warm py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
            Comprehensive Learning
          </h2>
          <p className="text-lg text-apty-gray max-w-2xl mx-auto">
            Each letter gets 12 focused topics. Not just a game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl border border-apty-coral-accent"
            >
              <div className="text-4xl md:text-5xl font-bold text-apty-coral mb-2">
                {highlight.stat}
              </div>
              <div className="text-lg font-semibold text-apty-dark mb-2">
                {highlight.label}
              </div>
              <div className="text-sm text-apty-gray">
                {highlight.description}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Learning Flow */}
        <div className="bg-white p-8 rounded-2xl border border-apty-coral-accent">
          <h3 className="text-2xl font-bold text-apty-dark mb-2 text-center">
            Every Letter Lesson Includes
          </h3>
          <p className="text-center text-apty-gray mb-6 text-sm">
            Apty guides your child through each step with warmth and encouragement
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Letter recognition (big & small)",
              "Sound production with mouth placement",
              "AI pronunciation feedback",
              "Word association (3 words per letter)",
              "Writing practice (uppercase & lowercase)",
              "Celebration & review",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-apty-coral text-xl flex-shrink-0">✓</span>
                <span className="text-apty-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
