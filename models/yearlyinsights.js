'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class YearlyInsights extends Model {
    static associate(models) {
      // define association here
    }
  };
  
  YearlyInsights.init({
    invhdrNameCustomer:DataTypes.STRING,
    Year_wise: DataTypes.STRING,
    No_of_suppliers : DataTypes.STRING,
    No_of_distinct_item_descriptions: DataTypes.STRING,
    No_of_Segments : DataTypes.STRING,
    No_of_Families: DataTypes.STRING,
    No_of_classes: DataTypes.STRING,
    No_of_commodities : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'YearlyInsights',
    tableName: 'l1_year_metric_data'
  });
  YearlyInsights.removeAttribute('id');
  YearlyInsights.removeAttribute('createdAt');
  YearlyInsights.removeAttribute('updatedAt');
  return YearlyInsights;
};