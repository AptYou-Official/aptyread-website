'use client';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';

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
              English reading for ages 4 to 10
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4 leading-tight">
            From First Sound
            <br />to Fluent Reader
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-apty-gray mb-2 leading-relaxed max-w-2xl mx-auto">
            A 5-level English reading program for children ages 4 to 10.
          </p>
          <p className="text-base md:text-lg text-apty-gray mb-8 leading-relaxed max-w-2xl mx-auto">
            Built for beginners. Step-by-step. No random lessons.
          </p>
          <p className="text-sm md:text-base text-apty-coral mb-8 font-semibold">
            Available on the Apple App Store and Google Play.
          </p>

          {/* Store Selection */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <p className="text-base md:text-lg font-semibold text-apty-dark">
              Choose your device to download
            </p>
            <div className="flex items-center gap-3 opacity-90 flex-wrap justify-center">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base text-apty-gray mt-8">
            <div className="flex items-center gap-2">
              <span className="text-apty-coral text-lg md:text-xl font-bold">✓</span>
              <span>3,500+ downloads</span>
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


