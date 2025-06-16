import { api, APIError } from 'encore.dev/api';

import type {
  CreateUserDto,
  RefreshTokenResponseWithCookies,
  SignInResponseWithCookies,
  Token,
  UpdateUserDto,
  UserAttributes,
  ValidateOtpDto,
} from './user.interface';
import UserService from './user.service';
import { EMAIL_REGEX } from './utils';

import { getAuthData } from '~encore/auth';
import { ApiResponse, success } from "../utils/response";

/**
 * Counts and returns the number of existing users
 */
export const count = api(
  { expose: true, auth: true, method: 'GET', path: '/users/v1/count' },
  async (): Promise<ApiResponse<number>> => {
    try {
      const result = await UserService.count();
      return success(result, 'Count of existing users');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error counting existing users');
    }
  },
);

/**
 * Method to create a new user
 */
export const create = api(
  { expose: true, method: 'POST', path: '/users/v1/create' },
  async (data: CreateUserDto): Promise<ApiResponse<UserAttributes>> => {
    try {
      if (!data.email) {
        throw APIError.invalidArgument('Missing fields');
      }
      if (!EMAIL_REGEX.test(data.email)) {
        throw APIError.invalidArgument('Invalid email');
      }
      const result = await UserService.create(data);
      return success(result, 'User created successfully');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error creating the user');
    }
  },
);

/**
 * Method to validate otp and create a token
 */
export const validateOtp = api(
  { expose: true, method: 'POST', path: '/users/v1/validate-otp' },
  async (data: ValidateOtpDto): Promise<ApiResponse<Token>> => {
    try {
      if (!data.email && !data.otp) {
        throw APIError.invalidArgument('Missing fields');
      }
      if (!EMAIL_REGEX.test(data.email)) {
        throw APIError.invalidArgument('Invalid email');
      }
      const result = await UserService.validateOtp(data);
      return success(result, 'OTP validated successfully');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error creating the user');
    }
  },
);

/**
 * Update user data
 */
export const update = api(
  { expose: true, auth: true, method: 'PATCH', path: '/users/v1/:id' },
  async ({ id, data }: { id: number; data: UpdateUserDto }): Promise<ApiResponse<UserAttributes>> => {
    try {
      const result = await UserService.update(id, data);
      return success(result, 'User updated successfully');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error updating user');
    }
  },
);

/**
 * Delete user by id
 */
export const destroy = api(
  { expose: true, auth: true, method: 'DELETE', path: '/users/v1/:id' },
  async ({ id }: { id: number }): Promise<ApiResponse<void>> => {
    try {
      await UserService.delete(id);
      return success(undefined, 'User deleted successfully');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error deleting user');
    }
  },
);

/**
 * sign in user
 */
export const signIn = api(
  { expose: true, method: 'POST', path: '/users/v1/sign-in' },
  async ({ email, otp }: { email: string; otp: string }): Promise<ApiResponse<SignInResponseWithCookies>> => {
    try {
      if (!email && !otp) {
        throw APIError.invalidArgument('Missing fields');
      }
      if (!EMAIL_REGEX.test(email)) {
        throw APIError.invalidArgument('Invalid email');
      }
      const response = await UserService.signIn(email, otp);
      if (response) {
        const { refreshToken, accessToken, user } = response;
        return success(
          {
            accessToken,
            cookie: `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`,
            user,
          },
          'User signed in successfully',
        );
      }
      throw APIError.unauthenticated('Invalid email or password');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error signing in user');
    }
  },
);

/**
 * refresh token
 */
export const refreshToken = api(
  { expose: true, method: 'POST', path: '/users/v1/refresh-token/:id', auth: true },
  async ({
    id,
  }: {
    id: number;
  }): Promise<ApiResponse<RefreshTokenResponseWithCookies>> => {
    try {
      const refreshToken = getAuthData()?.refreshToken;
      if (!refreshToken) {
        throw APIError.unauthenticated('An error occurred, please sign in again');
      }
      if (!id) {
        throw APIError.invalidArgument('Missing fields');
      }
      const response = await UserService.refreshToken(id, refreshToken);
      if (response.result) {
        const { refreshToken: token, accessToken } = response.result;
        return success(
          {
            accessToken,
            cookie: `refreshToken=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`,
          },
          'Token refresh successful',
        );
      }
      throw APIError.internal('An error occurred, please sign in again');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error refreshing token');
    }
  },
);

/**
 * send otp
 */
export const sendOtp = api(
  { expose: true, method: 'POST', path: '/users/v1/send-otp' },
  async ({ email }: { email: string }): Promise<ApiResponse<string>> => {
    try {
      if (!email) {
        throw APIError.invalidArgument('Missing fields');
      }
      if (!EMAIL_REGEX.test(email)) {
        throw APIError.invalidArgument('Invalid email');
      }
      const result = await UserService.sendOtp(email);
      return success(result, 'OTP sent successfully');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error sending otp');
    }
  },
);

/**
 * sign out user
 */
export const signOut = api(
  { expose: true, method: 'POST', path: '/users/v1/sign-out:id', auth: true },
  async ({ id }: { id: number }): Promise<ApiResponse<void>> => {
    try {
      if (!id) {
        throw APIError.invalidArgument('Missing fields');
      }
      await UserService.signOut(id);
      return success(undefined, 'User signed out successfully');
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error signing out user');
    }
  },
);
