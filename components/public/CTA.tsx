'use client';
import Image from 'next/image';

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-apty-coral to-orange-500 py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Start Your Child&apos;s Reading Journey
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          For children 3 to 10. No registration needed. Try 4 free lessons and see if the program is right for your child.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transform transition duration-300 hover:scale-105"
          >
            Try 4 Free Lessons
          </a>
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
              className="h-12 w-auto md:h-14"
              priority={false}
            />
          </a>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <p className="text-white text-base md:text-lg mb-4 font-semibold">
            What happens next?
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-white/95 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl">✓</span>
              <span>Try 4 lessons free</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl">✓</span>
              <span>See if your child enjoys it</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl">✓</span>
              <span>Then decide if you want more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
