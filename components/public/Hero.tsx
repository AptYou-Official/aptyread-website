'use client';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-apty-coral-accent/70 blur-3xl"
      />
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg ring-2 ring-apty-coral/15">
              <Image
                src="/images/parent-child-reading.png"
                alt="Child and parent with books, reading together at home"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <div className="order-1 md:order-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              Your child can learn to read English.
              <br />
              <span className="text-apty-coral">
                Confidently. Independently.
              </span>
            </h1>

            <p className="text-base md:text-lg text-apty-dark mb-3 leading-relaxed">
              An English reading program for ages 4 to 10. Five levels. 238 lessons. One path.
            </p>
            <p className="text-sm md:text-base text-apty-cyan font-semibold mb-8">
              Built on the Science of Reading.
            </p>

            <div className="mb-6 flex flex-col gap-3 items-center md:items-start">
              <PlayStoreLink
                className="group relative w-full sm:w-auto"
                aria-label="Start Lesson 1"
                platform="auto"
              >
                <div className="absolute -inset-1 bg-apty-coral rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 text-center">
                  Start Lesson 1
                </div>
              </PlayStoreLink>
              <p className="text-sm md:text-base text-apty-dark">
                First lessons are free. No account.
              </p>
              <div className="flex items-center gap-3 opacity-90">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
            </div>

            <p className="text-lg md:text-xl font-semibold text-apty-dark">
              Every child reads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
