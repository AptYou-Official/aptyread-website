import Link from 'next/link';
import Image from 'next/image';
import PlayStoreLink from '@/components/public/PlayStoreLink';

export default function Header() {
  return (
    <header className="bg-white border-b border-apty-coral-accent sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
          <Image 
            src="/images/apty.png" 
            alt="AptyRead" 
            width={40} 
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-apty-coral">
              AptyRead
            </span>
            <span className="text-xs md:text-sm text-apty-gray italic hidden sm:block">
              From First Sound to Fluent Reader
            </span>
          </div>
        </Link>
        <div className="flex gap-3 md:gap-6 items-center">
          <Link href="/" className="hidden sm:inline text-apty-dark hover:text-apty-coral transition-colors text-sm md:text-base">
            Home
          </Link>
          <Link href="/educators" className="hidden sm:inline text-apty-dark hover:text-apty-coral transition-colors text-sm md:text-base">
            Educators
          </Link>
          <PlayStoreLink
            platform="ios"
            className="hidden md:inline-flex items-center justify-center rounded-lg border border-apty-coral text-apty-coral px-3 py-2 text-xs font-semibold hover:bg-apty-warm transition-colors"
            aria-label="Download AptyRead on the App Store"
          >
            Download on App Store
          </PlayStoreLink>
          <PlayStoreLink
            className="hover:opacity-80 transition-opacity"
            aria-label="Download AptyRead on Google Play"
          >
            <Image
              src="/images/google-play-badge-small.png"
              alt="Get it on Google Play"
              width={129}
              height={45}
              className="h-8 w-auto md:h-10"
              priority
            />
          </PlayStoreLink>
        </div>
      </nav>
    </header>
  );
}

