const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


class Env {
    constructor() {
        this.PORT = process.env.PORT

        this.DB_HOST = process.env.DB_HOST;
        this.DB_NAME = process.env.DB_NAME;
        this.DB_USER = process.env.DB_USER;
        this.DB_PASSWORD = process.env.DB_PASSWORD;

        this.JWT_KEY = process.env.JWT_KEY;
        this.SALT_ROUND = number(process.env.SALT_ROUND);
        this.SESSION_KEY = process.env.SESSION_KEY;

        this.ROOT = __dirname;
    }
}


module.exports = new Env();