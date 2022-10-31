'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      
    }
  }

User.init({
 

  
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
