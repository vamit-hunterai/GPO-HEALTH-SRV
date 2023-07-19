'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SowMaster extends Model {
    static associate(models) {
      // define association here
    }
  };
  SowMaster.init({
    SowKey: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Contingent_Service_Type:DataTypes.STRING,
    NameFile:DataTypes.STRING,
    DocType:DataTypes.STRING,
    NameProject:DataTypes.STRING,
    NameCustomer:DataTypes.STRING,
    NameSupplier:DataTypes.STRING,
    AddressSupplier:DataTypes.STRING,
    SowSignedLocation:DataTypes.STRING,
    NumberSOW:DataTypes.STRING,
    NumberPO:DataTypes.STRING,
    NumberAmendment:DataTypes.STRING,
    IdContract:DataTypes.STRING,
    Engagementtype:DataTypes.STRING,
    PlatSystemsArea:DataTypes.STRING,
    StartDateSOW: DataTypes.DATE,
    EndDateSOW: DataTypes.DATE,
    StartDateProject: DataTypes.DATE,
    EndDateProject: DataTypes.DATE,
    AmsTenure:DataTypes.STRING,
    TextDescription: DataTypes.TEXT,
    TextScope: DataTypes.TEXT,
    TextScopeSummary: DataTypes.TEXT,
    LocOnshore:DataTypes.STRING,
    LocNearshore:DataTypes.STRING,
    LocOffshore:DataTypes.STRING,
    Ip:DataTypes.STRING,
    IpDescription:DataTypes.STRING,
    Currency:DataTypes.STRING,
    FeeLicense:DataTypes.STRING,
    FeeConServices:DataTypes.STRING,
    FeeAMS:DataTypes.STRING,
    FeeTnM:DataTypes.STRING,
    FeeOtherCharges:DataTypes.STRING,
    NetDays:DataTypes.STRING,
    SowValue:DataTypes.STRING,
    FixedTM:DataTypes.STRING,
    BillFrequency:DataTypes.STRING,
    DiscountConServices:DataTypes.STRING,
    DiscountMaint:DataTypes.STRING,
    DiscountOthers:DataTypes.STRING,
    DiscountTotal:DataTypes.STRING,
    CustRepName:DataTypes.STRING,
    CustRepTitle:DataTypes.STRING,
    CustRepSignDate: DataTypes.DATE,
    VendorRepName:DataTypes.STRING,
    VendorRepTitle:DataTypes.STRING,
    VendorRepSignDate: DataTypes.DATE,
    FlagUseRoleMilestonePricingTable:DataTypes.STRING,
    FlagUseDeliverableSprintPlanTable:DataTypes.STRING,
    FlagUseSupportRequirementsTable:DataTypes.STRING,
    FlagUseAssumptionsTable:DataTypes.STRING,
    FlagUsePricingTable:DataTypes.STRING,
    // NewField1:DataTypes.STRING,
    // NewField2:DataTypes.STRING,
    // NewField3:DataTypes.STRING,
    // NewField4:DataTypes.STRING,
    Parent:DataTypes.STRING,
    Parent_SOW:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SowMaster',
    tableName: 'sow_master'
  });
  SowMaster.removeAttribute('id');
  SowMaster.removeAttribute('createdAt');
  SowMaster.removeAttribute('updatedAt');
  return SowMaster;
};