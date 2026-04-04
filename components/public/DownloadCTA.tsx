'use client';
import Image from 'next/image';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function DownloadCTA() {
  return (
    <section className="bg-gradient-to-br from-apty-coral to-orange-500 py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Give Your Child the Gift of Reading
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Start with 4 free lessons today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <PlayStoreLink
            className="bg-white text-apty-coral px-10 py-5 rounded-xl text-lg md:text-xl font-bold shadow-2xl transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center"
            aria-label="Download AptyRead on Google Play - Try 4 Free Lessons"
          >
            Download AptyRead
          </PlayStoreLink>
          <PlayStoreLink
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
          </PlayStoreLink>
        </div>
      </div>
    </section>
  );
}


