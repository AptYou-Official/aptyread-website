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
            In 2020, parents came to us with children who struggled to read English. We watched. We listened. We understood one thing clearly.
          </p>
          <p className="text-apty-dark font-semibold mb-4 leading-relaxed">
            What the child gets should not depend on who happens to teach them that day.
          </p>
          <p className="text-apty-gray leading-relaxed mb-4">
            That was not good enough. Every child deserves a structured, consistent, always available foundation.
          </p>
          <p className="text-apty-dark font-semibold mb-2">
            So we built AptyRead.
          </p>
          <p className="text-apty-dark font-semibold mb-6">
            Our mission: Every child reads.
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
