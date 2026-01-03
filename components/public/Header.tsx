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
          <span className="bg-apty-coral text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg opacity-90 font-medium text-xs md:text-sm">
            Coming Soon
          </span>
        </div>
      </nav>
    </header>
  );
}

