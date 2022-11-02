const { Order, Store, Menu } = require("../db/models");
const { Op } = require('sequelize')
const date = require('../utils/listing/date');

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
        attributes: ['storeId', 'name', 'contact' ]
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
    return await Order.create({ userId, storeId, records });
  };

  //주문 한개 내역 조회 // 사용하지 않고 있습니다.
  findOrderById = async (orderId) => {
    return await Order.findByPk(orderId)
  }

  findOrderByUserId = async (userId) =>{
    return await Order.findAll({
      where : {userId},
      order: [['createdAt', 'DESC']],
      attributes : ['orderId', 'records', 'createdAt'],
      include : [{
        model : Store,
        key: 'storeId',
        attributes: ['storeId', 'name', 'contact' ]
      }] 
    })
  }

  orderTotalCount = async function(storeId) {
    return await Order.count({
      where: { storeId }
    })
  }

  orderRecentCount = async function(storeId) {
    const lastSevenDays = date.lastSevenDays();
    return await Order.count({
      where: { 
        storeId,
        createdAt: {
          [Op.gt]: lastSevenDays
        }
      },
    })
  }

  // findOrderByStore = async function(storeId) {
  //   return await Order.findOne({
  //     where: { storeId },
  //     include: {
  //       model: Store,
  //     }
  //   });
  // }

}

module.exports = new OrderRepository();