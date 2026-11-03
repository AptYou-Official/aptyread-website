import type { Metadata } from "next";
import Image from "next/image";
import SupportShell from "@/components/public/SupportShell";
import FaqPageContent from "@/components/public/FaqPageContent";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import { allFaqItems } from "@/lib/faq-content";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import "./faq.css";

const title = "Questions parents ask | AptyRead";
const description = "Answers about AptyRead for ages 4–10: 9 free lessons, learning together, one-time level purchases and up to three readers. First 4 lessons need no account.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.aptyread.ai/faq" },
  openGraph: { title, description, url: "https://www.aptyread.ai/faq", siteName: "AptyRead", type: "website", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
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
        text: item.link ? `${item.answer} ${item.link.label}: https://www.aptyread.ai${item.link.href}` : item.answer,
      },
    })),
  };

  return (
    <SupportShell currentPage="faq" className="faq-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="faq-page-hero support-wrap" aria-labelledby="faq-page-title">
        <div>
          <p className="support-eyebrow">A little help along the way</p>
          <h1 id="faq-page-title">Questions<br /><span>parents ask.</span></h1>
        </div>
        <div className="faq-page-hero-copy">
          <p>From your child’s first lesson to sharing AptyRead as a family. Find the details that help you feel ready.</p>
          <a className="support-text-link" href="/#get-the-app">Ready to begin? Get the app <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></a>
        </div>
      </section>
      <FaqPageContent />
      <section className="faq-page-help support-wrap" aria-labelledby="faq-help-title">
        <div>
          <p className="support-eyebrow">Every family’s questions are different</p>
          <h2 id="faq-help-title">We’re here to help.</h2>
          <p>Tell us what you need a hand with.</p>
        </div>
        <a className="support-button" href="/contact">Contact AptyRead</a>
      </section>
      <section className="faq-page-start support-wrap" aria-labelledby="faq-start-title">
        <div>
          <p className="support-eyebrow">Make a start together</p>
          <h2 id="faq-start-title">9 free lessons.<br />A first story to enjoy.</h2>
          <p>First 4 without an account. A free parent account lets you continue through Lesson 9.</p>
        </div>
        <div className="faq-page-download">
          <p>Download for Android and iPhone.</p>
          <div className="faq-page-store-links">
            <PlayStoreLink platform="android" aria-label="Get AptyRead on Google Play"><Image src="/homepage/store-google.png" alt="Get it on Google Play" width={168} height={50} unoptimized /></PlayStoreLink>
            <PlayStoreLink platform="ios" aria-label="Download AptyRead on the App Store"><Image src="/homepage/store-apple.svg" alt="Download on the App Store" width={150} height={50} unoptimized /></PlayStoreLink>
          </div>
          <p className="faq-page-reassurance">No advertisements. No recurring subscription.</p>
        </div>
      </section>
    </SupportShell>
  );
}
