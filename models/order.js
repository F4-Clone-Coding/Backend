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
<<<<<<< HEAD
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
=======
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
        model: "Users",
        key: "userId",
      },
      onDelete: "cascade",
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Stores",
        key: "storeId",
>>>>>>> 0c8a175 (order 모델 마이그레이트)
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
