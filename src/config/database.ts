import "dotenv/config";

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

interface Config {
    [key: string]: {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: Dialect;
    };
}

const config: Config = {
    development: {
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        host: process.env.DB_HOST as string,
        dialect: (process.env.DB_DIALECT as Dialect) || '',
    },
    // test: {
    //     username: process.env.DB_USER as string,
    //     password: process.env.DB_PASSWORD as string,
    //     database: process.env.DB_NAME as string,
    //     host: process.env.DB_HOST as string,
    //     dialect: process.env.DB_DIALECT as Dialect,
    // },
    // production: {
    //     username: process.env.DB_USER as string,
    //     password: process.env.DB_PASSWORD as string,
    //     database: process.env.DB_NAME as string,
    //     host: process.env.DB_HOST as string,
    //     dialect: process.env.DB_DIALECT as Dialect,
    // },
};
  
export default config;