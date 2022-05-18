// IMPORT > MODELS
const User = require('./users');
const Tips = require('./tips');
const FederatedUser  = require('./federatedUsers');

// RELATION > USER TO TIPS - ONE TO MANY
User.hasMany(Tips, {
    foreignKey: 'username'
});

// RELATION > TIP TO USER - ONE TO ONE
Tips.belongsTo(User, {
    foreignKey: 'username',
});

module.exports = { User, Tips, FederatedUser};