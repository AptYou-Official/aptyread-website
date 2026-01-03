'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-apty-dark mb-6 leading-tight">
            Help Your Child Learn to Read
            <br />
            <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
              The Right Way
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-apty-gray mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
            Most children struggle in school because they never learned to read properly. AptyRead fixes this from the start. Your child will read independently, with confidence, at their own pace.
          </p>

          {/* CTA Button */}
          <div className="mb-10 md:mb-12">
            <button className="bg-apty-coral text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:bg-opacity-90">
              Try 4 Free Lessons
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-apty-gray">
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
              <span>Level-by-level purchase</span>
            </div>
          </div>

          <p className="text-apty-gray text-sm mt-4">
            Available soon on Google Play Store
          </p>
        </div>
      </div>
    </section>
  );
}
