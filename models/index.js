// IMPORT > MODELS
const User = require('./users');
const Tips = require('./tips');

// RELATION > USER TO TIPS - ONE TO MANY
User.hasMany(Tips, {
    foreignKey: 'user_id'
});

// RELATION > TIP TO USER - ONE TO ONE
Tips.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Tips};