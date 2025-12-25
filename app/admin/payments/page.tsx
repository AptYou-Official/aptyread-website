import PaymentChart from '@/components/admin/PaymentChart';
import { getPurchases, getRevenueStats } from '@/lib/queries/payments';
import StatsCard from '@/components/admin/StatsCard';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
  const purchases = await getPurchases(100);
  const revenueStats = await getRevenueStats();

  // Format data for chart
  const chartData = Object.entries(revenueStats.dailyRevenue)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30); // Last 30 days

  // Calculate revenue by level
  const revenueByLevel = revenueStats.revenueByLevel;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-apty-dark mb-2">Payment Analytics</h1>
        <p className="text-apty-gray">Revenue and purchase tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${revenueStats.totalRevenue.toLocaleString()}`}
          icon="💰"
        />
        <StatsCard
          title="Total Purchases"
          value={revenueStats.purchaseCount.toLocaleString()}
          icon="🛒"
        />
        <StatsCard
          title="Average Purchase"
          value={`$${revenueStats.purchaseCount > 0 ? Math.round(revenueStats.totalRevenue / revenueStats.purchaseCount) : 0}`}
          icon="📊"
        />
      </div>

      <PaymentChart data={chartData} />

      <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
        <h2 className="text-2xl font-bold text-apty-dark mb-4">Revenue by Level</h2>
        <div className="space-y-2">
          {Object.entries(revenueByLevel).map(([level, revenue]) => (
            <div key={level} className="flex justify-between items-center py-2 border-b border-apty-coral-accent">
              <span className="text-apty-dark font-medium">Level {level}</span>
              <span className="text-apty-coral font-semibold">${revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
        <h2 className="text-2xl font-bold text-apty-dark mb-4">Recent Purchases</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-apty-warm">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apty-coral-accent">
              {purchases.slice(0, 10).map((purchase) => (
                <tr key={purchase.id} className="hover:bg-apty-warm">
                  <td className="px-6 py-4 text-sm text-apty-gray font-mono">
                    {purchase.userId.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-sm text-apty-gray">Level {purchase.level}</td>
                  <td className="px-6 py-4 text-sm text-apty-gray">${purchase.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded ${
                      purchase.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-apty-gray">
                    {purchase.createdAt?.toDate ? purchase.createdAt.toDate().toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

