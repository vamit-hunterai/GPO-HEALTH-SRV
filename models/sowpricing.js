'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SowPricing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SowPricing.init({
    Sow_Key: DataTypes.INTEGER,
    NameFile: DataTypes.STRING,
    NameCustomer: DataTypes.STRING,
    NameSupplier: DataTypes.STRING,
    NumberSOW: DataTypes.STRING,
    prcRoleIdentifierMilestone: DataTypes.STRING,
    prcEmpName: DataTypes.STRING,
    prcEmpTitle: DataTypes.STRING,
    prcDescription: DataTypes.TEXT,
    prcQty: DataTypes.STRING,
    prcRate: DataTypes.DECIMAL,
    prcUom: DataTypes.STRING,
    prcDuration: DataTypes.STRING,
    prcAvailability: DataTypes.STRING,
    prcLocation: DataTypes.STRING,
    prcLineAmount: DataTypes.STRING,
    prcYear: DataTypes.STRING,
    prcMonth: DataTypes.STRING,
    prcTotalAmount: DataTypes.DECIMAL,
    prcDurationInHours: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SowPricing',
    tableName: 'sow_pricing'
  });
  SowPricing.removeAttribute('id');
  SowPricing.removeAttribute('createdAt');
  SowPricing.removeAttribute('updatedAt');
  return SowPricing;
};