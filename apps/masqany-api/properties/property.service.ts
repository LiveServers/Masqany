import type { PropertyAccessDto, PropertyDetailsDto, PropertyLocationDetailsDto, PropertyResponse} from './property.interface';
import { Property, User } from '../sequelize/database';
import { OnboardingStep } from '../users/user.interface';
import { KenyanCounties, SupportedCountries } from './property.interface';

const PropertyService = {
  addPropertyDetails: async (data: PropertyDetailsDto, id: string): Promise<PropertyResponse> => {
    const { firstName, lastName, role, ...rest } = data;
    const user = await User.findByPk(id);
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
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
      return {
        success: false,
        message: 'Could not create property',
      };
    }
    await user.addProperty(property);
    await user.update({
      onboarding_step: OnboardingStep.propertyLocationDetails,
    });
    return {
      success: true,
      message: 'Created property details',
      result: property.toJSON(),
    };
  },
  getAvailableCountries: async (): Promise<PropertyResponse> => {
    return {
      success: true,
      result: Object.values(SupportedCountries),
    };
  },
  getAvailableCounties: async (): Promise<PropertyResponse> => {
    return {
      success: true,
      result: Object.values(KenyanCounties),
    };
  },
  addPropertyLocationDetails: async (
    data: PropertyLocationDetailsDto,
    id: string,
    propertyId: number,
  ): Promise<PropertyResponse> => {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return {
        success: false,
        message: 'Could not update property',
      };
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
      return {
        success: false,
        message: 'Could not update property',
      };
    }
    await user.update({
      onboarding_step: OnboardingStep.propertyAccess,
    });
    return {
      success: true,
      message: 'Added property location details',
    };
  },
  addPropertyAccess: async (
    data: PropertyAccessDto,
    id: string,
    propertyId: number,
  ): Promise<PropertyResponse> => {
    const response = await User.create({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_number: data.phoneNumber,
      role: data.role,
    });
    const user = response.get({ plain: true });
    if (!user) {
      return {
        success: false,
        message: 'Could not update property',
      };
    }
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return {
        success: false,
        message: 'Could not update property',
      };
    }
    await property.addUser(response);
    await response.update(
      {
        onboarding_step: OnboardingStep.onboardingComplete,
      },
      { where: { id } },
    );
    return {
      success: true,
      message: 'Added property access details',
    };
  },
};

export default PropertyService;
