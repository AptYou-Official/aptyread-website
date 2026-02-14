'use client';
import Image from 'next/image';

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
              From Sounds to Reading
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4 leading-tight">
            Help Your Child Learn to Read
            <br />
            <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
              The Right Way
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-apty-gray mb-2 leading-relaxed max-w-2xl mx-auto">
            English Reading & Writing for children ages 3-10.
          </p>
          <p className="text-base md:text-lg text-apty-gray mb-8 leading-relaxed max-w-2xl mx-auto">
            One lesson per day. Your child learns at their own pace. No subscriptions.
          </p>

          {/* Primary CTA Button - LARGE and Prominent */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto max-w-md"
              aria-label="Download AptyRead on Google Play - Try 4 Free Lessons"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-apty-coral text-white px-10 py-5 rounded-xl text-xl md:text-2xl font-bold shadow-2xl transform transition duration-300 hover:scale-105 text-center">
                Try 4 Free Lessons
              </div>
            </a>

            {/* Google Play Badge */}
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
                className="h-14 w-auto md:h-16"
                priority={false}
              />
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base text-apty-gray mt-8">
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>No registration needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>One lesson per day</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>No ads, no subscriptions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

