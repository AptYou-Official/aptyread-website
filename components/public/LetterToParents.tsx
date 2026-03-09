'use client';
import Link from 'next/link';

export default function LetterToParents() {
  return (
    <section className="py-14 md:py-16 px-4 bg-gradient-to-b from-white to-apty-warm">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white p-8 md:p-10 rounded-2xl border-l-4 border-apty-coral border border-apty-coral-accent shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-2">
            A Letter to Parents
          </h2>
          <p className="text-apty-gray italic mb-4">
            Why we built AptyRead
          </p>
          <p className="text-apty-gray leading-relaxed mb-4">
            As creators and educators, we watched many children struggle with reading—not because they lacked ability, but because they lacked a solid foundation. <strong className="text-apty-dark">We wanted to create something different: real education, not just entertainment.</strong>
          </p>
          <p className="text-apty-dark font-semibold mb-6">
            Our mission: No child should fall behind because they couldn&apos;t read.
          </p>
          <Link
            href="/about"
            className="inline-block text-apty-coral hover:text-apty-dark font-semibold text-base transition-colors"
          >
            Read our full letter →
          </Link>
        </div>
      </div>
    </section>
  );
}

