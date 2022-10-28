const OrderService = require("../services/order");

class OrderController {
  orderService = new OrderService();

  //주문생성
  createOrder = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { order } = req.body.order;
      const createOrderData = await this.orderService.createOrder(
        userId,
        storeId,
        order
      );
      const { orderId } = createOrderData;
      return { data: orderId };
    } catch (error) {
      //next(error);
      return res.status(400).json("임시로 쓴 에러");
    }
  };
}

module.exports = OrderController;
