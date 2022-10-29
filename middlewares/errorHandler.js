const errorLogger = (error, req, res, next) => {
    console.error(error);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 400;
    res.status(statusCode);
    res.json({ 
        message: error.message 
    });
};

module.exports = { errorLogger, errorHandler };