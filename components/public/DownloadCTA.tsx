'use client';
import Image from 'next/image';

export default function DownloadCTA() {
  return (
    <section className="bg-gradient-to-br from-apty-coral to-orange-500 py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Help Your Child Learn to Read?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Try 4 free lessons. No registration needed. See if AptyRead is right for your child.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-apty-coral px-10 py-5 rounded-xl text-lg md:text-xl font-bold shadow-2xl transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center"
            aria-label="Download AptyRead on Google Play - Try 4 Free Lessons"
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
              className="h-14 w-auto md:h-16"
              priority={false}
            />
          </a>
        </div>
      </div>
    </section>
  );
}


