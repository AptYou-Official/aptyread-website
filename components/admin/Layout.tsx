'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

/** Presentation only. Server pages, queries and actions enforce authentication. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/admin/login') return <>{children}</>;
  return <div className="min-h-screen bg-apty-warm flex">
    <Sidebar />
    <main className="flex-1 p-8">{children}</main>
  </div>;
}
