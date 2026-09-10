import Link from 'next/link';
import Image from 'next/image';
import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';
import BrandWordmark from '@/components/public/BrandWordmark';

const CLASSROOM_URL = 'https://classroom.aptyread.ai';
const CLASSROOM_LOGIN_URL = 'https://classroom.aptyread.ai/#/login';

type HeaderProps = {
  schoolsPage?: boolean;
};

export default function Header({ schoolsPage = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-apty-sky sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity shrink-0 min-w-0"
        >
          <Image
            src="/images/apty-mascot.png"
            alt="AptyRead"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
            priority
          />
          <div className="flex flex-col min-w-0">
            <BrandWordmark size="lg" />
            <span className="text-xs md:text-sm text-apty-gray italic hidden sm:block">
              Every Child Reads.
            </span>
          </div>
        </Link>
        <div className="flex gap-3 md:gap-6 items-center shrink-0">
          <Link href="/" className="hidden sm:inline text-apty-dark hover:text-apty-cyan transition-colors text-sm md:text-base">
            Home
          </Link>
          {!schoolsPage ? (
            <Link href="/reading-guide" className="hidden md:inline text-apty-dark hover:text-apty-cyan transition-colors text-sm md:text-base">
              Reading Guide
            </Link>
          ) : null}
          <Link href="/schools" className="hidden sm:inline text-apty-dark hover:text-apty-cyan transition-colors text-sm md:text-base">
            For Schools
          </Link>
          {schoolsPage ? (
            <>
              <a
                href={CLASSROOM_LOGIN_URL}
                className="hidden md:inline text-apty-dark hover:text-apty-cyan transition-colors text-sm md:text-base"
              >
                School login
              </a>
              <a
                href={CLASSROOM_URL}
                className="inline-flex items-center justify-center rounded-full border border-apty-dark px-4 py-2 text-sm font-semibold text-apty-dark transition-colors hover:border-apty-cyan hover:text-apty-cyan md:px-5"
              >
                Open Classroom
              </a>
            </>
          ) : (
            <>
              <Link
                href="/download"
                className="md:hidden inline-flex items-center justify-center rounded-full border border-apty-dark px-3.5 py-1.5 text-sm font-semibold text-apty-dark hover:border-apty-cyan hover:text-apty-cyan transition-colors whitespace-nowrap"
              >
                Get the app
              </Link>
              <div className="hidden md:flex items-center gap-3">
                <AppStoreBadge compact className="inline-flex h-10" />
                <GooglePlayBadge compact className="inline-flex h-10" />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
