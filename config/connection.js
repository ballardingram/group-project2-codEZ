const Sequelize = require('sequelize');
require('dotenv').config();

// CREATE > CONNECT TO DATABASE, PASS MYSQL INFORMATION FOR USERNAME

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
        host: 'localhost',
        dialect: 'mysql',
        storage: "./session.mysql",
    }
);
module.exports = sequelize;