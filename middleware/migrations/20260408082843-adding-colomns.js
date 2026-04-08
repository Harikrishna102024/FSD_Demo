'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const table = await queryInterface.describeTable('users');

    if(!table.createdAt) {
      await queryInterface.addColumn('users', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    if(!table.updatedAt) {
      await queryInterface.addColumn('users', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'createdAt')
    await queryInterface.removeColumn('users', 'updatedAt')

  }
};
