'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuCategory extends Model {
    static associate(models) {
      this.hasOne(models.Menu, {
        foreignKey: 'menuCategoryId',
      });
    }
  }
  MenuCategory.init(
    {

      
    },
    {
      sequelize,
      modelName: 'MenuCategory',
    }
  );
  return MenuCategory;
};
