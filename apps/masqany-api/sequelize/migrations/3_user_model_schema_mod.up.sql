ALTER TABLE "user"
    ALTER COLUMN role DROP DEFAULT, 
    ALTER COLUMN role TYPE TEXT,
    ALTER COLUMN onboardingStep DROP DEFAULT, 
    ALTER COLUMN onboardingStep TYPE TEXT;

-- Remove CHECK constraints if they exist
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS user_role_check;
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS user_onboardingStep_check;
