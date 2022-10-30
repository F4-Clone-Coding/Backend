const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { OrderController } = require('../controllers');
const { StoreController } = require("../controllers")

//매장상세페이지
router.get('/:storeId', StoreController.DetailStore)

//매장상세페이지에서 주문요청
router.post("/:storeId",authMiddleware, OrderController.createOrder);


module.exports = router;