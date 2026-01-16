import Link from 'next/link';
import Image from 'next/image';

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
          <span className="text-xl md:text-2xl font-bold text-apty-coral">
            AptyRead
          </span>
        </Link>
        <div className="flex gap-3 md:gap-6 items-center">
          <Link href="/" className="hidden sm:inline text-apty-dark hover:text-apty-coral transition-colors text-sm md:text-base">
            Home
          </Link>
          <a
            href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
            target="_blank"
            rel="noopener noreferrer"
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
          </a>
        </div>
      </nav>
    </header>
  );
}

