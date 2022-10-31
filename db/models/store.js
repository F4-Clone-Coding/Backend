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


      
    },
    {
      sequelize,
      modelName: 'Store',
    }
  );
  return Store;
};
