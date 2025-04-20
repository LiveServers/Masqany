export interface ValidateOtpDto {
  incomingOtp: string;
  savedOtp: string;
  expirationDate: Date;
  otpUsed: boolean;
}

interface OtpDto {
  otp: string;
  expirationDate: Date;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
  result?: OtpDto;
}

export interface SendEmailResponse {
  status: number;
  message?: string;
}
