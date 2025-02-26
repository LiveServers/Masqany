import jwt from 'jsonwebtoken';
import { secret } from "encore.dev/config";
import OtpService from "../otp/otp.service";
import { CreateUserDto, OnboardingStep, UpdateUserDto, UserResponse, ValidateOtpDto } from "./user.interface";
import { User } from "./user.model";

const jwtSecret = secret('MAILGUN_API_KEY');

const UserService = {
  count: async (): Promise<number> => {
    const count = await User.count();
    return count;
  },
  create: async (data: CreateUserDto): Promise<UserResponse> => {
    const user = await User.create(data);
    if(user){
        const otpResponse = await OtpService.generateOtp();
        if(otpResponse.result){
            const response = await OtpService.sendEmail(otpResponse.result?.otp);
            if(response.status === 200){
                await User.update({
                    ...otpResponse.result,
                    onboardingStep: OnboardingStep.otp, // next onboarding step

                },{where: {id: user.dataValues.id}})
            }
        }
    }
    return {
      success: true,
      result: user.toJSON(),
    };
  },
  validateOtp: async ({email, otp}: ValidateOtpDto): Promise<UserResponse> => {
    const user = await User.findOne({where: {email}});
    if(user){
      const response = OtpService.validateOtp({incomingOtp:otp, savedOtp:user.otp, expirationDate:user.expirationDate, otpUsed:user.otpUsed});
      if(response.success){
        user.otpUsed = true;
        await user.save();
        const token = UserService.createAccessToken(user.id, user.email, user.role)
        return {
          success: true,
          result: {
            accessToken: token
          }
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
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName
    user.role = role ?? user.role;
    user.location = location ?? user.location;
    user.phoneNumber = phoneNumber ?? user.phoneNumber; //TO-DO: send otp if phone number field is active

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
  }
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