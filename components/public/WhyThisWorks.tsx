'use client';

const benefits = [
  {
    icon: "🎯",
    title: "Your Child Actually Learns",
    description: "Structured curriculum, not random games. Every lesson builds on the previous one. Your child masters each step before moving forward.",
  },
  {
    icon: "❤️",
    title: "Respects Your Child's Pace",
    description: "One lesson per day by default (you can adjust to max 2). No pressure, no rushing. Your child learns at their natural pace.",
  },
  {
    icon: "🔒",
    title: "Real Progress, Not Guessing",
    description: "Your child can't skip ahead. They must master Level 1 before accessing Level 2. This ensures they actually learn, not just guess.",
  },
  {
    icon: "💰",
    title: "Pay Only For What You Need",
    description: "No subscriptions. Try 4 lessons free. Then pay level-by-level. Complete Level 1 (2-4 months), then decide on Level 2.",
  },
  {
    icon: "🏫",
    title: "Classroom-Like Learning",
    description: "Concept → Video → Activity. Apty (your friendly guide) and an AI teacher make learning warm and engaging, just like a real classroom.",
  },
  {
    icon: "🛡️",
    title: "Child Wellbeing First",
    description: "Designed for healthy screen time. No ads, no distractions, no binge learning. Just steady, healthy progress that respects your child.",
  },
];

export default function WhyThisWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
            Why This Works for Your Child
          </h2>
          <p className="text-xl text-apty-gray max-w-3xl mx-auto">
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

