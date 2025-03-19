/*
  # Add Why Choose Us page content

  1. New Content
    - Creates page record for "Why Choose Us"
    - Adds page sections for:
      - Hero section
      - Key benefits
      - Personal qualities
      - CTA section

  2. Security
    - Inherits existing RLS policies from pages and page_sections tables
*/

-- First create the page
INSERT INTO pages (slug, title)
VALUES ('why-us', 'Why Choose Beth Diprose Companion Services')
ON CONFLICT (slug) DO NOTHING;

-- Then add the page sections
WITH page_id AS (SELECT id FROM pages WHERE slug = 'why-us')
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  -- Hero Section
  ((SELECT id FROM page_id), 'hero', 'Why Choose Beth Diprose Companion Services?', 
   'Experience the difference of personalized, consistent care from a dedicated professional who truly cares.', 1),

  -- Key Benefits Section
  ((SELECT id FROM page_id), 'consistent_care', 'Consistent, Personal Care', 
   'Unlike agencies that rotate caregivers, I personally provide all services. This means you''ll always see the same familiar face, ensuring consistency and building meaningful relationships. No rotating caregivers, just reliable, dependable care you can count on.', 2),
  
  ((SELECT id FROM page_id), 'detailed_observation', 'Detailed Observation', 
   'With regular visits from the same caregiver, subtle changes in behavior or health are more readily noticed and documented. This continuity ensures precise communication with family members and healthcare providers, leading to better care outcomes.', 3),
  
  ((SELECT id FROM page_id), 'direct_communication', 'Direct Communication', 
   'One call is all it takes. No navigating through multiple contacts or explaining your situation repeatedly. Families get quick responses and peace of mind knowing exactly who to reach out to for updates or concerns.', 4),

  -- Professional Experience Section
  ((SELECT id FROM page_id), 'professional_experience', 'Professional Experience', 
   'Well-educated with a Master''s degree and extensive experience in social services and caregiving. My background combines academic knowledge with practical skills, ensuring high-quality, informed care for your loved one.', 5),

  -- Personal Qualities Section
  ((SELECT id FROM page_id), 'genuine_empathy', 'Genuine Empathy', 
   'An optimistic and considerate person with a natural ability to connect and make others feel comfortable. I bring warmth, understanding, and genuine care to every interaction, creating a supportive environment for your loved one.', 6),

  -- Trust Section
  ((SELECT id FROM page_id), 'trusted_confidant', 'Trusted Confidant', 
   'Easy to talk to and a natural confidant, I build meaningful relationships with clients based on trust and mutual respect. Your loved one will have someone they can truly rely on for both practical support and emotional connection.', 7),

  -- Reliability Section
  ((SELECT id FROM page_id), 'reliability', 'Reliable & Dedicated', 
   'Committed to developing healthy relationships where clients feel comfortable and happy. You can count on consistent, punctual service and unwavering dedication to your loved one''s wellbeing.', 8),

  -- CTA Section
  ((SELECT id FROM page_id), 'cta', 'Ready to Experience the Difference?', 
   'Let''s discuss how I can provide the personalized care your loved one deserves. Contact me today to learn more about my companion care services and how I can help create a better quality of life for your family member.', 9);