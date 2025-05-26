ALTER TABLE unit
ADD COLUMN property_id INTEGER NOT NULL REFERENCES property(id) ON DELETE CASCADE;

ALTER TABLE unit DROP CONSTRAINT IF EXISTS unit_type_check;
ALTER TABLE unit DROP CONSTRAINT IF EXISTS unit_floor_check;

ALTER TABLE unit
ADD CONSTRAINT unit_type_check CHECK (
  type IN (
    'Single Room',
    'Double Room',
    '1 Bedroom',
    '2 Bedroom',
    '3 Bedroom',
    '4 Bedroom',
    '5 Bedroom',
    'Bedsitter',
    'Studio Apartment',
    'Bungalow',
    'Maisonette'
  )
);

ALTER TABLE unit
ADD CONSTRAINT unit_floor_check CHECK (
  floor IN (
    'Ground Floor',
    '1st Floor',
    '2nd Floor',
    '3rd Floor',
    '4th Floor',
    '5th Floor',
    '6th Floor',
    '7th Floor',
    '8th Floor',
    '9th Floor',
    '10th Floor',
    '11th Floor',
    '12th Floor',
    '13th Floor',
    '14th Floor',
    '15th Floor',
    '16th Floor',
    '17th Floor',
    '18th Floor',
    '19th Floor',
    '20th Floor'
  )
);
