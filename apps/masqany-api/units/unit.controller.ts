import { api, APIError } from "encore.dev/api";
import { CreateUnitDto, DeleteUnitResponse, UnitAttributes } from "./unit.interface";
import UnitService from "./unit.service";
import { ApiResponse, success } from "../utils/response";


export const addUnit = api(
    { expose: true, auth: true, method: 'POST', path: '/unit/v1/add-unit/:property_id' },
    async ({ property_id, data }: { property_id: number, data: CreateUnitDto }): Promise<ApiResponse<UnitAttributes>> => {
      try {
        const result = await UnitService.addUnit(data, property_id);
        return success(result, 'Unit added successfully');
      } catch (error) {
        throw APIError.aborted(error?.toString() || 'An error occured, please trying again later');
      }
    },
);

export const getUnits = api(
    { expose: true, auth: true, method: 'GET', path: '/unit/v1/get-units/:property_id' },
    async ({ property_id }: { property_id: number }): Promise<ApiResponse<UnitAttributes[]>> => {
      try {
        const data = await UnitService.getUnits(property_id);
        console.log('Units retrieved:', data);
        return success(data, 'Units retrieved successfully');
      } catch (error) {
        throw APIError.aborted(error?.toString() || 'An error occured, please trying again later');
      }
    },
);

export const getUnit = api(
    { expose: true, auth: true, method: 'GET', path: '/unit/v1/get-unit/:unit_id' },
    async ({ unit_id }: { unit_id: number }): Promise<ApiResponse<UnitAttributes>> => {
      try {
        const result = await UnitService.getUnit(unit_id);
        return success(result, 'Unit retrieved successfully');
      } catch (error) {
        throw APIError.aborted(error?.toString() || 'An error occured, please trying again later');
      }
    }
);

export const updateUnit = api(
    { expose: true, auth: true, method: 'PUT', path: '/unit/v1/update-unit/:unit_id' },
    async ({ unit_id, data }: { unit_id: number, data: Partial<CreateUnitDto> }): Promise<ApiResponse<UnitAttributes>> => {
      try {
        const result = await UnitService.updateUnit(unit_id, data);
        return success(result, 'Unit updated successfully');
      } catch (error) {
        throw APIError.aborted(error?.toString() || 'An error occured, please trying again later');
      }
    }
);

export const deleteUnit = api(
    { expose: true, auth: true, method: 'DELETE', path: '/unit/v1/delete-unit/:unit_id' },
    async ({ unit_id }: { unit_id: number }): Promise<ApiResponse<DeleteUnitResponse>> => {
      try {
        await UnitService.deleteUnit(unit_id);
        return success({message: 'Unit deleted successfully'}, 'Unit deleted successfully');
      } catch (error) {
        throw APIError.aborted(error?.toString() || 'An error occured, please trying again later');
      }
    }
);
