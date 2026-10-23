import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
);

// Public / Browser Client (Anon Key with Row Level Security)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Server-Side Administrative Client (Service Role Key - Bypasses RLS)
// IMPORTANT: Must use the service role key only — never fall back to the anon key.
// If SUPABASE_SERVICE_ROLE_KEY is absent, privileged administrative queries fail closed
// immediately rather than degrading silently or executing as unprivileged anon.
const _serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isServiceRoleConfigured = Boolean(_serviceRoleKey && _serviceRoleKey.length > 20);

if (!isServiceRoleConfigured && isSupabaseConfigured) {
  console.error(
    '[SUPABASE] SUPABASE_SERVICE_ROLE_KEY is not configured. Administrative DB operations will fail closed. ' +
    'Set it via `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`.'
  );
}

const _rawAdminClient = createClient(
  supabaseUrl,
  _serviceRoleKey || 'missing-service-role-key-fail-closed',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export const supabaseAdmin = new Proxy(_rawAdminClient, {
  get(target, prop, receiver) {
    if (!isServiceRoleConfigured) {
      throw new Error(
        '[SECURITY FAIL-CLOSED] Privileged database operation blocked: SUPABASE_SERVICE_ROLE_KEY is missing or invalid. ' +
        'Operations cannot execute without explicit service role authorization.'
      );
    }
    return Reflect.get(target, prop, receiver);
  },
});
