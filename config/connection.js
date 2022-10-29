const { Sequelize } = require('sequelize');
const env = require('../config.env');


const sequelize = new Sequelize({
    host: env.DB_HOST,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    dialect: 'mysql',
    port: 3306
});


module.exports = sequelize;