/*
  # Add rates table and sections

  1. New Tables
    - `rates`
      - `id` (uuid, primary key)
      - `duration` (text) - Duration of service
      - `price` (text) - Price for the duration
      - `note` (text, nullable) - Optional note about the rate
      - `order` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `rates` table
    - Add policies for authenticated users to manage rates
    - Add policy for public read access
*/

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

-- Enable RLS
ALTER TABLE rates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to manage rates"
  ON rates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to rates"
  ON rates
  FOR SELECT
  TO public
  USING (true);