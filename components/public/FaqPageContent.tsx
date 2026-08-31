"use client";

import FaqAccordion from "@/components/public/FaqAccordion";
import { faqGroups } from "@/lib/faq-content";

export default function FaqPageContent() {
  return (
    <div className="space-y-12">
      {faqGroups.map((group) => (
        <section key={group.title}>
          <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
            {group.title}
          </h2>
          <FaqAccordion items={group.items} defaultOpen={null} />
        </section>
      ))}
    </div>
  );
}
