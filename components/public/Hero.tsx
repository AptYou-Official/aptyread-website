'use client';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function Hero() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image Side - Left on desktop, top on mobile; use a program/reading visual (no character focus) */}
          <div className="order-2 md:order-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/parent-child-reading.png"
                alt="Child and parent with books, reading together at home"
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
                AptyRead Literacy Program
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              From First Sound to
              <br />
              <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
                Fluent Reader
              </span>
            </h1>

            <p className="text-base md:text-lg text-apty-gray mb-4 leading-relaxed font-medium">
              A complete literacy program for <span className="font-semibold text-apty-dark">children 3 to 10</span>. Built for beginners, designed for steady progress.
            </p>
            <p className="text-base md:text-lg text-apty-gray mb-3 leading-relaxed">
              One path, 4 levels, 243 lessons. No skipping levels. Children move forward only when the foundation is ready.
            </p>
            <p className="text-base md:text-lg text-apty-gray mb-6 leading-relaxed">
              Speaking is learned naturally from listening. Reading has to be taught step by step.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col gap-4 items-center md:items-start">
              <PlayStoreLink
                className="group relative w-full sm:w-auto"
                aria-label="Try 4 free lessons"
                platform="auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 text-center">
                  Try 4 Free Lessons
                </div>
              </PlayStoreLink>
              <div className="flex items-center gap-3 opacity-90">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-sm text-apty-gray">
              <div className="flex items-center gap-2">
                <span className="text-apty-coral">✓</span>
                <span>2,500+ downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-apty-coral">✓</span>
                <span>4 levels, 243 lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-apty-coral">✓</span>
                <span>Try 4 lessons free, no registration</span>
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
