import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import WhyThisWorks from "@/components/public/WhyThisWorks";
import HowItWorks from "@/components/public/HowItWorks";
import Features from "@/components/public/Features";
import ParentPeaceOfMind from "@/components/public/ParentPeaceOfMind";
import CTA from "@/components/public/CTA";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-apty-warm">
      <Header />
      <Hero />
      <WhyThisWorks />
      <HowItWorks />
      <Features />
      <ParentPeaceOfMind />
      <CTA />
      <Footer />
    </main>
  );
}



