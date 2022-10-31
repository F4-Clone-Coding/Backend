'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      menuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.MEDIUMINT.UNSIGNED,
      },
      storeId: {
        allowNull: false,
        type: Sequelize.MEDIUMINT.UNSIGNED,
        references: {
          model: 'Stores',
          key: 'storeId',
        },
        onDelete: 'cascade',
      },
      menuCategoryId: {
        allowNull: false,
        type: Sequelize.SMALLINT.UNSIGNED,
        references: {
          model: 'MenuCategories',
          key: 'menuCategoryId',
        },
        onDelete: 'cascade',
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      price: {
        type: Sequelize.MEDIUMINT.UNSIGNED,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  },
};
