CREATE TABLE property (
    id BIGSERIAL PRIMARY KEY,
    property_type TEXT  NOT NULL CHECK(
        property_type IN (
            'Apartment', 
            'Commercial', 
            'StandAlone', 
            'Mansionate', 
            'Other'
        )
    ),
    property_name TEXT NOT NULL,
    description TEXT,
    physical_address TEXT NOT NULL,
    country_of_property TEXT CHECK (
        country_of_property IN (
            'Kenya'
        )
    ),
    county_of_property TEXT CHECK (
        county_of_property IN (
            'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo',
            'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale',
            'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 
            'Murang''a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 
            'Siaya', 'Taita Taveta', 'Tana River', 'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 
            'Vihiga', 'Wajir', 'West Pokot'
        )
    ),
    locality TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)