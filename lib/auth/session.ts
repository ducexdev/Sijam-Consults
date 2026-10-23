// ==============================================================================
// SIJAM Consults Limited (RC: 1715416)
// Industry Standard Session & Password Authentication Engine
// Cloudflare & Node.js Compatible Security Architecture
// ==============================================================================

import crypto from 'node:crypto';
import { ProfileRecord, AdminRole } from '@/lib/types/database';

export interface StaffSession {
  staffId: string;
  email: string;
  name: string;
  role: AdminRole;
  department?: string | null;
  issuedAt: number;
  expiresAt: number;
}

// SESSION_SECRET must be set as an environment variable (Cloudflare Worker secret or .env.local).
// The application refuses to start if this is missing or shorter than 32 characters.
const _rawSecret = process.env.SESSION_SECRET;
if (!_rawSecret || _rawSecret.length < 32) {
  throw new Error(
    '[AUTH] SESSION_SECRET environment variable is missing or too short (min 32 chars). ' +
    'Set it via `wrangler secret put SESSION_SECRET` for production or in .env.local for development.'
  );
}
const SESSION_SECRET = _rawSecret;
export const AUTH_COOKIE_NAME = 'sijam_admin_session';

/**
 * Generate cryptographically secure random salt
 */
export function generateSalt(length = 16): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash password using HMAC-SHA256 with per-user salt
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

/**
 * Constant-time comparison to prevent timing attacks
 */
export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const hash = hashPassword(password, salt);
  if (hash.length !== expectedHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
}

/**
 * Sign session object with HMAC-SHA256 signature
 */
export function signSessionToken(session: StaffSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

/**
 * Verify and decode session token
 */
export function verifySessionToken(token: string): StaffSession | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');

  if (signature.length !== expectedSig.length) return null;
  const validSig = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  if (!validSig) return null;

  try {
    const raw = Buffer.from(payload, 'base64url').toString('utf8');
    const session = JSON.parse(raw) as StaffSession;

    // Check expiration
    if (Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------------------
// Seed Configuration — precomputed salt & password hash for database seeding only
//
// ⚠  SECURITY NOTICE (SEC-A03 — Phase 3a Remediation)
//    These constants represent the DEFAULT seed admin credentials. They are used
//    exclusively by supabase/migrations/20261013000004_seed_data.sql to insert
//    the initial admin account rows.  They MUST be treated as compromised and
//    the admin account password MUST be changed via the admin panel before any
//    production deployment.
//
//    Risk: If the git history is ever exposed, an attacker can attempt an offline
//    dictionary attack to recover the plaintext password.
//
//    Remediation steps (REQUIRED before go-live):
//      1. Log in to the admin dashboard with the seed credentials.
//      2. Navigate to Profile → Change Password.
//      3. Set a strong, unique password (≥20 chars, mixed, random).
//      4. The DB row will be updated with a new salt+hash — making these constants
//         permanently irrelevant for that deployment.
//      5. Rotate the seed values in this file or delete them after seeding remote.
//
//    Do NOT add SEED_SALT / SEED_PASSWORD_HASH to environment variable secrets —
//    these are seed-time-only constants, not runtime secrets.
// ------------------------------------------------------------------------------

/** @internal Used only in seed migration. Change admin password before go-live. */
export const SEED_SALT = 'e57c6b901a884f2c';

/** @internal Used only in seed migration. Change admin password before go-live. */
export const SEED_PASSWORD_HASH = '485198b8e96211079c5e4b9c9c0f24dc7d27dc4fd158a17e1906bb95b68dc118';

/** Staff email addresses for the two primary admin accounts (not a credential). */
export const ADMIN_EMAILS = {
  primary: 'admin@sijamconsults.com',
  secondary: 'james.samson@sijamconsults.com',
};
