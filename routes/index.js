const { Router } = require('express');
const router = Router();

const userRouter = require("./user")
const storeRouter = require("./store")
const orderRouter = require("./order")
const categoryRouter = require("./category")

// router.get('/', (req, res, next)=>{
//     res.json({
//         message: 'INDEX'
//     });
// });

router.use("/", categoryRouter);
router.use("/user", userRouter);
router.use("/store", storeRouter);
router.use("/order", orderRouter);

module.exports = router;