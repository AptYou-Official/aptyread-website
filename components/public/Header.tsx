import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-apty-coral-accent sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-apty-coral">
          AptyRead
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

