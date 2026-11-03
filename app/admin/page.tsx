import StatsCard from '@/components/admin/StatsCard';
import { requireAdminPage } from '@/lib/auth';
import { getUsers } from '@/lib/queries/users';
import { getRevenueStats } from '@/lib/queries/payments';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await requireAdminPage();
  let totalUsers = 0;
  let totalPurchases = 0;
  try {
    const [users, revenueStats] = await Promise.all([getUsers(100), getRevenueStats()]);
    totalUsers = users?.length ?? 0;
    totalPurchases = revenueStats?.purchaseCount ?? 0;
  } catch (e) {
    console.error('Dashboard data error:', e);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-apty-dark mb-2">Dashboard</h1>
        <p className="text-apty-gray">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Recent user records"
          value={totalUsers.toLocaleString()}
          icon="👥"
        />
        <StatsCard
          title="Revenue by currency"
          value="Not connected"
          icon="💰"
        />
        <StatsCard
          title="Active readers"
          value="Not measured"
          icon="📊"
        />
        <StatsCard
          title="Recorded purchases"
          value={totalPurchases.toLocaleString()}
          icon="🛒"
        />
      </div>

      <div className="bg-white p-6 rounded-lg border border-apty-sky shadow-sm">
        <h2 className="text-2xl font-bold text-apty-dark mb-4">About these figures</h2>
        <p className="text-apty-gray">The user count covers up to 100 recent records. The purchase count covers records marked active or completed. App activity, lesson completion, growth comparisons and revenue reporting by currency are not connected to this dashboard yet.</p>
      </div>
    </div>
  );
}

