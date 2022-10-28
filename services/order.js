const OrderRepository = require('../repositories/order');

class OrderService {
  orderRepository = new OrderRepository();

  //주문생성
  createOrder = async (userId, storeId, order) => {
    
    const foundOrder = await this.orderRepository.findOrder(userId, storeId)

    const createOrderData = await this.orderRepository.createOrder(userId, storeId);

    return createOrderData;
  };

}

module.exports = OrderService;