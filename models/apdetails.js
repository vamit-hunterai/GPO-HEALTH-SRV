'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class APDetails extends Model {
    static associate(models) {
      // define association here
    }
  };
  APDetails.init({
    ap_key:DataTypes.STRING,
    HCO_VNDR_NM: DataTypes.STRING,
    HCO_GL_ACCT_DESC : DataTypes.STRING,
    HCO_PO_NBR: DataTypes.STRING,
    HCO_INVC_NBR : DataTypes.STRING,
    HCO_INVC_LN_NBR: DataTypes.STRING,
    SUBMTG_MBR_NM: DataTypes.STRING,
    POST_DATE_YEAR_MM_SKEY : DataTypes.STRING,
    HCO_DISTRBTN_AMT: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'APDetails',
    tableName: 'l1_ap_detail'
  });
  APDetails.removeAttribute('id');
  APDetails.removeAttribute('createdAt');
  APDetails.removeAttribute('updatedAt');
  return APDetails;
};