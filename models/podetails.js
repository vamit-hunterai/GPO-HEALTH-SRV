'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PODetails extends Model {
    static associate(models) {
      // define association here
    }
  };
  PODetails.init({
    po_key:DataTypes.STRING,
    pohdrNameSupplier: DataTypes.STRING,
    pohdrNumberPo : DataTypes.STRING,
    popricLineNbrPo: DataTypes.STRING,
    pohdrDatePo : DataTypes.STRING,
    popricDescription: DataTypes.STRING,
    pohdrNameCustomer: DataTypes.STRING,
    popricQty : DataTypes.STRING,
    popricRate:  DataTypes.DECIMAL,
    popricLineAmount:  DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'PODetails',
    tableName: 'l1_po_detail'
  });
  PODetails.removeAttribute('id');
  PODetails.removeAttribute('createdAt');
  PODetails.removeAttribute('updatedAt');
  return PODetails;
};