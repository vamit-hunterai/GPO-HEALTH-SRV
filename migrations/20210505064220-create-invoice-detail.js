'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvoiceDetails', {
      Invoice_Key: {
        type: Sequelize.INTEGER
      }    
      ,NameFile: Sequelize.STRING,
      NameCustomer: Sequelize.STRING,
      NameSupplier : Sequelize.STRING, 
      NumberInvoice: Sequelize.STRING,
      DateInvoice: Sequelize.DATE,
      invpricRoleIdentifierMilestone: Sequelize.STRING,
      invpricEmpName: Sequelize.STRING,
      invpricEmpTitle: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('InvoiceDetails');
  }
};