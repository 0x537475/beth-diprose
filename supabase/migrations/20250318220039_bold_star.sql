/*
  # Add page content management

  1. New Tables
    - `pages` - Website pages
      - `id` (uuid, primary key)
      - `slug` (text) - URL path (e.g., 'about', 'services')
      - `title` (text) - Page title
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `page_sections` - Content sections for each page
      - `id` (uuid, primary key)
      - `page_id` (uuid, foreign key to pages)
      - `name` (text) - Section identifier
      - `title` (text) - Section heading
      - `content` (text) - Section content
      - `order` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Add policies for public read access
*/

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create page_sections table
CREATE TABLE IF NOT EXISTS page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_id, name)
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Allow public read access to pages"
  ON pages
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for page_sections
CREATE POLICY "Allow public read access to page_sections"
  ON page_sections
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage page_sections"
  ON page_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial pages
INSERT INTO pages (slug, title) VALUES
  ('home', 'Home'),
  ('about', 'About'),
  ('services', 'Services'),
  ('why-us', 'Why Choose Us'),
  ('faq', 'Frequently Asked Questions'),
  ('rates', 'Service Rates'),
  ('testimonials', 'Client Testimonials'),
  ('next-steps', 'Next Steps')
ON CONFLICT (slug) DO NOTHING;

-- Migrate existing sections to page_sections
WITH home_page AS (
  SELECT id FROM pages WHERE slug = 'home'
)
INSERT INTO page_sections (page_id, name, title, content, "order")
SELECT 
  (SELECT id FROM home_page),
  name,
  title,
  content,
  0
FROM sections
ON CONFLICT (page_id, name) DO NOTHING;