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

  User.init(
    {
      userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      provider: {
        type: DataTypes.STRING(40),
        defaultValue: 'local',
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
<<<<<<< HEAD
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    provider: {
      type: DataTypes.STRING(40),
      defaultValue: 'local'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
=======
    {
      sequelize,
      modelName: 'User',
    }
  );
>>>>>>> 375bcf83b66ec7db724aabface77cc6f0a59cf24

  return User;
};
