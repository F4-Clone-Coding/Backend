'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {


      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  },
};

