'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Files.init({
    path: DataTypes.STRING,
    user: DataTypes.TEXT, 
    filename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Files',
  });
  // Files.removeAttribute('createdAt');
  // Files.removeAttribute('updatedAt');
  return Files;
};