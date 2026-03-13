import { verifyAdminTokenWithUid } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idToken = body?.idToken || body?.token;
    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }
    const result = await verifyAdminTokenWithUid(idToken);
    if (!result.isAdmin) {
      return NextResponse.json(
        { error: 'Access denied', uid: result.uid ?? undefined },
        { status: 403 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
