'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insights extends Model {
    static associate(models) {
      // define association here
    }
  };
  Insights.init({
    source_type:DataTypes.STRING,
    flag_type: DataTypes.STRING,
    Month_wise : DataTypes.STRING,
    Customer_Name: DataTypes.STRING,
    Uniq_invoices : DataTypes.STRING,
    Uniq_PO: DataTypes.STRING,
    uniq_Inv_with_po_null: DataTypes.STRING,
    uniq_po_with_inv_null : DataTypes.STRING,
    Uniq_vendor:  DataTypes.STRING,
    Total_txn_amt:  DataTypes.DECIMAL,
    Small_txn_cnt:  DataTypes.STRING,
    Small_txn_total_amt:  DataTypes.DECIMAL,
    load_date:  DataTypes.STRING,
    with_amount:  DataTypes.STRING,
    without_amount:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Insights',
    tableName: 'l1_metric_data'
  });
  Insights.removeAttribute('id');
  Insights.removeAttribute('createdAt');
  Insights.removeAttribute('updatedAt');
  return Insights;
};