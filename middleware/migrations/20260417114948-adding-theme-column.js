'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');

    if (!table.theme) {
      await queryInterface.addColumn('users', 'theme', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'bright',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');
    if (table.theme) {
      await queryInterface.removeColumn('users', 'theme');
    }
  }
};
