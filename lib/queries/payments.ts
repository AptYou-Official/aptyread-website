import { getDb } from '@/lib/firebase-admin';

export interface Purchase {
  id: string;
  userId: string;
  level: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: any;
  transactionId?: string;
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
      purchases.push({
        id: doc.id,
        ...doc.data(),
      } as Purchase);
    });
    
    return purchases;
  } catch (error) {
    console.error('Error fetching purchases:', error);
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
    let purchasesRef = db.collection('purchases').where('status', '==', 'completed');
    
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
