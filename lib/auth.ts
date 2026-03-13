import { getDb, getAuth } from '@/lib/firebase-admin';

export async function verifyAdminToken(token: string): Promise<boolean> {
  const result = await verifyAdminTokenWithUid(token);
  return result.isAdmin;
}

export async function verifyAdminTokenWithUid(token: string): Promise<{ isAdmin: boolean; uid: string | null }> {
  try {
    const auth = await getAuth();
    const db = await getDb();
    if (!auth || !db) {
      console.warn('Firebase Admin not initialized. Cannot verify admin token.');
      return { isAdmin: false, uid: null };
    }
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Check if user is in admin_users collection
    const adminDoc = await db.collection('admin_users').doc(userId).get();
    if (!adminDoc.exists) {
      console.warn('[admin] UID not in admin_users:', userId);
    }
    return { isAdmin: adminDoc.exists, uid: userId };
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return { isAdmin: false, uid: null };
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
