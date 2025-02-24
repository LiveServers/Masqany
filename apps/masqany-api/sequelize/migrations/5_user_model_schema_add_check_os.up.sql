ALTER TABLE "user"
    ALTER COLUMN onboarding_step SET DEFAULT 'signUp';

ALTER TABLE "user" 
    ADD CONSTRAINT user_onboarding_step_check CHECK (
        onboarding_step IN ('signUp', 'otp', 'personalDetails', 'propertyDetails', 'propertyAccess')
    );
