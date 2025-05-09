import type { UserRole } from '../users/user.interface';

export enum PropertType {
  Apartment = 'Apartment',
  Commercial = 'Commercial',
  StandAlone = 'StandAlone',
  Mansionate = 'Mansionate',
  Other = 'Other',
}

export enum SupportedCountries {
  Kenya = 'Kenya',
}

export enum KenyanCounties {
  Baringo = 'Baringo',
  Bomet = 'Bomet',
  Bungoma = 'Bungoma',
  Busia = 'Busia',
  ElgeyoMarakwet = 'Elgeyo Marakwet',
  Embu = 'Embu',
  Garissa = 'Garissa',
  HomaBay = 'Homa Bay',
  Isiolo = 'Isiolo',
  Kajiado = 'Kajiado',
  Kakamega = 'Kakamega',
  Kericho = 'Kericho',
  Kiambu = 'Kiambu',
  Kilifi = 'Kilifi',
  Kirinyaga = 'Kirinyaga',
  Kisii = 'Kisii',
  Kisumu = 'Kisumu',
  Kitui = 'Kitui',
  Kwale = 'Kwale',
  Laikipia = 'Laikipia',
  Lamu = 'Lamu',
  Machakos = 'Machakos',
  Makueni = 'Makueni',
  Mandera = 'Mandera',
  Marsabit = 'Marsabit',
  Meru = 'Meru',
  Migori = 'Migori',
  Mombasa = 'Mombasa',
  Muranga = "Murang'a",
  Nairobi = 'Nairobi',
  Nakuru = 'Nakuru',
  Nandi = 'Nandi',
  Narok = 'Narok',
  Nyamira = 'Nyamira',
  Nyandarua = 'Nyandarua',
  Nyeri = 'Nyeri',
  Samburu = 'Samburu',
  Siaya = 'Siaya',
  TaitaTaveta = 'Taita Taveta',
  TanaRiver = 'Tana River',
  TharakaNithi = 'Tharaka Nithi',
  TransNzoia = 'Trans Nzoia',
  Turkana = 'Turkana',
  UasinGishu = 'Uasin Gishu',
  Vihiga = 'Vihiga',
  Wajir = 'Wajir',
  WestPokot = 'West Pokot',
}

export interface PropertyDto {
  id: number;
  propertyType: PropertType;
  propertyName: string;
  description?: string;
  physicalAddress: string;
  countryOfProperty?: SupportedCountries;
  countyOfProperty?: KenyanCounties;
  locality?: string;
}

export interface PropertyAttributes {
  id: number;
  property_type: PropertType;
  property_name: string;
  description?: string;
  physical_address: string;
  country_of_property?: SupportedCountries;
  county_of_property?: KenyanCounties;
  locality?: string;
}

export interface PropertyCreationAttributes extends Omit<PropertyAttributes, 'id'> {}

export interface CreatePropertyDto {
  firstName: string;
  lastName: string;
  role: UserRole;
  propertyType: PropertType;
  propertyName: string;
  description?: string;
  physicalAddress: string;
  countryOfProperty?: SupportedCountries;
  countyOfProperty?: KenyanCounties;
  locality?: string;
}

export interface PropertyAccessDto {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  phoneNumber?: string;
}

export interface PropertyResponse {
  success: boolean;
  message?: string;
  result?:
    | PropertyDto
    | PropertyDto[]
    | string
    | Record<string, string>
    | string[]
    | PropertyAttributes;
}

type UniquesKeys = 'countryOfProperty' | 'countyOfProperty' | 'locality';
export type PropertyDetailsDto = Omit<CreatePropertyDto, UniquesKeys>;
export type PropertyLocationDetailsDto = Pick<CreatePropertyDto, UniquesKeys>;
