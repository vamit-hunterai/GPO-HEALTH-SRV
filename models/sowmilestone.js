'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SowMilestone extends Model {

    static associate(models) {
      // define association here
    }
  };
  SowMilestone.init({
    Sow_Key: DataTypes.INTEGER,
    NameFile: DataTypes.STRING,
    NameCustomer: DataTypes.STRING,
    NameSupplier: DataTypes.STRING,
    NumberSOW: DataTypes.STRING,
    milRoleIdentifierMilestone: DataTypes.STRING,
    milEmpName: DataTypes.STRING,
    milEmpTitle: DataTypes.STRING,
    milDescription:  DataTypes.TEXT,
    milQty: DataTypes.STRING,
    milUom: DataTypes.STRING,
    milAvailability: DataTypes.STRING,
    milLocation: DataTypes.STRING,
    milLineAmount:  DataTypes.DECIMAL,
    milTotalAmount:  DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'SowMilestone',
    tableName: 'sow_milestone'
  });
  SowMilestone.removeAttribute('id');
  SowMilestone.removeAttribute('createdAt');
  SowMilestone.removeAttribute('updatedAt');
  return SowMilestone;
};