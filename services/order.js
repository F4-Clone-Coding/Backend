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


 //주문내역조회 사용하지 않고 있습니다. 
  findOneOrder = async (orderId) => {
    const foundOrder = await OrderRepo.findOneOrder(orderId);
    const { records } = foundOrder;
    const { totalPrice } = records[records.length - 1];

    if (!foundOrder || !records || !totalPrice || !records[0].menuId)
      throw new InvalidParamsError("주문한 내역이 없습니다.");

    const sum = totalPrice;
    const menuList = [];

    const promises = records.map(async (record) => {
      let menuId = record.menuId;
      let count = record.count;

      if (menuId && count) {
        let menu = await OrderRepo.findOneMenu(menuId);
        let Menu = {
          menuId: menu.menuId,
          name: menu.name,
          price: menu.price,
          count,
          image: menu.image,
        };
        return menuList.push(Menu);
      }
    });

    await Promise.all(promises);

    const data = {
      orderId: foundOrder.orderId,
      orderDate: foundOrder.createdAt,
      storeId: foundOrder.Store.storeId,
      storeName: foundOrder.Store.name,
      storePhone: foundOrder.Store.contact,
      menuList,
      sum,
    };
    return data;
  };

  //주문 한개 내역 조회 //사용하지 않고 있습니다.
  findOrderRecordsById = async (orderId) => {
    const foundOrder = await OrderRepo.findOrderById(orderId);

    const result = foundOrder.get().records;

    const data = JSON.parse(result);

    return data;
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
