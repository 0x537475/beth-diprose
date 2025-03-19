/*
  # Add FAQ table

  1. New Tables
    - `faqs` - Frequently Asked Questions
      - `id` (uuid, primary key)
      - `question` (text)
      - `answer` (text)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage FAQs
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to faqs"
  ON faqs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage faqs"
  ON faqs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial FAQs
INSERT INTO faqs (question, answer, "order") VALUES
  ('When are you available?', 'I am available to work weekdays, evenings and weekends and I can do overnights occasionally.', 1),
  ('How long are your shifts?', 'It depends on your needs. I can work from 1 hour to most of a day or evening.', 2),
  ('Do you charge for travel time?', 'I do not generally charge my clients for travel time getting to their home unless I have to travel more than 20 kilometres. Then my rate is 0.65/ km. I also charge this rate if I am transporting the client.', 3),
  ('Do you have business insurance?', 'I have $5 milliion liability on my vehicle and my car is insured for business use.', 4),
  ('How do you stay in contact with the client''s family?', 'I am available by text, email, or phone. I write notes after every visit which I will happily share.', 5),
  ('From whom do you take direction?', 'I take direction from the person paying for the service, in cooperation with the client.', 6),
  ('Will I receive an invoice after every visit?', 'It all depends. I can bill monthly or after each visit, whichever is preferred. A payment schedule will be developed to suit each client.', 7),
  ('How do you take payment?', 'I can take etransfer or cheque.', 8);