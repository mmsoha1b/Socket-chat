const {Sequelize} = require('sequelize');
require('dotenv').config()
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new Sequelize(dbName, dbDialect, dbPassword, {
    host: 'localhost',
    dialect: 'postgres'
  });
module.exports = sequelize;
  