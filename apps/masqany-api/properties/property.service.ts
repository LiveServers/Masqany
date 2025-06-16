import type { KenyanCountiesValue, PropertyAccessDto, PropertyAttributes, PropertyDetailsDto, PropertyLocationDetailsDto, PropertyResponse, SupportedCountryValue} from './property.interface';
import { Property, User } from '../sequelize/database';
import { OnboardingStep } from '../users/user.interface';
import { KenyanCounties, SupportedCountries } from './property.interface';
import { APIError } from 'encore.dev/api';

const PropertyService = {
  addPropertyDetails: async (data: PropertyDetailsDto, id: string): Promise<PropertyAttributes> => {
    const { firstName, lastName, role, ...rest } = data;
    const user = await User.findByPk(id);
    if (!user) {
      throw APIError.notFound('User not found');
    }
    await user.update({
      first_name: firstName,
      last_name: lastName,
      role,
    });
    const property = await Property.create({
      description: rest.description,
      property_type: rest.propertyType,
      property_name: rest.propertyName,
      physical_address: rest.physicalAddress,
    });
    if (!property) {
      throw APIError.aborted('Could not create property');
    }
    await user.addProperty(property);
    await user.update({
      onboarding_step: OnboardingStep.propertyLocationDetails,
    });
    return property.get({plain: true});
  },
  getAvailableCountries: async (): Promise<SupportedCountryValue[]> => {
    return Object.values(SupportedCountries)
  },
  getAvailableCounties: async (): Promise<KenyanCountiesValue[]> => {
    return Object.values(KenyanCounties)
  },
  addPropertyLocationDetails: async (
    data: PropertyLocationDetailsDto,
    id: string,
    propertyId: number,
  ): Promise<string> => {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      throw APIError.notFound('Property not found');
    }
    await property.update({
      country_of_property: data.countryOfProperty,
      county_of_property: data.countyOfProperty,
      locality: data.locality,
    });
    const user = await User.findByPk(id, {
      include: {
        model: Property,
        as: 'properties',
      },
    });
    if (!user) {
      throw APIError.notFound('User not found');
    }
    await user.update({
      onboarding_step: OnboardingStep.propertyAccess,
    });
    return 'Added property location details'
  },
  addPropertyAccess: async (
    data: PropertyAccessDto,
    id: string,
    propertyId: number,
  ): Promise<string> => {
    const response = await User.create({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_number: data.phoneNumber,
      role: data.role,
    });
    const user = response.get({ plain: true });
    if (!user) {
      throw APIError.notFound('User not found');
    }
    const property = await Property.findByPk(propertyId);
    if (!property) {
      throw APIError.notFound('Property not found');
    }
    await property.addUser(response);
    await response.update(
      {
        onboarding_step: OnboardingStep.onboardingComplete,
        is_verified: true,
      },
      { where: { id } },
    );
    return 'Added property access details'
  },
};

export default PropertyService;
