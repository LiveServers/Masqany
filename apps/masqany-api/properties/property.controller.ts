import { api, APIError } from 'encore.dev/api';

import type {
  PropertyAccessDto,
  PropertyDetailsDto,
  PropertyLocationDetailsDto,
  PropertyResponse,
} from './property.interface';
import PropertyService from './property.service';

import { getAuthData } from '~encore/auth';

/**
 * add propert details
 */
export const addPropertyDetails = api(
  { expose: true, auth: false, method: 'POST', path: '/property/v1/add-property-details' },
  async ({ data }: { data: PropertyDetailsDto }): Promise<PropertyResponse> => {
    try {
      if (!data.firstName && !data.lastName && !data.role) {
        throw APIError.invalidArgument('Missing fields');
      }
      const userID = getAuthData()?.userID;
      const result = await PropertyService.addPropertyDetails(data, userID);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error updating user');
    }
  },
);

/**
 * add property location details
 */
export const addPropertyLocationDetails = api(
  {
    expose: true,
    auth: true,
    method: 'POST',
    path: '/property/v1/add-property-location-details/:propertyId',
  },
  async ({
    propertyId,
    data,
  }: {
    propertyId: number;
    data: PropertyLocationDetailsDto;
  }): Promise<PropertyResponse> => {
    try {
      if (!data.countryOfProperty && !data.countyOfProperty && !data.locality) {
        throw APIError.invalidArgument('Missing fields');
      }
      const userID = getAuthData()?.userID;
      const result = await PropertyService.addPropertyLocationDetails(data, userID, propertyId);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error updating user');
    }
  },
);

/**
 * add property location details
 */
export const addPropertyAccess = api(
  {
    expose: true,
    auth: true,
    method: 'POST',
    path: '/property/v1/add-property-access/:propertyId',
  },
  async ({
    propertyId,
    data,
  }: {
    propertyId: number;
    data: PropertyAccessDto;
  }): Promise<PropertyResponse> => {
    try {
      if (!data.firstName && !data.lastName && !data.role && !data.email) {
        throw APIError.invalidArgument('Missing fields');
      }
      const userID = getAuthData()?.userID;
      const result = await PropertyService.addPropertyAccess(data, userID, propertyId);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error updating user');
    }
  },
);
