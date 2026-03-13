import { getDb } from '@/lib/firebase-admin';

/** Convert Firestore Timestamp and other non-JSON values so data is safe for server→client serialization */
function serializePurchase(doc: any): Purchase {
  const data = doc.data();
  const out: Record<string, unknown> = { id: doc.id };
  for (const [k, v] of Object.entries(data)) {
    if (v && typeof (v as any).toDate === 'function') {
      out[k] = (v as any).toDate().toISOString();
    } else {
      out[k] = v;
    }
  }
  return out as Purchase;
}

export interface Purchase {
  id: string;
  userId: string;
  level: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: any;
  transactionId?: string;
  // Spec fields (optional for backward compatibility)
  orderId?: string;
  purchaseToken?: string;
  levelId?: string;
  productId?: string;
  purchaseDate?: any;
  expiryDate?: any;
  price?: number;
  updatedAt?: any;
}

export interface PurchaseFilters {
  userId?: string;
  orderId?: string;
  status?: string;
  levelId?: string;
  level?: string;
  startDate?: Date;
  endDate?: Date;
}

export async function getPurchases(limitCount: number = 100): Promise<Purchase[]> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('Firebase Admin not initialized. Returning empty purchases array.');
      return [];
    }
    const purchasesRef = db.collection('purchases');
    const snapshot = await purchasesRef.orderBy('createdAt', 'desc').limit(limitCount).get();
    
    const purchases: Purchase[] = [];
    snapshot.forEach((doc: any) => {
      purchases.push(serializePurchase(doc));
    });
    return purchases;
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
}

export async function getPurchasesByUserId(userId: string): Promise<Purchase[]> {
  try {
    const db = await getDb();
    if (!db) return [];
    const snapshot = await db.collection('purchases').where('userId', '==', userId).orderBy('createdAt', 'desc').get();
    const purchases: Purchase[] = [];
    snapshot.forEach((doc: any) => {
      purchases.push(serializePurchase(doc));
    });
    return purchases;
  } catch (error) {
    console.error('Error fetching purchases by user:', error);
    return [];
  }
}

export async function getPurchasesWithFilters(filters: PurchaseFilters, limitCount: number = 200): Promise<Purchase[]> {
  try {
    const db = await getDb();
    if (!db) return [];
    let ref: any = db.collection('purchases').orderBy('createdAt', 'desc').limit(limitCount);
    if (filters.userId) ref = db.collection('purchases').where('userId', '==', filters.userId).orderBy('createdAt', 'desc').limit(limitCount);
    const snapshot = await ref.get();
    let purchases: Purchase[] = [];
    snapshot.forEach((doc: any) => {
      purchases.push(serializePurchase(doc));
    });
    if (filters.orderId) purchases = purchases.filter((p) => (p.orderId || p.transactionId || p.id) === filters.orderId);
    if (filters.status) purchases = purchases.filter((p) => p.status === filters.status);
    if (filters.levelId) purchases = purchases.filter((p) => (p.levelId || p.level) === filters.levelId);
    if (filters.level) purchases = purchases.filter((p) => (p.level || p.levelId) === filters.level);
    if (filters.startDate) purchases = purchases.filter((p) => p.createdAt && new Date(p.createdAt as string) >= filters.startDate!);
    if (filters.endDate) purchases = purchases.filter((p) => p.createdAt && new Date(p.createdAt as string) <= filters.endDate!);
    return purchases;
  } catch (error) {
    console.error('Error fetching purchases with filters:', error);
    return [];
  }
}

export async function getRevenueStats(startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('Firebase Admin not initialized. Returning empty revenue stats.');
      return {
        totalRevenue: 0,
        revenueByLevel: {},
        dailyRevenue: {},
        purchaseCount: 0,
      };
    }
    let purchasesRef = db.collection('purchases').where('status', 'in', ['completed', 'active']);
    
    if (startDate) {
      purchasesRef = purchasesRef.where('createdAt', '>=', startDate) as any;
    }
    if (endDate) {
      purchasesRef = purchasesRef.where('createdAt', '<=', endDate) as any;
    }
    
    const snapshot = await purchasesRef.get();
    
    let totalRevenue = 0;
    const revenueByLevel: Record<string, number> = {};
    const dailyRevenue: Record<string, number> = {};
    
    snapshot.forEach((doc: any) => {
      const data = doc.data();
      const amount = data.amount || 0;
      totalRevenue += amount;
      
      const level = data.level || 'unknown';
      revenueByLevel[level] = (revenueByLevel[level] || 0) + amount;
      
      if (data.createdAt) {
        const date = data.createdAt.toDate().toISOString().split('T')[0];
        dailyRevenue[date] = (dailyRevenue[date] || 0) + amount;
      }
    });
    
    return {
      totalRevenue,
      revenueByLevel,
      dailyRevenue,
      purchaseCount: snapshot.size,
    };
  } catch (error) {
    console.error('Error fetching revenue stats:', error);
    return {
      totalRevenue: 0,
      revenueByLevel: {},
      dailyRevenue: {},
      purchaseCount: 0,
    };
  }
}
