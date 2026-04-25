'use client';
import Image from 'next/image';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function DownloadHero() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          {/* Logo/App Icon */}
          <div className="mb-6 flex justify-center">
            <Image 
              src="/images/apty.png" 
              alt="AptyRead" 
              width={120} 
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              priority
            />
          </div>

          {/* Tagline Badge */}
          <div className="mb-4 inline-block">
            <span className="text-sm md:text-base font-semibold text-apty-coral bg-apty-warm px-4 py-2 rounded-full border border-apty-coral-accent">
              Literacy Program for Ages 3-10
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4 leading-tight">
            From First Sound
            <br />to Fluent Reader
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-apty-gray mb-2 leading-relaxed max-w-2xl mx-auto">
            A structured 4-level English literacy program for children ages 3-10.
          </p>
          <p className="text-base md:text-lg text-apty-gray mb-8 leading-relaxed max-w-2xl mx-auto">
            Built for beginners. Step-by-step. No random lessons.
          </p>
          <p className="text-sm md:text-base text-apty-coral mb-8 font-semibold">
            Available on the Apple App Store and Google Play.
          </p>

          {/* Primary CTA Button - LARGE and Prominent */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <PlayStoreLink
              className="group relative w-full sm:w-auto max-w-md"
              aria-label="Try 4 free lessons"
              platform="auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-apty-coral text-white px-10 py-5 rounded-xl text-xl md:text-2xl font-bold shadow-2xl transform transition duration-300 hover:scale-105 text-center">
                Try 4 Free Lessons
              </div>
            </PlayStoreLink>

            <a
              href="#how-it-works"
              className="text-apty-coral font-semibold hover:underline"
            >
              See How It Works
            </a>

            <div className="flex items-center gap-3">
              <PlayStoreLink
                className="hover:opacity-80 transition-opacity"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/images/google-play-badge-large.png"
                  alt="Get it on Google Play"
                  width={172}
                  height={60}
                  className="h-14 w-auto md:h-16"
                  priority={false}
                />
              </PlayStoreLink>
              <PlayStoreLink
                platform="ios"
                className="inline-flex items-center rounded-lg border border-apty-coral px-4 py-2 text-sm font-semibold text-apty-coral hover:bg-apty-warm transition-colors"
                aria-label="Download on App Store"
              >
                Download on App Store
              </PlayStoreLink>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base text-apty-gray mt-8">
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>2,500+ downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>No registration needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>No ads, start free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


