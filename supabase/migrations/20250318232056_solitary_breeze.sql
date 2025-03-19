/*
  # Add Testimonials page content and data

  1. New Content
    - Creates page record for "Testimonials"
    - Adds page sections for:
      - Hero section
      - Introduction
      - CTA section
    - Adds testimonial records

  2. Security
    - Inherits existing RLS policies from pages, page_sections, and testimonials tables
*/

-- First create the page
INSERT INTO pages (slug, title)
VALUES ('testimonials', 'Client Testimonials')
ON CONFLICT (slug) DO NOTHING;

-- Then add the page sections
WITH page_id AS (SELECT id FROM pages WHERE slug = 'testimonials')
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  -- Hero Section
  ((SELECT id FROM page_id), 'hero', 'Client Testimonials', 
   'Hear what others say about our compassionate care services. These testimonials reflect our commitment to providing exceptional companion care.', 1),

  -- Introduction
  ((SELECT id FROM page_id), 'introduction', 'Real Stories from Real Families', 
   'Every testimonial represents a family we''ve had the privilege to serve. These stories showcase our dedication to providing personalized, compassionate care that makes a real difference in people''s lives.', 2),

  -- CTA Section
  ((SELECT id FROM page_id), 'cta', 'Experience Our Care Firsthand', 
   'Let us show you why families trust us with their loved ones. Contact us today to learn how we can provide the same level of exceptional care for your family member.', 3);

-- Add testimonials
INSERT INTO testimonials (quote, author, title, featured)
VALUES
  ('I''ve known Beth for more than 20 years. Although she has a Master''s degree, she could just as easily have a Ph.D. in empathy, kindness, patience, caring and compassion. connecting and helping people to feel comfortable almost immediately. What more can I say than ... integrity, genuineness, and the benefit of so much life experience. I can''t imagine how anyone could be better suited to the care and companionship of those who need a competent helper.',
   'Paul Burke',
   'Paul Burke Training & Consulting Group',
   true),
  
  ('Beth has a big and generous heart. She goes beyond the call of duty and genuinely cares about seniors. If my mum were still alive, I''d hire her in a flash.',
   'Terry Dance-Bennink',
   'Victoria, BC',
   false),
  
  ('Beth is good company! She treats people with respect and consideration. Cheerful, empathetic, practical - what more could you want?',
   'Maria Wenth',
   'Health Coach Victoria, BC',
   false),
  
  ('To me Beth is discerning, attentive, adept, proficient, considerate, thoughtful, observant and openhearted.',
   'Karissa Parrish',
   'Coaching with Karissa, Sooke, BC',
   false),
  
  ('Beth has a calm presence that immediately puts people at ease. She brings compassion, knowledge, patience and trust to her work with her senior companions. I would not hesitate to recommend Beth to care for your loved ones.',
   'Rev. Margaret Harper',
   'Victoria, BC',
   false);