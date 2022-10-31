'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      this.belongsTo(models.Store, {
        foreignKey: 'storeId',
      });
      this.belongsTo(models.MenuCategory, { 
        foreignKey: 'menuCategoryId' 
      });
    }
  }
  Menu.init(
    {


  
    },
    {
      sequelize,
      modelName: 'Menu',
    }
  );
  return Menu;
};
