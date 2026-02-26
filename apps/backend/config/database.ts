import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string || 'olivefe_db',
    process.env.DB_USER as string || 'root',
    process.env.DB_PASSWORD as string || 'rootpassword',
    {
        host: process.env.DB_HOST || 'db',
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
    }
);

export = sequelize;
