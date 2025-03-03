import { SQLDatabase } from "encore.dev/storage/sqldb";
import { Sequelize } from "sequelize";

const DB = new SQLDatabase('masqany-test-db', {
  migrations: './migrations',
});

const sequelize = new Sequelize(DB.connectionString, {
  timezone: "Africa/Nairobi",
  dialectOptions: {
    useUTC: false
  }
});

export { sequelize };