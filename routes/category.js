const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { CategoryController } = require("../controllers")

// 전체 리스트 요청
router.get("/", CategoryController.findAllCategories)

//카테고리에 해당하는 매장 조회
router.get("/:categoryId", CategoryController.findOneCategory)


module.exports = router;