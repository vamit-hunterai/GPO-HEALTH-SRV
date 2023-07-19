'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvoiceMasters', {
      Invoice_Key: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Contingent_Service_Type: Sequelize.STRING,
      SOW_Key: Sequelize.INTEGER,
      NameFile: Sequelize.STRING,
      DocType: Sequelize.STRING,
      NameProject: Sequelize.STRING,
      NameCustomer: Sequelize.STRING,
      NameSupplier: Sequelize.STRING,
      AddressSupplier: Sequelize.TEXT,
      NumberInvoice: Sequelize.STRING,
      DateInvoice: Sequelize.STRING,
      NumberPO: Sequelize.STRING,
      IdContract: Sequelize.STRING,
      IdControl: Sequelize.STRING,
      engagement_type: Sequelize.STRING,
      PlatSystemsArea: Sequelize.STRING,
      StartDate: Sequelize.DATE,
      EndDate: Sequelize.DATE,
      NetDays: Sequelize.STRING,
      PayByDate: Sequelize.DATE,
      FlagUsePricingTable: Sequelize.STRING,
      Currency: Sequelize.STRING,
      InvoiceValue: Sequelize.DECIMAL,
      DiscountConServices: Sequelize.STRING,
      DiscountMaint: Sequelize.STRING,
      DiscountOthers: Sequelize.STRING,
      DiscountTotal: Sequelize.STRING,
      VendorRepName: Sequelize.STRING,
      VendorRepTitle: Sequelize.STRING,
      VendorRepSignDate: Sequelize.STRING,
      NewField1: Sequelize.STRING,
      NewField2: Sequelize.STRING,
      NewField3: Sequelize.STRING,
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('InvoiceMasters');
  }
};