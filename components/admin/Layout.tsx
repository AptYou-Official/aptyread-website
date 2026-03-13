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
    if (!auth) {
      setLoading(false);
      router.push('/admin/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        router.push('/admin/login');
        return;
      }
      try {
        const token = await currentUser.getIdToken();
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: token }),
        });
        if (!res.ok) {
          await auth.signOut();
          let query = 'message=access_denied';
          if (res.status === 403) {
            try {
              const data = await res.json();
              if (data.uid) query += '&uid=' + encodeURIComponent(data.uid);
            } catch (_) {}
          }
          router.push('/admin/login?' + query);
          return;
        }
        setUser(currentUser);
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
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

