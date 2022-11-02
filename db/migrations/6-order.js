'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED
      },
      userId: {
        allowNull: false,
        type: Sequelize.SMALLINT.UNSIGNED,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      storeId: {
        allowNull: false,
        type: Sequelize.MEDIUMINT.UNSIGNED,
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'cascade',
      },
      records: {
        allowNull: false,
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: new Date().toLocaleDateString()
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
