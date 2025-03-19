/*
  # Add visibility toggle for contact details

  1. Changes
    - Add `visible` column to contact_details table with default true
    - Update existing records to be visible by default

  2. Security
    - Maintain existing RLS policies
*/

-- Add visible column to contact_details
ALTER TABLE contact_details 
ADD COLUMN visible boolean DEFAULT true;

-- Set all existing records to visible
UPDATE contact_details 
SET visible = true 
WHERE visible IS NULL;