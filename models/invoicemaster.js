'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceMaster extends Model {
    static associate(models) {
      // define association here
    }
  };
  InvoiceMaster.init({
    Invoice_KEY:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Contingent_Service_Type: DataTypes.STRING,
    SOW_Key: DataTypes.INTEGER,
    NameFile: DataTypes.STRING,
    DocType: DataTypes.STRING,
    NameProject: DataTypes.STRING,
    NameCustomer: DataTypes.STRING,
    NameSupplier: DataTypes.STRING,
    AddressSupplier: DataTypes.TEXT,
    NumberInvoice: DataTypes.STRING,
    DateInvoice: DataTypes.STRING,
    NumberPO: DataTypes.STRING,
    IdContract: DataTypes.STRING,
    IdControl: DataTypes.STRING,
    engagement_type: DataTypes.STRING,
    PlatSystemsArea: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    NetDays: DataTypes.STRING,
    PayByDate: DataTypes.DATE,
    FlagUsePricingTable: DataTypes.STRING,
    Currency: DataTypes.STRING,
    InvoiceValue: DataTypes.DECIMAL,
    DiscountConServices: DataTypes.STRING,
    DiscountMaint: DataTypes.STRING,
    DiscountOthers: DataTypes.STRING,
    DiscountTotal: DataTypes.STRING,
    VendorRepName: DataTypes.STRING,
    VendorRepTitle: DataTypes.STRING,
    VendorRepSignDate: DataTypes.STRING,
    NewField1: DataTypes.STRING,
    NewField2: DataTypes.STRING,
    NewField3: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'InvoiceMaster',
    tableName: 'invoice_master'
  });
  InvoiceMaster.removeAttribute('id');
  InvoiceMaster.removeAttribute('createdAt');
  InvoiceMaster.removeAttribute('updatedAt');
  return InvoiceMaster;
};