/*
  # Consolidated Database Schema

  This migration contains the complete database schema and initial data for the Beth Diprose Companion Services website.
  It combines all previous migrations into a single file for easier system recreation.

  1. Tables
    - `pages` - Website pages and their content
    - `page_sections` - Content sections for each page
    - `sections` - Reusable content sections
    - `testimonials` - Client testimonials
    - `features` - Service features/benefits
    - `faqs` - Frequently asked questions
    - `contact_details` - Contact information
    - `business_hours` - Operating hours
    - `rates` - Service pricing

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users to manage content
    - Policies for public read access
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

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author text NOT NULL,
  title text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create features table
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_details table
CREATE TABLE IF NOT EXISTS contact_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  value text NOT NULL,
  display_order integer DEFAULT 0,
  visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create business_hours table
CREATE TABLE IF NOT EXISTS business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL,
  hours text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rates table
CREATE TABLE IF NOT EXISTS rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  duration text NOT NULL,
  price text NOT NULL,
  note text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE rates ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Allow public read access to pages"
  ON pages FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to manage pages"
  ON pages FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Create policies for page_sections
CREATE POLICY "Allow public read access to page_sections"
  ON page_sections FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to manage page_sections"
  ON page_sections FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Create policies for sections
CREATE POLICY "Allow public read access to sections"
  ON sections FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to manage sections"
  ON sections USING (auth.role() = 'authenticated');

-- Create policies for testimonials
CREATE POLICY "Allow public read access to testimonials"
  ON testimonials FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to manage testimonials"
  ON testimonials USING (auth.role() = 'authenticated');

-- Create policies for features
CREATE POLICY "Allow public read access to features"
  ON features FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to manage features"
  ON features USING (auth.role() = 'authenticated');

-- Create policies for faqs
CREATE POLICY "Allow public read access to faqs"
  ON faqs FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to manage faqs"
  ON faqs FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Create policies for contact_details
CREATE POLICY "Allow authenticated users to manage contact_details"
  ON contact_details FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to contact_details"
  ON contact_details FOR SELECT TO public USING (true);

-- Create policies for business_hours
CREATE POLICY "Allow authenticated users to manage business_hours"
  ON business_hours FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to business_hours"
  ON business_hours FOR SELECT TO public USING (true);

-- Create policies for rates
CREATE POLICY "Allow authenticated users to manage rates"
  ON rates FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to rates"
  ON rates FOR SELECT TO public USING (true);

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

-- Insert initial sections content
INSERT INTO sections (name, title, content) VALUES
  ('mission', 'Our Mission', 'I believe regular visits by a companion fosters emotional well-being. It creates an opportunity for genuine connection.'),
  ('mission_detail', '', 'I engage my clients by listening to their stories, sharing memories and talking about the subjects they are interested in. And I support them to be more active, both physically and mentally.'),
  ('mission_closing', '', 'The presence of a companion can reduce anxiety, loneliness and isolation.')
ON CONFLICT (name) DO NOTHING;

-- Insert initial features
INSERT INTO features (title, description, icon, "order") VALUES
  ('Compassionate Care', 'We treat your loved ones with the dignity and respect they deserve', 'Heart', 1),
  ('Flexible Scheduling', 'Available when you need us, with personalized care plans', 'Clock', 2),
  ('Professional Service', 'Experienced and qualified caregivers you can trust', 'Shield', 3)
ON CONFLICT DO NOTHING;

-- Insert initial testimonials
INSERT INTO testimonials (quote, author, title, featured) VALUES
  ('Beth has a big and generous heart. She goes beyond the call of duty and genuinely cares about seniors. If my mum were still alive, I''d hire her in a flash.', 'Terry Dance-Bennink', 'Victoria, BC', true),
  ('I''ve known Beth for more than 20 years. Although she has a Master''s degree, she could just as easily have a Ph.D. in empathy, kindness, patience, caring and compassion. connecting and helping people to feel comfortable almost immediately. What more can I say than ... integrity, genuineness, and the benefit of so much life experience. I can''t imagine how anyone could be better suited to the care and companionship of those who need a competent helper.', 'Paul Burke', 'Paul Burke Training & Consulting Group', false),
  ('Beth is good company! She treats people with respect and consideration. Cheerful, empathetic, practical - what more could you want?', 'Maria Wenth', 'Health Coach Victoria, BC', false),
  ('To me Beth is discerning, attentive, adept, proficient, considerate, thoughtful, observant and openhearted.', 'Karissa Parrish', 'Coaching with Karissa, Sooke, BC', false),
  ('Beth has a calm presence that immediately puts people at ease. She brings compassion, knowledge, patience and trust to her work with her senior companions. I would not hesitate to recommend Beth to care for your loved ones.', 'Rev. Margaret Harper', 'Victoria, BC', false)
ON CONFLICT DO NOTHING;

-- Insert initial FAQs
INSERT INTO faqs (question, answer, "order") VALUES
  ('When are you available?', 'I am available to work weekdays, evenings and weekends and I can do overnights occasionally.', 1),
  ('How long are your shifts?', 'It depends on your needs. I can work from 1 hour to most of a day or evening.', 2),
  ('Do you charge for travel time?', 'I do not generally charge my clients for travel time getting to their home unless I have to travel more than 20 kilometres. Then my rate is 0.65/ km. I also charge this rate if I am transporting the client.', 3),
  ('Do you have business insurance?', 'I have $5 milliion liability on my vehicle and my car is insured for business use.', 4),
  ('How do you stay in contact with the client''s family?', 'I am available by text, email, or phone. I write notes after every visit which I will happily share.', 5),
  ('From whom do you take direction?', 'I take direction from the person paying for the service, in cooperation with the client.', 6),
  ('Will I receive an invoice after every visit?', 'It all depends. I can bill monthly or after each visit, whichever is preferred. A payment schedule will be developed to suit each client.', 7),
  ('How do you take payment?', 'I can take etransfer or cheque.', 8)
ON CONFLICT DO NOTHING;

-- Insert initial contact details
INSERT INTO contact_details (type, value, display_order)
VALUES 
  ('phone', '(555) 123-4567', 1),
  ('email', 'beth.diprose@gmail.com', 2),
  ('address', 'Victoria, BC', 3)
ON CONFLICT DO NOTHING;

-- Insert initial business hours
INSERT INTO business_hours (day, hours, display_order)
VALUES 
  ('Monday - Friday', '8am - 6pm', 1),
  ('Saturday', '9am - 4pm', 2),
  ('Sunday', 'By appointment', 3)
ON CONFLICT DO NOTHING;

-- Insert initial rates
INSERT INTO rates (duration, price, note, "order")
VALUES 
  ('1 hour', '$40', NULL, 1),
  ('1.5 hours', '$60', NULL, 2),
  ('2 hours', '$80', NULL, 3),
  ('Overnight (up to 12 hours)', '$20/hour', 'Sleep permitted', 4)
ON CONFLICT DO NOTHING;

-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'beth.diprose@gmail.com',
  crypt('initialPassword123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT DO NOTHING;