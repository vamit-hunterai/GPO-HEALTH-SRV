'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SowDeliverables', {
      Sow_Key: Sequelize.INTEGER,
      NameFile: Sequelize.STRING,
      NameCustomer : Sequelize.STRING,
      NameSupplier : Sequelize.STRING,
      NumberSOW : Sequelize.STRING,
      delDeliverable : Sequelize.TEXT,
      delDescription : Sequelize.TEXT,
      delStartDate : Sequelize.STRING,
      delEndDate : Sequelize.STRING,
      delEta : Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SowDeliverables');
  }
};