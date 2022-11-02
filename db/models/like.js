'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
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
  Like.init(
    {
      userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      storeId: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'cascade',
      }
    },
    {
      sequelize,
      modelName: 'Like',
      timestamps: false
    }
  );
  return Like;
};