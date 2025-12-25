import { getDb, getAuth } from '@/lib/firebase-admin';

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const auth = await getAuth();
    const db = await getDb();
    if (!auth || !db) {
      console.warn('Firebase Admin not initialized. Cannot verify admin token.');
      return false;
    }
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    // Check if user is in admin_users collection
    const adminDoc = await db.collection('admin_users').doc(userId).get();
    return adminDoc.exists;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return false;
  }
}

export async function isAdminUser(userId: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('Firebase Admin not initialized. Cannot check admin user.');
      return false;
    }
    const adminDoc = await db.collection('admin_users').doc(userId).get();
    return adminDoc.exists;
  } catch (error) {
    console.error('Error checking admin user:', error);
    return false;
  }
}
