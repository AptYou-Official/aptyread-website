"use client";

import Link from "next/link";
import FaqAccordion from "@/components/public/FaqAccordion";
import { homepageFaqItems } from "@/lib/faq-content";

export default function HomepageFAQ() {
  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
            Questions parents ask
          </h2>
          <p className="text-lg text-apty-gray">Clear answers. No fluff.</p>
        </div>

        <FaqAccordion items={homepageFaqItems} defaultOpen={0} />

        <p className="text-center mt-8">
          <Link
            href="/faq"
            className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
          >
            See all questions →
          </Link>
        </p>
      </div>
    </section>
  );
}
