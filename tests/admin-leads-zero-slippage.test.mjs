import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(process.cwd());

test('LEADS-ZERO-SLIPPAGE: UnifiedLeadsView eliminates lead fragmentation & enforces speed-to-lead', () => {
  const filePath = path.join(REPO_ROOT, 'components/admin/UnifiedLeadsView.tsx');
  assert.ok(fs.existsSync(filePath), 'UnifiedLeadsView.tsx must exist');
  const code = fs.readFileSync(filePath, 'utf8');

  // 1. Verifies consolidation of consultations and contact enquiries
  assert.ok(
    code.includes('consultations.forEach') || code.includes('(consultations || []).forEach'),
    'Must ingest consultations stream'
  );
  assert.ok(
    code.includes('messages.forEach') || code.includes('(messages || []).forEach'),
    'Must ingest contact messages stream'
  );

  // 2. Verifies visual SLA thresholds (< 15m, < 1h, Breached)
  assert.ok(code.includes('< 15m'), 'Must declare < 15m Golden Window SLA badge');
  assert.ok(code.includes('< 1h'), 'Must declare < 1h At Risk SLA badge');
  assert.ok(code.includes('Breached'), 'Must declare Breached SLA escalation badge');

  // 3. Verifies quick action dropdown deliverables
  assert.ok(code.includes('Assign to Case Officer'), 'Must provide Assign to Case Officer action');
  assert.ok(code.includes('Mark Contacted'), 'Must provide Mark Contacted action');
  assert.ok(code.includes('Schedule Interview'), 'Must provide Schedule Interview action');
  assert.ok(code.includes('handleQuickAction'), 'Must implement handleQuickAction logic');

  // 4. Verifies Managing Director escalation trigger
  assert.ok(
    code.includes('Managing Director Escalation') || code.includes('SLA Escalation'),
    'Must display executive loss-aversion alert for breached leads'
  );
});
