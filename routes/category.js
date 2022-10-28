const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")

//전체 리스트 요청
router.get("/", authMiddleware );

//카테고리의 매장 리스트
router.get("/:categoryId", authMiddleware)

module.exports = router;