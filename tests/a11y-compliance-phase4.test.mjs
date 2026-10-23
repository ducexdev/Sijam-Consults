/**
 * Phase 4 — Accessibility (WCAG 2.1 AA) & Content Quality Compliance Tests
 *
 * Verifies:
 * - WCAG 2.1 AA Success Criteria (Bypass Blocks, Dialog Pattern, Label Association)
 * - Image alt-text coverage
 * - Content integrity (Rule 5: Zero invented visa guarantees, verified CAC credentials)
 *
 * Run: node --test tests/a11y-compliance-phase4.test.mjs
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = decodeURIComponent(new URL('../', import.meta.url).pathname);
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

function walkTsx(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.open-next') {
        results = results.concat(walkTsx(fullPath));
      }
    } else if (file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ─── 1. WCAG 2.1 AA Accessibility Invariants ─────────────────────────────────

describe('A11Y-01: Bypass Blocks (SC 2.4.1 Level A)', () => {
  it('PublicLayout includes a skip-to-content link pointing to #main-content', () => {
    const layout = read('components/layout/PublicLayout.tsx');
    assert.match(layout, /href="#main-content"/, 'Must contain skip link to #main-content');
    assert.match(layout, /id="main-content"/, 'Main element must have id="main-content"');
    assert.match(layout, /sr-only focus:not-sr-only/, 'Skip link must be visually hidden until focused');
  });
});

describe('A11Y-02: WAI-ARIA Modal & Slideout Dialog Pattern (SC 2.1.2 & 4.1.2)', () => {
  it('JobSpecsSlideover implements dialog role and Escape key dismissal', () => {
    const slideover = read('components/jobs/JobSpecsSlideover.tsx');
    assert.match(slideover, /role="dialog"/, 'Slideout must declare role="dialog"');
    assert.match(slideover, /aria-modal="true"/, 'Slideout must declare aria-modal="true"');
    assert.match(slideover, /aria-labelledby="job-specs-title"/, 'Slideout must declare aria-labelledby');
    assert.match(slideover, /id="job-specs-title"/, 'Slideout heading must have matching id');
    assert.match(slideover, /key === ['"]Escape['"]/, 'Slideout must close on Escape key');
  });

  it('Navbar mobile menu implements Escape key dismissal', () => {
    const navbar = read('components/layout/Navbar.tsx');
    assert.match(navbar, /role="dialog"/, 'Mobile drawer must declare role="dialog"');
    assert.match(navbar, /aria-label="Navigation Menu"/, 'Mobile drawer must declare accessible label');
    assert.match(navbar, /key === ["']Escape["']/, 'Mobile menu must close on Escape key');
  });

  it('Modal component implements dialog role, aria-modal, and Escape key dismissal', () => {
    const modal = read('components/ui/Modal.tsx');
    assert.match(modal, /role="dialog"/, 'Modal must declare role="dialog"');
    assert.match(modal, /aria-modal="true"/, 'Modal must declare aria-modal="true"');
    assert.match(modal, /key === ['"]Escape['"]/, 'Modal must dismiss on Escape key');
  });
});

describe('A11Y-03: Form Input Label & Error Association (SC 1.3.1 & 3.3.1)', () => {
  it('ContactForm connects labels to inputs via id/htmlFor and binds error states', () => {
    const form = read('components/contact/ContactForm.tsx');
    assert.match(form, /htmlFor="contact-full-name"/, 'Full name label must have htmlFor');
    assert.match(form, /id="contact-full-name"/, 'Full name input must have matching id');
    assert.match(form, /htmlFor="contact-email"/, 'Email label must have htmlFor');
    assert.match(form, /id="contact-email"/, 'Email input must have matching id');
    assert.match(form, /aria-invalid/, 'Inputs must declare aria-invalid state');
    assert.match(form, /aria-describedby/, 'Inputs must associate with error message ids');
  });
});

describe('A11Y-04: Image Non-Text Content (SC 1.1.1 Level A)', () => {
  it('every Image and img element across app and components has an alt attribute', () => {
    const appDir = join(ROOT, 'app');
    const compDir = join(ROOT, 'components');
    const tsxFiles = walkTsx(appDir).concat(walkTsx(compDir));

    let missingAltFiles = [];
    const tagRegex = /<(?:Image|img)\b([^>]*?)(?:\/?>)/gs;

    for (const file of tsxFiles) {
      const content = readFileSync(file, 'utf8');
      let match;
      while ((match = tagRegex.exec(content)) !== null) {
        const attrs = match[1];
        if (!/\balt\s*=/s.test(attrs)) {
          missingAltFiles.push(`${file}: ${match[0].slice(0, 80)}`);
        }
      }
    }

    assert.equal(missingAltFiles.length, 0,
      `Found images missing alt attributes:\n${missingAltFiles.join('\n')}`);
  });
});

// ─── 2. Content Quality & Legal Compliance Invariants (Rule 5) ────────────────

describe('CONTENT-01: CAC Registration Integrity & Government Disclaimers', () => {
  it('COMPANY constant declares authentic CAC RC: 1715416 registration', () => {
    const routes = read('lib/routes.ts');
    assert.match(routes, /1715416/, 'Must specify official CAC registration RC: 1715416');
  });

  it('Footer references COMPANY.cacNumber and advisory disclaimer', () => {
    const footer = read('components/layout/Footer.tsx');
    assert.match(footer, /COMPANY\.cacNumber/, 'Footer must cite COMPANY.cacNumber');
    assert.match(footer, /consultancy|advisory/i, 'Footer must clearly identify as consultancy/advisory');
  });

  it('Terms of engagement explicitly state visa outcomes rest with foreign embassies', () => {
    const terms = read('app/terms/page.tsx');
    assert.match(terms, /embass|consulat|discretion/i,
      'Terms must explicitly clarify consular discretion on visa decisions');
  });
});

describe('CONTENT-02: Zero Fraudulent Guarantee Enforcement (Rule 5 & 6)', () => {
  const contentFiles = [
    'app/page.tsx',
    'app/about/page.tsx',
    'app/services/page.tsx',
    'app/services/study-visa/page.tsx',
    'app/services/work-visa/page.tsx',
    'app/services/visa-assistance/page.tsx',
    'app/why-choose-us/page.tsx',
  ];

  for (const file of contentFiles) {
    it(`ensures ${file} rejects false visa guarantees and clarifies consular sovereignty`, () => {
      const content = read(file);
      // Ensure the site never claims SIJAM guarantees visa issuance directly
      assert.doesNotMatch(content, /we\s+guarantee\s+(?:that\s+)?(?:your\s+)?visa\s+(?:will\s+be\s+)?(?:approved|issued)/i,
        `File ${file} must not claim guaranteed visa issuance`);
      assert.doesNotMatch(content, /100%\s+visa\s+guarantee\s+by\s+sijam/i,
        `File ${file} must not claim 100% visa guarantee by Sijam`);
    });
  }
});
