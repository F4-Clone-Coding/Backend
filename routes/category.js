const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")

//전체 리스트 요청
router.get("/");

//카테고리의 매장 리스트
router.get("/:categoryId")

module.exports = router;