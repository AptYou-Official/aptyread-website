'use client';

export default function Features() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
            What Makes It Different
          </h2>
          <p className="text-xl text-apty-gray max-w-3xl mx-auto">
            Not just another reading app. A structured approach that actually works.
          </p>
        </div>

        <div className="bg-apty-warm p-8 md:p-10 rounded-2xl border border-apty-coral-accent">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "Structured, Not Random",
                description: "Every lesson builds on the previous one. Your child follows a clear path from letters to independent reading.",
              },
              {
                title: "Mastery-Based",
                description: "Your child must master each step (70% minimum) before moving forward. No guessing, real learning.",
              },
              {
                title: "One Lesson Per Day",
                description: "Designed for healthy learning. One new lesson per day (you can adjust to max 2). No pressure, no rushing.",
              },
              {
                title: "No Subscriptions",
                description: "Try 4 lessons free. Then pay level-by-level. Complete Level 1, then decide on Level 2. No commitments.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-apty-coral text-2xl flex-shrink-0">✓</span>
                <div>
                  <h3 className="text-lg font-bold text-apty-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
