import { getDb } from '@/lib/firebase-admin';

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  createdAt?: any;
  lastLogin?: any;
  purchaseCount?: number;
  totalSpent?: number;
}

function serializeDoc(doc: any): User {
  const data = doc.data();
  const out: Record<string, unknown> = { id: doc.id };
  for (const [k, v] of Object.entries(data)) {
    if (v && typeof (v as any).toDate === 'function') {
      out[k] = (v as any).toDate().toISOString();
    } else {
      out[k] = v;
    }
  }
  return out as unknown as User;
}

export async function getUsers(limitCount: number = 100): Promise<User[]> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('Firebase Admin not initialized. Returning empty users array.');
      return [];
    }
    const usersRef = db.collection('users');
    const snapshot = await usersRef.limit(limitCount).get();
    const users: User[] = [];
    snapshot.forEach((doc: any) => {
      users.push(serializeDoc(doc));
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('Firebase Admin not initialized. Returning null.');
      return null;
    }
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return serializeDoc(userDoc);
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const auth = await import('@/lib/firebase-admin').then((m) => m.getAuth());
    if (!auth) return null;
    const userRecord = await auth.getUserByEmail(email.trim());
    return userRecord?.uid ?? null;
  } catch {
    return null;
  }
}
