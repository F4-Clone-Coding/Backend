const { Router } = require('express');

const userRouter = require("./user")
const storeRouter = require("./store")
const orderRouter = require("./order")
const categoryRouter = require("./category")


const router = Router();

router.use("/", categoryRouter);
router.use("/user", userRouter);
router.use("/store", storeRouter);
router.use("/order", orderRouter);


module.exports = router;