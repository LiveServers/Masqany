ALTER TABLE "user" 
    ADD COLUMN otp TEXT,
    ADD COLUMN expiration_date TIMESTAMP,
    ADD COLUMN otp_used BOOLEAN DEFAULT false;
