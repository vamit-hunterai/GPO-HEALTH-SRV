'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SowPricings', {
      Sow_Key: Sequelize.INTEGER,
      NameFile: Sequelize.STRING,
      NameCustomer: Sequelize.STRING,
      NameSupplier: Sequelize.STRING,
      NumberSOW: Sequelize.STRING,
      prcRoleIdentifierMilestone: Sequelize.STRING,
      prcEmpName: Sequelize.STRING,
      prcEmpTitle: Sequelize.STRING,
      prcDescription: Sequelize.TEXT,
      prcQty: Sequelize.STRING,
      prcRate: Sequelize.DECIMAL,
      prcUom: Sequelize.STRING,
      prcDuration: Sequelize.STRING,
      prcAvailability: Sequelize.STRING,
      prcLocation: Sequelize.STRING,
      prcLineAmount: Sequelize.STRING,
      prcYear: Sequelize.STRING,
      prcMonth: Sequelize.STRING,
      prcTotalAmount: Sequelize.DECIMAL,
      prcDurationInHours: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SowPricings');
  }
};