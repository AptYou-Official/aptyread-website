import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb, getAuth } from '@/lib/firebase-admin';

export const ADMIN_SESSION_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-apty_admin' : 'apty_admin';
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

export class AdminAuthError extends Error {
  constructor(public readonly status: 401 | 403 | 503, message: string) {
    super(message);
    this.name = 'AdminAuthError';
  }
}

async function ensureAllowedAdmin(uid: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new AdminAuthError(503, 'Admin sign-in is temporarily unavailable.');
  const admin = await db.collection('admin_users').doc(uid).get();
  if (!admin.exists) throw new AdminAuthError(403, 'This account does not have admin access.');
}

/** Only exchange a recently authenticated, non-revoked administrator's ID token. */
export async function createAdminSession(idToken: string): Promise<string> {
  const auth = await getAuth();
  if (!auth) throw new AdminAuthError(503, 'Admin sign-in is temporarily unavailable.');
  let decoded;
  try {
    decoded = await auth.verifyIdToken(idToken, true);
  } catch {
    throw new AdminAuthError(401, 'Please sign in again.');
  }
  const age = Date.now() / 1000 - decoded.auth_time;
  if (!decoded.uid || !Number.isFinite(age) || age < -60 || age > 5 * 60) {
    throw new AdminAuthError(401, 'Please sign in again to start an admin session.');
  }
  await ensureAllowedAdmin(decoded.uid);
  return auth.createSessionCookie(idToken, { expiresIn: ADMIN_SESSION_SECONDS * 1000 });
}

/** A session is authenticated and its current allowlist membership is checked every time. */
export async function verifyAdminSession(session: string | undefined): Promise<{ uid: string }> {
  if (!session) throw new AdminAuthError(401, 'Your admin session has expired. Sign in again.');
  const auth = await getAuth();
  if (!auth) throw new AdminAuthError(503, 'Admin sign-in is temporarily unavailable.');
  let decoded;
  try {
    // Firebase also rejects revoked sessions and disabled accounts with this flag.
    decoded = await auth.verifySessionCookie(session, true);
  } catch {
    throw new AdminAuthError(401, 'Your admin session has expired. Sign in again.');
  }
  if (!decoded.uid) throw new AdminAuthError(401, 'Please sign in again.');
  await ensureAllowedAdmin(decoded.uid);
  return { uid: decoded.uid };
}

/** Call before every privileged query or mutation, including direct server-action calls. */
export async function requireAdmin(): Promise<{ uid: string }> {
  return verifyAdminSession(cookies().get(ADMIN_SESSION_COOKIE)?.value);
}

/** Server pages must redirect before rendering or fetching any private data. */
export async function requireAdminPage(): Promise<{ uid: string }> {
  try {
    return await requireAdmin();
  } catch (error) {
    if (error instanceof AdminAuthError && error.status !== 503) {
      redirect(`/admin/login?message=${error.status === 403 ? 'access_denied' : 'session_expired'}`);
    }
    throw error;
  }
}

/** JSON session endpoints accept only same-origin browser requests, preventing login/logout CSRF. */
export function assertAdminSessionOrigin(request: Request): void {
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  const requestUrl = new URL(request.url);
  // Vercel/reverse proxies can expose an internal URL to a route handler.
  // Match the public host as Next's server-action CSRF check does, preserving the scheme too.
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || requestUrl.host;
  const protocol = request.headers.get('x-forwarded-proto') || requestUrl.protocol.slice(0, -1);
  const expectedOrigin = `${protocol}://${host}`;
  if (!origin || !['http', 'https'].includes(protocol) || origin !== expectedOrigin || (fetchSite && fetchSite !== 'same-origin')) {
    throw new AdminAuthError(403, 'Request origin is not allowed.');
  }
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: ADMIN_SESSION_SECONDS,
  };
}
