'use client';

const concerns = [
  {
    question: "Screen time",
    answer:
      "You set a daily limit: 1 or 2 new lessons. About fifteen minutes. Then they are done.",
  },
  {
    question: "Cost",
    answer:
      "No ads. No subscription. Open the app and start Lesson 1. No account needed. Buy a level once, when you are ready.",
  },
  {
    question: "Will it work?",
    answer:
      "Reading is a skill. Built on the Science of Reading. They move forward only when ready. No skipping. No gaps.",
  },
  {
    question: "Pressure",
    answer:
      "No rushing. No comparison. One or two new lessons when your child is ready. AptyRead waits with them.",
  },
];

export default function ParentPeaceOfMind() {
  return (
    <section className="bg-apty-warm py-14 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Built for how parents actually live
          </h2>
          <p className="text-lg text-apty-gray max-w-2xl mx-auto">
            Clear limits. Clear costs. Clear progress. No noise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {concerns.map((concern) => (
            <div
              key={concern.question}
              className="bg-white p-6 md:p-7 rounded-xl border border-apty-coral-accent shadow-sm"
            >
              <h3 className="text-xl font-bold text-apty-dark mb-2">
                {concern.question}
              </h3>
              <p className="text-apty-gray leading-relaxed text-base">
                {concern.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
