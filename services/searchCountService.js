const SowDeliverable = require('../models').SowDeliverable;
const SowMaster = require('../models').SowMaster;
const SowMilestone = require('../models').SowMilestone;
const SowPricing = require('../models').SowPricing;
const InvoiceMaster = require('../models').InvoiceMaster;
const InvoiceDetail = require('../models').InvoiceDetail;
const APDetails = require('../models').APDetails;
const PODetails = require('../models').PODetails;
const Audit = require('../models').Audit;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require("../models");
const sql = require('mssql'); 
const dbConfig = require("../config/db");
const modalCustomerMap = {
    'ap-details':"SUBMTG_MBR_NM",
    'po-details':"pohdrNameCustomer",
    'po-invoices':"invhdrNameCustomer",
};

module.exports = {
    //from master + pricing
    resources: async function(params){
        let q = [], priceQ=[];
        SowPricing.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params && params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params && params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params && params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        if(params && params.role){
            priceQ.push({
                prcEmpTitle : params.role
            });
        }
        if(params && params.location){
            priceQ.push({
                prcLocation : params.location
            });
        }
        //console.log(q)
        return await SowPricing.findAll({ 
            where:{
                [Op.and]:priceQ
            },
            attributes: [
               // include: [
                    'Sow_Key',
                    [Sequelize.fn('COUNT', Sequelize.col('Sow_Key')), 'count']
                //]
            ],
            include: [{
                model: SowMaster,
                where:{
                    [Op.and]:q
                }
            }] 
        });
    },
    deliverables: async function(params){
        let q = [];
        SowDeliverable.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params && params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params && params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        
        return await SowDeliverable.findAll({ 
            where:{
                [Op.and]:q
            },
            attributes: [
              //  include: [
                'Sow_Key',
                [Sequelize.fn('COUNT', Sequelize.col('Sow_Key')), 'count']
             //   ]
            ]
        });
    },
    milestones: async function(params){
        let q = [];

        SowMilestone.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params && params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params && params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params && params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        if(params && params.supplier){
            q.push({
                NameSupplier : params.supplier
            });
        }
        //console.log(q)
        //Name of Supplier, SOW no, RoleMilstoneidentifier, EMp Title, lineamount
        return await SowMilestone.findAll({ 
            attributes: [
                //include: [
                    'Sow_Key',
                    [Sequelize.fn('COUNT', Sequelize.col('Sow_Key')), 'count']
                //]
            ],
            include: [{
                model: SowMaster,
                where:{
                    [Op.and]:q
                }
            }] 
        });
    },
    commercials: async function(params){
        let q = [];
        //SowPricing.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params && params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params && params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params && params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        if(params && params.techStack){
            q.push({
                PlatSystemsArea : params.techStack
            });
        }
        if(params && params.supplier){
            q.push({
                NameSupplier : params.supplier
            });
        }
        return await SowMaster.findAll({ 
            where:{
                [Op.and]:q
            },
            attributes: [
               // include: [
                'SowKey',
                [Sequelize.fn('COUNT', Sequelize.col('SowKey')), 'count']
               // ]
            ]
        });
    },
    contacts: async function(params){
        let q = [];
        if(params && params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params && params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params && params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        return await SowMaster.findAll({ 
            where:{
                [Op.and]:q
            },
            attributes: [
                //include: [
                    'SowKey',
                    [Sequelize.fn('COUNT', Sequelize.col('SowKey')), 'count']
                //]
            ]
        });
    },
    invoices: async function(params){
        let q = [];
       // InvoiceDetail.belongsTo(InvoiceMaster, {foreignKey: 'Invoice_KEY'});
        InvoiceMaster.belongsTo(SowMaster, {foreignKey: 'IdContract', targetKey:'IdContract'})
        //SowMaster.hasOne(SowPricing, {foreignKey: 'Sow_Key'})
        InvoiceMaster.hasOne(InvoiceDetail, {foreignKey: 'Invoice_KEY'})
        if(params && params.invoice){
            q.push({
                NumberInvoice : {
                    [Op.like]: '%'+params.invoice
                }
            });
        }
        if(params && params.StartDate && params.EndDate){
            q.push({
                StartDate : {
                    [Op.between]: [params.StartDate, params.EndDate]
                }
            });
        }
        return await InvoiceMaster.findAll({
            attributes: [
               // include: [
                   'Invoice_KEY',
                    [Sequelize.fn('COUNT', Sequelize.col('Invoice_KEY')), 'count']
               // ]
            ],
            where:{
                [Op.and]:q
            }
        });
    },
    counts: async function(params){
        if(params && params.type == "PO-INVOICES"){
            await sql.connect(dbConfig.msSqlConfig);
            const tableName =  params.customer.replace(/\s/g,'_');
            const tablePrefix = "vw_"
            // const q = `SELECT  * FROM [Dev_WebApplication].[dbo].[vw_UMMS] where PARTY_GROUP_NAME='${params.customer}' order by PARTY_GROUP_KEY OFFSET ${params.page*10} ROWS FETCH NEXT ${params.limit} ROWS ONLY;`;
            const q = `SELECT  count(*) as total FROM [Dev_WebApplication].[dbo].[${tablePrefix}${tableName}];`;
            //console.log(q)
            return await sql.query(q)
        }else{
            let q = [];
       
            q.push({
                Source_Type : params.type
            });
            
            if(params && params.customer){
                q.push({
                    system_id : params.customer
                });
            }
            
            return await Audit.findOne({
                where:{
                [Op.and]:q
                }
            });
        }
        // return await InvoiceDetail.findAll({
        //     attributes: [
        //        // include: [
        //            'Invoice_key',
        //             [Sequelize.fn('COUNT', Sequelize.col('Invoice_key')), 'count']
        //        // ]
        //     ],
        //     where:{
        //         [Op.and]:q
        //     }
        // });
    },
    apDetails: async function(params){
        let q = [];
        if(params && params.invoice){
            q.push({
                NumberInvoice : {
                    [Op.like]: '%'+params.invoice
                }
            });
        }
        if(params && params.customer){
            q.push({
                [modalCustomerMap["ap-details"]] : params.customer
            });
        }
        if(params && params.StartDate && params.EndDate){
            q.push({
                StartDate : {
                    [Op.between]: [params.StartDate, params.EndDate]
                }
            });
        }
        return await APDetails.findAll({
            attributes: [
               // include: [
                   'ap_key',
                    [Sequelize.fn('COUNT', Sequelize.col('ap_key')), 'count']
               // ]
            ],
            where:{
                [Op.and]:q
            }
        });
    },
    poDetails: async function(params){
        let q = [];
        if(params && params.invoice){
            q.push({
                NumberInvoice : {
                    [Op.like]: '%'+params.invoice
                }
            });
        }
        if(params && params.customer){
            q.push({
                [modalCustomerMap["po-details"]] : params.customer
            });
        }
        if(params && params.StartDate && params.EndDate){
            q.push({
                StartDate : {
                    [Op.between]: [params.StartDate, params.EndDate]
                }
            });
        }
        return await PODetails.findAll({
            attributes: [
               // include: [
                   'po_key',
                    [Sequelize.fn('COUNT', Sequelize.col('po_key')), 'count']
               // ]
            ],
            where:{
                [Op.and]:q
            }
        });
    }
}
