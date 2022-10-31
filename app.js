const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./db/config/connection');
const env = require('./config.env');
const fs = require('fs');
const HTTPS = require('https');
const indexRouter = require('./routes/index');
const { errorLogger, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = env.PORT || 3333;
const DOMAIN = env.DOMAIN;

// middlewares
app.use(logger('dev'));
app.use(express.json(), cookieParser());
app.use('/', indexRouter);
app.use(errorLogger, errorHandler);

if (env.MODE == 'development') {
    try {
        const option = {
            ca: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/fullchain.pem`),
            key: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/privkey.pem`),
            cert: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/cert.pem`),
        };

        HTTPS.createServer(option, app).listen(PORT, async () => {
            console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + PORT);
            // console.log(env);

            try {
                await sequelize.authenticate();
                console.log('DB CONNECTED');
            }
            catch (error) {
                console.error(error);
                console.log('DB CONNECTION FAILED');
            }
        });
    } catch (error) {
        console.log('HTTPS 서버가 실행되지 않습니다.');
        console.log(error);
    }
}

