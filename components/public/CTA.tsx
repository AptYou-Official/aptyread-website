'use client';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function CTA() {
  return (
    <section className="bg-apty-coral py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Every child can learn to read.
          <br />
          Yours can too.
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          First lessons are free. Open the app. No account needed.
        </p>

        <div className="flex flex-col gap-4 justify-center items-center">
          <PlayStoreLink
            platform="auto"
            className="bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transform transition duration-300 hover:scale-105"
          >
            Start Lesson 1
          </PlayStoreLink>
          <div className="flex items-center gap-3 opacity-90">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
