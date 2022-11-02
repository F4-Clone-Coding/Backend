const { OrderService, StoreService } = require("../services");
const { InvalidParamsError } = require("../utils/exception");


class OrderController {

//주문내역 조회 (GET 'oder/:orderId')
  findOneOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      if(!orderId) throw new InvalidParamsError('입력값이 없습니다.')

      const order = await OrderService.findOne(orderId);
      res.json({ order });

    } catch (error) {
      next(error);
    }
  };

  //주문 한개 내역 조회 //사용하지 않고 있습니다.
  findOrderRecordsById = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await OrderService.findOrderRecordsById(orderId);

      res.json({ order });
    } catch (error) {
      next(error);
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

      if(!userId || !order || !storeId) throw new InvalidParamsError("입력값이 없습니다.");

      const createOrderData = await OrderService.createOrder(
        userId,
        storeId,
        order
      );
      await StoreService.updateScore(storeId);

      const { orderId } = createOrderData;

      res.json({ orderId });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new OrderController();
