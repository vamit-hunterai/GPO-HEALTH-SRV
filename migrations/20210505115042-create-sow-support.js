'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SowSupports', {
      Sow_Key: DataTypes.INTEGER,
      NameFile: DataTypes.STRING,
      NameCustomer: DataTypes.STRING,
      NameSupplier: DataTypes.STRING,
      NumberSOW: DataTypes.STRING,
      supRoleIdentifierMilestone: DataTypes.STRING,
      supEmpName: DataTypes.STRING,
      supEmpTitle: DataTypes.STRING,
      supDescription: DataTypes.TEXT,
      supQty: DataTypes.STRING,
      supDuration: DataTypes.STRING,
      supAvailability: DataTypes.STRING,
      supLocation: DataTypes.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SowSupports');
  }
};