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
  Category.init({
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.SMALLINT.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING(40),
      },   
    },
    {
      sequelize,
      modelName: 'Category',
      timestamps: false,
    }
  );
  return Category;
};
