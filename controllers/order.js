const OrderService = require("../services/order");

class OrderController {
  orderService = new OrderService();

  //주문생성
  createOrder = async (req, res, next) => {
    try {
      //const { userId } = res.locals.user;
      //const { order } = req.body.order;
      const {storeId} = req.params;
      let userId = 1;
      
      let order = { 메뉴:"도쿄롤",  price: 65000, 장소:"종로3가" };

      const createOrderData = await this.orderService.createOrder(
        userId,
        storeId,
        order
      );

      console.log(createOrderData)
      const { orderId } = createOrderData;

      res.json({ data: orderId });
    } catch (error) {
      //next(error);
      console.trace(error)
      return res.status(400).json("임시로 쓴 에러");
    }
  };
}

module.exports = OrderController;
