'use client';

const benefits = [
  {
    icon: "🎯",
    title: "Real Learning, Not Just an App",
    description: "A complete program: 4 levels, 243 lessons. Every lesson builds on the last. Concept, then practice, then done. Real-world reading, not just screen time.",
  },
  {
    icon: "🔒",
    title: "Foundation First. No Skipping Levels.",
    description: "Nobody can join Level 2, 3, or 4 directly. Without the right foundation, children cannot move on. Every child builds the right base first.",
  },
  {
    icon: "💰",
    title: "Try Before You Commit",
    description: "Try 4 lessons free. No registration. Then enroll level by level. Finish Level 1, then decide if you want Level 2. No subscriptions.",
  },
  {
    icon: "🛡️",
    title: "Child Wellbeing First",
    description: "One lesson per day. No ads, no distractions. Your child learns at their own pace, then they&apos;re done. Healthy habits, real progress.",
  },
];

export default function WhyThisWorks() {
  return (
    <section className="bg-white py-14 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Why AptyRead
          </h2>
          <p className="text-lg text-apty-gray max-w-2xl mx-auto">
            Our aim is to help children become confident readers. We don&apos;t keep them stuck in an app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-apty-warm rounded-xl border border-apty-coral-accent hover:border-apty-coral transition-all duration-300"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-apty-dark mb-2">
                {benefit.title}
              </h3>
              <p className="text-apty-gray leading-relaxed text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
