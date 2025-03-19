/*
  # Add Services page content

  1. Content Changes
    - Add page sections for the Services page:
      - Hero section
      - Home care services section
      - Hospital care services section
      - Service locations section
      - Availability section

  2. Security
    - Uses existing RLS policies from page_sections table
*/

-- Get the services page ID
WITH services_page AS (
  SELECT id FROM pages WHERE slug = 'services'
)
INSERT INTO page_sections (page_id, name, title, content, "order")
VALUES
  (
    (SELECT id FROM services_page),
    'hero',
    'Companion Care Services',
    'Comprehensive care and support tailored to your loved one''s needs',
    1
  ),
  (
    (SELECT id FROM services_page),
    'home_care_intro',
    'In-Home Care Services',
    'Personalized care in the comfort of your loved one''s home',
    2
  ),
  (
    (SELECT id FROM services_page),
    'engagement_activities',
    'Engagement & Activities',
    'Reading books, magazines, and newspapers
Engaging in favorite crafts and hobbies
Playing cards and games
Looking at photo albums and sharing life stories
Discussing current events and news',
    3
  ),
  (
    (SELECT id FROM services_page),
    'social_physical',
    'Social & Physical Activities',
    'Going for walks together
Local outings and recreational activities
Encouraging social interactions
Accompanying to community events
Holiday and special occasion support',
    4
  ),
  (
    (SELECT id FROM services_page),
    'daily_living',
    'Daily Living Support',
    'Assistance at meal times
Escort to dining areas
Light household tasks
Medication reminders
Grocery shopping assistance',
    5
  ),
  (
    (SELECT id FROM services_page),
    'hospital_care',
    'Hospital Support Services',
    'Dedicated care during hospital stays',
    6
  ),
  (
    (SELECT id FROM services_page),
    'hospital_services',
    'Hospital Care Details',
    'Patient support and bedside companionship
Communication with medical staff and family members
Taking notes during medical consultations
Assistance with meals and personal care
Medication schedule monitoring
End of life care support
Transportation arrangements',
    7
  ),
  (
    (SELECT id FROM services_page),
    'locations',
    'Where We Serve',
    'Private Residences
Retirement Homes
Hospitals
Community Care Facilities',
    8
  ),
  (
    (SELECT id FROM services_page),
    'availability',
    'Flexible Availability',
    'Services available during daytime, evening, weekdays, and weekends',
    9
  )
ON CONFLICT (page_id, name) DO UPDATE
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  "order" = EXCLUDED."order";