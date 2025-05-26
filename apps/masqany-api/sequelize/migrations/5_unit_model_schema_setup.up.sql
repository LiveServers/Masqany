CREATE TABLE "unit" (
    id BIGSERIAL PRIMARY KEY,
    number TEXT NOT NULL,
    classification TEXT NOT NULL CHECK (
        classification IN (
            'Unfurnished',
            'Furnished'
        )
    ),
    block TEXT,
    floor TEXT,
    type TEXT NOT NULL CHECK (
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
    ),
    monthly_rent TEXT NOT NULL,
    currency TEXT NOT NULL CHECK (
        currency IN (            
            'KES',
            'NGN'
        )
    ),
    status TEXT NOT NULL CHECK (
        status IN (
            'Occupied',
            'Vacant',
            'Renovating',
            'Constructing'
        )
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)