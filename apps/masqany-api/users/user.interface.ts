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
}

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

export interface UserResponse {
  success: boolean;
  message?: string;
  result?: UserDto | UserDto[] | string | Record<string, string>;
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
