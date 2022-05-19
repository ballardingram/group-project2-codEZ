// IMPORT > MODELS
const User = require('./users');
const Tips = require('./tips');
const FederatedUser  = require('./federatedUsers');
const UserAccount = require('./user-account');

//User account belong to one user 
UserAccount.belongsTo(User, {
    foreignKey: 'userid',
    onDelete: 'CASCADE'
});

// RELATION > USER TO TIPS - ONE TO MANY
User.hasMany(Tips, {
    foreignKey: 'userid'
});

// RELATION > TIP TO USER - ONE TO ONE
Tips.belongsTo(User, {
    foreignKey: 'userid'
});

module.exports = { User, Tips, UserAccount};