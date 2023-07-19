'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SowDeliverable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SowDeliverable.init({
    Sow_Key: DataTypes.INTEGER,
    NameFile: DataTypes.STRING,
    NameCustomer : DataTypes.STRING,
    NameSupplier : DataTypes.STRING,
    NumberSOW : DataTypes.STRING,
    delDeliverable : DataTypes.TEXT,
    delDescription : DataTypes.TEXT,
    delStartDate : DataTypes.STRING,
    delEndDate : DataTypes.STRING,
    delEta : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SowDeliverable',
    tableName: 'sow_deliverable'
  });
  SowDeliverable.removeAttribute('id');
  SowDeliverable.removeAttribute('createdAt');
  SowDeliverable.removeAttribute('updatedAt');
  return SowDeliverable;
};