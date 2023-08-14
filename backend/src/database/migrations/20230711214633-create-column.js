'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('columns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      board_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "boards",
          key: "id",
          onDelete: 'CASCADE'
        }
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('columns');
  }
};