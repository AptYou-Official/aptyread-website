import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import CTA from "@/components/public/CTA";
import FaqPageContent from "@/components/public/FaqPageContent";
import { allFaqItems } from "@/lib/faq-content";

export const metadata: Metadata = {
  title: "Questions parents ask | AptyRead",
  description:
    "Clear answers about AptyRead. Ages 4 to 10. Five levels. 238 lessons. First lessons free. No account needed.",
  alternates: {
    canonical: "https://www.aptyread.ai/faq",
  },
  openGraph: {
    title: "Questions parents ask | AptyRead",
    description:
      "Clear answers about AptyRead. Ages 4 to 10. Five levels. 238 lessons. First lessons free.",
    url: "https://www.aptyread.ai/faq",
    siteName: "AptyRead",
    type: "website",
  },
};

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.link
          ? `${item.answer} ${item.link.label}: https://www.aptyread.ai${item.link.href}`
          : item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-apty-warm">
        <Header />
        <main>
          <article className="px-4 py-14 md:py-20">
            <div className="container mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-3 leading-tight">
                Questions parents ask
              </h1>
              <p className="text-lg md:text-xl text-apty-gray mb-12">
                Clear answers. No fluff.
              </p>
              <FaqPageContent />
              <p className="text-center mt-14 text-apty-gray">
                Still stuck?{" "}
                <a
                  href="mailto:support@aptyread.ai"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  support@aptyread.ai
                </a>
              </p>
            </div>
          </article>
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
