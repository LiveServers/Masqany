import type { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import { Classification, Currency, Floor, UnitInstance, UnitStatus, UnitType } from './unit.interface';

export const UnitModel = (sequelize: Sequelize) => {
  const Unit = sequelize.define<UnitInstance>(
    'Unit',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      property_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'property',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classification: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [Object.values(Classification)]
        }
      },
      block: {
        type: DataTypes.STRING,
      },
      floor: {
        type: DataTypes.STRING,
        validate: {
            isIn: [Object.values(Floor)],
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.values(UnitType)],
        },
      },
      monthly_rent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [Object.values(Currency)],
          },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [Object.values(UnitStatus)]
        }
      }
    },
    {
      tableName: 'unit',
      timestamps: false,
    },
  );

  return Unit;
};
