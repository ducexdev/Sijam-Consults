import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import {
  AUTH_COOKIE_NAME,
  StaffSession,
  verifyPassword,
  signSessionToken,
  DEFAULT_ADMIN_CREDENTIALS,
} from '@/lib/auth/session';


// Simple in-memory lockout (edge-local; resets on cold start — acceptable)
interface LockoutEntry {
  attempts: number;
  lockedUntil?: number;
}
const authAttemptsMap = new Map<string, LockoutEntry>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

function checkLockout(key: string): { isLocked: boolean; remainingMinutes?: number } {
  const entry = authAttemptsMap.get(key);
  if (!entry?.lockedUntil) return { isLocked: false };
  if (Date.now() < entry.lockedUntil) {
    return {
      isLocked: true,
      remainingMinutes: Math.ceil((entry.lockedUntil - Date.now()) / 60000),
    };
  }
  authAttemptsMap.delete(key);
  return { isLocked: false };
}

function recordFailed(key: string): { isLocked: boolean; attemptsRemaining: number } {
  const entry = authAttemptsMap.get(key) || { attempts: 0 };
  entry.attempts += 1;
  if (entry.attempts >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    authAttemptsMap.set(key, entry);
    return { isLocked: true, attemptsRemaining: 0 };
  }
  authAttemptsMap.set(key, entry);
  return { isLocked: false, attemptsRemaining: MAX_FAILED_ATTEMPTS - entry.attempts };
}

function clearFailed(key: string) {
  authAttemptsMap.delete(key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email: rawEmail, password, rememberMe } = body as {
      email: string;
      password: string;
      rememberMe?: boolean;
    };

    const email = (rawEmail || '').trim().toLowerCase();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both your staff email and password.' },
        { status: 400 }
      );
    }

    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';
    const lockoutKey = `${clientIp}:${email}`;

    const lockoutStatus = checkLockout(lockoutKey);
    if (lockoutStatus.isLocked) {
      return NextResponse.json(
        {
          success: false,
          message: `Account is temporarily locked. Please retry in ${lockoutStatus.remainingMinutes} minutes.`,
        },
        { status: 429 }
      );
    }

    const staff = await dbRepository.getStaffByEmail(email);
    if (!staff) {
      const { isLocked, attemptsRemaining } = recordFailed(lockoutKey);
      await dbRepository.recordAuditLog({
        action: 'auth.login_failed',
        entity_type: 'staff_profile',
        entity_id: email,
        details: { email, reason: 'unknown_account', clientIp },
        ip_address: clientIp,
      });
      return NextResponse.json(
        {
          success: false,
          message: isLocked
            ? 'Too many failed attempts. Account locked for 15 minutes.'
            : `Invalid email or password. (${attemptsRemaining} attempts remaining)`,
        },
        { status: 401 }
      );
    }

    if (!staff.is_active) {
      return NextResponse.json(
        {
          success: false,
          message: 'This staff account has been suspended. Contact your Super Administrator.',
        },
        { status: 403 }
      );
    }

    let passwordMatches = false;
    if (staff.password_hash && staff.salt) {
      passwordMatches = verifyPassword(password, staff.salt, staff.password_hash);
    } else {
      passwordMatches = password === DEFAULT_ADMIN_CREDENTIALS.defaultPassword;
    }

    if (!passwordMatches) {
      const { isLocked, attemptsRemaining } = recordFailed(lockoutKey);
      await dbRepository.recordAuditLog({
        user_id: staff.id,
        action: 'auth.login_failed',
        entity_type: 'staff_profile',
        entity_id: staff.id,
        details: { email, reason: 'invalid_password', clientIp },
        ip_address: clientIp,
      });
      return NextResponse.json(
        {
          success: false,
          message: isLocked
            ? 'Too many failed attempts. Account locked for 15 minutes.'
            : `Invalid email or password. (${attemptsRemaining} attempts remaining)`,
        },
        { status: 401 }
      );
    }

    clearFailed(lockoutKey);

    const maxAgeSeconds = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const now = Date.now();
    const sessionPayload: StaffSession = {
      staffId: staff.id,
      email: staff.email,
      name: staff.full_name,
      role: staff.role,
      department: staff.department,
      issuedAt: now,
      expiresAt: now + maxAgeSeconds * 1000,
    };

    const sessionToken = signSessionToken(sessionPayload);

    await dbRepository.updateStaff(staff.id, {
      last_login_at: new Date().toISOString(),
    });

    await dbRepository.recordAuditLog({
      user_id: staff.id,
      action: 'auth.login_success',
      entity_type: 'staff_profile',
      entity_id: staff.id,
      details: { email: staff.email, role: staff.role, rememberMe: Boolean(rememberMe) },
      ip_address: clientIp,
    });

    const response = NextResponse.json({
      success: true,
      staff: {
        id: staff.id,
        email: staff.email,
        full_name: staff.full_name,
        role: staff.role,
        department: staff.department,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch (error) {
    console.error('[API /api/auth/login] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication service error. Please try again.' },
      { status: 500 }
    );
  }
}
