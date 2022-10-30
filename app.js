const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./db/config/connection');
const env = require('./config.env');

const indexRouter = require('./routes/index');
const { errorLogger, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = env.PORT || 3333;

// middlewares
app.use(logger('dev'));

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.use(errorLogger);
app.use(errorHandler);


app.listen(PORT, async() => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);

    try {
        await sequelize.authenticate();

        console.log('DB CONNECTED');
    } catch (error) {
        console.error(error);
        console.log('DB CONNECTION FAILED');
    }
});
