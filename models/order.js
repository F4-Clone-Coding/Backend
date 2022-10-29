'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        // targetKey: 'userId',
      });
      this.belongsTo(models.Store, {
        foreignKey: 'storeId',
        // targetKey: 'storeId',
      });
    }
  }
  Order.init(
    {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.SMALLINT.UNSIGNED,
      },
      userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      storeId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'cascade',
      },
      records: {
        type: DataTypes.JSON, 
        allowNull : false,      
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};