const {Sequelize} = require('sequelize');
require('dotenv').config()
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGHOST = process.env.PGHOST;
const PGPORT = process.env.PGPORT;
const PGDATABASE = process.env.PGDATABASE;
const DB_URL = `postgresql://${ PGUSER }:${ PGPASSWORD }@${ PGHOST }:${ PGPORT }/${ PGDATABASE }`
const sequelize = new Sequelize(DB_URL);
module.exports = sequelize;
  