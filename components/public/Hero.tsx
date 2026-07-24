'use client';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function Hero() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image Side - Left on desktop, top on mobile */}
          <div className="order-2 md:order-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
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

          {/* Text Side - Right on desktop, bottom on mobile */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              Your child can learn to read English.
              <br />
              <span className="bg-gradient-to-r from-apty-coral to-apty-cyan bg-clip-text text-transparent">
                Confidently. Independently.
              </span>
            </h1>

            <p className="text-base md:text-lg text-apty-gray mb-8 leading-relaxed">
              A complete literacy program for ages 3 to 10. Four levels. 243 lessons. One clear path.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 flex flex-col gap-4 items-center md:items-start">
              <PlayStoreLink
                className="group relative w-full sm:w-auto"
                aria-label="Try 4 free lessons"
                platform="auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-apty-coral to-apty-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 text-center">
                  Try 4 Free Lessons
                </div>
              </PlayStoreLink>
              <div className="flex items-center gap-3 opacity-90">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
            </div>

            <p className="text-lg md:text-xl font-semibold text-apty-dark mb-4">
              Every child reads.
            </p>

            <p className="text-sm md:text-base text-apty-gray">
              No registration. Built on the Science of Reading.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
