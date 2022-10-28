const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")

//매장상세페이지
router.get('/:storeId', authMiddleware)

//매장상세페이지에서 주문요청
router.post("/:storeId", authMiddleware );


module.exports = router;