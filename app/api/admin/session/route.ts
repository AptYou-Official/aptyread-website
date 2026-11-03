import { NextResponse } from 'next/server';
import {
  AdminAuthError,
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  assertAdminSessionOrigin,
  createAdminSession,
  requireAdmin,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}

function failure(error: unknown) {
  return error instanceof AdminAuthError
    ? json({ error: error.message }, error.status)
    : json({ error: 'Unable to complete admin sign-in. Please try again.' }, 503);
}

export async function POST(request: Request) {
  try {
    assertAdminSessionOrigin(request);
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
      return json({ error: 'A JSON request is required.' }, 415);
    }
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
    const idToken = body?.idToken;
    if (typeof idToken !== 'string' || !idToken || idToken.length > 8192) {
      return json({ error: 'A sign-in token is required.' }, 400);
    }
    const session = await createAdminSession(idToken);
    const response = json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, session, adminSessionCookieOptions());
    return response;
  } catch (error) {
    return failure(error);
  }
}

export async function GET() {
  try {
    await requireAdmin();
    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}

export async function DELETE(request: Request) {
  try {
    assertAdminSessionOrigin(request);
    const response = json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, '', { ...adminSessionCookieOptions(), maxAge: 0 });
    return response;
  } catch (error) {
    return failure(error);
  }
}
