const env = require('../../config.env')

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};