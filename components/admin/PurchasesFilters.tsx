'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function PurchasesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get('userId') || '');
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

  const apply = useCallback(() => {
    const p = new URLSearchParams();
    if (userId) p.set('userId', userId);
    if (orderId) p.set('orderId', orderId);
    if (status) p.set('status', status);
    if (startDate) p.set('startDate', startDate);
    if (endDate) p.set('endDate', endDate);
    router.push(`/admin/purchases?${p.toString()}`);
  }, [router, userId, orderId, status, startDate, endDate]);

  const clear = useCallback(() => {
    setUserId('');
    setOrderId('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    router.push('/admin/purchases');
  }, [router]);

  return (
    <div className="bg-white p-4 rounded-lg border border-apty-coral-accent shadow-sm">
      <h3 className="font-semibold text-apty-dark mb-3">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-3 py-2 border border-apty-border rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="px-3 py-2 border border-apty-border rounded-lg text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border border-apty-border rounded-lg text-sm"
        >
          <option value="">All statuses</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
          <option value="refunded">refunded</option>
        </select>
        <input
          type="date"
          placeholder="Start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 border border-apty-border rounded-lg text-sm"
        />
        <input
          type="date"
          placeholder="End date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 border border-apty-border rounded-lg text-sm"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <button type="button" onClick={apply} className="bg-apty-coral text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          Apply
        </button>
        <button type="button" onClick={clear} className="bg-apty-warm text-apty-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-apty-coral-accent">
          Clear
        </button>
      </div>
    </div>
  );
}
