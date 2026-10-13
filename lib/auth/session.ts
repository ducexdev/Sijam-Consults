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

const SESSION_SECRET = process.env.SESSION_SECRET || 'sijam-consults-auth-secret-key-2026-rc1715416-kaduna';
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
// Default Super Admin Seed Configuration
// ------------------------------------------------------------------------------
export const DEFAULT_ADMIN_CREDENTIALS = {
  email: 'admin@sijamconsults.com',
  secondaryEmail: 'james.samson@sijamconsults.com',
  defaultPassword: 'SijamAdmin@2026!',
};

// Static precomputed salt & hash for default password "SijamAdmin@2026!"
export const SEED_SALT = 'e57c6b901a884f2c';
export const SEED_PASSWORD_HASH = hashPassword(DEFAULT_ADMIN_CREDENTIALS.defaultPassword, SEED_SALT);
