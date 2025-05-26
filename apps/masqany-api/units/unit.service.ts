import { Property, Unit } from "../sequelize/database";
import { CreateUnitDto, UnitAttributes, UnitInstance } from "./unit.interface";

const UnitService = {
    addUnit: async (data: CreateUnitDto, property_id: number): Promise<UnitAttributes> => {
        const property = await Property.findByPk(property_id)
        if(!property){
            throw new Error('An error occured, try again later')
        }
        const unit = await Unit.create({
            ...data,
            property_id
        });
        const result = unit.get({ plain: true });
        return result;
    },
    getUnits: async (property_id: number): Promise<UnitInstance[]> => {
        const property = await Property.findByPk(property_id)
        if(!property){
            throw new Error('An error occured, try again later')
        }
        const units = await Unit.findAll({
            where: {
                property_id
            },
            raw: true,
        });
        return units;
    },
    getUnit: async (unit_id: number): Promise<UnitAttributes> => {
        const unit = await Unit.findByPk(unit_id)
        if(!unit){
            throw new Error('An error occured, try again later')
        }
        return unit.get({ plain: true });
    },
    updateUnit: async (unit_id: number, data: Partial<CreateUnitDto>): Promise<UnitAttributes> => {
        const unit = await Unit.findByPk(unit_id)
        if(!unit){
            throw new Error('An error occured, try again later')
        }
        await unit.update(data);
        return unit.get({ plain: true });
    },
    deleteUnit: async (unit_id: number): Promise<void> => {
        const unit = await Unit.findByPk(unit_id)
        if(!unit){
            throw new Error('An error occured, try again later')
        }
        await unit.destroy();
    }
}

export default UnitService;