'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {


      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  },
};
