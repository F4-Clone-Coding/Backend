const { Router } = require('express');
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { OrderController } = require('../controllers');

//주문내역 페이지
router.get("/:orderId", authMiddleware, OrderController.findOneOrder);


router.get('/one/:orderId', async(req, res)=>{
    const { Order, Store } = require('../db/models');
    const { orderId } = req.params;

    const result =  await Order.findOne({
            where: { orderId },
            attributes: {exclude: ["userId", "storeId"]},
  //orderId, records, createdAt만 전달

            include : [{
                    model : Store,
                    key: 'storeId',
                    attributes: ['storeId', 'name', 'contact' ]
            }]
    })

    res.json({ order: result });

});



module.exports = router;