'use client';

const benefits = [
  {
    icon: "🎯",
    title: "A Complete Literacy Program",
    description: "4 levels, 243 lessons, one clear sequence. Each lesson builds on what your child already learned.",
  },
  {
    icon: "🔒",
    title: "Foundation First",
    description: "Children start at Level 1 and move forward when ready. No skipping, no gaps in learning.",
  },
  {
    icon: "🎁",
    title: "Start Free, No Pressure",
    description: "Try 4 lessons free with no registration. Then enroll level by level, with no subscription pressure.",
  },
  {
    icon: "🛡️",
    title: "No Ads. No Distractions.",
    description: "Short, focused lessons with a routine that supports children and parents.",
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
            Our goal is simple: help children become confident, independent readers.
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
