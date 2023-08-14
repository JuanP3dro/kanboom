'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      responsible: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        }
      },
      history_points: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hours: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      column_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "columns",
          key: "id",
          onDelete: 'CASCADE'
        }
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};