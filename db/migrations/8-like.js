'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      userId: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      storeId: {
        type: Sequelize.MEDIUMINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'cascade',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  },
};
