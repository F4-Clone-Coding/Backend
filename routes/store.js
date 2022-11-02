const { Router } = require('express');
const authMiddleware = require("../middlewares/authMiddleware")
const { OrderController, StoreController, ReviewController } = require('../controllers');

const router = Router();


//매장상세페이지
router.get('/:storeId', authMiddleware, StoreController.DetailStore)

//매장상세페이지에서 주문요청
router.post("/:storeId", authMiddleware, OrderController.createOrder);

router.post("/:storeId/review", authMiddleware, ReviewController.createReview);

router.delete("/:storeId/:reviewId", authMiddleware, ReviewController.deleteReview)

router.get('/:storeId/like', authMiddleware, StoreController.toggleLike)


module.exports = router;