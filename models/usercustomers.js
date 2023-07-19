'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCustomers extends Model {
    static associate(models) {
      // define association here
    }
  };
  UserCustomers.init({
    map_id: DataTypes.STRING,
    usr_id: DataTypes.STRING,
    PARTY_GROUP_KEY: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserCustomers',
    tableName: 'Users_Customer_Map'
  });
  UserCustomers.removeAttribute('id');
  UserCustomers.removeAttribute('createdAt');
  UserCustomers.removeAttribute('updatedAt');
  return UserCustomers;
};