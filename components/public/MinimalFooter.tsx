import Link from 'next/link';

export default function MinimalFooter() {
  return (
    <footer className="bg-white border-t border-apty-coral-accent py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-apty-gray">
          <div className="text-center md:text-left">
            <p className="font-semibold text-apty-dark mb-1">APTYOU SERVICES PRIVATE LIMITED</p>
            <p className="text-xs">© {new Date().getFullYear()} AptyRead. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/privacy" className="hover:text-apty-coral transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-apty-coral transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-apty-coral transition-colors">
              Contact
            </Link>
            <Link href="/" className="hover:text-apty-coral transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


