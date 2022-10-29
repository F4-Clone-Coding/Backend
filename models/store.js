'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        targetKey: 'categoryId',
      });
      this.hasMany(models.Menu,{
        sourceKey: 'storeId',
        foreignKey : 'storeId',
      })
    }
  }
  Store.init(
    {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.SMALLINT.UNSIGNED,
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        references: {
          model: 'Category',
          key: 'categoryId',
        },
        onDelete: 'cascade',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(40),
      },
      storePhone: {
        allowNull: false,
        type: DataTypes.STRING(40),
        defaultValue: '112',
      },
      imageUrl: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Store',
    }
  );
  return Store;
};
