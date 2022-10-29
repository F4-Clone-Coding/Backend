const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")

const { StoreController } = require("../controllers")

//매장상세페이지
router.get('/:storeId', StoreController.DetailStore)

//매장상세페이지에서 주문요청
router.post("/:storeId",);


module.exports = router;