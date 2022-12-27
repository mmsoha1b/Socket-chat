const { Model, DataTypes } = require("sequelize");
const db = require('../config/utils/db');
class User extends Model{}
User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.TEXT,
        defaultValue: `User`,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    passwordHash:{
        type:DataTypes.TEXT,
        allowNull: false,

    }},
    {
        sequelize:db,
        underscored:true,
        modelName:'user'
    }
);
module.exports = User;