"use client";

import Link from "next/link";
import FaqAccordion from "@/components/public/FaqAccordion";
import { homepageFaqItems } from "@/lib/faq-content";

export default function HomepageFAQ() {
  return (
    <section className="bg-apty-warm py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
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
