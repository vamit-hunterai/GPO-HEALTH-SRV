'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class S3Folders extends Model {
    static associate(models) {
      // define association here
    }
  };
  S3Folders.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    folder_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'S3Folders',
    tableName: 's3_folder'
  });
  // S3Folders.removeAttribute('id');
  S3Folders.removeAttribute('createdAt');
  S3Folders.removeAttribute('updatedAt');
  return S3Folders;
};