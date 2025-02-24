import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
  } from "sequelize";
import { sequelize } from "../sequelize/database";
import { AvailableLocation, OnboardingStep, UserRole } from "./user.interface";
  
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare firstName: CreationOptional<string>;
    declare lastName: CreationOptional<string>;
    declare email: string;
    declare isVerified: CreationOptional<boolean>;
    declare phoneNumber: CreationOptional<string>;
    declare role: CreationOptional<UserRole>;
    declare location: CreationOptional<AvailableLocation>;
    declare onboardingStep: CreationOptional<OnboardingStep>;
    declare otp: CreationOptional<string>;
    declare expirationDate: CreationOptional<Date>;
    declare otpUsed: CreationOptional<boolean>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        isVerified: {
            type: DataTypes.STRING,
            field: 'is_verified'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
            field: 'phone_number'
        },
        onboardingStep: {
            type: DataTypes.STRING,
            field: 'onboarding_step',
        },
        otp: {
            type: DataTypes.STRING,
        },
        expirationDate: {
            type: DataTypes.DATE,
            field: 'expiration_date',
        },
        otpUsed: {
            type: DataTypes.BOOLEAN,
            field: 'otp_used',
        }
    },
    {
        sequelize,
        tableName: "user",
        timestamps: false,
    }
);

export { User };