/*
  # Add rate information sections

  1. Changes
    - Add page sections for rates page information:
      - Transportation
      - Insurance Coverage
      - Payment Methods

  2. Security
    - Inherits existing RLS policies from page_sections table
*/

-- Get the rates page ID
WITH rates_page AS (
  SELECT id FROM pages WHERE slug = 'rates'
)
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  (
    (SELECT id FROM rates_page),
    'transportation',
    'Transportation',
    'Travel time to and from clients is free within 20 km. Beyond that, and for client transportation, a rate of $0.65/km applies. This ensures fair and transparent travel costs while maintaining affordable service within the local area.',
    1
  ),
  (
    (SELECT id FROM rates_page),
    'insurance',
    'Insurance Coverage',
    'I maintain comprehensive business insurance, including $5 million liability coverage for client transportation. Some extended medical insurance plans may cover companion care - please check your policy for details.',
    2
  ),
  (
    (SELECT id FROM rates_page),
    'payment',
    'Payment Methods',
    'Payment can be made via e-transfer or cheque. Billing frequency can be arranged to suit your needs - either monthly or after each visit. We strive to make the payment process as convenient as possible for our clients.',
    3
  )
ON CONFLICT (page_id, name) DO UPDATE
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  "order" = EXCLUDED."order";