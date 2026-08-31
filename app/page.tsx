import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import LandingVideo from "@/components/public/LandingVideo";
import BusyUserStrip from "@/components/public/BusyUserStrip";
import HowItWorks from "@/components/public/HowItWorks";
import AppShowcase from "@/components/public/AppShowcase";
import ParentPeaceOfMind from "@/components/public/ParentPeaceOfMind";
import LetterToParents from "@/components/public/LetterToParents";
import HomepageFAQ from "@/components/public/HomepageFAQ";
import CTA from "@/components/public/CTA";
import Footer from "@/components/public/Footer";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "AptyRead",
    "description": "AptyRead. Every Child Reads. An English reading program for children aged 4 to 10. Built on the Science of Reading. 5 levels, 238 lessons. Start Lesson 1. No account needed.",
    "url": "https://www.aptyread.ai",
    "logo": "https://www.aptyread.ai/images/apty.png",
    "sameAs": [
      "https://apps.apple.com/us/app/aptyread-learn-to-read/id6762043318",
      "https://play.google.com/store/apps/details?id=ai.aptyread.app"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Start Lesson 1. No account needed.",
      "availability": "https://schema.org/InStock"
    },
    "educationalCredentialAwarded": "Reading & Writing Course",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Children ages 4 to 10"
    }
  };

  const softwareAppData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AptyRead",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "1"
    },
    "description": "AptyRead. Every Child Reads. An English reading program for children aged 4 to 10. Built on the Science of Reading. 5 levels, 238 lessons. Start Lesson 1 on iOS or Android."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppData) }}
      />
      <main className="min-h-screen bg-apty-warm">
        <Header />
        <Hero />
        <LandingVideo
          title="See AptyRead in 60 seconds."
          subtitle="The feeling of a real lesson. Then they read."
        />
        <BusyUserStrip />
        <HowItWorks />
        <AppShowcase />
        <ParentPeaceOfMind />
        <LetterToParents />
        <HomepageFAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
