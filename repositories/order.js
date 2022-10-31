const { Order, Store, Menu } = require("../db/models");

class OrderRepository {
      /**
   * 주문내역 조회 (GET 'oder/:orderId')
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  findOneOrder = async ( orderId ) => {
    const foundOneOrder = await Order.findOne({ 
      where: { orderId },
      attributes: {exclude: ["userId", "storeId"]}, 
      //orderId, records, createdAt만 전달

      include : [{
        model : Store,
        key: 'storeId',
        attributes: ['storeId', 'name', 'storePhone' ]
      }]  
    });
    return foundOneOrder;
  };

  //주문내역 조회 (GET 'oder/:orderId')에 포함
  findOneMenu = async (menuId) => {
    const foundOneMenu = await Menu.findOne({
      where: { menuId },
      attributes: {exclude: ["storeId", "menuCategoryId", "createdAt", "updatedAt"]}
      //menuId, name, price, image 전달
    
    })
    return foundOneMenu;
  }

      /**
   * 주문생성 (POST 'store/:storeId')
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  createOrder = async ( userId, storeId, records ) => {
    console.log(userId, storeId, records)
    const createOrderData = await Order.create({ userId, storeId, records });
    return createOrderData;
  };

  //주문 한개 내역 조회 // 사용하지 않고 있습니다.
  findOrderById = async (orderId) => {
    const foundOrder = await Order.findByPk(orderId)
    return foundOrder
  }

}

module.exports = new OrderRepository();