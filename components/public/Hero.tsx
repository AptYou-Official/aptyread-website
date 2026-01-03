'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-apty-warm via-white to-apty-warm overflow-hidden">
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Apty Character - Left side on desktop, top on mobile */}
            <div className="flex-shrink-0 order-2 md:order-1">
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <Image 
                  src="/images/apty-character.png" 
                  alt="Apty" 
                  width={288} 
                  height={288} 
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Content - Right side on desktop, bottom on mobile */}
            <div className="flex-1 text-center md:text-left order-1 md:order-2">
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-apty-dark mb-6 leading-tight">
                Real Reading.
                <br />
                <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
                  Real Progress.
                </span>
                <br />
                No Pressure.
              </h1>

              {/* Subheadline - Simplified */}
              <p className="text-xl md:text-2xl text-apty-gray mb-8 leading-relaxed">
                English Reading & Writing for ages 3-10.
                <br />
                <span className="text-lg">One lesson per day. No subscriptions. Just real learning.</span>
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-8">
                <button className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-apty-coral text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105">
                    Try Free Lessons
                  </div>
                </button>
                <p className="text-apty-gray text-sm">
                  Available soon on Google Play Store
                </p>
              </div>

              {/* Core Message */}
              <div className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-apty-coral-accent">
                <p className="text-base md:text-lg text-apty-dark font-medium italic">
                  &quot;We are not trying to keep children inside an app.
                  <br />
                  We are trying to help them become confident readers.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
