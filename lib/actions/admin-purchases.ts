'use server';

import { getDb } from '@/lib/firebase-admin';
import { getUserIdByEmail } from '@/lib/queries/users';

export async function resolveEmailToUid(email: string): Promise<{ uid: string | null; error?: string }> {
  try {
    if (!email?.trim()) return { uid: null, error: 'Email required' };
    const uid = await getUserIdByEmail(email.trim());
    return { uid };
  } catch (e: any) {
    return { uid: null, error: e?.message || 'Failed' };
  }
}

export async function markPurchaseRefunded(purchaseId: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = await getDb();
    if (!db) return { ok: false, error: 'Database not available' };
    const ref = db.collection('purchases').doc(purchaseId);
    await ref.update({
      status: 'refunded',
      updatedAt: new Date(),
    });
    return { ok: true };
  } catch (error: any) {
    console.error('markPurchaseRefunded:', error);
    return { ok: false, error: error?.message || 'Failed to update' };
  }
}

export interface AddPurchaseInput {
  userId: string;
  orderId: string;
  purchaseToken: string;
  levelId: string;
  productId?: string;
  purchaseDate?: string;
  expiryDate?: string;
  price?: number;
  currency?: string;
}

export async function addPurchase(data: AddPurchaseInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = await getDb();
    if (!db) return { ok: false, error: 'Database not available' };
    if (!data.userId?.trim() || !data.orderId?.trim() || !data.purchaseToken?.trim() || !data.levelId?.trim()) {
      return { ok: false, error: 'userId, orderId, purchaseToken, and levelId are required' };
    }
    const docId = data.orderId.trim();
    const now = new Date();
    const purchaseDate = data.purchaseDate ? new Date(data.purchaseDate) : now;
    const expiryDate = data.expiryDate ? new Date(data.expiryDate) : null;
    await db.collection('purchases').doc(docId).set({
      userId: data.userId.trim(),
      orderId: docId,
      purchaseToken: data.purchaseToken.trim(),
      levelId: data.levelId.trim(),
      productId: data.productId?.trim() || data.levelId.trim(),
      purchaseDate,
      expiryDate,
      price: data.price ?? 0,
      amount: data.price ?? 0,
      currency: data.currency || 'USD',
      status: 'active',
      level: data.levelId.trim(),
      createdAt: now,
      updatedAt: now,
    }, { merge: true });
    return { ok: true };
  } catch (error: any) {
    console.error('addPurchase:', error);
    return { ok: false, error: error?.message || 'Failed to add purchase' };
  }
}
