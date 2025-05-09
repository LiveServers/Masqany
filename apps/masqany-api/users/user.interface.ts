import type { Header } from 'encore.dev/api';

export enum UserRole {
  Landlord = 'Landlord',
  PropertyManager = 'Property Manager',
  Agent = 'Agent',
  Caretaker = 'Caretaker',
  Security = 'Security',
  Tenant = 'Tenant',
  Other = 'Other',
}

export enum AvailableLocation {
  Kenya = 'Kenya',
}

export enum OnboardingStep {
  signUp = 'signUp',
  otp = 'otp',
  propertyDetails = 'propertyDetails',
  propertyLocationDetails = 'propertyLocationDetails',
  propertyAccess = 'propertyAccess',
  onboardingComplete = 'onboardingComplete',
}

// dto
export interface UserDto {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  isVerified?: boolean;
  phoneNumber?: string;
  role?: UserRole;
  location?: AvailableLocation;
  onboardingStep?: OnboardingStep;
  otp?: string;
  otpUsed?: boolean;
  expirationDate?: Date;
  signed_out?: boolean;
}

export interface UserAttributes {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  is_verified?: boolean;
  phone_number?: string;
  role?: UserRole;
  location?: AvailableLocation;
  onboarding_step?: OnboardingStep;
  otp?: string;
  otp_used?: boolean;
  expiration_date?: Date;
  signed_out?: boolean;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export interface CreateUserDto {
  firstName?: string;
  lastName?: string;
  email: string;
  isVerified?: boolean;
  phoneNumber?: string;
  role?: UserRole;
  location?: AvailableLocation;
  onboardingStep?: OnboardingStep;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string; // needs otp verification
  role?: UserRole;
  location?: AvailableLocation;
}

interface BaseUserResponse {
  success: boolean;
  message?: string;
}

export interface UserResponse extends BaseUserResponse {
  result?: UserDto | UserDto[] | string | Record<string, string>;
}

export interface UserResponseWithToken extends BaseUserResponse {
  result?: {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
  };
}

export interface RefreshTokenResponse extends BaseUserResponse {
  result?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface Response {
  success: boolean;
  message?: string;
  result?: string | number;
}

export interface ValidateOtpDto {
  email: string;
  otp: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}

export interface SignInResponseWithCookies {
  cookie: Header<'Set-Cookie'>;
  accessToken: string;
  user: UserDto;
}

export interface RefreshTokenResponseWithCookies {
  cookie: Header<'Set-Cookie'>;
  accessToken: string;
}
