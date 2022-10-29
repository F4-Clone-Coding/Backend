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

}

module.exports = OrderRepository;