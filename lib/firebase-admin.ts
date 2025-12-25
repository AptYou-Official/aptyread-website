import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Only initialize Firebase Admin if credentials are provided
const hasCredentials = 
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (hasCredentials && !getApps().length) {
  try {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    });
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
    // Continue without Firebase Admin - admin panel won't work but website will
  }
} else if (getApps().length > 0) {
  app = getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
}

export { db, auth };

