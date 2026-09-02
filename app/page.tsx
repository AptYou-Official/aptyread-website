import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import LandingVideo from "@/components/public/LandingVideo";
import BusyUserStrip from "@/components/public/BusyUserStrip";
import HowItWorks from "@/components/public/HowItWorks";
import AppShowcase from "@/components/public/AppShowcase";
import ParentPeaceOfMind from "@/components/public/ParentPeaceOfMind";
import HomepageFAQ from "@/components/public/HomepageFAQ";
import CTA from "@/components/public/CTA";
import Footer from "@/components/public/Footer";
import {
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/schema";

export default function Home() {
  const structuredData = organizationJsonLd();
  const softwareAppData = softwareApplicationJsonLd();

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
          title="See AptyRead in 30 seconds."
          subtitle="Fifteen minutes. You sit with them. Then they read."
        />
        <BusyUserStrip />
        <HowItWorks />
        <AppShowcase />
        <ParentPeaceOfMind />
        <HomepageFAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
