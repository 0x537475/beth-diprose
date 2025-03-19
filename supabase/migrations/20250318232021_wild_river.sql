/*
  # Add Next Steps page content

  1. New Content
    - Creates page record for "Next Steps"
    - Adds page sections for:
      - Hero section
      - Welcome message
      - Step 1: Reach Out
      - Step 2: Initial Meeting
      - Step 3: Customize Care
      - CTA section

  2. Security
    - Inherits existing RLS policies from pages and page_sections tables
*/

-- First create the page
INSERT INTO pages (slug, title)
VALUES ('next-steps', 'What Do I Do Next?')
ON CONFLICT (slug) DO NOTHING;

-- Then add the page sections
WITH page_id AS (SELECT id FROM pages WHERE slug = 'next-steps')
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  -- Hero Section
  ((SELECT id FROM page_id), 'hero', 'What Do I Do Next?', 
   'Taking the first step towards compassionate care is easy. Let me guide you through the process of getting started with our companion services.', 1),

  -- Welcome Message
  ((SELECT id FROM page_id), 'welcome', 'Welcome Message', 
   'Now that you want to explore having services provided by me, or you just want more information, know that I am very approachable. Whatever you need to know, I will answer your queries and try to allay any fears.', 2),

  -- Step 1: Reach Out
  ((SELECT id FROM page_id), 'step_one', 'Step 1: Reach Out', 
   'Contact me via email, text, or phone. I''ll respond to your questions as quickly as possible. You can reach me at beth.diprose@gmail.com or (555) 123-4567. I''m here to answer any questions you might have about our services.', 3),

  -- Step 2: Initial Meeting
  ((SELECT id FROM page_id), 'step_two', 'Step 2: Initial Meeting', 
   'We''ll schedule an initial appointment so we can meet and begin to get to know one another. This no-obligation consultation helps us understand your needs and ensures we''re a good fit for each other.', 4),

  -- Step 3: Customize Care
  ((SELECT id FROM page_id), 'step_three', 'Step 3: Customize Care', 
   'If you''re ready, we''ll discuss the details of your companion care service. You decide what you want and when you want it! We offer flexible scheduling to accommodate your needs and preferences.', 5),

  -- Additional Information
  ((SELECT id FROM page_id), 'process_info', 'Our Process', 
   'The entire process is designed to be simple and stress-free. We understand that seeking care for a loved one can be overwhelming, which is why we make every step as clear and straightforward as possible.', 6),

  -- CTA Section
  ((SELECT id FROM page_id), 'cta', 'Ready to Take the First Step?', 
   'Let''s start a conversation about how I can help your loved one. Contact me today to begin your journey towards compassionate, personalized care.', 7);