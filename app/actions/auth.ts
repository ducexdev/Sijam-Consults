'use server';

import { cookies } from 'next/headers';
import { dbRepository } from '@/lib/db/repository';
import {
  AUTH_COOKIE_NAME,
  StaffSession,
  generateSalt,
  hashPassword,
  verifyPassword,
  signSessionToken,
  verifySessionToken,
  SEED_SALT,
  SEED_PASSWORD_HASH,
} from '@/lib/auth/session';
import { emailService } from '@/lib/email/smtp';
import { ProfileRecord } from '@/lib/types/database';

// Rate limiting & Lockout map (key: ip or email -> { attempts, lockedUntil })
interface LockoutEntry {
  attempts: number;
  lockedUntil?: number;
}
const authAttemptsMap = new Map<string, LockoutEntry>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function checkAuthLockout(key: string): { isLocked: boolean; remainingMinutes?: number } {
  const entry = authAttemptsMap.get(key);
  if (!entry) return { isLocked: false };

  const now = Date.now();
  if (entry.lockedUntil && entry.lockedUntil > now) {
    const remainingMinutes = Math.ceil((entry.lockedUntil - now) / 60000);
    return { isLocked: true, remainingMinutes };
  }

  // Lockout expired
  if (entry.lockedUntil && entry.lockedUntil <= now) {
    authAttemptsMap.delete(key);
    return { isLocked: false };
  }

  return { isLocked: false };
}

function recordFailedAttempt(key: string): { isLocked: boolean; attemptsRemaining: number } {
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

function clearFailedAttempts(key: string) {
  authAttemptsMap.delete(key);
}

/**
 * Server Action: Authenticate Staff Officer with Email & Password
 */
export async function loginStaff(
  input: {
    email: string;
    password: string;
    rememberMe?: boolean;
  },
  clientIp = '127.0.0.1'
): Promise<{
  success: boolean;
  message?: string;
  staff?: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    department?: string | null;
  };
}> {
  const email = (input.email || '').trim().toLowerCase();
  const password = input.password || '';

  if (!email || !password) {
    return { success: false, message: 'Please provide both your staff email and password.' };
  }

  // 1. Lockout Check
  const lockoutKey = `${clientIp}:${email}`;
  const lockoutStatus = checkAuthLockout(lockoutKey);
  if (lockoutStatus.isLocked) {
    return {
      success: false,
      message: `Account is temporarily locked due to excessive failed attempts. Please retry in ${lockoutStatus.remainingMinutes} minutes.`,
    };
  }

  // 2. Fetch Profile by Email
  const staff = await dbRepository.getStaffByEmail(email);
  if (!staff) {
    const { isLocked, attemptsRemaining } = recordFailedAttempt(lockoutKey);
    await dbRepository.recordAuditLog({
      action: 'auth.login_failed',
      entity_type: 'staff_profile',
      entity_id: email,
      details: { email, reason: 'unknown_account', clientIp },
      ip_address: clientIp,
    });
    return {
      success: false,
      message: isLocked
        ? 'Too many failed attempts. Account locked for 15 minutes.'
        : `Invalid email or password. (${attemptsRemaining} attempts remaining)`,
    };
  }

  // 3. Active Account Status Check
  if (!staff.is_active) {
    return {
      success: false,
      message: 'This staff account has been suspended or deactivated. Contact your Super Administrator.',
    };
  }

  // 4. Password Verification — require a stored hash; no plaintext fallback allowed
  let passwordMatches = false;
  if (staff.password_hash && staff.salt) {
    passwordMatches = verifyPassword(password, staff.salt, staff.password_hash);
  } else {
    // Account has no stored password hash — this should not happen in a correctly
    // seeded database. Reject the login to force a DB-level fix; never compare
    // plaintext passwords in production.
    await dbRepository.recordAuditLog({
      user_id: staff.id,
      action: 'auth.login_failed',
      entity_type: 'staff_profile',
      entity_id: staff.id,
      details: { email, reason: 'no_password_hash_on_record', clientIp },
      ip_address: clientIp,
    });
    return {
      success: false,
      message: 'Account configuration error. No password hash on record. Contact your Super Administrator.',
    };
  }

  if (!passwordMatches) {
    const { isLocked, attemptsRemaining } = recordFailedAttempt(lockoutKey);
    await dbRepository.recordAuditLog({
      user_id: staff.id,
      action: 'auth.login_failed',
      entity_type: 'staff_profile',
      entity_id: staff.id,
      details: { email, reason: 'invalid_password', clientIp },
      ip_address: clientIp,
    });
    return {
      success: false,
      message: isLocked
        ? 'Too many failed attempts. Account locked for 15 minutes.'
        : `Invalid email or password. (${attemptsRemaining} attempts remaining)`,
    };
  }

  // 5. Successful Login: Clear lockout and issue session
  clearFailedAttempts(lockoutKey);

  const maxAgeSeconds = input.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 24 hours
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

  // Set HTTP-Only Secure Cookie
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  });

  // Update last login timestamp
  await dbRepository.updateStaff(staff.id, {
    last_login_at: new Date().toISOString(),
  });

  // Audit Log
  await dbRepository.recordAuditLog({
    user_id: staff.id,
    action: 'auth.login_success',
    entity_type: 'staff_profile',
    entity_id: staff.id,
    details: { email: staff.email, role: staff.role, rememberMe: Boolean(input.rememberMe) },
    ip_address: clientIp,
  });

  return {
    success: true,
    staff: {
      id: staff.id,
      email: staff.email,
      full_name: staff.full_name,
      role: staff.role,
      department: staff.department,
    },
  };
}

/**
 * Server Action: Invalidate Session and Sign Out
 */
export async function logoutStaff(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  const currentToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (currentToken) {
    const session = verifySessionToken(currentToken);
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

  cookieStore.delete(AUTH_COOKIE_NAME);
  return { success: true };
}

/**
 * Server Action: Retrieve Current Authenticated Staff Session
 */
export async function getStaffSession(): Promise<{
  session: StaffSession | null;
  profile: ProfileRecord | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return { session: null, profile: null };

    const session = verifySessionToken(token);
    if (!session) return { session: null, profile: null };

    const profile = await dbRepository.getStaffById(session.staffId);
    if (!profile || !profile.is_active) {
      return { session: null, profile: null };
    }

    return { session, profile };
  } catch (err) {
    console.error('Session retrieval error:', err);
    return { session: null, profile: null };
  }
}

/**
 * Server Action: Change Own Account Password
 */
export async function changeOwnPassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> {
  const { profile } = await getStaffSession();
  if (!profile) {
    return { success: false, message: 'Authentication required. Please sign in.' };
  }

  // 1. Verify Current Password — require a stored hash
  let currentValid = false;
  if (profile.password_hash && profile.salt) {
    currentValid = verifyPassword(input.currentPassword, profile.salt, profile.password_hash);
  } else {
    return { success: false, message: 'Account configuration error. No password hash on record. Contact your Super Administrator.' };
  }

  if (!currentValid) {
    return { success: false, message: 'Current password provided is incorrect.' };
  }

  // 2. Validate New Password Complexity
  if (!input.newPassword || input.newPassword.length < 8) {
    return { success: false, message: 'New password must be at least 8 characters long.' };
  }

  // 3. Hash New Password with Fresh Salt
  const freshSalt = generateSalt();
  const freshHash = hashPassword(input.newPassword, freshSalt);

  await dbRepository.updateStaffPassword(profile.id, freshHash, freshSalt);

  await dbRepository.recordAuditLog({
    user_id: profile.id,
    action: 'auth.password_changed',
    entity_type: 'staff_profile',
    entity_id: profile.id,
    details: { email: profile.email },
  });

  return { success: true, message: 'Password updated successfully.' };
}

/**
 * Server Action: Request One-Time Password Reset Security Code
 */
export async function requestPasswordResetCode(email: string): Promise<{ success: boolean; message: string }> {
  const normalized = email.trim().toLowerCase();
  const staff = await dbRepository.getStaffByEmail(normalized);

  // Return standard message even if account not found to prevent user enumeration
  const standardMsg = 'If the provided address belongs to an authorized staff profile, a 6-digit security token has been dispatched to your email.';

  if (!staff || !staff.is_active) {
    return { success: true, message: standardMsg };
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  // Send security token email via cPanel SMTP
  try {
    await emailService.sendSecurityToken(staff.email, token, staff.full_name);
    await dbRepository.recordAuditLog({
      user_id: staff.id,
      action: 'auth.password_reset_requested',
      entity_type: 'staff_profile',
      entity_id: staff.id,
      details: { email: staff.email },
    });
  } catch (err) {
    console.error('Failed to dispatch security code:', err);
  }

  return { success: true, message: standardMsg };
}
