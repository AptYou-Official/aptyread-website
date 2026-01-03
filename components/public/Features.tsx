'use client';
import Image from 'next/image';

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-apty-warm to-white py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            Real Reading for Real Life
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto">
            Your child will read books, signs, stories - real-world reading, not just screen time.
          </p>
        </div>

        {/* Real-World Reading Image */}
        <div className="mb-12">
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/real-world-reading.png"
              alt="Children reading books, signs, menus, and letters in real-world situations"
              width={1024}
              height={1024}
              className="w-full h-auto object-contain rounded-lg"
              priority={false}
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-apty-coral-accent shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Structured Learning",
                description: "Every lesson builds on the previous one. Clear path from letters to independent reading.",
              },
              {
                title: "Real Progress",
                description: "Your child masters each step before moving forward. Real learning, not just progress bars.",
              },
              {
                title: "One Lesson Per Day",
                description: "Healthy learning pace. One new lesson per day (you can set it to 2 if needed). No pressure.",
              },
              {
                title: "Try Before You Commit",
                description: "Try 4 lessons free. Then pay level-by-level. Complete Level 1, then decide. No subscriptions.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                <span className="text-apty-coral text-xl md:text-2xl flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-apty-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-apty-gray leading-relaxed text-base md:text-lg">
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
