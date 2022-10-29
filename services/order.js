const OrderRepository = require("../repositories/order");

class OrderService {
  orderRepository = new OrderRepository();

  /**
   * 주문내역 조회 (GET 'oder/:orderId')
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  findOneOrder = async (orderId) => {
    const foundOrder = await this.orderRepository.findOneOrder(orderId);

    const { records } = foundOrder;
    const parsedRecords = JSON.parse(records);

    const menuList = [];

    const promises = parsedRecords.map(async (record) => {
      let menuId = record.menuId;
      let count = record.count;

      if (menuId && count) {
        let menu = await this.orderRepository.findOneMenu(menuId);
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
      storePhone: foundOrder.Store.storePhone,
      menuList,
    };
    console.log(data);

    return data;
  };

  //주문 한개 내역 조회 //사용하지 않고 있습니다.
  findOrderRecordsById = async (orderId) => {
    const foundOrder = await this.orderRepository.findOrderById(orderId);

    const result = foundOrder.get().records;
    console.log(JSON.parse(result));

    const data = JSON.parse(result);

    return data;
  };

  /**
   * 주문생성 (POST 'store/:storeId')
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  createOrder = async (userId, storeId, order) => {
    const records = JSON.stringify(order);

    const createOrderData = await this.orderRepository.createOrder(
      userId,
      storeId,
      records
    );

    return createOrderData;
  };
}

module.exports = OrderService;
