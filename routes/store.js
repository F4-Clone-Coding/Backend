const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const OrderController = require('../controllers/order');
const orderController = new OrderController();

//매장상세페이지
router.get('/:storeId')

//매장상세페이지에서 주문요청
router.post("/:storeId", orderController.createOrder);


module.exports = router;