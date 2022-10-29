'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT.UNSIGNED,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING(40),
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
    await queryInterface.dropTable('Users');
  },
};

