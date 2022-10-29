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
      storePhone: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  },
};
