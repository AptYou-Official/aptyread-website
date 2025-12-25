'use client';

export default function CTA() {
  return (
    <section className="relative bg-gradient-to-br from-apty-coral via-orange-400 to-apty-coral py-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto max-w-4xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Ready to Start?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
          Try it free. The first 4 lessons are free. See if your child connects with how we teach.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-white/30 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-white text-apty-coral px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl transform transition duration-300 hover:scale-105">
              Coming Soon to Play Store
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>No credit card needed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>30 minutes per day</span>
          </div>
        </div>
      </div>
    </section>
  );
}
