'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendors extends Model {
    static associate(models) {
      // define association here
    }
  };

  Vendors.init({
    VENDOR_KEY: DataTypes.STRING,
    VENDOR_NAME : DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Vendors',
    tableName: 'dim_vendor'
  });
  Vendors.removeAttribute('id');
  Vendors.removeAttribute('createdAt');
  Vendors.removeAttribute('updatedAt');
  return Vendors;
};