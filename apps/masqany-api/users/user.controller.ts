import { api, APIError } from 'encore.dev/api';

import type {
  CreateUserDto,
  Response,
  UpdateUserDto,
  UserResponse,
  ValidateOtpDto,
} from './user.interface';
import UserService from './user.service';
import { EMAIL_REGEX } from './utils';

/**
 * Counts and returns the number of existing users
 */
export const count = api(
  { expose: true, auth: true, method: 'GET', path: '/users/v1/count' },
  async (): Promise<Response> => {
    try {
      const result = await UserService.count();
      return { success: true, result };
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
  async (data: CreateUserDto): Promise<UserResponse> => {
    try {
      if (!data.email) {
        throw APIError.invalidArgument('Missing fields');
      }
      if (!EMAIL_REGEX.test(data.email)) {
        throw APIError.invalidArgument('Invalid email');
      }
      const result = await UserService.create(data);
      return result;
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
  async (data: ValidateOtpDto): Promise<UserResponse> => {
    try {
      if (!data.email && !data.otp) {
        throw APIError.invalidArgument('Missing fields');
      }
      if (!EMAIL_REGEX.test(data.email)) {
        throw APIError.invalidArgument('Invalid email');
      }
      const result = await UserService.validateOtp(data);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error creating the user');
    }
  },
);

// /**
//  * Update user data
//  */
export const update = api(
  { expose: true, auth: true, method: 'PATCH', path: '/users/v1/:id' },
  async ({ id, data }: { id: number; data: UpdateUserDto }): Promise<UserResponse> => {
    try {
      const result = await UserService.update(id, data);
      return result;
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
  async ({ id }: { id: number }): Promise<UserResponse> => {
    try {
      const result = await UserService.delete(id);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error deleting user');
    }
  },
);

// /**
//  * Get all users data
//  */
// export const read = api(
//   { expose: true, method: "GET", path: "/users" },
//   async ({
//     page,
//     limit,
//   }: {
//     page?: number;
//     limit?: number;
//   }): Promise<UserResponse> => {
//     try {
//       const result = await UserService.find(page, limit);
//       return result;
//     } catch (error) {
//       throw APIError.aborted(error?.toString() || "Error getting users data");
//     }
//   }
// );

// /**
//  * Get user data by id
//  */
// export const readOne = api(
//   { expose: true, method: "GET", path: "/users/:id" },
//   async ({ id }: { id: number }): Promise<UserResponse> => {
//     try {
//       const result = await UserService.findOne(id);
//       return result;
//     } catch (error) {
//       throw APIError.aborted(error?.toString() || "Error getting user data");
//     }
//   }
// );
// );
