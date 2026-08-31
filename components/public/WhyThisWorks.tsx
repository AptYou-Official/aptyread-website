'use client';

const benefits = [
  {
    title: "One complete program",
    description:
      "Five levels. 238 lessons. Every step connects to the next. Nothing missing. Nothing rushed.",
  },
  {
    title: "Foundation first. Always.",
    description:
      "A child moves forward only when the previous step is mastered. No gaps. No guessing.",
  },
  {
    title: "Start free. No pressure.",
    description:
      "Open the app and start Lesson 1. No account needed. See if your child responds. Then decide.",
  },
  {
    title: "No ads. No distractions.",
    description:
      "Just your child and the lesson. Clean. Focused. Done in fifteen minutes.",
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
          <p className="text-lg md:text-xl text-apty-gray max-w-2xl mx-auto leading-relaxed">
            Reading has to be taught. AptyRead teaches it the right way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 md:p-7 bg-apty-warm rounded-xl border border-apty-coral-accent"
            >
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
