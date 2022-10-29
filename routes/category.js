const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const CategoryController = require("../controllers/category")
const categorycontroller = new CategoryController()
// 전체 리스트 요청
router.get("/",categorycontroller.findAllCategories)

//카테고리에 해당하는 매장 조회
router.get("/:categoryId",categorycontroller.findOneCategory)

module.exports = router;