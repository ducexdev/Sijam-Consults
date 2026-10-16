import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';
import { dbRepository } from '@/lib/db/repository';


export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ session: null, profile: null });
    }

    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ session: null, profile: null });
    }

    const profile = await dbRepository.getStaffById(session.staffId);
    if (!profile || !profile.is_active) {
      return NextResponse.json({ session: null, profile: null });
    }

    return NextResponse.json({ session, profile });
  } catch (error) {
    console.error('[API /api/auth/session] Error:', error);
    return NextResponse.json({ session: null, profile: null });
  }
}
