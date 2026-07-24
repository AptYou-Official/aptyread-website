'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "My child already knows the alphabet. Which level should they start at?",
    answer:
      "Knowing A, B, C is not the same as reading. Reading needs sounds. /a/ not A. /b/ not B. Most children who know their ABCs still start at Level 1. It goes quickly. And it makes sure nothing is missing.",
  },
  {
    question: "My child speaks English well at home. Will this still help?",
    answer:
      "Yes. This is one of the most common situations we see. Speaking and reading are different skills. A child can be fluent in spoken English and still need to be taught how to read it. Speaking is learned from listening. Reading has to be taught step by step.",
  },
  {
    question: "My child is a slow learner. Will they be left behind?",
    answer:
      "No. Each lesson must be passed before the next one unlocks. A child can repeat a lesson as many times as they need. No judgement. No clock. Slow and steady is fine. The aim is the same for every child.",
  },
  {
    question: "How is this different from other reading apps?",
    answer:
      "Most reading apps are collections of activities. Fun, but not one journey. AptyRead is a full literacy program. Four levels. 243 lessons. Every lesson builds on the last. Clear start. Clear path. Clear goal: your child reading books on their own.",
  },
  {
    question: "How long does the whole program take?",
    answer:
      "Most children finish one lesson in 15 to 25 minutes. With regular practice, families usually see steady progress in months. Full journey time depends on your child's pace. AptyRead moves at readiness, not a fixed schedule.",
  },
  {
    question: "My child is 9. Is it too late to start?",
    answer:
      "It is never too late. Reading can be learned at any age with the right teaching. Older children often progress faster because their language understanding is stronger. The only wrong moment to start is not starting.",
  },
];

export default function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Questions parents ask
          </h2>
          <p className="text-lg text-apty-gray">
            Clear answers. No fluff.
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
