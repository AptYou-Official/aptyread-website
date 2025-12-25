import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import Features from "@/components/public/Features";
import HowItWorks from "@/components/public/HowItWorks";
import Screenshots from "@/components/public/Screenshots";
import Testimonials from "@/components/public/Testimonials";
import TrustBadges from "@/components/public/TrustBadges";
import CTA from "@/components/public/CTA";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-apty-warm">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Screenshots />
      <Testimonials />
      <TrustBadges />
      <CTA />
      <Footer />
    </main>
  );
}

