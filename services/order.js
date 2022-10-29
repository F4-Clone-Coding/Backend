const OrderRepository = require('../repositories/order');

class OrderService {
  orderRepository = new OrderRepository();

  findOrderRecordsById = async(orderId) => {
    const foundOrder = await this.orderRepository.findOrderById(orderId);
    
    const result = foundOrder.get().records
    console.log(JSON.parse(result))

    const data = JSON.parse(result)

    return data
  }


  //주문생성
  createOrder = async (userId, storeId, order) => {

    const records = JSON.stringify(order)
    console.log(records)

    const createOrderData = await this.orderRepository.createOrder(userId, storeId, records);

    return createOrderData;
  };

}

module.exports = OrderService;