'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      provider: {
        type: Sequelize.STRING(40),
        defaultValue: 'local'
      },
      createdAt: {
        type: Sequelize.STRING,
        defaultValue: new Date().toLocaleDateString(),
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};

