const OrderRepository = require('../repositories/order');

class OrderService {
  orderRepository = new OrderRepository();

  //주문생성
  createOrder = async (userId, storeId, order) => {

    const records = JSON.stringify(order)
    console.log(records)

    const createOrderData = await this.orderRepository.createOrder(userId, storeId, records);

    return createOrderData;
  };

}

module.exports = OrderService;