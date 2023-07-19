'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoicePDF extends Model {
    static associate(models) {
      // define association here
    }
  };

  InvoicePDF.init({
    Invoice_key: DataTypes.INTEGER,
    invoice_pdf_url: DataTypes.STRING,
    invhdrNameCustomer : DataTypes.STRING,
    Filename : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InvoicePDF',
    //freezeTableName: true,
   // underscored: true,
    tableName: 'l1_invoice_detail_pdf'
  });
  InvoicePDF.removeAttribute('id');
  InvoicePDF.removeAttribute('createdAt');
  InvoicePDF.removeAttribute('updatedAt');
  return InvoicePDF;
};