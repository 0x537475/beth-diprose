/*
  # Create CMS tables

  1. New Tables
    - `sections` - Main content sections of the website
      - `id` (uuid, primary key)
      - `name` (text) - Section identifier (e.g., 'hero', 'mission')
      - `title` (text) - Section heading
      - `content` (text) - Main content text
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `testimonials` - Client testimonials
      - `id` (uuid, primary key)
      - `quote` (text)
      - `author` (text)
      - `title` (text)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `features` - Service features/benefits
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon` (text) - Lucide icon name
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
*/

-- Create sections table
CREATE TABLE sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author text NOT NULL,
  title text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create features table
CREATE TABLE features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

-- Create policies for sections
CREATE POLICY "Allow public read access to sections"
  ON sections
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage sections"
  ON sections
  USING (auth.role() = 'authenticated');

-- Create policies for testimonials
CREATE POLICY "Allow public read access to testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage testimonials"
  ON testimonials
  USING (auth.role() = 'authenticated');

-- Create policies for features
CREATE POLICY "Allow public read access to features"
  ON features
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage features"
  ON features
  USING (auth.role() = 'authenticated');

-- Insert initial content
INSERT INTO sections (name, title, content) VALUES
  ('mission', 'Our Mission', 'I believe regular visits by a companion fosters emotional well-being. It creates an opportunity for genuine connection.'),
  ('mission_detail', '', 'I engage my clients by listening to their stories, sharing memories and talking about the subjects they are interested in. And I support them to be more active, both physically and mentally.'),
  ('mission_closing', '', 'The presence of a companion can reduce anxiety, loneliness and isolation.');

INSERT INTO features (title, description, icon, "order") VALUES
  ('Compassionate Care', 'We treat your loved ones with the dignity and respect they deserve', 'Heart', 1),
  ('Flexible Scheduling', 'Available when you need us, with personalized care plans', 'Clock', 2),
  ('Professional Service', 'Experienced and qualified caregivers you can trust', 'Shield', 3);

INSERT INTO testimonials (quote, author, title, featured) VALUES
  ('Beth has a big and generous heart. She goes beyond the call of duty and genuinely cares about seniors. If my mum were still alive, I''d hire her in a flash.', 'Terry Dance-Bennink', 'Victoria, BC', true);