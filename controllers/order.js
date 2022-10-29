const { OrderService } = require("../services");

class OrderController {
  /**
   * 주문내역 조회 (GET 'oder/:orderId')
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  findOneOrder = async (req, res, next) => {
    try{
      const { orderId } = req.params;
      const foundOrder = await OrderService.findOneOrder(orderId)
      res.json({ data: foundOrder });
    }catch(error){
      console.trace(error);
      return res.status(400).json("임시로 쓴 에러");
    }
  }


  //주문 한개 내역 조회 //사용하지 않고 있습니다.
  findOrderRecordsById = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const foundOrder = await OrderService.findOrderRecordsById(orderId);
      res.json({ data: foundOrder });
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
      //const { userId } = res.locals.user;
      //const { order } = req.body.order;
      const { storeId } = req.params;
      let userId = 1;

      let order = [
        {
          menuId: 1,
          count: 3,
          price: 18000,
        },
        {
          menuId: 2,
          count: 2,
          price: 7000,
        },
        {
          menuId: 3,
          count: 2,
          price: 7000,
        },
        { sum: 82000 },
      ];

      const createOrderData = await OrderService.createOrder(
        userId,
        storeId,
        order
      );


      const { orderId } = createOrderData;

      res.json({ data: orderId });
    } catch (error) {
      //next(error);
      console.trace(error);
      
      return res.status(400).json("임시로 쓴 에러");
    }
  };
}

module.exports = new OrderController();
