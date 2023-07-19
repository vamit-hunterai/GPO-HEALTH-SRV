'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SowAssumptions', {
      Sow_Key: Sequelize.INTEGER,
      NameFile: Sequelize.INTEGER,
      NameCustomer: Sequelize.INTEGER,
      NameSupplier: Sequelize.INTEGER,
      NumberSOW: Sequelize.INTEGER,
      assumAssumption: Sequelize.TEXT,
      assumCategory: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SowAssumptions');
  }
};