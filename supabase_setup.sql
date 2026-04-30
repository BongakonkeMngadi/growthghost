-- Handio Waitlist Setup for Supabase
-- Run this in the Supabase SQL Editor (New Project -> SQL Editor -> New Query)
-- IMPORTANT: Run this AFTER creating the table (or let it auto-create via this script)

-- 1. Create the waitlist table if it doesn't exist
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(name) >= 1 AND length(name) <= 120),
  email TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company TEXT NOT NULL CHECK (length(company) >= 1 AND length(company) <= 160),
  goal TEXT NOT NULL CHECK (length(goal) >= 1 AND length(goal) <= 500),
  source TEXT NOT NULL DEFAULT 'landing' CHECK (length(source) <= 80),
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Drop any existing policies to avoid conflicts (safe to re-run)
DROP POLICY IF EXISTS "Allow public insert to waitlist" ON waitlist;
DROP POLICY IF EXISTS "Deny public read on waitlist" ON waitlist;
DROP POLICY IF EXISTS "Deny public update on waitlist" ON waitlist;
DROP POLICY IF EXISTS "Deny public delete on waitlist" ON waitlist;

-- 4. Create policy to allow public inserts (for the landing page waitlist form)
CREATE POLICY "Allow public insert to waitlist"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 5. Deny public reads/updates/deletes (keep data private)
CREATE POLICY "Deny public read on waitlist"
  ON waitlist
  FOR SELECT
  TO public
  USING (false);

CREATE POLICY "Deny public update on waitlist"
  ON waitlist
  FOR UPDATE
  TO public
  USING (false);

CREATE POLICY "Deny public delete on waitlist"
  ON waitlist
  FOR DELETE
  TO public
  USING (false);

-- 6. Index on email for deduplication checks later
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
