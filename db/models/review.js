'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'userId',
          });
          this.belongsTo(models.Store, {
            foreignKey: 'storeId',
          });
    }
  }
  Review.init({
      reviewId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.SMALLINT.UNSIGNED,
      },
      userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
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
      review: {
        type: DataTypes.STRING(255),
      },   
    },
    {
      sequelize,
      modelName: 'Review',
      timestamps: false,
    }
  );
  return Review;
};
