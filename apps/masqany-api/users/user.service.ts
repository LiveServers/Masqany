import jwt from 'jsonwebtoken';
import { secret } from "encore.dev/config";
import OtpService from "../otp/otp.service";
import { CreateUserDto, OnboardingStep, UpdateUserDto, UserResponse, ValidateOtpDto } from "./user.interface";
import { User } from '../sequelize/database';

const jwtSecret = secret('MAILGUN_API_KEY');

const UserService = {
  count: async (): Promise<number> => {
    const count = await User.count();
    return count;
  },
  create: async (data: CreateUserDto): Promise<UserResponse> => {
    const user = await User.create(data);
    const userData = user.get({plain: true});
    if(userData){
        const otpResponse = await OtpService.generateOtp();
        if(otpResponse.result){
            const response = await OtpService.sendEmail(otpResponse.result?.otp);
            if(response.status === 200){
                await User.update({
                    otp: otpResponse.result.otp,
                    expiration_date: otpResponse.result.expirationDate,
                    onboarding_step: OnboardingStep.otp,

                },{where: {id: userData.id}})
            }
        }
    }
    return {
      success: true,
      result: userData,
    };
  },
  validateOtp: async ({email, otp}: ValidateOtpDto): Promise<UserResponse> => {
    const user = await User.findOne({where: {email}, raw: true});
    if(!user){
      return {
        success: false,
        message: "unable to validate otp"
      }
    }
    const response = OtpService.validateOtp({incomingOtp:otp, savedOtp:user.otp, expirationDate:user.expiration_date, otpUsed:user.otp_used});
    if(response.success){
      await User.update({
        otpUsed: true,
        onboarding_step: OnboardingStep.propertyDetails,
      },{where: {id: user.id}});
      const token = UserService.createAccessToken(user.id, user.email, user.role)
      return {
        success: true,
        result: {
          accessToken: token
        }
      }
    }
    return {
      success: false,
      message: "unable to validate otp"
    }
  },
  update: async (id: number, data: UpdateUserDto): Promise<UserResponse> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const {firstName, lastName, role, location, phoneNumber} = data;
    user.first_name = firstName ?? user.first_name;
    user.last_name = lastName ?? user.last_name
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
        message: "User not found",
      };
    }
    await user.destroy();
    return {
      success: true,
      result: "User deleted successfully",
    };
  },
  createAccessToken: (id: number, email: string, role: string): string => {
    const accessToken = jwt.sign({id, email, role}, Buffer.from(jwtSecret(), 'base64'), { expiresIn: '1h' });
    return accessToken
  },
  // ONBOARDING
  
//   find: async (page?: number, limit?: number): Promise<UserResponse> => {
//     let users: User[] = [];
//     let pagination: any = undefined;
//     if (page && limit) {
//       const offset = getOffset(page, limit);
//       const data = await User.findAndCountAll({ limit, offset });
//       users = data.rows;
//       pagination = paginatedData({ size: limit, page, count: data.count });
//     } else {
//       users = await User.findAll();
//     }
//     return {
//       success: true,
//       result: users.map((user) => user.toJSON()),
//       pagination,
//     };
//   },

//   findOne: async (id: number): Promise<UserResponse> => {
//     const user = await User.findOne({ where: { id } });
//     if (!user) {
//       return {
//         success: false,
//         message: "User not found",
//       };
//     }
//     return {
//       success: true,
//       result: user.toJSON(),
//     };
//   },


};

export default UserService;