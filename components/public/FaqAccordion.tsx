"use client";

import { useState } from "react";
import Link from "next/link";
import type { FaqItem } from "@/lib/faq-content";

type FaqAccordionProps = {
  items: FaqItem[];
  defaultOpen?: number | null;
};

export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-2">
      {items.map((faq, index) => (
        <div
          key={faq.question}
          className="border border-apty-coral-accent rounded-xl overflow-hidden bg-white"
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
                openIndex === index ? "rotate-180" : ""
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
                {faq.link ? (
                  <>
                    {" "}
                    <Link
                      href={faq.link.href}
                      className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                    >
                      {faq.link.label}
                    </Link>
                    .
                  </>
                ) : null}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
