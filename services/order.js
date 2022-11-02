const { OrderRepo, MenuRepo } = require("../repositories");


class OrderService {

  findOne = async (orderId) => {
    const order = await OrderRepo.findOneOrder(orderId);
    const records = order.get().records;

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

  /**
   * 주문생성 (POST 'store/:storeId')
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  createOrder = async (userId, storeId, order) => {
    // const ordered = JSON.stringify(order);
    const records = order.menus;
    const sum = order.sum;
    records.push({'totalPrice': sum});
    const createOrderData = await OrderRepo.createOrder(
      userId,
      storeId,
      records
    );
    console.log(createOrderData.get());
    return createOrderData;
  };


  /**
   * 주문내역 조회 (GET 'oder/:orderId')
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
   findOneOrder = async (orderId) => {
    const foundOrder = await OrderRepo.findOneOrder(orderId);

    const { records } = foundOrder;
    const { totalPrice } = records[records.length -1]
    const sum = totalPrice

    const menuList = [];

    const promises = records.map(async(record) => {
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
}

module.exports = new OrderService();