'use client';

const concerns = [
  {
    question: "Screen time",
    answer:
      "One lesson. Fifteen minutes. Then done. AptyRead is not designed to keep your child on screen longer. It is designed to get them off screen and into books.",
  },
  {
    question: "Cost",
    answer:
      "Try before you pay. Always. Four lessons free. No registration. No credit card. If it works for your child, then decide. Not before.",
  },
  {
    question: "Will it work?",
    answer:
      "Reading is not a talent. It is a skill. Every child who follows the program builds the foundation. The structure does the work. Your child does the learning.",
  },
  {
    question: "Pressure",
    answer:
      "No rushing. No comparison. No pressure. One lesson when your child is ready. AptyRead moves when your child moves.",
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
