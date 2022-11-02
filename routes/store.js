const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { OrderController } = require('../controllers');
const { StoreController } = require("../controllers");
const { ReviewController } = require("../controllers")

//매장상세페이지
router.get('/:storeId', StoreController.DetailStore)

//매장상세페이지에서 주문요청
router.post("/:storeId",authMiddleware, OrderController.createOrder);

router.put("/:storeId/review", authMiddleware, ReviewController.createReview);

router.delete("/:storeId/:reviewId", authMiddleware, ReviewController.deleteReview)


module.exports = router;