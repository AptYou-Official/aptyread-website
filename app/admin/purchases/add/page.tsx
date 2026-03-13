import Link from 'next/link';
import AddPurchaseForm from '@/components/admin/AddPurchaseForm';

export const dynamic = 'force-dynamic';

export default function AdminAddPurchasePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/purchases" className="text-apty-coral hover:underline">← Purchases</Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-apty-dark mb-2">Add / fix purchase</h1>
        <p className="text-apty-gray">Add a purchase to Firestore when the app didn’t save it (e.g. after looking up Order ID + purchase token in Play Console).</p>
      </div>
      <AddPurchaseForm />
    </div>
  );
}
