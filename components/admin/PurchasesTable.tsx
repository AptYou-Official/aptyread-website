'use client';

import { useState } from 'react';
import Link from 'next/link';
import { markPurchaseRefunded } from '@/lib/actions/admin-purchases';

interface Purchase {
  id: string;
  userId: string;
  level?: string;
  levelId?: string;
  orderId?: string;
  status: string;
  amount?: number;
  price?: number;
  currency?: string;
  createdAt?: any;
}

interface PurchasesTableProps {
  purchases: Purchase[];
}

export default function PurchasesTable({ purchases }: PurchasesTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (v: any) => {
    if (!v) return 'N/A';
    try {
      return v.toDate ? v.toDate().toLocaleString() : new Date(v).toLocaleString();
    } catch {
      return 'N/A';
    }
  };

  const handleMarkRefunded = async (id: string) => {
    if (!confirm('Mark this purchase as refunded? User will lose access on next app sync.')) return;
    setUpdatingId(id);
    setError(null);
    const result = await markPurchaseRefunded(id);
    if (result.ok) {
      window.location.reload();
    } else {
      setError(result.error || 'Failed');
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-apty-warm">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">Order / ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">Level</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-apty-dark uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apty-coral-accent">
            {purchases.map((p) => (
              <tr key={p.id} className="hover:bg-apty-warm/50">
                <td className="px-4 py-3 text-sm font-mono">{p.orderId || p.id}</td>
                <td className="px-4 py-3 text-sm font-mono">
                  <Link href={`/admin/users/${p.userId}`} className="text-apty-coral hover:underline">
                    {p.userId.substring(0, 8)}...
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">{p.levelId || p.level || '—'}</td>
                <td className="px-4 py-3 text-sm">{(p.price ?? p.amount) ?? '—'} {p.currency || ''}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    p.status === 'active' || p.status === 'completed' ? 'bg-green-100 text-green-800' :
                    p.status === 'refunded' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3 text-sm">
                  {(p.status === 'active' || p.status === 'completed') && (
                    <button
                      type="button"
                      onClick={() => handleMarkRefunded(p.id)}
                      disabled={updatingId === p.id}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      {updatingId === p.id ? 'Updating...' : 'Mark refunded'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
