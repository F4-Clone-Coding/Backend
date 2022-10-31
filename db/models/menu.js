'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      this.belongsTo(models.Store, {
        foreignKey: 'storeId',
      });
      this.belongsTo(models.MenuCategory, {
        foreignKey: 'menuCategoryId',
      });
    }
  }
  Menu.init(
    {
      menuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.MEDIUMINT.UNSIGNED,
      },
      storeId: {
        allowNull: false,
        type: DataTypes.MEDIUMINT.UNSIGNED,
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'cascade',
      },
      menuCategoryId: {
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        references: {
          model: 'MenuCategories',
          key: 'menuCategoryId',
        },
        onDelete: 'cascade',
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      price: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Menu',
      timestamps : false,
    }
  );
  return Menu;
};
