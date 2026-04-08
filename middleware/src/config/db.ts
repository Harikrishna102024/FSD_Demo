import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: Number(process.env.DB_PORT)
// });

// export default pool;



//sequlize
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.NODE_ENV === "production" ? "postgres" : "mysql",
    logging: false,
    dialectOptions: process.env.NODE_ENV === "production" ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    } : {},
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Conneceted')
  } catch (error) {
    console.log('Databse Connection Failed', error);
    throw error;
  }
}

export default sequelize;