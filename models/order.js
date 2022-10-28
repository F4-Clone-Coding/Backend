'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        // targetKey: 'userId',
      });
      this.belongsTo(models.Store, {
        foreignKey: "storeId",
        // targetKey: 'storeId',
      });
    }
  }
  Order.init({
    orderId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
      onDelete: "cascade",
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Store",
        key: "storeId",
      },
      onDelete: "cascade",
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};