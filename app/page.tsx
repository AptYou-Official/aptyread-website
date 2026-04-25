import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import BusyUserStrip from "@/components/public/BusyUserStrip";
import WhyThisWorks from "@/components/public/WhyThisWorks";
import HowItWorks from "@/components/public/HowItWorks";
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
    "description": "AptyRead — From First Sound to Fluent Reader. Complete reading program for children 3-10. 4 levels, 243 lessons; nobody can skip levels without the correct foundation.",
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
      "description": "Try 4 lessons free. No registration needed.",
      "availability": "https://schema.org/InStock"
    },
    "educationalCredentialAwarded": "Reading & Writing Course",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Children ages 3-10"
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
    "description": "AptyRead — From First Sound to Fluent Reader. Complete reading program for children 3-10. 4 levels, 243 lessons. Try 4 lessons free on iOS or Android."
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
        <BusyUserStrip />
        <WhyThisWorks />
        <HowItWorks />
        <ParentPeaceOfMind />
        <LetterToParents />
        <HomepageFAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}



