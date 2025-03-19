/*
  # Add About page sections

  1. New Content
    Add page sections for the About page:
    - Introduction section
    - Career experience section
    - Educational achievement section
    - Vancouver Island section
    - CTA section

  2. Changes
    Insert content from the static About page into the page_sections table
*/

-- Get the about page ID
WITH about_page AS (
  SELECT id FROM pages WHERE slug = 'about'
)
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  (
    (SELECT id FROM about_page),
    'introduction',
    'Would You Like To Know About Me?',
    'I am a loving mother, and proud grandmother to two darling children. They all inspire me to stay healthy and active and are my greatest source of happiness.',
    1
  ),
  (
    (SELECT id FROM about_page),
    'career_experience',
    '40 Years of Care Experience',
    'I enjoyed a 40 year career as a family counsellor and manager of social service programs in the non-profit sector.

For many years I worked in a residential centre in Vernon with children struggling with learning disabilities, mental health diagnoses and previous abuse. Later as a program manager I trained and supported caregivers for difficult to place teenagers.',
    2
  ),
  (
    (SELECT id FROM about_page),
    'education',
    'Educational Achievement',
    'I returned to school and earned my Master''s of Leadership in 2006 from Royal Roads University in Victoria. It was a pivotal time in my life.',
    3
  ),
  (
    (SELECT id FROM about_page),
    'vancouver_island',
    'Vancouver Island Journey',
    'In 2009 I moved to Vancouver Island and became a companion carer for Nurse Next Door. Later I worked for The Boys and Girls Club of Greater Victoria as Manager of Youth and Family Services.

For fifteen years I have enjoyed this wonderful environment, its forests, gardens, ocean and beaches. Vancouver Island is an extraordinary place to call home.',
    4
  ),
  (
    (SELECT id FROM about_page),
    'cta',
    'Let''s Connect',
    'I''d love to discuss how I can help provide compassionate care for your loved one',
    5
  )
ON CONFLICT (page_id, name) DO UPDATE
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  "order" = EXCLUDED."order";