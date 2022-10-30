const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { OrderController } = require('../controllers');

//주문내역 페이지
router.get("/:orderId", authMiddleware, OrderController.findOneOrder);


module.exports = router;