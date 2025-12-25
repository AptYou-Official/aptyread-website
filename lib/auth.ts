import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase-admin';

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
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
    const adminDoc = await db.collection('admin_users').doc(userId).get();
    return adminDoc.exists;
  } catch (error) {
    console.error('Error checking admin user:', error);
    return false;
  }
}

