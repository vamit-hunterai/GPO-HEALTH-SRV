'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SowMasters', {
    SowKey: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    Contingent_Service_Type:Sequelize.STRING,
    NameFile:Sequelize.STRING,
    DocType:Sequelize.STRING,
    NameProject:Sequelize.STRING,
    NameCustomer:Sequelize.STRING,
    NameSupplier:Sequelize.STRING,
    AddressSupplier:Sequelize.STRING,
    SowSignedLocation:Sequelize.STRING,
    NumberSOW:Sequelize.STRING,
    NumberPO:Sequelize.STRING,
    NumberAmendment:Sequelize.STRING,
    IdContract:Sequelize.STRING,
    Engagementtype:Sequelize.STRING,
    PlatSystemsArea:Sequelize.STRING,
    StartDateSOW: Sequelize.DATE,
    EndDateSOW: Sequelize.DATE,
    StartDateProject: Sequelize.DATE,
    EndDateProject: Sequelize.DATE,
    AmsTenure:Sequelize.STRING,
    TextDescription: Sequelize.TEXT,
    TextScope: Sequelize.TEXT,
    TextScopeSummary: Sequelize.TEXT,
    LocOnshore:Sequelize.STRING,
    LocNearshore:Sequelize.STRING,
    LocOffshore:Sequelize.STRING,
    Ip:Sequelize.STRING,
    IpDescription:Sequelize.STRING,
    Currency:Sequelize.STRING,
    FeeLicense:Sequelize.STRING,
    FeeConServices:Sequelize.STRING,
    FeeAMS:Sequelize.STRING,
    FeeTnM:Sequelize.STRING,
    FeeOtherCharges:Sequelize.STRING,
    NetDays:Sequelize.STRING,
    SowValue:Sequelize.STRING,
    FixedTM:Sequelize.STRING,
    BillFrequency:Sequelize.STRING,
    DiscountConServices:Sequelize.STRING,
    DiscountMaint:Sequelize.STRING,
    DiscountOthers:Sequelize.STRING,
    DiscountTotal:Sequelize.STRING,
    CustRepName:Sequelize.STRING,
    CustRepTitle:Sequelize.STRING,
    CustRepSignDate: Sequelize.DATE,
    VendorRepName:Sequelize.STRING,
    VendorRepTitle:Sequelize.STRING,
    VendorRepSignDate: Sequelize.DATE,
    FlagUseRoleMilestonePricingTable:Sequelize.STRING,
    FlagUseDeliverableSprintPlanTable:Sequelize.STRING,
    FlagUseSupportRequirementsTable:Sequelize.STRING,
    FlagUseAssumptionsTable:Sequelize.STRING,
    FlagUsePricingTable:Sequelize.STRING,
    NewField1:Sequelize.STRING,
    NewField2:Sequelize.STRING,
    NewField3:Sequelize.STRING,
    NewField4:Sequelize.STRING,
    Parent:Sequelize.STRING,
    Parent_SOW:Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SowMasters');
  }
};