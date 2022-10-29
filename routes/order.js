const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const OrderController = require('../controllers/order');
const orderController = new OrderController();

//주문내역 페이지
router.get("/:orderId", orderController.findOrderRecordsById);

module.exports = router;