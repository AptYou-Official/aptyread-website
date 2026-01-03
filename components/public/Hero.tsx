'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-apty-warm via-white to-apty-warm overflow-hidden">
      <div className="relative container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Apty Character - Left side on desktop, top on mobile */}
            <div className="flex-shrink-0 order-2 md:order-1">
              <div className="relative w-40 h-40 md:w-72 md:h-72">
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
            <div className="flex-1 text-left order-1 md:order-2">
              {/* Main Headline - Problem + Outcome */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-apty-dark mb-5 md:mb-6 leading-tight">
                Help Your Child Learn to Read
                <br />
                <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
                  The Right Way
                </span>
              </h1>

              {/* Subheadline - Simplified for mobile */}
              <p className="text-base md:text-xl lg:text-2xl text-apty-gray mb-5 md:mb-6 leading-relaxed">
                Most children struggle in school because they never learned to read properly. <span className="font-semibold text-apty-dark">AptyRead fixes this from the start.</span> Your child will read independently, with confidence, at their own pace.
              </p>

              {/* Key Differentiators - Simplified for mobile */}
              <div className="mb-8 md:mb-10 space-y-3">
                <div className="flex items-start gap-3 text-apty-dark">
                  <span className="text-apty-coral text-xl flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-base md:text-lg leading-relaxed">One lesson a day - not rushed, not overwhelming</span>
                </div>
                <div className="flex items-start gap-3 text-apty-dark">
                  <span className="text-apty-coral text-xl flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-base md:text-lg leading-relaxed">Structured approach that builds real reading skills</span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col gap-4 md:gap-4 md:flex-row md:items-center">
                <button className="group relative w-full md:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 text-center">
                    Try 4 Free Lessons
                  </div>
                </button>
                <p className="text-apty-gray text-sm md:text-sm text-left md:text-left">
                  No registration needed • Available soon on Google Play Store
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
