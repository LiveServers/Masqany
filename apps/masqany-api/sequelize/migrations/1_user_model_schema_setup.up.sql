CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    is_verified BOOLEAN,
    location TEXT CHECK (
        location IN (
            'Kenya'
        )
    ),
    phone_number TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'Landlord' CHECK (
        role IN (            
            'Landlord',
            'Property Manager',
            'Agent',
            'Caretaker',
            'Security',
            'Tenant',
            'Other'
        )
    ),
    onboarding_step TEXT DEFAULT 'signUp' CHECK (
        onboarding_step IN (
            'signUp',
            'otp',
            'propertyDetails',
            'propertyLocationDetails',
            'propertyAccess',
            'onboardingComplete'
        )
    ),
    otp TEXT,
    expiration_date TIMESTAMP,
    otp_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)