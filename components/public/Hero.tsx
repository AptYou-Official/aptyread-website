'use client';
import Image from 'next/image';
import Link from 'next/link';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';
import PlayStoreLink from '@/components/public/PlayStoreLink';
import { PATH_URL } from '@/lib/reading-path';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14 lg:py-16">
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative w-full rounded-2xl overflow-hidden border border-apty-border">
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
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-apty-dark mb-5 leading-[1.12] tracking-tight text-balance">
              Your child can learn to read English.
              <br />
              Confidently. Independently.
            </h1>

            <p className="text-base md:text-lg text-apty-gray mb-2 leading-relaxed max-w-xl md:max-w-none">
              An English reading program for ages 4 to 10. Five levels. One path.
            </p>
            <p className="text-sm md:text-base text-apty-gray font-semibold mb-8">
              Built on the Science of Reading.
            </p>

            <div className="mb-6 flex flex-col gap-3 items-center md:items-start">
              <PlayStoreLink
                className="w-full sm:w-auto"
                aria-label="Start Lesson 1"
                platform="auto"
              >
                <div className="bg-apty-coral text-white px-8 py-3.5 rounded-xl text-base md:text-lg font-semibold text-center hover:bg-[#e95624] transition-colors">
                  Start Lesson 1
                </div>
              </PlayStoreLink>
              <Link
                href={PATH_URL}
                className="text-base font-semibold text-apty-dark hover:text-apty-coral transition-colors"
              >
                See the Five-Level Path
              </Link>
              <p className="text-sm md:text-base text-apty-dark">
                First lessons are free. No account. Every child starts at Level 1.
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
