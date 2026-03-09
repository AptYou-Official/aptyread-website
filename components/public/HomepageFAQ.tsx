'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "My child already knows the alphabet. Which level should they start at?",
    answer: "Knowing the alphabet means knowing the names of letters — A, B, C. But reading requires knowing the sounds — /a/, /b/, /k/. Most children who know their ABCs still need to begin at Level 1 to build the sound knowledge that makes reading possible. It's quick for children who already know some, and it ensures nothing is missing.",
  },
  {
    question: "My child speaks English well at home. Will this still help?",
    answer: "Yes — and this is one of the most common situations we see. Speaking and reading are completely different skills. A child can be fluent in spoken English and still need to be taught how to read it. Speaking is learned naturally from listening. Reading must be explicitly taught. AptyRead teaches exactly that.",
  },
  {
    question: "My child is a slow learner. Will they be left behind?",
    answer: "AptyRead is designed so that no child is ever pushed forward before they're ready. Each lesson must be passed before the next one unlocks. A child can repeat a lesson as many times as they need — with no judgement, no frustration, no clock running. Slow and steady is completely fine. The destination is the same for every child.",
  },
  {
    question: "How is this different from other reading apps?",
    answer: "Most reading apps are collections of activities — fun, but not connected into a complete journey. AptyRead is a full literacy program with 4 levels and 243 lessons in a carefully researched sequence. Every lesson builds on the last. Every level prepares for the next. There's a clear beginning, a clear path, and a clear destination: your child reading books independently.",
  },
  {
    question: "How long does the whole program take?",
    answer: "Most children complete one lesson in 15–25 minutes. At 3–4 lessons per week, the full program takes approximately 18–24 months — about 2 school years. But every child is different, and AptyRead moves at your child's pace, not a fixed schedule.",
  },
  {
    question: "My child is 9. Is it too late to start?",
    answer: "It's never too late. Reading can be learned at any age with the right teaching. Older children often progress faster because their language understanding is stronger. We've seen children as old as 10 and 11 complete Level 1 and 2 and transform into confident readers. The only wrong moment to start is not starting.",
  },
];

export default function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Questions Parents Ask
          </h2>
          <p className="text-lg text-apty-gray">
            Everything you&apos;re probably wondering right now.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-apty-coral-accent rounded-xl overflow-hidden bg-apty-warm/50"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 md:px-6 md:py-5 text-left flex justify-between items-center gap-4 hover:bg-apty-warm/70 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-apty-dark text-base md:text-lg pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-apty-coral/10 text-apty-coral flex items-center justify-center text-xl transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                >
                  ↓
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 md:px-6 md:pb-5 pt-0">
                  <p className="text-apty-gray leading-relaxed text-base md:text-lg border-t border-apty-coral-accent pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-8">
          <Link
            href="/faq"
            className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
          >
            See all FAQ →
          </Link>
        </p>
      </div>
    </section>
  );
}
