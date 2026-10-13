-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416)
-- Migration 005: Durable Email Outbox, Notification History, and Contact Messages
-- ==============================================================================

-- 1. Create Outbox Status Enum
DO $$ BEGIN
  CREATE TYPE email_outbox_status AS ENUM (
    'pending',
    'queued',
    'sending',
    'sent',
    'failed',
    'retrying'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Email Outbox Table (Durable Queue & Retry Architecture)
CREATE TABLE IF NOT EXISTS email_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  template_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT NOT NULL,
  idempotency_key TEXT UNIQUE,
  status email_outbox_status NOT NULL DEFAULT 'pending',
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  last_attempt_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for worker polling and status dashboard
CREATE INDEX IF NOT EXISTS idx_email_outbox_status_created ON email_outbox(status, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_email_outbox_recipient ON email_outbox(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_outbox_idempotency ON email_outbox(idempotency_key);

-- 3. Row Level Security for Outbox
ALTER TABLE email_outbox ENABLE ROW LEVEL SECURITY;

-- Deny all public access to outbox
drop policy if exists "Deny public access to email_outbox" on email_outbox;
CREATE POLICY "Deny public access to email_outbox"
  ON email_outbox FOR ALL
  TO anon
  USING (false);

-- Authorized staff can read outbox for operational visibility
drop policy if exists "Authorized staff can read email_outbox" on email_outbox;
CREATE POLICY "Authorized staff can read email_outbox"
  ON email_outbox FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('super_admin', 'admin', 'consultation_manager')
    )
  );

-- Service role has full access for background worker dispatch
drop policy if exists "Service role full access to email_outbox" on email_outbox;
CREATE POLICY "Service role full access to email_outbox"
  ON email_outbox FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Automated updated_at trigger for email_outbox
DROP TRIGGER IF EXISTS update_email_outbox_updated_at ON email_outbox;
CREATE TRIGGER update_email_outbox_updated_at
  BEFORE UPDATE ON email_outbox
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
