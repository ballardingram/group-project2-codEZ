const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// CREATE > FederatedUser MODEL
class FederatedUser extends Model{};

// DEFINE > TABLE, COLUMNS, AND CONFIGURATION
FederatedUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            primaryKey: true,
            autoIncrement: true
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isEmail: true
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'federateduser'
    }
);

module.exports = FederatedUser;