#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, '..');
const envPath = path.join(webRoot, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local not found in web directory.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    envVars[match[1]] = val;
  }
}

const SECRET_KEYS = [
  'SESSION_SECRET',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SMTP_FROM_EMAIL',
  'SMTP_FROM_NAME',
  'NOTIFY_CONSULTATION_EMAIL',
  'NOTIFY_RECRUITMENT_EMAIL',
  'NOTIFY_ADMIN_EMAIL'
];

console.log('🔒 Cloudflare Worker Secrets Sync');
console.log('=================================');

// 1. Check Wrangler Auth
const authCheck = spawnSync('npx', ['wrangler', 'whoami'], { cwd: webRoot, encoding: 'utf8' });
if (authCheck.stdout?.includes('You are not authenticated') || authCheck.stderr?.includes('You are not authenticated')) {
  console.error('\n⚠️  Wrangler is not authenticated yet.');
  console.error('👉 Please run: npx wrangler login');
  console.error('   After logging in, re-run: npm run sync:secrets\n');
  process.exit(1);
}

// 2. Upload Secrets one by one
let successCount = 0;
let failCount = 0;

for (const key of SECRET_KEYS) {
  const val = envVars[key];
  if (!val) {
    console.log(`⚠️  ${key}: Missing in .env.local (skipped)`);
    continue;
  }

  process.stdout.write(`⏳ Uploading secret ${key}... `);
  const res = spawnSync('npx', ['wrangler', 'secret', 'put', key], {
    cwd: webRoot,
    input: val,
    encoding: 'utf8'
  });

  if (res.status === 0) {
    console.log('✅ Done');
    successCount++;
  } else {
    console.log('❌ Failed');
    if (res.stderr) console.error(`   ${res.stderr.trim()}`);
    failCount++;
  }
}

console.log(`\nSummary: ${successCount} secrets uploaded, ${failCount} failed.`);

// 3. Inject ANON_KEY into wrangler.jsonc if present and currently a placeholder
if (envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY && envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 30) {
  const wranglerPath = path.join(webRoot, 'wrangler.jsonc');
  if (fs.existsSync(wranglerPath)) {
    let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    if (wranglerContent.includes('REPLACE_WITH_ROTATED_KEY_FROM_SUPABASE_DASHBOARD')) {
      wranglerContent = wranglerContent.replace(
        'REPLACE_WITH_ROTATED_KEY_FROM_SUPABASE_DASHBOARD',
        envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      fs.writeFileSync(wranglerPath, wranglerContent, 'utf8');
      console.log('✅ Injected NEXT_PUBLIC_SUPABASE_ANON_KEY into wrangler.jsonc from .env.local');
    } else {
      console.log('ℹ️  wrangler.jsonc already contains a configured NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
  }
}
