'use client';

const principles = [
  {
    icon: "📚",
    title: "Course-Based, Not Content-Based",
    description: "Structured curriculum. Every lesson builds on the previous one.",
  },
  {
    icon: "🔒",
    title: "Sequential Learning",
    description: "Can't skip levels. Master Level 1 before accessing Level 2.",
  },
  {
    icon: "🎯",
    title: "Mastery-Driven",
    description: "70% minimum to move forward. Reviews every 3 lessons.",
  },
  {
    icon: "❤️",
    title: "Child Wellbeing First",
    description: "1 new lesson per day (parent can set max 2). No pressure, no rushing.",
  },
  {
    icon: "🏫",
    title: "Classroom-Like Pedagogy",
    description: "Concept → Video → Activity. Apty (your friendly guide) + AI &quot;younger sister&quot; teacher make learning warm and engaging.",
  },
  {
    icon: "🧭",
    title: "No Subscriptions",
    description: "Try before register. Try before pay. Pay level-by-level only.",
  },
];

export default function OurApproach() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
            Built on Principles That Actually Work
          </h2>
          <p className="text-lg text-apty-gray max-w-2xl mx-auto">
            This is our approach. Here&apos;s why it works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="p-6 bg-apty-warm rounded-xl border border-apty-coral-accent hover:border-apty-coral transition-all duration-300"
            >
              <div className="text-4xl mb-4">{principle.icon}</div>
              <h3 className="text-xl font-bold text-apty-dark mb-2">
                {principle.title}
              </h3>
              <p className="text-apty-gray leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

