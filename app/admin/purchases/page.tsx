import Link from 'next/link';
import { getPurchasesWithFilters, type PurchaseFilters } from '@/lib/queries/payments';
import PurchasesTable from '@/components/admin/PurchasesTable';
import PurchasesFilters from '@/components/admin/PurchasesFilters';

export const dynamic = 'force-dynamic';

export default async function AdminPurchasesPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string; orderId?: string; status?: string; startDate?: string; endDate?: string }>;
}) {
  const params = await searchParams;
  const filters: PurchaseFilters = {};
  if (params.userId) filters.userId = params.userId;
  if (params.orderId) filters.orderId = params.orderId;
  if (params.status) filters.status = params.status;
  if (params.startDate) filters.startDate = new Date(params.startDate);
  if (params.endDate) filters.endDate = new Date(params.endDate);

  const purchases = await getPurchasesWithFilters(filters);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-apty-dark mb-2">Purchases</h1>
          <p className="text-apty-gray">List, search, and manage purchases</p>
        </div>
        <Link
          href="/admin/purchases/add"
          className="bg-apty-coral text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Add / fix purchase
        </Link>
      </div>

      <PurchasesFilters />

      <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
        <h2 className="text-xl font-bold text-apty-dark mb-4">Results ({purchases.length})</h2>
        {purchases.length === 0 ? (
          <p className="text-apty-gray">No purchases match the filters.</p>
        ) : (
          <PurchasesTable purchases={purchases} />
        )}
      </div>
    </div>
  );
}
