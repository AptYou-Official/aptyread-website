'use client';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';

export default function DownloadHero() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/apty.png"
            alt="AptyRead"
            width={72}
            height={72}
            className="h-16 w-16 md:h-[72px] md:w-[72px] object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-4 leading-tight">
          Start Lesson 1.
        </h1>
        <p className="text-lg md:text-xl text-apty-dark mb-3 leading-relaxed">
          First lessons are free. No account.
        </p>
        <p className="text-base md:text-lg text-apty-gray mb-2 leading-relaxed">
          An English reading program for ages 4 to 10.
        </p>
        <p className="text-base md:text-lg text-apty-gray mb-8 leading-relaxed">
          Five levels. 238 lessons. One path.
        </p>
        <p className="text-sm md:text-base text-apty-cyan font-semibold mb-10">
          Built on the Science of Reading.
        </p>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-apty-dark">
            iPhone, iPad, and Android
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
