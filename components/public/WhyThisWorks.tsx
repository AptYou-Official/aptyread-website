'use client';

const benefits = [
  {
    icon: "🎯",
    title: "Your Child Actually Learns",
    description: "Structured learning, not random games. Every lesson builds on the previous one. Your child masters each step before moving forward.",
  },
  {
    icon: "❤️",
    title: "Respects Your Child's Pace",
    description: "One lesson per day by default (you can set it to 2 if needed). No pressure, no rushing. Your child learns at their own speed.",
  },
  {
    icon: "🔒",
    title: "No Skipping Levels — Foundation First",
    description: "Nobody can join Level 2, 3, or 4 directly. Level checking isn't possible; without the correct foundation, children cannot move on. Every child builds the right base first, so the program works for everyone.",
  },
  {
    icon: "💰",
    title: "Try Before You Commit",
    description: "Try 4 lessons free. No registration needed. Then enroll level-by-level. Complete Level 1, then decide if you want Level 2.",
  },
  {
    icon: "🏫",
    title: "A Complete Program, Not Just an App",
    description: "Structured like a real reading class. Concept, then practice, then done. No random games — a clear sequence that takes your child from sounds to real books.",
  },
  {
    icon: "🛡️",
    title: "Child Wellbeing First",
    description: "Designed for healthy screen time. No ads, no distractions. One lesson, then done. Steady progress that respects your child.",
  },
];

export default function WhyThisWorks() {
  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            Why This Works for Your Child
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            We don&apos;t try to keep children inside an app. We help them become confident readers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-apty-warm rounded-xl border border-apty-coral-accent hover:border-apty-coral transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-apty-dark mb-3">
                {benefit.title}
              </h3>
              <p className="text-apty-gray leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
