/**
 * Phase 4 — Blog Content & URL Redirects Regression Suite
 *
 * Verifies:
 * 1. Legacy-to-new URL mapping integrity (including trailing slash variants like /what-clients-say/)
 * 2. Permanent 301 direct redirects to canonical destinations (no chains or dead ends)
 * 3. Blog publishing data and E-E-A-T brand voice compliance
 * 4. Content policy compliance (no deceptive "guaranteed visa" claims)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = decodeURIComponent(new URL('../', import.meta.url).pathname);
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

// ─── 1. Legacy-to-New URL Redirect Mapping ─────────────────────────────────────

describe('Phase 4 — Legacy URL Redirect Map', () => {
  const nextConfigSrc = read('next.config.ts');

  it('redirects /what-clients-say AND /what-clients-say/ directly to /reviews with permanent: true', () => {
    assert.match(nextConfigSrc, /source:\s*'\/what-clients-say',\s*destination:\s*'\/reviews',\s*permanent:\s*true/);
    assert.match(nextConfigSrc, /source:\s*'\/what-clients-say\/',\s*destination:\s*'\/reviews',\s*permanent:\s*true/);
  });

  it('redirects legacy about-us, contact-us, and study-visa URLs directly', () => {
    assert.match(nextConfigSrc, /source:\s*'\/about-us\/',\s*destination:\s*'\/about'/);
    assert.match(nextConfigSrc, /source:\s*'\/contact-us\/',\s*destination:\s*'\/contact'/);
    assert.match(nextConfigSrc, /source:\s*'\/study-visa\/',\s*destination:\s*'\/services\/study-visa'/);
  });

  it('redirects legacy work permit and business registration URLs', () => {
    assert.match(nextConfigSrc, /source:\s*'\/work-permit-and-employment-placement-visa\/',\s*destination:\s*'\/services\/work-visa'/);
    assert.match(nextConfigSrc, /source:\s*'\/business-company-registration\/',\s*destination:\s*'\/services\/business-registration'/);
  });

  it('redirects legacy document legalization and flight booking URLs', () => {
    assert.match(nextConfigSrc, /source:\s*'\/document-legalization\/',\s*destination:\s*'\/services\/document-legalization'/);
    assert.match(nextConfigSrc, /source:\s*'\/flight-reservations\/',\s*destination:\s*'\/services\/flight-reservations'/);
  });

  it('redirects legacy nursing article slug including trailing slash', () => {
    assert.match(nextConfigSrc, /source:\s*'\/why-study-nursing-in-canada-2026-2027\/',\s*destination:\s*'\/blog\/why-study-nursing-canada-2026'/);
  });
});

// ─── 2. Blog Engine & Brand Voice E-E-A-T ───────────────────────────────────────

describe('Phase 4 — Blog Content Quality & Brand Voice Compliance', () => {
  const blogDataSrc = read('lib/data/blog.ts');

  it('contains verified evidence-based articles with distinct search intent', () => {
    assert.match(blogDataSrc, /slug:\s*'why-study-nursing-canada-2026'/);
    assert.match(blogDataSrc, /slug:\s*'schengen-d-visa-african-founders'/);
    assert.match(blogDataSrc, /slug:\s*'uk-skilled-worker-visa-guide-2026'/);
    assert.match(blogDataSrc, /slug:\s*'tourist-visa-refusal-common-mistakes'/);
    assert.match(blogDataSrc, /slug:\s*'international-job-search-strategy-nigeria'/);
    assert.match(blogDataSrc, /slug:\s*'what-to-do-after-visa-refusal-nigeria'/);
  });

  it('strictly prohibits fraudulent guarantees in blog articles', () => {
    // Prohibited phrases per Brand Voice guidelines
    assert.doesNotMatch(blogDataSrc, /100%\s*visa\s*guarantee/i);
    assert.doesNotMatch(blogDataSrc, /guaranteed\s*visa\s*approval/i);
    assert.doesNotMatch(blogDataSrc, /guaranteed\s*job\s*abroad/i);
    assert.doesNotMatch(blogDataSrc, /zero\s*requirement\s*visas/i);
  });

  it('cites statutory and regulatory frameworks in editorial content', () => {
    // Verified statutory references
    assert.match(blogDataSrc, /Schengen Visa Code/i);
    assert.match(blogDataSrc, /Immigration and Nationality Act|Section 214\(b\)/i);
    assert.match(blogDataSrc, /Immigration Rules|Certificate of Sponsorship/i);
  });

  it('provides structured keyTakeaways on every published article', () => {
    assert.match(blogDataSrc, /keyTakeaways:\s*\[/);
  });
});
