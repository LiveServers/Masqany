import { APIError } from "encore.dev/api";
import { Property, Unit } from "../sequelize/database";
import { CreateUnitDto, UnitAttributes } from "./unit.interface";

const UnitService = {
    addUnit: async (data: CreateUnitDto, property_id: number): Promise<UnitAttributes> => {
        const property = await Property.findByPk(property_id)
        if(!property){
            throw APIError.aborted('Could not add unit, property not found');
        }
        const unit = await Unit.create({
            ...data,
            property_id
        });
        const result = unit.get({ plain: true });
        return result;
    },
    getUnits: async (property_id: number): Promise<UnitAttributes[]> => {
        const property = await Property.findByPk(property_id)
        if(!property){
            throw APIError.notFound('Units not found');
        }
        const units = await Unit.findAll({
            where: {
                property_id
            },
        });
        return units.map(unit => unit.get({ plain: true }));
    },
    getUnit: async (unit_id: number): Promise<UnitAttributes> => {
        const unit = await Unit.findByPk(unit_id)
        if(!unit){
            throw APIError.notFound('Unit not found');
        }
        return unit.get({ plain: true });
    },
    updateUnit: async (unit_id: number, data: Partial<CreateUnitDto>): Promise<UnitAttributes> => {
        const unit = await Unit.findByPk(unit_id)
        if(!unit){
            throw APIError.notFound('Could not update unit, unit not found');
        }
        await unit.update(data);
        return unit.get({ plain: true });
    },
    deleteUnit: async (unit_id: number): Promise<void> => {
        const unit = await Unit.findByPk(unit_id)
        if(!unit){
            throw APIError.notFound('Could not delete unit, unit not found');
        }
        await unit.destroy();
    }
}

export default UnitService;