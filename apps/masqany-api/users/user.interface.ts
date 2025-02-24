export enum UserRole {
    Landlord = "Landlord",
    PropertyManager = "Property Manager",
    Agent = "Agent",
    Caretaker = "Caretaker",
    Security = "Security",
    Tenant = "Tenant",
    Other = "Other",
}

export enum AvailableLocation {
    Kenya = "Kenya"
}

export enum OnboardingStep {
    signUp = 'signUp',
    otp = 'otp',
    personalDetails = 'personalDetails',
    propertyDetails = 'propertyDetails',
    propertyAccess = 'propertyAccess'
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

export interface UserResponse {
    success: boolean;
    message?: string;
    result?: UserDto | UserDto[];
}

export interface Response {
    success: boolean;
    message?: string;
    result?: string | number;
}