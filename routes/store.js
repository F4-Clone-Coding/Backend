const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")

//매장상세페이지
router.get('/:storeId')

//매장상세페이지에서 주문요청
router.post("/:storeId",);


module.exports = router;