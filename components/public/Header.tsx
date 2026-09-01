import Link from 'next/link';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';

const CLASSROOM_URL = 'https://classroom.aptyread.ai';
const CLASSROOM_LOGIN_URL = 'https://classroom.aptyread.ai/#/login';

type HeaderProps = {
  schoolsPage?: boolean;
};

export default function Header({ schoolsPage = false }: HeaderProps) {
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
              Every Child Reads.
            </span>
          </div>
        </Link>
        <div className="flex gap-3 md:gap-6 items-center">
          <Link href="/" className="hidden sm:inline text-apty-dark hover:text-apty-coral transition-colors text-sm md:text-base">
            Home
          </Link>
          <Link href="/schools" className="hidden sm:inline text-apty-dark hover:text-apty-coral transition-colors text-sm md:text-base">
            For Schools
          </Link>
          {schoolsPage ? (
            <>
              <a
                href={CLASSROOM_LOGIN_URL}
                className="hidden md:inline text-apty-dark hover:text-apty-coral transition-colors text-sm md:text-base"
              >
                School login
              </a>
              <a
                href={CLASSROOM_URL}
                className="inline-flex items-center justify-center rounded-full border border-apty-dark px-4 py-2 text-sm font-semibold text-apty-dark transition-colors hover:border-apty-coral hover:text-apty-coral md:px-5"
              >
                Open Classroom
              </a>
            </>
          ) : (
            <>
              <AppStoreBadge compact className="hidden md:inline-flex h-8 md:h-10" />
              <GooglePlayBadge compact />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
