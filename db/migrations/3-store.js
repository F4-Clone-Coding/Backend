'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED,
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
      contact: {
        allowNull: false,
        type: Sequelize.STRING(40),
        defaultValue: '112',
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
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
        type: Sequelize.SMALLINT.UNSIGNED,
        defaultValue: 0,
      },
      openHrInfo: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  },
};
