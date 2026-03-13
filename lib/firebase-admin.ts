// Lazy-load Firebase Admin to prevent build-time execution
let firebaseAdmin: any = null;
let app: any = null;
let db: any = null;
let auth: any = null;

async function getFirebaseAdmin() {
  if (firebaseAdmin) return firebaseAdmin;
  
  try {
    firebaseAdmin = await import('firebase-admin/app');
    return firebaseAdmin;
  } catch (error) {
    console.warn('Firebase Admin not available:', error);
    return null;
  }
}

async function initializeFirebase() {
  const hasServiceAccount =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

  // Need at least project ID for Application Default Credentials
  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;

  if (!hasServiceAccount && !projectId) {
    return { db: null, auth: null };
  }

  try {
    const admin = await getFirebaseAdmin();
    if (!admin) {
      return { db: null, auth: null };
    }

    const { initializeApp, getApps, cert } = admin;
    const { getFirestore } = await import('firebase-admin/firestore');
    const { getAuth } = await import('firebase-admin/auth');

    if (!getApps().length) {
      if (hasServiceAccount) {
        app = initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        // Fallback: use Application Default Credentials (e.g. gcloud auth application-default login)
        const { credential } = await import('firebase-admin/app');
        app = initializeApp({
          projectId,
          credential: credential.applicationDefault(),
        });
      }
    } else {
      app = getApps()[0];
    }

    db = getFirestore(app);
    auth = getAuth(app);

    return { db, auth };
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
    return { db: null, auth: null };
  }
}

// Initialize lazily
let initPromise: Promise<{ db: any; auth: any }> | null = null;

export async function getDb() {
  if (db) return db;
  if (!initPromise) {
    initPromise = initializeFirebase();
  }
  const result = await initPromise;
  return result.db;
}

export async function getAuth() {
  if (auth) return auth;
  if (!initPromise) {
    initPromise = initializeFirebase();
  }
  const result = await initPromise;
  return result.auth;
}

// For backward compatibility, export null initially
// These will be set when Firebase is initialized
export { db, auth };
