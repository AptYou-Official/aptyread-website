'use client';
import Link from 'next/link';

export default function LetterToParents() {
  return (
    <section className="bg-apty-warm py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-apty-coral-accent shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
              A Letter to Parents
            </h2>
            <p className="text-lg md:text-xl text-apty-gray italic mb-4">
              Why we built AptyRead
            </p>
            <p className="text-base md:text-lg text-apty-dark font-semibold max-w-2xl mx-auto">
              Our mission: No child should fall behind because they couldn&apos;t read.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-apty-gray space-y-6">
            <div>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                As creators and educators, we watched many children struggle with reading—not because they lacked ability, but because they lacked a solid foundation. <strong className="text-apty-dark">We wanted to create something different: real education, not just entertainment.</strong>
              </p>
            </div>

            <div className="border-l-4 border-apty-coral pl-6 py-2">
              <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-3">
                Our Commitment to Your Child
              </h3>
              <p className="text-base md:text-lg leading-relaxed">
                AptyRead is sequential because we believe genuine confidence comes from mastering a skill before moving forward. We don&apos;t allow skipping because your child&apos;s success matters more than quick progress.
              </p>
            </div>

            <div className="border-l-4 border-apty-cyan pl-6 py-2">
              <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-3">
                Healthy Learning, Not Screen Addiction
              </h3>
              <p className="text-base md:text-lg leading-relaxed">
                We&apos;re parents too. We know the worry about screen time. That&apos;s why we built automatic pauses and limit learning to one or two lessons per day. This protects your child&apos;s eyes and gives their brain time to turn new sounds into long-term memory.
              </p>
            </div>

            <div className="border-l-4 border-apty-gold pl-6 py-2">
              <h3 className="text-xl md:text-2xl font-bold text-apty-dark mb-3">
                A Safe Space to Grow
              </h3>
              <p className="text-base md:text-lg leading-relaxed">
                You&apos;ll never find advertisements or hidden subscriptions in AptyRead. We&apos;ve created a focused, professional environment where your child can learn without distractions.
              </p>
            </div>

            <div className="text-center pt-6 border-t border-apty-coral-accent mt-8">
              <p className="text-lg md:text-xl text-apty-dark font-semibold mb-4">
                Thank you for trusting us with your child&apos;s reading success.
              </p>
              <p className="text-base md:text-lg text-apty-gray mb-6">
                — The AptyRead Team
              </p>
              <Link
                href="/about"
                className="inline-block text-apty-coral hover:text-apty-dark font-semibold text-base md:text-lg transition-colors"
              >
                Read our full story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

