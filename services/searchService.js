const SowDeliverable = require('../models').SowDeliverable;
const SowMaster = require('../models').SowMaster;
const SowAssumption = require('../models').SowAssumption;
const SowMilestone = require('../models').SowMilestone;
const SowPricing = require('../models').SowPricing;
const SowSupport = require('../models').SowSupport;
const InvoiceMaster = require('../models').InvoiceMaster;
const InvoiceDetail = require('../models').InvoiceDetail;
const InvoicePDF = require('../models').InvoicePDF;
const APDetails = require('../models').APDetails;
const PODetails = require('../models').PODetails;
const Customers = require('../models').Customers;
const UserCustomers = require('../models').UserCustomers;
const Insights = require('../models').Insights;
const YearlyInsights = require('../models').YearlyInsights;
const User = require('../models').User;
const CustomerFolders = require('../models').CustomerFolders;
const S3Folders = require('../models').S3Folders;
const Vendors = require('../models').Vendors;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require("../models");
const sql = require('mssql');
const dbConfig = require("../config/db");
const { param } = require('../route/search');
const limit = 10;

const modalCustomerMap = {
    'ap-details':"SUBMTG_MBR_NM",
    'po-details':"pohdrNameCustomer",
    'po-invoices':"invhdrNameCustomer",
    'invoice-pdf':"invhdrNameCustomer",
};
const startDateMap = {
    // 'ap-details':"SUBMTG_MBR_NM",
    'po-details':{date:"pohdrDatePo", po:"pohdrNumberPo", supplier: "pohdrNameSupplier"},
    'invoices':{date:"invhdrDateInvoice", po:"invhdrNumberPO", invoice:"invhdrNumberInvoice", supplier: "invhdrNameSupplier"},
    'ap-details':{supplier:"HCO_VNDR_NM", po:'HCO_PO_NBR'}
};
const distinctMap = {
    'ap':"ap_key",
    'po':"pohdrNumberPo",
    'invoice':"invhdrNumberInvoice",
    'supplier':"pohdrNameSupplier",
};


function setQueryParams(params, modal){
    const opts= {limit}, q = [];
    if(params.type && params.type.toLowerCase().indexOf('list')!=-1){
        const slug = params.type.split('-');
        delete opts.limit;
        if(slug && slug.length>0){
            opts.attributes = [
                [Sequelize.fn('DISTINCT', Sequelize.col(distinctMap[slug[0]])) ,distinctMap[slug[0]]]
            ];
        }
    }else{
        
        if(params && params.customer && modal){
            q.push({
                [modalCustomerMap[modal]] : params.customer
            });

        }
        if(params.startDate && params.endDate && startDateMap[params.type] && startDateMap[params.type].date){
            q.push({
                [startDateMap[params.type].date] : {
                    [Op.between]: [params.startDate, params.endDate]
                }
            });
        }
        if(params.invoice && startDateMap[params.type] && startDateMap[params.type].invoice){
            q.push({
                [startDateMap[params.type].invoice] : params.invoice
            });
        }
        if(params.supplier && startDateMap[params.type] && startDateMap[params.type].supplier){
            q.push({
                [startDateMap[params.type].supplier] : params.supplier
            });
        }
        if(params.po && startDateMap[params.type] && startDateMap[params.type].po){
            q.push({
                [startDateMap[params.type].po] : params.po
            });
        }
        if(params && params.page){ 
            opts.offset = Number(params.page)*limit;
        }
        if(q && q.length>0){
            opts.where={
                [Op.and]:q 
            }
        }
    }
    return opts;
}

const customerColMap = {
    "PO":"Customer_Name",
    "AP":"Customer_Name",
    "Invoice":"Customer_Name",
    "DataOverview":"invhdrNameCustomer"
}


module.exports = {
    getInsightByType: async function(params, type){
        const opts= {}, q = [], responses=[];
        if(params && params.customer && customerColMap[type]){
            q.push({
                [customerColMap[type]] : params.customer
            });
        }
        if(type != "DataOverview") q.push({source_type:type})
        
        opts.where={
        [Op.and]:q 
        }
    
        //console.log(opts)
        return await type == "DataOverview"?YearlyInsights.findAll(opts):Insights.findAll(opts);
    },
    insights: async function(params){
        const responses=[];
        responses.push(await this.getInsightByType(params, "PO"));
        responses.push(await this.getInsightByType(params, "Invoice"));
        responses.push(await this.getInsightByType(params, "Ap"));
        responses.push(await this.getInsightByType(params, "DataOverview"));
        return responses;
    },
    poInvoices: async function(params){
        try {
        if(!params.limit) params.limit = 10;
        if(!params.page) params.page = 0;
        if(!params.customer) return;
        await sql.connect(dbConfig.msSqlConfig);
        const tableName =  params.customer.replace(/\s/g,'_');
        const tablePrefix = "vw_"
        // const q = `SELECT  * FROM [Dev_WebApplication].[dbo].[vw_UMMS] where PARTY_GROUP_NAME='${params.customer}' order by PARTY_GROUP_KEY OFFSET ${params.page*10} ROWS FETCH NEXT ${params.limit} ROWS ONLY;`;
        const q = `SELECT  * FROM [Dev_WebApplication].[dbo].[${tablePrefix}${tableName}] order by PARTY_GROUP_KEY OFFSET ${params.page*10} ROWS FETCH NEXT ${params.limit} ROWS ONLY;`;
        //console.log(q)
        return await sql.query(q)
        } catch (err) {
        console.log(err)
        }
    },
    dataQuality: async function(params){
        try {
        if(!params.limit) params.limit = 10;
        if(!params.page) params.page = 0;
        await sql.connect(dbConfig.msSqlConfig);
        const q = `SELECT  * FROM [Dev_WebApplication].[dbo].[L3_yearly_aggr_inv] where PARTY_GROUP_KEY='${params.customerKey}';`;
        return await sql.query(q)
        } catch (err) {
        //console.log(err)
        }
    },
    customers: async function(params){
        let q = [], opts={};
       
        if(params.keyword){
            q.push({
                PARTY_GROUP_NAME : {
                    [Op.like]: '%'+params.keyword
                }
            });
            
            if(q){
                opts={
                    where:{
                        [Op.and]:q 
                    }
                }
            }
        }
        UserCustomers.belongsTo(Customers, {foreignKey: 'PARTY_GROUP_KEY'});
       return await UserCustomers.findAll({ 
            where:{
                usr_id:params && params.actor?params.actor:""
            },
            include: [{
                model: Customers
            }] 
        });
        
        // return await Customers.findAll(opts);
    },
    s3Folders: async function(params){
       CustomerFolders.belongsTo(S3Folders, {foreignKey: 'folder_id'});
       return await CustomerFolders.findAll({ 
            where:{
                usr_id:params && params.actor?params.actor:""
            },
            include: [{
                model: S3Folders
            }] 
        });
    },
    poDetails: async function(params){
        return await PODetails.findAll(setQueryParams(params));
    },
    apDetails: async function(params){
        return await APDetails.findAll(setQueryParams(params));
    },
    invoiceDetails: async function(params){
        return await InvoiceDetail.findAll(setQueryParams(params));
    },
    invoicePDFs: async function(params){
        return await InvoicePDF.findAll(setQueryParams(params,'invoice-pdf'));
    },
    resources: async function(params){
        // "params":{
        //     "NameCustomer":"test",
        //     "delStartDate":"",
        //     "delEndDate":""
        // }
        let q = [], priceQ=[];
        SowPricing.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params.techStack){
            q.push({
                PlatSystemsArea : params.techStack
            });
        }
        if(params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        if(params.role){
            priceQ.push({
                prcEmpTitle : params.role
            });
            priceQ.push({
                prcRoleIdentifierMilestone : "role"
            });
            
        }
        if(params.location){
            priceQ.push({
                prcLocation : params.location
            });
        }
        //console.log(q)
        return await SowPricing.findAll({ 
            where:{
                [Op.and]:priceQ
            },
           // offset: params.offset?((params.offset-1)*(params.limit?params.limit:15)):0,
           // limit: params.limit?params.limit:15,
            attributes: ['Sow_Key','prcRoleIdentifierMilestone','prcEmpTitle', 'prcDescription', 'prcLocation','prcRate', 'prcLineAmount'
            //[Sequelize.fn('COUNT', Sequelize.col('Sow_Key')), 'Sow_Key_Count']
            ],
            include: [{
                attributes: ['NameSupplier', 'IdContract', 'NumberSOW','TextScopeSummary', 'PlatSystemsArea', 'NumberAmendment', 'NameProject', 'SowValue', 'StartDateSOW', 'EndDateSOW'],
                model: SowMaster,
                where:{
                    [Op.and]:q
                    }
            }] 
        });
    },
    deliverables: async function(params){
        // "params":{
        //     "NameCustomer":"test",
        //     "NameSupplier":"",
        //     "milLocation":""
        // }
        let q = [];

        SowDeliverable.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        
        return await SowDeliverable.findAll({ 
           // offset: params.offset?params.offset:0,
           // limit: params.limit?params.limit:15,
            //attributes: ['milEmpTitle', 'milRoleIdentifierMilestone', 'milLineAmount'],
            include: [{
                attributes: ['StartDateSOW', 'EndDateSOW'],
                model: SowMaster,
                where:{
                    [Op.and]:q
                }
            }] 
        });
    },
    milestones: async function(params){
        // "params":{
        //     "NameCustomer":"test",
        //     "NameSupplier":"",
        //     "milLocation":""
        // }
        let q = [], q2=[];

        SowMilestone.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        if(params.supplier){
            q2.push({
                NameSupplier : params.supplier
            });
        }
        //console.log(q)
        //Name of Supplier, SOW no, RoleMilstoneidentifier, EMp Title, lineamount
        return await SowMilestone.findAll({ 
           // offset: params.offset?params.offset:0,
           // limit: params.limit?params.limit:15,
           where:{
            [Op.and]:q2
            },
            attributes: ['milEmpTitle', 'milRoleIdentifierMilestone', 'milLineAmount'],
            include: [{
                attributes: ['NameSupplier', 'NumberSOW', 'StartDateSOW', 'EndDateSOW'],
                model: SowMaster,
                where:{
                    [Op.and]:q
                }
            }] 
        });
    },
    commercials: async function(params){
        // "params":{
        //     "NameCustomer":"test",
        //     "delStartDate":"",
        //     "delEndDate":""
        // }
        let q = [];
        //SowPricing.belongsTo(SowMaster, {foreignKey: 'Sow_Key'})
        if(params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        if(params.techStack){
            q.push({
                PlatSystemsArea : params.techStack
            });
        }
        if(params.supplier){
            q.push({
                NameSupplier : params.supplier
            });
        }
        //console.log(q)
        //Supplier, ContractId, SOW no,Amendment number,  Project Name, Mater SOW Value
        return await SowMaster.findAll({ 
           // offset: params.offset?params.offset:0,
           // limit: params.limit?params.limit:15,
           // include: [{
                attributes: ['NameSupplier', 'IdContract', 'NumberSOW', 'NumberAmendment', 'NameProject', 'SowValue', 'PlatSystemsArea','StartDateSOW', 'EndDateSOW'],
            //    model: SowMaster,
                //flat:true,
                where:{
                    [Op.and]:q
                    }
           // }] 
        });
    },
    contacts: async function(params){
        // "params":{
        //     "NameCustomer":"test",
        //     "NameSupplier":"",
        //     "milLocation":""
        // }
        let q = [];
        if(params.sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+params.sow
                }
            });
        }
        if(params.StartDateSOW && params.EndDateSOW){
            q.push({
                StartDateSOW : {
                    [Op.between]: [params.StartDateSOW, params.EndDateSOW]
                }
            });
        }
        if(params.NumberSOW){
            q.push({
                NumberSOW : params.NumberSOW
            });
        }
        //console.log(q)
        //Supplier, ContractId, SOW no,Amendment number,Customer Rep Name, Customer Rep Title, Customer Signature Date, Vendor Rep Name, Vendor Rep Title,Vendor Signature Date
        return await SowMaster.findAll({ 
           // offset: params.offset?params.offset:0,
           // limit: params.limit?params.limit:15,
            attributes: ['NameSupplier', 'IdContract', 'NumberSOW', 'NumberAmendment', 'CustRepName', 'CustRepTitle','CustRepSignDate','VendorRepName', 'VendorRepTitle','VendorRepSignDate', 'StartDateSOW', 'EndDateSOW'],
            where:{
                [Op.and]:q
            }
        });
    },
    autoSuggest: async(sow)=>{
        let q = [];
        if(sow){
            q.push({
                NumberSOW : {
                    [Op.like]: '%'+sow+'%'
                }
            });
            return await SowMaster.findAll({ 
               // limit: 100,
                attributes: ['NumberSOW'],
                group:['NumberSOW'],
                where:{
                    [Op.and]:q
                }
            });
        }
    },
    invoices: async function(params){
        let q = [];
       // InvoiceDetail.belongsTo(InvoiceMaster, {foreignKey: 'Invoice_KEY'});
        InvoiceMaster.belongsTo(SowMaster, {foreignKey: 'IdContract', targetKey:'IdContract'})
        //SowMaster.hasOne(SowPricing, {foreignKey: 'Sow_Key'})
        InvoiceMaster.hasOne(InvoiceDetail, {foreignKey: 'Invoice_KEY'})
        if(params.invoice){
            q.push({
                NumberInvoice : {
                    [Op.like]: '%'+params.invoice
                }
            });
        }
        if(params.StartDate && params.EndDate){
            q.push({
                StartDate : {
                    [Op.between]: [params.StartDate, params.EndDate]
                }
            });
        }
        if(params.supplier){
            q.push({
                NameSupplier : params.supplier
            });
        }
        if(params.contractType){
            q.push({
                engagement_type : params.contractType
            });
        }
        //console.log(q)
        //Name of Supplier, Contratcid, SOW no, Invoice number,Invoice date, RoleIdentfierMilestone,  EmpTitle, PricDescription, Pricqty, Pricrate,lineamount, Invoice total
        return await InvoiceMaster.findAll({
           // offset: params.offset?params.offset:0,
           // limit: params.limit?params.limit:15,
            attributes: ['engagement_type','NameSupplier', 'IdContract', 'NumberPO', 'NumberInvoice', 'DateInvoice'],
            where:{
                [Op.and]:q
            },
            include: [
                {
                attributes: ['invpricRoleIdentifierMilestone','invpricEmpTitle','invpricDescription','invpricQty','invpricRate','invpricUom','invpricLineAmount','invpricTotalAmount'],
                model: InvoiceDetail
            }]
        });
    },
    sowGraph: async function(params){
        return await db.sequelize.query('select DATE_FORMAT(StartDateSOW, "%b %y") as month, count(StartDateSOW) as count from sow_master where StartDateSOW >= NOW() - INTERVAL 2 YEAR group by MONTH(StartDateSOW) order by StartDateSOW', { type: Sequelize.QueryTypes.SELECT });
    },
    invoiceGraph: async function(params){
        return await db.sequelize.query('select DATE_FORMAT(DateInvoice, "%b %y") as month, count(DateInvoice) as count from invoice_master where DateInvoice >= NOW() - INTERVAL 2 YEAR group by MONTH(DateInvoice) order by DateInvoice', { type: Sequelize.QueryTypes.SELECT });
    },
    roles: async function(params){
        return await db.sequelize.query("select prcEmpTitle as label, prcEmpTitle as value from sow_pricing where prcRoleIdentifierMilestone='role' group by prcEmpTitle order by prcEmpTitle", { type: Sequelize.QueryTypes.SELECT });
    },
    suppliers: async function(params){
        // console.log(params)
        return await Vendors.findAll({
            where:{
                VENDOR_NAME_ALIAS : {
                    [Op.like]: '%'+params.keyword+"%"
                }
            }
        });
        //return await db.sequelize.query('select NameSupplier as label, NameSupplier as value from sow_master group by NameSupplier order by NameSupplier', { type: Sequelize.QueryTypes.SELECT });
    },
    techStack: async function(params){
        return await db.sequelize.query('select PlatSystemsArea as label, PlatSystemsArea as value from sow_master group by PlatSystemsArea order by PlatSystemsArea', { type: Sequelize.QueryTypes.SELECT });
    },
    locations: async function(params){
        return await db.sequelize.query('select prcLocation as label, prcLocation as value from sow_pricing group by prcLocation order by prcLocation', { type: Sequelize.QueryTypes.SELECT });
    },
    engagements: async function(params){
        return await db.sequelize.query('select Engagementtype as label, Engagementtype as value from sow_master group by Engagementtype order by Engagementtype', { type: Sequelize.QueryTypes.SELECT });
    },
    getFullList: async function(type){
        if(type == 'sow')
         return await db.sequelize.query('select NumberSOW as label, NumberSOW as value from sow_master group by NumberSOW', { type: Sequelize.QueryTypes.SELECT });
        else
         return await db.sequelize.query('select NumberInvoice as label, NumberInvoice as value from invoice_master group by NumberInvoice', { type: Sequelize.QueryTypes.SELECT });
    },
    searchSimilar: async function(NumberSOW, callback){
      var sow = await SowMaster.findOne({ where:{NumberSOW}, attributes:['NumberSOW','PlatSystemsArea']});
      if(!sow) {
        callback({});
        return;
      }

        var q=[];

        if(sow && sow.PlatSystemsArea){
            q.push({
                PlatSystemsArea :  sow.PlatSystemsArea
            });
        }

        q.push({
            PlatSystemsArea :  {
                [Op.ne]:null
            }
        });

        // if(sowmaster && sowmaster.IdContract){
        //     q.push({
        //         IdContract :  sowmaster.IdContract
        //     });
        // }
        return await SowMaster.findAll({ 
           // limit: 100,
            attributes: ['NameSupplier', 'NameCustomer','NameProject','PlatSystemsArea','NameFile','IdContract', 'NumberSOW', 'NumberAmendment', 'CustRepName', 'CustRepTitle','CustRepSignDate','VendorRepName', 'VendorRepTitle','VendorRepSignDate'],
            where:{
                [Op.and]:q
            }
        });
    }
}
