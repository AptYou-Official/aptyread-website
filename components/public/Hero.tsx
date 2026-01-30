'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image Side - Left on desktop, top on mobile */}
          <div className="order-2 md:order-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/parent-child-reading.png"
                alt="Parent and child reading together - showing family connection and learning"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Text Side - Right on desktop, bottom on mobile */}
          <div className="order-1 md:order-2 text-center md:text-left">
            {/* Tagline Badge */}
            <div className="mb-4 inline-block">
              <span className="text-sm md:text-base font-semibold text-apty-coral bg-apty-warm px-4 py-2 rounded-full border border-apty-coral-accent">
                From Sounds to Reading
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-6 leading-tight">
              Help Your Child Learn to Read
              <br />
              <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
                The Right Way
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-apty-gray mb-4 leading-relaxed">
              Most children struggle in school because they never learned to read properly.
            </p>
            <p className="text-base md:text-lg text-apty-gray mb-4 leading-relaxed">
              AptyRead fixes this from the start. <span className="font-semibold text-apty-dark">English Reading & Writing for children ages 3-10.</span>
            </p>
            <p className="text-base md:text-lg text-apty-gray mb-8 leading-relaxed">
              Your child will read independently, with confidence, at their own pace.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center md:items-start">
              <a
                href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto"
                aria-label="Download AptyRead on Google Play"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 text-center">
                  Try 4 Free Lessons
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/images/google-play-badge-large.png"
                  alt="Get it on Google Play"
                  width={172}
                  height={60}
                  className="h-12 w-auto md:h-14"
                  priority={false}
                />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-sm text-apty-gray">
              <div className="flex items-center gap-2">
                <span className="text-apty-coral">✓</span>
                <span>No registration needed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-apty-coral">✓</span>
                <span>One lesson per day</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-apty-coral">✓</span>
                <span>Enroll level-by-level</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
