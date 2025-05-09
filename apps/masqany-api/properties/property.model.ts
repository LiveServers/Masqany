import type { Model, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import type { PropertyAttributes, PropertyCreationAttributes } from './property.interface';
import { KenyanCounties, PropertType, SupportedCountries } from './property.interface';

export const PropertyModel = (sequelize: Sequelize) => {
  const Property = sequelize.define<Model<PropertyAttributes, PropertyCreationAttributes>>(
    'Property',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      property_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.values(PropertType)],
        },
      },

      property_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
      },

      physical_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country_of_property: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [Object.values(SupportedCountries)],
        },
      },

      county_of_property: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [Object.values(KenyanCounties)],
        },
      },

      locality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'property',
      timestamps: false,
    },
  );

  return Property;
};
