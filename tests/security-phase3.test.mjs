/**
 * Phase 3 — Defensive Security Automation Tests
 * Verifies HTTP Security Headers, RLS configuration, and Seed Credential Safeguards.
 *
 * Run: node --test tests/security-phase3.test.mjs
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = decodeURIComponent(new URL('../', import.meta.url).pathname);
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

// ─── 1. HTTP Security Headers (SEC-SUITE-05) ───────────────────────────────────

describe('SEC-SUITE-05: HTTP Security Headers in next.config.ts', () => {
  const nextConfig = read('next.config.ts');

  it('configures X-Frame-Options: DENY against clickjacking', () => {
    assert.match(nextConfig, /X-Frame-Options.*DENY/, 'X-Frame-Options must be DENY');
  });

  it('configures X-Content-Type-Options: nosniff against MIME sniffing', () => {
    assert.match(nextConfig, /X-Content-Type-Options.*nosniff/, 'X-Content-Type-Options must be nosniff');
  });

  it('configures Referrer-Policy: strict-origin-when-cross-origin', () => {
    assert.match(nextConfig, /Referrer-Policy.*strict-origin-when-cross-origin/, 'Referrer-Policy must be strict-origin-when-cross-origin');
  });

  it('configures HSTS (Strict-Transport-Security) with 1 year max-age', () => {
    assert.match(nextConfig, /Strict-Transport-Security[\s\S]*?max-age=31536000/, 'HSTS must specify 31536000 seconds');
    assert.match(nextConfig, /Strict-Transport-Security[\s\S]*?includeSubDomains/, 'HSTS must include subdomains');
  });

  it('configures Permissions-Policy restricting sensitive device APIs', () => {
    assert.match(nextConfig, /Permissions-Policy[\s\S]*?camera=\(\)/, 'Permissions-Policy must disable camera');
    assert.match(nextConfig, /Permissions-Policy[\s\S]*?microphone=\(\)/, 'Permissions-Policy must disable microphone');
    assert.match(nextConfig, /Permissions-Policy[\s\S]*?geolocation=\(\)/, 'Permissions-Policy must disable geolocation');
  });

  it('configures Content-Security-Policy (CSP) baseline', () => {
    assert.match(nextConfig, /Content-Security-Policy/, 'next.config.ts must define CSP');
    assert.match(nextConfig, /default-src 'self'/, 'CSP must declare default-src self');
    assert.match(nextConfig, /frame-src 'none'/, 'CSP must declare frame-src none');
    assert.match(nextConfig, /object-src 'none'/, 'CSP must declare object-src none');
  });
});

// ─── 2. Row Level Security Schema Invariants (SEC-SUITE-06) ───────────────────

describe('SEC-SUITE-06: Supabase Row-Level Security Policy Invariants', () => {
  const rlsMigration = read('supabase/migrations/20261013000002_row_level_security.sql');

  const requiredProtectedTables = [
    'profiles',
    'consultation_requests',
    'consultation_appointments',
    'jobs',
    'job_applications',
    'testimonials',
    'blog_posts',
    'contact_messages',
    'audit_logs',
    'notification_records',
    'site_settings',
    'media_assets',
  ];

  for (const table of requiredProtectedTables) {
    it(`enforces RLS on public.${table}`, () => {
      const pattern = new RegExp(`alter table public\\.${table} enable row level security`, 'i');
      assert.match(rlsMigration, pattern, `Table public.${table} must have RLS explicitly enabled`);
    });
  }

  it('restricts audit_logs reads strictly to super_admin / admin', () => {
    assert.match(rlsMigration, /create policy "Super Admin view audit logs"[\s\S]*?on public\.audit_logs[\s\S]*?using \(public\.has_role\(array\['super_admin', 'admin'\]\)\)/,
      'audit_logs must only be viewable by authorized administrators');
  });

  it('denies anonymous reads on job_applications', () => {
    // Only staff can select job_applications; public can only insert
    assert.match(rlsMigration, /create policy "Public candidates can submit applications"[\s\S]*?for insert/,
      'job_applications must only grant insert to public candidates');
    assert.doesNotMatch(rlsMigration, /create policy "Public can view job applications"/,
      'job_applications must never allow public select');
  });

  it('denies anonymous reads on consultation_requests', () => {
    assert.match(rlsMigration, /create policy "Public can submit consultation requests"[\s\S]*?for insert/,
      'consultation_requests must only grant insert to public');
    assert.doesNotMatch(rlsMigration, /create policy "Public can view consultation requests"/,
      'consultation_requests must never allow public select');
  });
});

// ─── 3. Seed Credential Handling Safeguards ───────────────────────────────────

describe('SEC-SUITE-07: Seed Credential Handling Safeguards', () => {
  const sessionSrc = read('lib/auth/session.ts');

  it('contains security notice warning regarding SEED_SALT and SEED_PASSWORD_HASH', () => {
    assert.match(sessionSrc, /SECURITY NOTICE/i, 'session.ts must contain security notice on seed credentials');
    assert.match(sessionSrc, /MUST be changed via the admin panel/i,
      'session.ts must explicitly warn that admin password must be changed before production deployment');
  });

  it('does NOT expose plaintext default passwords in session module', () => {
    assert.doesNotMatch(sessionSrc, /defaultPassword/i, 'session.ts must not export defaultPassword');
    assert.doesNotMatch(sessionSrc, /SijamAdmin@2026!/, 'session.ts must not contain SijamAdmin@2026!');
  });
});
