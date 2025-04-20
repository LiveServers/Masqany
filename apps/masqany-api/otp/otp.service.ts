import { secret } from 'encore.dev/config';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

import type { OtpResponse, SendEmailResponse, ValidateOtpDto } from './otp.interface';
import { generateAlphanumericRandomOtp } from './utils';

const expirationDuration = 300;
const otpLength = 6;
const apiKey = secret('MAILGUN_API_KEY');
const date = new Date();

const OtpService = {
  generateOtp: async (): Promise<OtpResponse> => {
    const localeDate = new Date(date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }));
    const expirationDate = new Date(
      localeDate.setSeconds(localeDate.getSeconds() + expirationDuration),
    );
    const otp = generateAlphanumericRandomOtp(otpLength);
    const data = { otp, expirationDate };
    return {
      success: true,
      result: data,
    };
  },
  validateOtp: (dto: ValidateOtpDto): OtpResponse => {
    if (dto?.otpUsed) {
      return {
        success: false,
        message: 'Otp has been used',
      };
    }
    if (dto.savedOtp !== dto.incomingOtp) {
      return {
        success: false,
        message: 'Otp is invalid',
      };
    }
    if (dto.expirationDate > new Date()) {
      return {
        success: true,
        message: 'Otp is valid',
      };
    }
    return {
      success: false,
      message: 'Otp has expired',
    };
  },
  sendEmail: async (otp: string): Promise<SendEmailResponse> => {
    try {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({ username: 'api', key: apiKey() });
      const response = await mg.messages.create(
        'sandboxa63db9a212cc4158b5244f3b972818a0.mailgun.org',
        {
          from: 'Excited User <mailgun@sandboxa63db9a212cc4158b5244f3b972818a0.mailgun.org>',
          to: ['briankyole10@gmail.com'],
          subject: 'Masqany Registration OTP',
          html: `<p>Use this one time otp to register your account. It expires in 5 minutes. ${otp}</p>`,
        },
      );
      return {
        status: response.status,
        message: response.message,
      };
    } catch (err) {
      console.error('❌ FAILED TO SEND EMAIL:', err);
      return {
        status: err?.status,
        message: err?.details,
      };
    }
  },
};

export default OtpService;
