'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {


      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  },
};
