const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('./config.env');

const indexRouter = require('./routes/index');

const app = express();
const PORT = env.PORT || 3333;



// middlewares
app.use(logger('dev'));

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);




app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});