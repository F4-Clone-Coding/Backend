'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class MenuCategory extends Model {
    static associate(models) {
      this.hasMany(models.Menu, {
        foreignKey: 'menuCategoryId',
      });
    }
  }
  MenuCategory.init(
    {
      menuCategoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.SMALLINT.UNSIGNED,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(40),
      },
    },
    {
      sequelize,
      modelName: 'MenuCategory',
      timestamps: false,
    }
  );
  return MenuCategory;
};
