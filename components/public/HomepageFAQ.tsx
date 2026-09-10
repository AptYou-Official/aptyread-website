"use client";

import Link from "next/link";
import FaqAccordion from "@/components/public/FaqAccordion";
import { homepageFaqItems } from "@/lib/faq-content";

export default function HomepageFAQ() {
  return (
    <section className="relative overflow-hidden bg-apty-cream py-16 md:py-20 px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-apty-cream via-apty-sky/75 to-apty-cream"
        aria-hidden="true"
      />
      <div className="container relative mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-apty-dark mb-3 tracking-tight">
            Questions parents ask
          </h2>
          <p className="text-lg text-apty-gray">Clear answers. No fluff.</p>
        </div>

        <FaqAccordion items={homepageFaqItems} defaultOpen={0} />

        <p className="text-center mt-8">
          <Link
            href="/faq"
            className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
          >
            See all questions →
          </Link>
        </p>
      </div>
    </section>
  );
}
