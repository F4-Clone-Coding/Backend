const { OrderService, StoreService } = require("../services");

class OrderController {
  /**
   * 주문내역 조회 (GET 'oder/:orderId')
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  findOneOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await OrderService.findOne(orderId);

      res.json({ order });
    } catch (error) {
      console.trace(error);
      return res.status(400).json("임시로 쓴 에러");
    }
  };

  //주문 한개 내역 조회 //사용하지 않고 있습니다.
  findOrderRecordsById = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await OrderService.findOrderRecordsById(orderId);

      res.json({ order });
    } catch (error) {
      console.trace(error);
      return res.status(400).json("임시로 쓴 에러");
    }
  };

  /**
   * 주문생성 (POST 'store/:storeId')
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  createOrder = async (req, res, next) => {
    try {
      const { userId } = req.app.locals.user;
      const { order } = req.body;
      const { storeId } = req.params;

      const createOrderData = await OrderService.createOrder(
        userId,
        storeId,
        order
      );
      await StoreService.updateScore(storeId);

      const { orderId } = createOrderData;

      res.json({ orderId });
    } catch (error) {
      //next(error);
      console.trace(error);

      return res.status(400).json("임시로 쓴 에러");
    }
  };
}

module.exports = new OrderController();
