const { Router } = require('express');

const dbRouter = require('./db');
const userRouter = require('./user');
const storeRouter = require('./store');
const orderRouter = require('./order');
const imagesRouter = require('./image');
const categoryRouter = require('./category');

const router = Router();

router.use('/db', dbRouter);
router.use('/', categoryRouter);
router.use('/user', userRouter);
router.use('/store', storeRouter);
router.use('/order', orderRouter);
router.use('/upload', imagesRouter);

module.exports = router;
