'use client';

import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function BusyUserStrip() {
  return (
    <section className="bg-apty-dark py-4 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/95 text-center sm:text-left text-sm md:text-base font-medium">
            Four free lessons. No registration. Start today.
          </p>
          <PlayStoreLink
            platform="auto"
            className="flex-shrink-0 bg-apty-coral text-white px-6 py-2.5 rounded-lg text-sm md:text-base font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Try 4 Free Lessons →
          </PlayStoreLink>
        </div>
      </div>
    </section>
  );
}
