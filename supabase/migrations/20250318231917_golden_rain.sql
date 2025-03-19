/*
  # Add Rates page content

  1. New Content
    - Creates page record for "Rates"
    - Adds page sections for:
      - Hero section
      - Service rates
      - Transportation
      - Insurance
      - Payment methods

  2. Security
    - Inherits existing RLS policies from pages and page_sections tables
*/

-- First create the page
INSERT INTO pages (slug, title)
VALUES ('rates', 'Service Rates')
ON CONFLICT (slug) DO NOTHING;

-- Then add the page sections
WITH page_id AS (SELECT id FROM pages WHERE slug = 'rates')
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  -- Hero Section
  ((SELECT id FROM page_id), 'hero', 'Service Rates', 
   'Transparent pricing for quality companion care. Our rates are competitive and reflect the personalized, dedicated service you receive.', 1),

  -- Service Rates Section
  ((SELECT id FROM page_id), 'rates_intro', 'Companion Care Rates', 
   'Our rates are structured to provide flexibility while ensuring the highest quality of care. Daily rates may be negotiable for more than 2 visits per week.', 2),

  ((SELECT id FROM page_id), 'hourly_rates', 'Hourly Service Rates', 
   '1 hour: $40
1.5 hours: $60
2 hours: $80
Overnight (up to 12 hours): $20/hour (sleep permitted)', 3),

  -- Transportation Section
  ((SELECT id FROM page_id), 'transportation', 'Transportation', 
   'Travel time to and from clients is free within 20 km. Beyond that, and for client transportation, a rate of $0.65/km applies. This ensures fair and transparent travel costs while maintaining affordable service within the local area.', 4),

  -- Insurance Section
  ((SELECT id FROM page_id), 'insurance', 'Insurance Coverage', 
   'For your peace of mind, I maintain comprehensive business insurance, including $5 million liability coverage for client transportation. Some extended medical insurance plans may cover companion care - please check your policy for details.', 5),

  -- Payment Methods Section
  ((SELECT id FROM page_id), 'payment', 'Payment Methods', 
   'Payment can be made via e-transfer or cheque. Billing frequency can be arranged to suit your needs - either monthly or after each visit. We strive to make the payment process as convenient as possible for our clients.', 6),

  -- Additional Information
  ((SELECT id FROM page_id), 'additional_info', 'Additional Information', 
   'Rates are subject to annual review. Long-term service agreements and regular scheduling may qualify for special pricing arrangements. Please contact me to discuss your specific needs and circumstances.', 7),

  -- CTA Section
  ((SELECT id FROM page_id), 'cta', 'Ready to Get Started?', 
   'Contact me today to discuss your care needs and how we can create a service plan that works for you and your budget. I''m happy to answer any questions about rates and payment options.', 8);