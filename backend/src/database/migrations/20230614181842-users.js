'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profilePhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
       },
      password: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      tokenAuth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expiredToken: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completedStep: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isValid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
