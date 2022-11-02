const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const HTTPS = require('https');

const { resetview } = require('./utils/resetview');
const env = require('./config.env');
const { sessionInfo } = require('./utils/session');
const sequelize = require('./db/config/connection');
const indexRouter = require('./routes/index');
const { errorLogger, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = env.PORT || 3333;
const DOMAIN = env.DOMAIN;

// middlewares
app.use(logger('dev'));

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization, refreshToken, cache-control'
    });
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use(session(sessionInfo));

app.use('/', indexRouter);
app.use(errorLogger, errorHandler);
app.use(errorLogger);
app.use(errorHandler);

if (env.MODE == 'development') {
  try {
    const option = {
      ca: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/fullchain.pem`),
      key: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/cert.pem`),
    };

    HTTPS.createServer(option, app).listen(PORT, async () => {
      console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + PORT);
      console.log(env);
      resetview();

      try {
        await sequelize.authenticate();
        console.log('DB CONNECTED');
      } catch (error) {
        console.error(error);
        console.log('DB CONNECTION FAILED');
      }
    });
  } catch (error) {
    console.log(error);
    console.log('HTTPS 서버가 실행되지 않습니다.');
    app.listen(PORT, () => {
      resetview();
      console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + PORT);
    });
  }
}
