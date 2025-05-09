import type { Model, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import type { UserAttributes, UserCreationAttributes } from './user.interface';
import { AvailableLocation, OnboardingStep, UserRole } from './user.interface';

export const UserModel = (sequelize: Sequelize) => {
  const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
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
      signed_out: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: 'user',
      timestamps: false,
    },
  );

  return User;
};
