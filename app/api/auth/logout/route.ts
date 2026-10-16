import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';
import { dbRepository } from '@/lib/db/repository';


export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (token) {
      const session = verifySessionToken(token);
      if (session) {
        await dbRepository.recordAuditLog({
          user_id: session.staffId,
          action: 'auth.logout',
          entity_type: 'staff_profile',
          entity_id: session.staffId,
          details: { email: session.email },
        });
      }
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error('[API /api/auth/logout] Error:', error);
    const response = NextResponse.json({ success: true });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }
}
