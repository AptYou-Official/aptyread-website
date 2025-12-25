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
      users.push({
        id: doc.id,
        ...doc.data(),
      } as User);
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
    return {
      id: userDoc.id,
      ...userDoc.data(),
    } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
