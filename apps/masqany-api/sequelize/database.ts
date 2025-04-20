import { SQLDatabase } from 'encore.dev/storage/sqldb';
import { Sequelize } from 'sequelize';

import { PropertyModel } from '../properties/property.model';
import { UserModel } from '../users/user.model';

const DB = new SQLDatabase('masqany-test-db', {
  migrations: './migrations',
});

const sequelize = new Sequelize(DB.connectionString, {
  timezone: 'Africa/Nairobi',
  dialectOptions: {
    useUTC: false,
  },
});

const User = UserModel(sequelize);
const Property = PropertyModel(sequelize);

Property.belongsToMany(User, {
  through: 'user_properties',
  as: 'users',
  foreignKey: 'property_id',
  otherKey: 'user_id',
  timestamps: false,
});
User.belongsToMany(Property, {
  through: 'user_properties',
  as: 'properties',
  foreignKey: 'user_id',
  otherKey: 'property_id',
  timestamps: false,
});

export { Property, sequelize, User };
