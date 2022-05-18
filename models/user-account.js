const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// CREATE >  USER ACCOUNT MODEL
class UserAccount extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// DEFINE > TABLE, COLUMNS AND CONFIGURATION > USER ACCOUNT
UserAccount.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8]
                }
        },
        userid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        }
        },
        {
            hooks: {
                async beforeCreate(newUserAccountData) {
                    newUserAccountData.password = await bcrypt.hash(newUserAccountData.password, 10);
                    return newUserAccountData;
                },
                async beforeUpdate(updatedUserAccountData) {
                    updatedUserAccountData.password = await bcrypt.hash(updatedUserAccountData.password, 10);
                    return updatedUserAccountData;
                }
            },
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'userAccount'
        }
);

module.exports = UserAccount;