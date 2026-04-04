import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "About Us - A Letter to Parents | AptyRead",
  description: "Learn why we built AptyRead. Our commitment to real education, healthy learning, and child safety. A structured literacy platform built by parents, for parents.",
  alternates: {
    canonical: "https://www.aptyread.ai/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-lg border border-apty-coral-accent shadow-sm">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
              A Letter to Parents
            </h1>
            <p className="text-xl md:text-2xl text-apty-gray italic">
              Why we built AptyRead
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-apty-gray space-y-8">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-base md:text-lg leading-relaxed mb-4">
                As creators and educators, we watched many children struggle with reading—not because they lacked the ability, but because they lacked a solid foundation.
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                <strong className="text-apty-dark">We wanted to create something different.</strong>
              </p>
            </section>

            {/* Our Commitment */}
            <section className="mb-8 pb-8 border-b border-apty-coral-accent">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                Our Commitment to Your Child
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                We believe that learning to read is a journey that requires patience and structure. That is why AptyRead is a sequential course. We don&apos;t allow skipping because we want your child to feel the genuine confidence that comes from mastering a skill before moving to the next challenge.
              </p>
            </section>

            {/* Healthy Learning */}
            <section className="mb-8 pb-8 border-b border-apty-coral-accent">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                Healthy Learning, Not Screen Addiction
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                We are parents too. We know the worry of &quot;too much screen time.&quot; This is why we built the automatic pause into our curriculum. By limiting learning to one or two lessons a day, we protect your child&apos;s eye health and, more importantly, we give their brain the time it needs to turn a new sound into a long-term memory.
              </p>
            </section>

            {/* Safe Space */}
            <section className="mb-8 pb-8 border-b border-apty-coral-accent">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                A Safe Space to Grow
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                You will never find an advertisement or a hidden subscription in AptyRead. We have created a focused, professional environment where your child can learn without distractions.
              </p>
            </section>

            {/* Closing */}
            <section className="text-center pt-8">
              <p className="text-lg md:text-xl text-apty-dark font-semibold mb-4">
                Thank you for trusting us to be a part of your child&apos;s reading success.
              </p>
              <p className="text-lg md:text-xl text-apty-dark font-semibold mb-6">
                We are honored to walk this path with you.
              </p>
              <p className="text-base md:text-lg text-apty-gray">
                — The AptyRead Team
              </p>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-apty-coral-accent text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
              Ready to Start?
            </h2>
            <p className="text-base md:text-lg text-apty-gray mb-6">
              Try 4 free lessons and see if AptyRead is right for your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PlayStoreLink className="bg-apty-coral text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:bg-opacity-90">
                Try 4 Free Lessons
              </PlayStoreLink>
              <PlayStoreLink aria-label="Get it on Google Play">
                <Image
                  src="/images/google-play-badge-large.png"
                  alt="Get it on Google Play"
                  width={172}
                  height={60}
                  className="h-12 w-auto"
                  priority={false}
                />
              </PlayStoreLink>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

