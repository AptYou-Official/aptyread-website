'use client';

const concerns = [
  {
    question: "Worried about screen time?",
    answer: "One lesson per day. Designed for healthy habits. No pressure to use more. Your child learns, then done.",
    icon: "⏱️",
  },
  {
    question: "Worried about cost?",
    answer: "Try 4 lessons free. Pay level-by-level only. No subscriptions. Complete Level 1, then decide if you want more.",
    icon: "💰",
  },
  {
    question: "Worried it won't work?",
    answer: "Structured, proven approach. Your child masters each step before moving forward. Real progress, real results.",
    icon: "✅",
  },
  {
    question: "Worried about pressure?",
    answer: "Respects your child's pace. No rushing. One lesson, then done. You control how fast or slow they learn.",
    icon: "❤️",
  },
];

export default function ParentPeaceOfMind() {
  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            Designed with Parents in Mind
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            We understand your concerns. Here&apos;s how we address them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="bg-apty-warm p-6 md:p-8 rounded-xl border border-apty-coral-accent hover:border-apty-coral transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl md:text-4xl flex-shrink-0">{concern.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-3">
                    {concern.question}
                  </h3>
                  <p className="text-apty-gray leading-relaxed text-base md:text-lg">
                    {concern.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

