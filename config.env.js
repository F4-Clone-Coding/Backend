const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


class dbConnection {
    constructor() {
        this.setEnv();
    }

    setEnv() {
        this.MODE = ( process.env.NODE_ENV ) ?
            ( process.env.NODE_ENV ).trim().toLowerCase() : 'development';

        switch (this.MODE) {
            case 'development':
                this.DB_HOST = process.env.DB_HOST;
                this.DB_NAME = process.env.DB_NAME;
                this.DB_USER = process.env.DB_USER;
                this.DB_PASSWORD = process.env.DB_PASSWORD;
                break;
            case 'production':
                this.DB_HOST = process.env.PRD_HOST;
                this.DB_NAME = process.env.PRD_NAME;
                this.DB_USER = process.env.PRD_USER;
                this.DB_PASSWORD = process.env.PRD_PASSWORD;
                break;
        }
    }
}


class Env extends dbConnection {
    constructor() {
        super();

        this.PORT = process.env.PORT;
        this.DOMAIN = process.env.DOMAIN;

        this.JWT_KEY = process.env.JWT_KEY;
        this.SALT_ROUND = Number(process.env.SALT_ROUND);
        this.SESSION_KEY = process.env.SESSION_KEY;

        this.REDIS_HOST = process.env.REDIS_HOST;
        this.REDIS_PORT = process.env.REDIS_PORT;
        this.REDIS_PW = process.env.REDIS_PW;
        this.REDIS_USERNAME = process.env.REDIS_USERNAME;

        this.ROOT = __dirname;
    }
}


module.exports = new Env();