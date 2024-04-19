'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    static associate(models) {
      // define association here
    }
  };

  InvoiceDetail.init({
    Invoice_key: DataTypes.INTEGER,
    // NameFile: DataTypes.STRING,
    invoice_pdf_url: DataTypes.STRING,
    invhdrNumberPO: DataTypes.STRING,
    invpricLineNbrPo : DataTypes.STRING, 
    invhdrNumberInvoice: DataTypes.STRING,
    invhdrNameCustomer: DataTypes.STRING,
    invhdrDateInvoice: DataTypes.STRING,
    invpriccDescription: DataTypes.STRING,
    invpricSegmentLevel4: DataTypes.STRING,
    
    invpricQtyDerived  : DataTypes.STRING,
    invpricRate  : DataTypes.DECIMAL,
    invpricLineAmount  : DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'InvoiceDetail',
    //freezeTableName: true,
   // underscored: true,
    tableName: 'l2_invoice_detail'
  });
  InvoiceDetail.removeAttribute('id');
  InvoiceDetail.removeAttribute('createdAt');
  InvoiceDetail.removeAttribute('updatedAt');
  return InvoiceDetail;
};