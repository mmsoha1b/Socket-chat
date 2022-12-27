const User = require('./User');
const Message = require('./Message')

User.hasMany(Message)
Message.belongsTo(User)

User.sync({alter:true});
Message.sync({alter:true});

module.exports = {
    User,
    Message
}
