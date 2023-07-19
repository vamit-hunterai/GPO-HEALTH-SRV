'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    static associate(models) {
      // define association here
    }
  };
  Audit.init({
    Source_Type: DataTypes.STRING,
    system_id: DataTypes.STRING,
    target_cnt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Audit',
    tableName: 'view_L1_audit_data'
  });
  Audit.removeAttribute('id');
  Audit.removeAttribute('createdAt');
  Audit.removeAttribute('updatedAt');
  return Audit;
};

