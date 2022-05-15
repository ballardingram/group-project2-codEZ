const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// CREATE > TIPS MODEL
class Tips extends Model {}

// CREATE > FIELDS / COLUMNS FOR POST MODEL
Tips.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tip_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tip_detail: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tip_language: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            references: {
                model: 'User',
                key: 'username'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'tips'
    }
);

module.exports = Tips;