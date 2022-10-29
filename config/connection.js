const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = require('../config.env');


const sequelize = new Sequelize({
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: 'mysql',
    port: 3306
});


module.exports = sequelize;