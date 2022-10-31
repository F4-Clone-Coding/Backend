'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
      });
      this.belongsTo(models.Store, {
        foreignKey: 'storeId',
        targetKey: 'storeId',
      });
    }
  }
  Order.init(
    {

      
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};