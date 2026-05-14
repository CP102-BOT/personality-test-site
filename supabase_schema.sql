-- Run this in Supabase SQL Editor to create the table
CREATE TABLE unlock_codes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  used BOOLEAN NOT NULL DEFAULT false,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_unlock_codes_code ON unlock_codes (code);
CREATE INDEX idx_unlock_codes_used ON unlock_codes (used);

-- Enable Row Level Security
ALTER TABLE unlock_codes ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access (for server-side API routes)
CREATE POLICY "Service role can do anything" ON unlock_codes
  FOR ALL
  USING (true)
  WITH CHECK (true);
