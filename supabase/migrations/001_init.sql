-- =====================================================================
-- MintexCare Database Schema
-- Run this SQL in your Supabase project → SQL Editor → New Query
-- =====================================================================

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  location TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo_url TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Star',
  category TEXT NOT NULL DEFAULT 'home',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Job positions
CREATE TABLE IF NOT EXISTS job_positions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  requirements TEXT NOT NULL DEFAULT '',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  date TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Site settings (stores contact_info and site_images as JSON)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================================
-- Row Level Security (allow public read/write — admin auth is client-side)
-- =====================================================================

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_all_testimonials" ON testimonials;
DROP POLICY IF EXISTS "anon_all_team_members" ON team_members;
DROP POLICY IF EXISTS "anon_all_gallery" ON gallery;
DROP POLICY IF EXISTS "anon_all_services" ON services;
DROP POLICY IF EXISTS "anon_all_job_positions" ON job_positions;
DROP POLICY IF EXISTS "anon_all_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "anon_all_site_settings" ON site_settings;

CREATE POLICY "anon_all_testimonials" ON testimonials FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_team_members" ON team_members FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_gallery" ON gallery FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_services" ON services FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_job_positions" ON job_positions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_contact_submissions" ON contact_submissions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_site_settings" ON site_settings FOR ALL TO anon USING (true) WITH CHECK (true);

-- =====================================================================
-- Storage bucket for all uploaded images
-- =====================================================================

INSERT INTO storage.buckets (id, name, public)
  VALUES ('mintex-images', 'mintex-images', true)
  ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "storage_public_select" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_delete" ON storage.objects;

CREATE POLICY "storage_public_select" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'mintex-images');
CREATE POLICY "storage_public_insert" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'mintex-images');
CREATE POLICY "storage_public_delete" ON storage.objects FOR DELETE TO anon USING (bucket_id = 'mintex-images');
