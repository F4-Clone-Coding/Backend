'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {


      
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};

