import type { Metadata } from "next";
import MinimalHeader from "@/components/public/MinimalHeader";
import DownloadHero from "@/components/public/DownloadHero";
import DownloadBenefits from "@/components/public/DownloadBenefits";
import AppShowcase, {
  LANDING_APP_SHOWCASE_ORDER,
} from "@/components/public/AppShowcase";
import MinimalFooter from "@/components/public/MinimalFooter";

export const metadata: Metadata = {
  title: "Download AptyRead - Start Lesson 1 | AptyRead",
  description: "Download AptyRead free. Start Lesson 1, no account needed. English reading program for children ages 4 to 10. 5 levels, 238 lessons. No ads, no subscriptions.",
  keywords: "download AptyRead, free reading app, children reading app, learn to read, English reading for kids",
  alternates: {
    canonical: "https://www.aptyread.ai/download",
  },
  openGraph: {
    title: "Download AptyRead - Start Lesson 1",
    description: "Download AptyRead free. Start Lesson 1, no account needed. English reading program for children ages 4 to 10.",
    url: "https://www.aptyread.ai/download",
    siteName: "AptyRead",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download AptyRead - Start Lesson 1",
    description: "Download AptyRead free. Start Lesson 1, no account needed.",
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
      "description": "Start Lesson 1. No account needed.",
    },
    "description": "English reading program for children ages 4 to 10. 5 levels, 238 lessons. Start Lesson 1. No account needed.",
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
          <AppShowcase shotOrder={LANDING_APP_SHOWCASE_ORDER} />
          <DownloadBenefits />
        </main>
        <MinimalFooter />
      </div>
    </>
  );
}


