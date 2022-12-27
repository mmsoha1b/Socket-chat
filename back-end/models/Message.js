const {Model, DataTypes } = require("sequelize");
const db = require('../config/utils/db');
class Message extends Model{}
Message.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    text:{
        type:DataTypes.TEXT,
    }},{
        sequelize:db,
        underscored:true,
        modelName: 'message'
    }
)
module.exports = Message;