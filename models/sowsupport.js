'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SowSupport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SowSupport.init({
    Sow_Key: DataTypes.INTEGER,
    NameFile: DataTypes.STRING,
    NameCustomer: DataTypes.STRING,
    NameSupplier: DataTypes.STRING,
    NumberSOW: DataTypes.STRING,
    supRoleIdentifierMilestone: DataTypes.STRING,
    supEmpName: DataTypes.STRING,
    supEmpTitle: DataTypes.STRING,
    supDescription: DataTypes.TEXT,
    supQty: DataTypes.STRING,
    supDuration: DataTypes.STRING,
    supAvailability: DataTypes.STRING,
    supLocation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SowSupport',
    tableName: 'sow_support'
  });
  SowSupport.removeAttribute('id');
  SowSupport.removeAttribute('createdAt');
  SowSupport.removeAttribute('updatedAt');
  return SowSupport;
};