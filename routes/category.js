const { Router } = require('express');
const router = Router();
const { CategoryController } = require("../controllers");
const authMiddleware = require('../middlewares/authMiddleware');


// 전체 리스트 요청
router.get("/", authMiddleware, CategoryController.findAllCategories);

//카테고리에 해당하는 매장 조회
router.get("/:categoryId", authMiddleware, CategoryController.findOneCategory);


module.exports = router;