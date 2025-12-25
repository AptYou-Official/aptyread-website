import StatsCard from '@/components/admin/StatsCard';
import { getUsers } from '@/lib/queries/users';
import { getRevenueStats } from '@/lib/queries/payments';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const users = await getUsers(100);
  const revenueStats = await getRevenueStats();

  const totalUsers = users.length;
  const totalRevenue = revenueStats.totalRevenue;
  const totalPurchases = revenueStats.purchaseCount;

  // Calculate active users (last 30 days) - placeholder
  const activeUsers = Math.floor(totalUsers * 0.6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-apty-dark mb-2">Dashboard</h1>
        <p className="text-apty-gray">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          change="+12%"
          icon="👥"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+8%"
          icon="💰"
        />
        <StatsCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          change="+5%"
          icon="📊"
        />
        <StatsCard
          title="Total Purchases"
          value={totalPurchases.toLocaleString()}
          change="+15%"
          icon="🛒"
        />
      </div>

      <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
        <h2 className="text-2xl font-bold text-apty-dark mb-4">Recent Activity</h2>
        <p className="text-apty-gray">Dashboard analytics and charts will be displayed here.</p>
      </div>
    </div>
  );
}

