/*
  # Add initial rates data

  1. Changes
    - Insert initial hourly rates into the rates table
    - Add standard rates for different durations
    - Include notes for overnight rates

  2. Data
    - 1 hour rate
    - 1.5 hour rate
    - 2 hour rate
    - Overnight rate with sleep permitted note
*/

INSERT INTO rates (duration, price, note, "order")
VALUES 
  ('1 hour', '$40', NULL, 1),
  ('1.5 hours', '$60', NULL, 2),
  ('2 hours', '$80', NULL, 3),
  ('Overnight (up to 12 hours)', '$20/hour', 'Sleep permitted', 4);