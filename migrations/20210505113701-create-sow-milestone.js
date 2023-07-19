'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SowMilestones', {
      Sow_Key: Sequelize.INTEGER,
      NameFile: Sequelize.STRING,
      NameCustomer: Sequelize.STRING,
      NameSupplier: Sequelize.STRING,
      NumberSOW: Sequelize.STRING,
      milRoleIdentifierMilestone: Sequelize.STRING,
      milEmpName: Sequelize.STRING,
      milEmpTitle: Sequelize.STRING,
      milDescription:  Sequelize.TEXT,
      milQty: Sequelize.STRING,
      milUom: Sequelize.STRING,
      milAvailability: Sequelize.STRING,
      milLocation: Sequelize.STRING,
      milLineAmount:  Sequelize.DECIMAL,
      milTotalAmount:  Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SowMilestones');
  }
};