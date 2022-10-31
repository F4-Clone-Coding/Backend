'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED,
      },
      name: {
        type: Sequelize.STRING(40),
      },   
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  },
};
