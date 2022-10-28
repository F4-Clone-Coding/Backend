const { Order } = require("../models");

class OrderRepository {

findOrder = async ({ userId, storeId }) => {
    const findOneOrder = await Order.findOne({ where: { userId, storeId } });
    return findOneOrder;
  };

  createOrder = async ({ userId, storeId }) => {
    const createOrder = await Order.create({ userId, storeId });
    return createOrder;
  };

}

module.exports = OrderRepository;