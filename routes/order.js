const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")

//주문내역 페이지
router.get("/:orderId", authMiddleWare );

module.exports = router;