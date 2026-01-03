import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-apty-coral-accent sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image 
            src="/images/apty.png" 
            alt="AptyRead" 
            width={40} 
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
          <span className="text-2xl font-bold text-apty-coral">
            AptyRead
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-apty-dark hover:text-apty-coral transition-colors">
            Home
          </Link>
          <span className="bg-apty-coral text-white px-6 py-2 rounded-lg opacity-90 font-medium">
            Coming Soon
          </span>
        </div>
      </nav>
    </header>
  );
}

