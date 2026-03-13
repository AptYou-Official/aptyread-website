'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPurchase, resolveEmailToUid } from '@/lib/actions/admin-purchases';

export default function AddPurchaseForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useEmail, setUseEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [purchaseToken, setPurchaseToken] = useState('');
  const [levelId, setLevelId] = useState('1');
  const [productId, setProductId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    let uid = userId.trim();
    if (useEmail && email.trim()) {
      setLoading(true);
      const resolved = await resolveEmailToUid(email.trim());
      if (resolved.error || !resolved.uid) {
        setError(resolved.error || 'User not found for that email.');
        setLoading(false);
        return;
      }
      uid = resolved.uid;
      setLoading(false);
    }
    if (!uid) {
      setError('Provide either User ID or Email.');
      return;
    }
    if (!orderId.trim() || !purchaseToken.trim()) {
      setError('Order ID and Purchase token are required.');
      return;
    }
    setLoading(true);
    const result = await addPurchase({
      userId: uid,
      orderId: orderId.trim(),
      purchaseToken: purchaseToken.trim(),
      levelId: levelId.trim(),
      productId: productId.trim() || undefined,
      purchaseDate: purchaseDate || undefined,
      expiryDate: expiryDate || undefined,
      price: price ? parseFloat(price) : undefined,
      currency: currency || 'USD',
    });
    setLoading(false);
    if (result.ok) {
      router.push('/admin/purchases');
      router.refresh();
    } else {
      setError(result.error || 'Failed to add purchase');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={useEmail} onChange={(e) => setUseEmail(e.target.checked)} />
            <span className="text-sm font-medium text-apty-dark">Look up user by email</span>
          </label>
          {useEmail ? (
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-apty-border rounded-lg"
            />
          ) : (
            <input
              type="text"
              placeholder="Firebase UID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-apty-border rounded-lg font-mono text-sm"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-apty-dark mb-1">Order ID *</label>
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full px-4 py-2 border border-apty-border rounded-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-apty-dark mb-1">Purchase token *</label>
          <textarea
            required
            rows={2}
            placeholder="Paste from Play Console"
            value={purchaseToken}
            onChange={(e) => setPurchaseToken(e.target.value)}
            className="w-full px-4 py-2 border border-apty-border rounded-lg font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-apty-dark mb-1">Level ID *</label>
          <select value={levelId} onChange={(e) => setLevelId(e.target.value)} className="w-full px-4 py-2 border border-apty-border rounded-lg">
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-apty-dark mb-1">Product ID (optional)</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-4 py-2 border border-apty-border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-apty-dark mb-1">Purchase date (optional)</label>
            <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="w-full px-4 py-2 border border-apty-border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-apty-dark mb-1">Expiry date (optional)</label>
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full px-4 py-2 border border-apty-border rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-apty-dark mb-1">Price (optional)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border border-apty-border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-apty-dark mb-1">Currency</label>
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-4 py-2 border border-apty-border rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-apty-coral text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
            {loading ? 'Saving...' : 'Add purchase'}
          </button>
          <button type="button" onClick={() => router.push('/admin/purchases')} className="bg-apty-warm text-apty-dark px-6 py-2 rounded-lg font-semibold hover:bg-apty-coral-accent">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
