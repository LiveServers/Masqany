CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    isVerified BOOLEAN,
    location TEXT,
    phoneNumber TEXT UNIQUE,
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
    onboardingStep TEXT DEFAULT 'signUp' CHECK (
        onboardingStep IN (
            'signUp',
            'personalDetails',
            'propertyDetails',
            'propertyAccess'
        )
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)