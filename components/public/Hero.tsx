'use client';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-apty-warm via-white to-apty-warm overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-apty-coral opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-apty-cyan opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-apty-coral-accent shadow-sm">
              <span className="w-2 h-2 bg-apty-coral rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-apty-dark">Available Soon on Google Play</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-apty-dark mb-8 leading-tight text-center">
            <span className="block">Reading Made</span>
            <span className="block bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
              Natural
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-apty-gray mb-6 text-center max-w-3xl mx-auto leading-relaxed">
            Your child learns English through sounds they already know
          </p>

          {/* Key Message */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-lg text-apty-dark">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
              <span className="text-2xl">💨</span>
              <span>Steam = &apos;S&apos;</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
              <span className="text-2xl">👆</span>
              <span>Tapping = &apos;T&apos;</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-apty-coral text-white px-10 py-5 rounded-2xl text-lg font-semibold shadow-xl transform transition duration-300 hover:scale-105">
                Coming Soon to Play Store
              </div>
            </div>
            <p className="text-apty-gray text-sm md:text-base">
              First 4 lessons free • No credit card required
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-coral mb-2">4-10</div>
              <div className="text-sm text-apty-gray">Ages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-cyan mb-2">214</div>
              <div className="text-sm text-apty-gray">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-gold mb-2">30min</div>
              <div className="text-sm text-apty-gray">Per Day</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
