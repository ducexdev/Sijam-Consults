/**
 * lib/auth/require-admin.ts
 *
 * Shared helper for API Route Handlers that require an authenticated staff session.
 * Returns the verified session payload or null if unauthenticated.
 *
 * Usage inside a Next.js API Route Handler:
 *
 *   import { requireAdminSession } from '@/lib/auth/require-admin';
 *
 *   export async function POST(request: NextRequest) {
 *     const authResult = await requireAdminSession(request);
 *     if (authResult.error) return authResult.error;
 *     const { session } = authResult;
 *     // ... use session.staffId as the actor id in audit logs
 *   }
 */

import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken, StaffSession } from '@/lib/auth/session';
import { dbRepository } from '@/lib/db/repository';

type AuthSuccess = { error: null; session: StaffSession; staffId: string };
type AuthFailure = { error: NextResponse; session: null; staffId: null };

export async function requireAdminSession(
  request: NextRequest
): Promise<AuthSuccess | AuthFailure> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Authentication required. Please sign in to the Operations Hub.' },
        { status: 401 }
      ),
      session: null,
      staffId: null,
    };
  }

  const session = verifySessionToken(token);
  if (!session) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Session expired or invalid. Please sign in again.' },
        { status: 401 }
      ),
      session: null,
      staffId: null,
    };
  }

  // Verify the staff account is still active in the database
  const profile = await dbRepository.getStaffById(session.staffId);
  if (!profile || !profile.is_active) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Staff account is inactive or no longer exists.' },
        { status: 403 }
      ),
      session: null,
      staffId: null,
    };
  }

  return { error: null, session, staffId: session.staffId };
}
