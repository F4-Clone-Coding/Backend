'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MenuCategories', {


      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuCategories');
  },
};
