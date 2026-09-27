'use client';

import Link from 'next/link';
import { useEnglish } from './EnglishProvider';

// Online transitions use the app router. Offline transitions use saved HTML
// documents, avoiding Next's uncached server-component navigation requests.
export default function AppLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { offline } = useEnglish();
  return offline ? <a {...props} /> : <Link {...props} prefetch={false} />;
}
