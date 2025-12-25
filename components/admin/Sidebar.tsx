'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/payments', label: 'Payments', icon: '💰' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-apty-coral-accent min-h-screen flex flex-col">
      <div className="p-6 border-b border-apty-coral-accent">
        <h1 className="text-2xl font-bold text-apty-coral">AptyRead Admin</h1>
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
          className="w-full px-4 py-3 rounded-lg bg-apty-warm text-apty-dark hover:bg-apty-coral-accent transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

