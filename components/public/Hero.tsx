'use client';
import Image from 'next/image';
import Link from 'next/link';
import PlayStoreLink from '@/components/public/PlayStoreLink';
import { PATH_URL } from '@/lib/reading-path';

function HeroSpark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5l1.35 7.2L20.5 10 13.35 11.3 12 18.5l-1.35-7.2L3.5 10l7.15-1.3L12 1.5z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-apty-cream py-10 md:py-14 lg:py-16">
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-[1.08fr_0.92fr] gap-8 md:gap-10 lg:gap-14 items-center">
          <div className="order-2 md:order-1">
            <div className="relative mx-auto w-full max-w-xl md:max-w-none">
              {/* Soft sky wash — brand atmosphere, not a card */}
              <div
                className="pointer-events-none absolute -inset-3 md:-inset-5 bg-apty-sky/90"
                style={{
                  borderRadius: '48% 42% 38% 52% / 42% 48% 44% 50%',
                  transform: 'rotate(-3deg)',
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-2 top-6 h-24 w-24 rounded-full bg-apty-cyan/10 blur-2xl md:h-32 md:w-32"
                aria-hidden="true"
              />

              {/* Organic photo crop */}
              <div
                className="relative overflow-hidden shadow-[0_18px_40px_-24px_rgba(23,58,138,0.35)]"
                style={{
                  borderRadius: '42% 48% 36% 54% / 44% 38% 52% 48%',
                }}
              >
                <Image
                  src="/images/parent-child-reading.png"
                  alt="Parent and child smiling together, pointing at a book while reading at home"
                  width={1672}
                  height={941}
                  className="w-full h-auto object-cover scale-[1.02]"
                  priority
                  sizes="(min-width: 768px) 52vw, 100vw"
                />
              </div>

              {/* Tiny sparks — space signature, restrained */}
              <HeroSpark className="pointer-events-none absolute left-[6%] top-[10%] h-3 w-3 text-apty-cyan/55 md:h-3.5 md:w-3.5" />
              <HeroSpark className="pointer-events-none absolute right-[8%] top-[22%] h-2.5 w-2.5 text-apty-indigo/35 md:right-[4%]" />
              <HeroSpark className="pointer-events-none absolute bottom-[28%] right-[4%] h-2 w-2 text-apty-cyan/40" />

              {/* Small Apty — personality, secondary to the photo */}
              <div className="absolute -bottom-1 left-[4%] z-10 md:left-[2%] md:bottom-0">
                <Image
                  src="/images/apty-mascot.png"
                  alt=""
                  width={72}
                  height={72}
                  className="h-12 w-12 object-contain drop-shadow-sm md:h-14 md:w-14"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-apty-dark mb-5 leading-[1.12] tracking-tight text-balance">
              Your child can learn to read English.
              <br />
              <span className="text-apty-dark">
                Confidently. Independently.
              </span>
            </h1>

            <p className="text-base md:text-lg text-apty-dark font-semibold mb-2 leading-relaxed max-w-xl md:max-w-none">
              An English reading program for ages 4 to 10. Five levels. One path.
            </p>
            <p className="text-sm text-apty-gray mb-8 leading-relaxed">
              Built on the Science of Reading.
            </p>

            <div className="mb-6 flex flex-col gap-3.5 items-center md:items-start">
              <PlayStoreLink
                className="w-full sm:w-auto"
                aria-label="Start Lesson 1"
                platform="auto"
              >
                <div className="bg-apty-cyan text-white px-8 py-3.5 rounded-xl text-base md:text-lg font-semibold text-center hover:bg-apty-cyan-dark transition-colors shadow-sm">
                  Start Lesson 1
                </div>
              </PlayStoreLink>
              <Link
                href={PATH_URL}
                className="inline-flex items-center gap-1.5 text-base md:text-lg font-semibold text-apty-dark underline underline-offset-4 decoration-apty-cyan/35 hover:decoration-apty-cyan hover:text-apty-dark transition-colors"
              >
                See the Five-Level Path
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-sm md:text-base text-apty-dark">
                First lessons are free. No account. Every child starts at Level 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
