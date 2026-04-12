'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const table = await queryInterface.describeTable('users');

    if(!table.profiles) {
      await queryInterface.addColumn('users', 'profiles', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'profiles');
  }
};
