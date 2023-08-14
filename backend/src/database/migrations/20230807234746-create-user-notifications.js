'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      notification_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "notifications",
          key: "id"
        }

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_notifications');
  }
};