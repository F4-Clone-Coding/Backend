const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const CategoryController = require("../controllers/category")
const categorycontroller = new CategoryController()
// 전체 리스트 요청
router.get("/",)

//카테고리의 매장 리스트
router.get("/:categoryId")

module.exports = router;