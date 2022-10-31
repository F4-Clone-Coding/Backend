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
    }
  }
  Store.init(
    {
<<<<<<< HEAD
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
      contact: {
        allowNull: false,
        type: DataTypes.STRING(40),
        defaultValue: '112',
      },
      imageUrl: {
        allowNull: true,
        type: DataTypes.STRING(255),
        // defaultValue
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
<<<<<<< HEAD
      location : {
        allowNull: true,
        type : DataTypes.STRING(255),
      },
      openHour: {
=======
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
        type: DataTypes.SMALLINT.UNSIGNED,
        defaultValue: 0,
      openHrInfo: {
        allowNull: true,
>>>>>>> 375bcf83b66ec7db724aabface77cc6f0a59cf24
        type: DataTypes.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
<<<<<<< HEAD
=======
      location: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
>>>>>>> 375bcf83b66ec7db724aabface77cc6f0a59cf24
=======


      
>>>>>>> ec202c5852c2a76fc3be8a7061dd14b83107df50
    },
    {
      sequelize,
      modelName: 'Store',
    }
  );
  return Store;
};
