// import {
//     Model,
//     InferAttributes,
//     InferCreationAttributes,
//     CreationOptional,
//     DataTypes,
//     Sequelize,
//   } from "sequelize";
// import { KenyanCounties, PropertType, SupportedCountries } from "./property.interface";
  
// class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
//     declare id: CreationOptional<number>;
//     declare propertyType: PropertType;
//     declare propertyName: string;
//     declare description: CreationOptional<string>;
//     declare physicalAddress: string;
//     declare countryOfProperty: CreationOptional<SupportedCountries>;
//     declare countyOfProperty: CreationOptional<KenyanCounties>;
//     declare locality: CreationOptional<string>;

//     static initModel(sequelize: Sequelize) {
//         Property.init(
//             {
//                 id: {
//                     type: DataTypes.INTEGER,
//                     autoIncrement: true,
//                     primaryKey: true,
//                 },
//                 propertyType: {
//                     type: DataTypes.STRING,
//                     field: 'property_type',
//                     allowNull: false,
//                 },
//                 propertyName: {
//                     type: DataTypes.STRING,
//                     field: 'property_name',
//                     allowNull: false,
//                 },
//                 description: {
//                     type: DataTypes.STRING,
//                 },
//                 physicalAddress: {
//                     type: DataTypes.STRING,
//                     field: 'physical_address',
//                     allowNull: false,
//                 },
//                 countryOfProperty: {
//                     type: DataTypes.STRING,
//                     field: 'country_of_property',
//                     allowNull: true,
//                 },
//                 countyOfProperty: {
//                     type: DataTypes.STRING,
//                     field: 'county_of_property',
//                     allowNull: true,
//                 },
//                 locality: {
//                     type: DataTypes.STRING,
//                     allowNull: true,
//                 },
//             },
//             {
//                 sequelize,
//                 tableName: "property",
//                 timestamps: false,
//             }
//         );
//     }
// }

// export { Property };
import { Sequelize, DataTypes } from "sequelize";
import { KenyanCounties, PropertType, SupportedCountries } from "./property.interface";

export const PropertyModel = (sequelize: Sequelize) => {
  const Property = sequelize.define('Property', {
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
  }, {
    tableName: 'property',
    timestamps: false,
  });

  return Property;
};
