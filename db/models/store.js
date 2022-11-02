'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        targetKey: 'categoryId',
      });
      this.hasMany(models.Menu, {
        sourceKey: 'storeId',
        foreignKey: 'storeId',
      });
      this.hasMany(models.Review, {
        sourceKey: 'storeId',
        foreignKey: 'storeId'
      });
    }
  }
  Store.init(
    {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.MEDIUMINT.UNSIGNED,
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
      imageUrl: {
        allowNull: true,
        type: DataTypes.STRING(255),
        // defaultValue
      },
      contact: {
        allowNull: false,
        type: DataTypes.STRING(40),
        defaultValue: '112',
      },
      openHour: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      X: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      Y: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      viewTotal: {
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        defaultValue: 0,
      },
      viewRecent: {
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        defaultValue: 0,
      },
      score: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleDateString(),
      },
    },
    {
      sequelize,
      modelName: 'Store',
      updatedAt: false,
    }
  );
  return Store;
};
