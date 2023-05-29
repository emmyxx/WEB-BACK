const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = sequelize;

const sequelize = new Sequelize(
    process.env.PG_NAME,
    process.env.PG_USERNAME,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        port: process.env.PG_PORT,
        logging: false
    }

);