'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.MEDIUMINT.UNSIGNED,
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.SMALLINT.UNSIGNED,
        references: {
          model: 'Categories',
          key: 'categoryId',
        },
        onDelete: 'cascade',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      contact: {
        allowNull: false,
        type: Sequelize.STRING(40),
        defaultValue: '112',
      },
      openHour: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      X: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      Y: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      viewTotal : {
        allowNull: false,
        type: Sequelize.SMALLINT.UNSIGNED,
        defaultValue: 0,
      },
      viewRecent : {
        allowNull: false,
        type: Sequelize.SMALLINT.UNSIGNED,
        defaultValue: 0,
      },
      score : {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: new Date().toLocaleDateString(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  },
};
