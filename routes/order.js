const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")

//주문내역 페이지
router.get("/:orderId");

module.exports = router;