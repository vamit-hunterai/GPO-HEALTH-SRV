'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SowAssumption extends Model {
    static associate(models) {
    }
  };
  SowAssumption.init({
    Sow_Key: DataTypes.INTEGER,
    NameFile: DataTypes.INTEGER,
    NameCustomer: DataTypes.INTEGER,
    NameSupplier: DataTypes.INTEGER,
    NumberSOW: DataTypes.INTEGER,
    assumAssumption: DataTypes.TEXT,
    assumCategory: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SowAssumption',
    tableName: 'sow_assumption'
  });
  SowAssumption.removeAttribute('id');
  SowAssumption.removeAttribute('createdAt');
  SowAssumption.removeAttribute('updatedAt');
  return SowAssumption;
};