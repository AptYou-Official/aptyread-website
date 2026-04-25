import Link from 'next/link';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';

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
          <AppStoreBadge compact className="hidden md:inline-flex h-8 md:h-10" />
          <GooglePlayBadge compact />
        </div>
      </nav>
    </header>
  );
}

