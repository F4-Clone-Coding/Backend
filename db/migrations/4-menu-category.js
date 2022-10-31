'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MenuCategories', {
      menuCategoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(40),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuCategories');
  },
};
