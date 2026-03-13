import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/queries/users';
import { getPurchasesByUserId } from '@/lib/queries/payments';

export const dynamic = 'force-dynamic';

export default async function AdminUserDetailPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const user = await getUserById(uid);
  const purchases = await getPurchasesByUserId(uid);

  if (!user) notFound();

  const formatDate = (v: any) => {
    if (!v) return 'N/A';
    try {
      return v.toDate ? v.toDate().toLocaleString() : new Date(v).toLocaleString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="text-apty-coral hover:underline">← Users</Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-apty-dark mb-2">User detail</h1>
        <p className="text-apty-gray">Profile and purchases</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
        <h2 className="text-xl font-bold text-apty-dark mb-4">Profile</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <dt className="text-apty-gray">User ID</dt>
          <dd className="font-mono text-sm">{user.id}</dd>
          <dt className="text-apty-gray">Email</dt>
          <dd>{user.email || '—'}</dd>
          <dt className="text-apty-gray">Display name</dt>
          <dd>{user.displayName || '—'}</dd>
          <dt className="text-apty-gray">Created</dt>
          <dd>{formatDate(user.createdAt)}</dd>
          <dt className="text-apty-gray">Last login</dt>
          <dd>{formatDate(user.lastLogin)}</dd>
        </dl>
      </div>

      <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
        <h2 className="text-xl font-bold text-apty-dark mb-4">Purchases ({purchases.length})</h2>
        {purchases.length === 0 ? (
          <p className="text-apty-gray">No purchases for this user.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-apty-warm">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-apty-dark uppercase">Order / ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-apty-dark uppercase">Level</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-apty-dark uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-apty-dark uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-apty-dark uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-apty-dark uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-apty-coral-accent">
                {purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-apty-warm/50">
                    <td className="px-4 py-3 text-sm font-mono">{p.orderId || p.transactionId || p.id}</td>
                    <td className="px-4 py-3 text-sm">{p.levelId || p.level || '—'}</td>
                    <td className="px-4 py-3 text-sm">{(p.price ?? p.amount) ?? '—'} {p.currency || ''}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${p.status === 'active' || p.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(p.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/purchases?orderId=${encodeURIComponent(p.orderId || p.id)}`} className="text-apty-coral text-sm hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
