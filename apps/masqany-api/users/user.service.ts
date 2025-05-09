import { secret } from 'encore.dev/config';
import jwt from 'jsonwebtoken';

import type { CreateUserDto, RefreshTokenResponse, Token, UpdateUserDto, UserResponse, UserResponseWithToken, ValidateOtpDto } from './user.interface';
import OtpService from '../otp/otp.service';
import { User } from '../sequelize/database';
import { OnboardingStep } from './user.interface';

const jwtSecret = secret('MAILGUN_API_KEY');

const UserService = {
  count: async (): Promise<number> => {
    const count = await User.count();
    return count;
  },
  create: async (data: CreateUserDto): Promise<UserResponse> => {
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
    return {
      success: true,
      result: userData,
    };
  },
  validateOtp: async ({ email, otp }: ValidateOtpDto): Promise<UserResponse> => {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return {
        success: false,
        message: 'unable to validate otp',
      };
    }
    const response = OtpService.validateOtp({
      incomingOtp: otp,
      savedOtp: user.otp,
      expirationDate: user.expiration_date,
      otpUsed: user.otp_used,
    });
    if (response.success) {
      await User.update(
        {
          otp_used: true,
          onboarding_step: OnboardingStep.propertyDetails,
        },
        { where: { id: user.id } },
      );
      const { accessToken, refreshToken } = UserService.createAccessToken(
        user.id,
        user.email,
        user.role,
      );
      return {
        success: true,
        result: {
          accessToken,
          refreshToken,
        },
      };
    }
    return {
      success: false,
      message: 'unable to validate otp',
    };
  },
  update: async (id: number, data: UpdateUserDto): Promise<UserResponse> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    const { firstName, lastName, role, location, phoneNumber } = data;
    user.first_name = firstName ?? user.first_name;
    user.last_name = lastName ?? user.last_name;
    user.role = role ?? user.role;
    user.location = location ?? user.location;
    user.phone_number = phoneNumber ?? user.phone_number; //TO-DO: send otp if phone number field is active

    const updated = await user.save();
    return {
      success: true,
      result: updated.toJSON(),
    };
  },
  delete: async (id: number): Promise<UserResponse> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    await user.destroy();
    return {
      success: true,
      result: 'User deleted successfully',
    };
  },
  signIn: async (email: string, otp: string): Promise<UserResponseWithToken> => {
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    if (user.onboarding_step !== OnboardingStep.propertyAccess) {
      return {
        success: false,
        message: 'User onboarding is not complete',
      };
    }

    if (user.is_verified) {
      return {
        success: false,
        message: 'User is not verified',
      };
    }

    const response = OtpService.validateOtp({
      incomingOtp: otp,
      savedOtp: user.otp,
      expirationDate: user.expiration_date,
      otpUsed: user.otp_used,
    });

    if (!response.success) {
      return {
        success: false,
        message: 'Invalid OTP',
      };
    }

    const { accessToken, refreshToken } = UserService.createAccessToken(
      user.id,
      user.email,
      user.role,
    );

    await User.update(
      {
        signed_out: false,
        otp_used: true,
      },
      { where: { id: user.id } },
    );

    return {
      success: true,
      result: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          location: user.location,
          phoneNumber: user.phone_number,
        },
      },
    };
  },
  signOut: async (id: number): Promise<UserResponse> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    await user.update({
      signed_out: true,
    });
    return {
      success: true,
      result: 'User signed out successfully',
    };
  },
  sendOtp: async (email: string): Promise<UserResponse> => {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    const otpResponse = await OtpService.generateOtp();
    if (otpResponse.result) {
      const response = await OtpService.sendEmail(otpResponse.result?.otp);
      if (response.status === 200) {
        await User.update(
          {
            otp: otpResponse.result.otp,
            expiration_date: otpResponse.result.expirationDate,
            otp_used: false,
          },
          { where: { id: user.id } },
        );
      }
    }
    return {
      success: true,
      result: {
        message: 'OTP sent successfully',
      },
    };
  },
  refreshToken: async (id: number, refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
      const user = await User.findOne({ where: { id }, raw: true });
      if (!user) {
        throw new Error('An error occurred, please try again later');
      }
      const decoded = jwt.verify(refreshToken, Buffer.from(jwtSecret(), 'base64'));

      if (!decoded) {
        throw new Error('An error occurred, please try again later');
      }
      const token = UserService.createAccessToken(user.id, user.email, user.role);
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
        throw new Error('Token expired');
      }
      if (e instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      if (e instanceof jwt.NotBeforeError) {
        throw new Error('Token not active');
      }
      throw new Error('Token not found');
    }
  },
  createAccessToken: (id: number, email: string, role: string): Token => {
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
