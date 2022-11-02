const { OrderRepo, MenuRepo } = require("../repositories");
const { InvalidParamsError } = require("../utils/exception");

class OrderService {
  //GET order/:orderId
  findOne = async (orderId) => {
    const order = await OrderRepo.findOneOrder(orderId);
    const records = order.get().records;

    if(!records[0].menuId) throw new InvalidParamsError('주문내역이 없습니다.')

    const menus = [];
    for (let i=0; i<records.length-1; i++) {
      const result = await MenuRepo.findOne(records[i].menuId);
      const menu = {
        ...records[i],
        ...result.get(),
        MenuCategory: result.get().MenuCategory.name
      }
      menus.push( menu );
    }

    return {
      orderId: order.orderId,
      ...order.Store.get(),
      menus,
      menusCount: menus.length,
      sum: records[records.length-1].totalPrice,
      createdAt: order.createdAt,
    }
  };


 //주문생성 POST store/:storeId
  createOrder = async (userId, storeId, order) => {
    const records = order.menus;
    if (!records[0].menuId)
      throw new InvalidParamsError("주문한 메뉴가 없습니다.");

    const sum = order.sum;
    if (!sum)
      throw new InvalidParamsError("0원 짜리를 살 수는 없는 거 아닐까요?");

    records.push({ totalPrice: sum });
    const createOrderData = await OrderRepo.createOrder(
      userId,
      storeId,
      records
    );

    return createOrderData;
  };
}



module.exports = new OrderService();
