/*
  # Add contact details and hours

  1. New Tables
    - `contact_details`
      - `id` (uuid, primary key)
      - `type` (text) - Type of contact detail (phone, email, address)
      - `value` (text) - The actual contact information
      - `display_order` (integer) - Display order
    - `business_hours`
      - `id` (uuid, primary key)
      - `day` (text) - Day of the week
      - `hours` (text) - Operating hours
      - `display_order` (integer) - Display order

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage data
    - Add policies for public read access
*/

-- Create contact_details table
CREATE TABLE IF NOT EXISTS contact_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  value text NOT NULL,
  display_order integer DEFAULT 0,
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

-- Enable RLS
ALTER TABLE contact_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_details
CREATE POLICY "Allow authenticated users to manage contact_details"
  ON contact_details
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to contact_details"
  ON contact_details
  FOR SELECT
  TO public
  USING (true);

-- Create policies for business_hours
CREATE POLICY "Allow authenticated users to manage business_hours"
  ON business_hours
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to business_hours"
  ON business_hours
  FOR SELECT
  TO public
  USING (true);

-- Insert initial data
INSERT INTO contact_details (type, value, display_order)
VALUES 
  ('phone', '(555) 123-4567', 1),
  ('email', 'beth.diprose@gmail.com', 2),
  ('address', 'Victoria, BC', 3);

INSERT INTO business_hours (day, hours, display_order)
VALUES 
  ('Monday - Friday', '8am - 6pm', 1),
  ('Saturday', '9am - 4pm', 2),
  ('Sunday', 'By appointment', 3);