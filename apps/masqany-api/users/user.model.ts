// import {
//     Model,
//     InferAttributes,
//     InferCreationAttributes,
//     CreationOptional,
//     DataTypes,
//     Sequelize,
//   } from "sequelize";
// import { AvailableLocation, OnboardingStep, UserRole } from "./user.interface";

// class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
//     declare id: CreationOptional<number>;
//     declare firstName: CreationOptional<string>;
//     declare lastName: CreationOptional<string>;
//     declare email: string;
//     declare isVerified: CreationOptional<boolean>;
//     declare phoneNumber: CreationOptional<string>;
//     declare role: CreationOptional<UserRole>;
//     declare location: CreationOptional<AvailableLocation>;
//     declare onboardingStep: CreationOptional<OnboardingStep>;
//     declare otp: CreationOptional<string>;
//     declare expirationDate: CreationOptional<Date>;
//     declare otpUsed: CreationOptional<boolean>;

//     static initModel(sequelize: Sequelize) {
//         User.init(
//             {
//                 id: {
//                     type: DataTypes.INTEGER,
//                     autoIncrement: true,
//                     primaryKey: true,
//                 },
//                 firstName: {
//                     type: DataTypes.STRING,
//                     field: 'first_name'
//                 },
//                 lastName: {
//                     type: DataTypes.STRING,
//                     field: 'last_name'
//                 },
//                 isVerified: {
//                     type: DataTypes.STRING,
//                     field: 'is_verified'
//                 },
//                 email: {
//                     type: DataTypes.STRING,
//                     allowNull: false,
//                     unique: true
//                 },
//                 role: {
//                     type: DataTypes.STRING,
//                 },
//                 location: {
//                     type: DataTypes.STRING,
//                 },
//                 phoneNumber: {
//                     type: DataTypes.STRING,
//                     unique: true,
//                     field: 'phone_number'
//                 },
//                 onboardingStep: {
//                     type: DataTypes.STRING,
//                     field: 'onboarding_step',
//                 },
//                 otp: {
//                     type: DataTypes.STRING,
//                 },
//                 expirationDate: {
//                     type: DataTypes.DATE,
//                     field: 'expiration_date',
//                 },
//                 otpUsed: {
//                     type: DataTypes.BOOLEAN,
//                     field: 'otp_used',
//                 }
//             },
//             {
//                 sequelize,
//                 tableName: "user",
//                 timestamps: false,
//             }
//         );
//     }
// }

// export { User };

import type { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import { AvailableLocation, OnboardingStep, UserRole } from './user.interface';

export const UserModel = (sequelize: Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.values(UserRole)],
        },
      },

      location: {
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.values(AvailableLocation)],
        },
      },

      phone_number: {
        type: DataTypes.STRING,
        unique: true,
      },

      onboarding_step: {
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.values(OnboardingStep)],
        },
      },
      otp: {
        type: DataTypes.STRING,
      },
      expiration_date: {
        type: DataTypes.DATE,
      },
      otp_used: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'user',
      timestamps: false,
    },
  );

  return User;
};
