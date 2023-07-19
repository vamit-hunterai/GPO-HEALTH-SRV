'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerFolders extends Model {
    static associate(models) {
      // define association here
    }
  };
  CustomerFolders.init({
    map_id: DataTypes.STRING,
    usr_id: DataTypes.STRING,
    folder_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerFolders',
    tableName: 'Users_folder_Map'
  });
  CustomerFolders.removeAttribute('id');
  CustomerFolders.removeAttribute('createdAt');
  CustomerFolders.removeAttribute('updatedAt');
  return CustomerFolders;
};