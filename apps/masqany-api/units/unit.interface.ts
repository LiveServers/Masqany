import { MinLen } from "encore.dev/validate";
import { Model } from "sequelize";

export enum Classification {
    Unfurnished = "Unfurnished",
    Furnished = "Furnished"
}

export enum UnitType {
    'Single Room' ='Single Room',
    'Double Room' = 'Double Room',
    '1 Bedroom' = '1 Bedroom',
    '2 Bedroom' = '2 Bedroom',
    '3 Bedroom' = '3 Bedroom',
    '4 Bedroom' = '4 Bedroom',
    '5 Bedroom' = '5 Bedroom',
    Bedsitter = 'Bedsitter',
    'Studio Apartment' = 'Studio Apartment',
    Bungalow = 'Bungalow',
    Maisonette = 'Maisonette'
}

export enum Currency {
    KES = 'KES',
    NGN = 'NGN'
}

export enum UnitStatus {
    Occupied = 'Occupied',
    Vacant = 'Vacant',
    Renovating = 'Renovating',
    Constructing = 'Constructing'
}

export enum Floor {
    'Ground Floor' = 'Ground Floor',
    '1st Floor' = '1st Floor',
    '2nd Floor' = '2nd Floor',
    '3rd Floor' = '3rd Floor',
    '4th Floor' = '4th Floor',
    '5th Floor' = '5th Floor',
    '6th Floor' = '6th Floor',
    '7th Floor' = '7th Floor',
    '8th Floor' = '8th Floor',
    '9th Floor' = '9th Floor',
    '10th Floor' = '10th Floor',
    '11th Floor' = '11th Floor',
    '12th Floor' = '12th Floor',
    '13th Floor' = '13th Floor',
    '14th Floor' = '14th Floor',
    '15th Floor' = '15th Floor',
    '16th Floor' = '16th Floor',
    '17th Floor' = '17th Floor',
    '18th Floor' = '18th Floor',
    '19th Floor' = '19th Floor',
    '20th Floor' = '20th Floor',
}

// we'll add billing info later
export interface UnitAttributes {
    id: number;
    property_id: number;
    number: string;
    classification: Classification;
    block?: string;
    floor?: Floor;
    type: UnitType;
    monthly_rent: string;
    currency: Currency;
    status: UnitStatus;
}

export interface UnitCreationAttributes extends Omit<UnitAttributes, 'id'>{}

export interface CreateUnitDto {
    number: string & MinLen<1>;
    classification: Classification;
    block?: string;
    floor?: Floor;
    type: UnitType;
    monthly_rent: string & MinLen<4>;
    currency: Currency;
    status: UnitStatus;
}

export type UnitInstance = Model<UnitAttributes, UnitCreationAttributes>;

export interface DeleteUnitResponse {
    message: string;
}