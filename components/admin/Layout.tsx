'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Don't require auth for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-apty-warm flex items-center justify-center">
        <div className="text-apty-dark">Loading...</div>
      </div>
    );
  }

  // Login page doesn't need sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-apty-warm flex">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

