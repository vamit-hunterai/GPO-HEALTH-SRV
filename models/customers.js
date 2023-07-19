'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    static associate(models) {
      // define association here
    }
  };

  Customers.init({
    PARTY_GROUP_KEY: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PARTY_GROUP_CODE: DataTypes.STRING,
    PARTY_GROUP_NAME : DataTypes.STRING,
    PARTY_GROUP_NAME_ALIAS: DataTypes.STRING,
    EFF_START_DT : DataTypes.STRING,
    EFF_END_DT: DataTypes.STRING,
    CRN_ROW_IND : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customers',
    tableName: 'dim_party_group'
  });
  Customers.removeAttribute('id');
  Customers.removeAttribute('createdAt');
  Customers.removeAttribute('updatedAt');
  return Customers;
};