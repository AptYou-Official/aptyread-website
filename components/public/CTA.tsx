'use client';

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-apty-coral to-orange-500 py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Try It Free. See If It Works for Your Child.
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          No registration needed. No credit card. Just 4 free lessons to see if your child connects with our approach.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button className="bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transform transition duration-300 hover:scale-105">
            Try 4 Free Lessons
          </button>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <p className="text-white text-lg mb-4 font-semibold">
            What happens next?
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/95 text-base">
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>Try 4 lessons free</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>See if your child enjoys it</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>Then decide if you want more</span>
            </div>
          </div>
          <p className="text-white/90 text-sm mt-4">
            Available soon on Google Play Store
          </p>
        </div>
      </div>
    </section>
  );
}
