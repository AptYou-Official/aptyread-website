'use client';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-apty-warm via-white to-apty-warm overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-apty-coral opacity-3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-apty-cyan opacity-3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Apty Character - Left side on desktop, top on mobile */}
            <div className="flex-shrink-0 order-2 md:order-1">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                {/* Placeholder for Apty image - Replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-200 to-blue-300 rounded-3xl flex items-center justify-center border-4 border-apty-coral-accent shadow-xl">
                  <div className="text-center">
                    <div className="text-6xl md:text-8xl mb-2">🐘</div>
                    <p className="text-xs text-apty-dark font-semibold">Apty</p>
                  </div>
                </div>
                {/* Replace above div with: <Image src="/images/apty-character.png" alt="Apty" width={256} height={256} className="w-full h-full object-contain" /> */}
              </div>
            </div>

            {/* Content - Right side on desktop, bottom on mobile */}
            <div className="flex-1 text-center md:text-left order-1 md:order-2">
              {/* Main Headline - Clear and Direct */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-apty-dark mb-6 leading-tight">
                Real Reading.
                <br />
                <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
                  Real Progress.
                </span>
                <br />
                No Pressure.
              </h1>

              {/* Subheadline - Value Proposition */}
              <p className="text-xl md:text-2xl text-apty-gray mb-8 leading-relaxed">
                Structured, sequential, mastery-driven literacy learning platform.
                <br />
                <span className="text-lg">Currently offering: <strong>English Reading & Writing</strong> course for ages 3-10</span>
                <br />
                <span className="text-base">One lesson per day. No subscriptions. Just real learning.</span>
              </p>

              {/* Key Differentiators - Quick Scan */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10 text-sm md:text-base">
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-apty-coral-accent">
                  <span className="text-apty-coral font-semibold">Try 4 lessons free</span>
                </div>
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-apty-coral-accent">
                  <span className="text-apty-dark">No registration needed</span>
                </div>
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-apty-coral-accent">
                  <span className="text-apty-dark">Level-by-level purchase</span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-12">
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

              {/* Core Message - The Differentiator */}
              <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-apty-coral-accent">
                <p className="text-lg md:text-xl text-apty-dark font-medium italic">
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
