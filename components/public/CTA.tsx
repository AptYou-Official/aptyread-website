'use client';

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-apty-coral to-orange-500 py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Start Free. No Registration Needed.
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Try 4 lessons free. See if your child connects with our approach. Then decide.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transform transition duration-300 hover:scale-105">
            Try Free Lessons
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>No registration</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Level-by-level purchase</span>
          </div>
        </div>
      </div>
    </section>
  );
}
