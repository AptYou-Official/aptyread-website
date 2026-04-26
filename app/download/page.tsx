import type { Metadata } from "next";
import MinimalHeader from "@/components/public/MinimalHeader";
import DownloadHero from "@/components/public/DownloadHero";
import DownloadBenefits from "@/components/public/DownloadBenefits";
import AppShowcase from "@/components/public/AppShowcase";
import MinimalFooter from "@/components/public/MinimalFooter";

export const metadata: Metadata = {
  title: "Download AptyRead - Try 4 Free Lessons | AptyRead",
  description: "Download AptyRead free. Try 4 lessons, no registration needed. English Reading & Writing for children ages 3-10. One lesson per day. No ads, no subscriptions.",
  keywords: "download AptyRead, free reading app, children reading app, learn to read, English reading for kids",
  alternates: {
    canonical: "https://www.aptyread.ai/download",
  },
  openGraph: {
    title: "Download AptyRead - Try 4 Free Lessons",
    description: "Download AptyRead free. Try 4 lessons, no registration needed. English Reading & Writing for children ages 3-10.",
    url: "https://www.aptyread.ai/download",
    siteName: "AptyRead",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download AptyRead - Try 4 Free Lessons",
    description: "Download AptyRead free. Try 4 lessons, no registration needed.",
  },
};

export default function DownloadPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AptyRead",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Try 4 lessons free. No registration needed.",
    },
    "description": "Structured literacy learning platform. English Reading & Writing for children ages 3-10. Mastery-driven, one lesson per day. Try 4 lessons free.",
    "url": "https://www.aptyread.ai/download",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-apty-warm flex flex-col">
        <MinimalHeader />
        <main className="flex-grow">
          <DownloadHero />
          <AppShowcase maxShots={4} />
          <DownloadBenefits />
        </main>
        <MinimalFooter />
      </div>
    </>
  );
}


