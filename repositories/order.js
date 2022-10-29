const { Order } = require("../models");

class OrderRepository {

  findOrder = async ( userId, storeId ) => {
    const findOneOrder = await Order.findOne({ where: { userId, storeId } });
    return findOneOrder;
  };

  createOrder = async ( userId, storeId, records ) => {
    console.log(userId, storeId, records)
    const createOrderData = await Order.create({ userId, storeId, records });
    return createOrderData;
  };

  findOrderById = async (orderId) => {
    const foundOrder = await Order.findByPk(orderId)
    return foundOrder
  }

}

module.exports = OrderRepository;