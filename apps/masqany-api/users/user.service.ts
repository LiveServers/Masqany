import { secret } from 'encore.dev/config';
import jwt from 'jsonwebtoken';

import type { CreateUserDto, RefreshTokenResponse, Token, UpdateUserDto, UserAttributes, UserResponseWithToken, UserRole, ValidateOtpDto } from './user.interface';
import OtpService from '../otp/otp.service';
import { User } from '../sequelize/database';
import { OnboardingStep } from './user.interface';
import { APIError } from 'encore.dev/api';

const jwtSecret = secret('MAILGUN_API_KEY');

const UserService = {
  count: async (): Promise<number> => {
    const count = await User.count();
    return count;
  },
  create: async (data: CreateUserDto): Promise<UserAttributes> => {
    const user = await User.create(data);
    const userData = user.get({ plain: true });
    if (userData) {
      const otpResponse = await OtpService.generateOtp();
      if (otpResponse.result) {
        const response = await OtpService.sendEmail(otpResponse.result?.otp);
        if (response.status === 200) {
          await user.update({
            otp: otpResponse.result.otp,
            expiration_date: otpResponse.result.expirationDate,
            onboarding_step: OnboardingStep.otp,
          });
        }
      }
    }
    return userData;
  },
  validateOtp: async ({ email, otp }: ValidateOtpDto): Promise<Token> => {
    const result = await User.findOne({ where: { email } });
    if (!result) {
      throw APIError.notFound('User not found');
    }
    const user = result.get({ plain: true });
    const response = OtpService.validateOtp({
      incomingOtp: otp,
      savedOtp: user.otp ?? '',
      expirationDate: user.expiration_date ?? new Date(),
      otpUsed: user.otp_used ?? true,
    });
    if (response.success) {
      await result.update(
        {
          otp_used: true,
          onboarding_step: OnboardingStep.propertyDetails,
        }
      );
      const { accessToken, refreshToken } = UserService.createAccessToken(
        user.id,
        user.email,
        user.role,
      );
      return {
        accessToken,
        refreshToken,
      };
    }
    throw APIError.invalidArgument('Unable to validate OTP');
  },
  update: async (id: number, data: UpdateUserDto): Promise<UserAttributes> => {
    const user = await User.findByPk(id);
    if (!user) {
      throw APIError.notFound('User not found');
    }
    const { firstName, lastName, role, location, phoneNumber } = data;
    await user.update({
      first_name : firstName,
      last_name : lastName,
      role : role,
      location : location,
      phone_number : phoneNumber
    })
    const updated = await user.save();
    return updated.toJSON();
  },
  delete: async (id: number): Promise<void> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw APIError.notFound('User not found');
    }
    await user.destroy();
  },
  signIn: async (email: string, otp: string): Promise<UserResponseWithToken> => {
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      throw APIError.notFound('User not found');
    }
    const userData = user.get({ plain: true });
    
    if (userData.onboarding_step !== OnboardingStep.propertyAccess) {
      throw APIError.aborted('User is not onboarded');
    }

    if (userData.is_verified) {
      throw APIError.aborted('User is not verified');
    }

    const response = OtpService.validateOtp({
      incomingOtp: otp,
      savedOtp: userData.otp ?? '',
      expirationDate: userData.expiration_date ?? new Date(),
      otpUsed: userData.otp_used ?? true,
    });

    if (!response.success) {
      throw APIError.invalidArgument('Unable to validate OTP');
    }

    const { accessToken, refreshToken } = UserService.createAccessToken(
      userData.id,
      userData.email,
      userData.role,
    );

    await user.update(
      {
        signed_out: false,
        otp_used: true,
      }
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: userData.id,
        email: userData.email, 
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role,
        location: userData.location,
        phoneNumber: userData.phone_number,
      },
    };
  },
  signOut: async (id: number): Promise<void> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw APIError.notFound('User not found');
    }
    await user.update({
      signed_out: true,
    });
  },
  sendOtp: async (email: string): Promise<string> => {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      throw APIError.notFound('User not found');
    }
    const otpResponse = await OtpService.generateOtp();
    if (otpResponse.result) {
      const response = await OtpService.sendEmail(otpResponse.result?.otp);
      if (response.status === 200) {
        await user.update(
          {
            otp: otpResponse.result.otp,
            expiration_date: otpResponse.result.expirationDate,
            otp_used: false,
          },
        );
      }
    }
    return 'OTP sent successfully';
  },
  refreshToken: async (id: number, refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
      const user = await User.findOne({ where: { id }, raw: true });
      if (!user) {
        throw APIError.notFound('An error occurred, please try again later');
      }
      const userData = user.get({ plain: true });
      const decoded = jwt.verify(refreshToken, Buffer.from(jwtSecret(), 'base64'));

      if (!decoded) {
        throw APIError.notFound('An error occurred, please try again later');
      }
      const token = UserService.createAccessToken(userData.id, userData.email, userData.role);
      return {
        success: true,
        result: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      };
    } catch (e) {
      console.log(e);
      if (e instanceof jwt.TokenExpiredError) {
        throw APIError.invalidArgument('Token expired');
      }
      if (e instanceof jwt.JsonWebTokenError) {
        throw APIError.invalidArgument('Invalid token');
      }
      if (e instanceof jwt.NotBeforeError) {
        throw APIError.invalidArgument('Token not active');
      }
      throw APIError.internal('An error occurred, please sign in again');
    }
  },
  createAccessToken: (id: number, email: string, role: UserRole | undefined): Token => {
    const accessToken = jwt.sign({ id, email, role }, Buffer.from(jwtSecret(), 'base64'), {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id, email, role }, Buffer.from(jwtSecret(), 'base64'), {
      expiresIn: '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  },
};

export default UserService;
