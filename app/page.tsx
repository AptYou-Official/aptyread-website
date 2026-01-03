import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import OurApproach from "@/components/public/OurApproach";
import Features from "@/components/public/Features";
import HowItWorks from "@/components/public/HowItWorks";
import CTA from "@/components/public/CTA";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-apty-warm">
      <Header />
      <Hero />
      <OurApproach />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}



