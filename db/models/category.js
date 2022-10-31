'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Store, {
        foreignKey: 'categoryId',
        sourceKey: 'categoryId',
      });
    }
  }
  Category.init(
    {


      
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
