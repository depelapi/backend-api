import { Sequelize } from 'sequelize';
import "dotenv/config";

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

const config = {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql'
};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

export default sequelize;