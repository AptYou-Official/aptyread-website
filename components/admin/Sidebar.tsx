'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import BrandWordmark from '@/components/public/BrandWordmark';

export default function Sidebar() {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');

  const handleSignOut = async () => {
    setSigningOut(true);
    setSignOutError('');
    try {
      const response = await fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' });
      if (!response.ok) throw new Error('Unable to sign out. Please try again.');
      if (auth) await signOut(auth).catch(() => {});
      window.location.replace('/admin/login');
    } catch {
      setSignOutError('Unable to sign out. Please try again.');
      setSigningOut(false);
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/purchases', label: 'Purchases', icon: '🛒' },
    { href: '/admin/payments', label: 'Payments', icon: '💰' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-apty-sky min-h-screen flex flex-col">
      <div className="p-6 border-b border-apty-sky">
        <h1 className="text-2xl font-bold tracking-tight">
          <BrandWordmark className="text-2xl" />
          <span className="text-apty-dark"> Admin</span>
        </h1>
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-apty-coral text-white'
                    : 'text-apty-dark hover:bg-apty-warm'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-apty-coral-accent">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full px-4 py-3 rounded-lg bg-apty-warm text-apty-dark hover:bg-apty-coral-accent transition-colors"
        >
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </button>
        {signOutError && <p role="alert" className="text-sm text-red-700 mt-3">{signOutError}</p>}
      </div>
    </aside>
  );
}

