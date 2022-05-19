const Sequelize = require('sequelize');
require('dotenv').config();

// CREATE > CONNECT TO DATABASE, PASS MYSQL INFORMATION FOR USERNAME
const JWSDB_URL = process.env.JAWSDB_URL;
const sequelize = JWSDB_URL? 
                JWSDB_URL: new Sequelize(
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