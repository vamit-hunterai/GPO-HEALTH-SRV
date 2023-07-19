node middlewear


npx sequelize-cli model:generate --name InvoiceDetail --attributes Invoice_Key:number, NameFile:string

select Year(StartDateSOW), DATE_FORMAT(StartDateSOW, "%Y %M"), count(StartDateSOW) from sow_master where StartDateSOW >= NOW() - INTERVAL 2 YEAR group by MONTH(StartDateSOW)



Commercials: Use SOW Master Table

Use SOW Master <<< Date seletion based on master start date>>

Supplier, ContractId, SOW no,Amendment number,  Project Name, Mater SOW Value


Roles: Use SOW Pricing & SOW Master Tables

<<<For dates you have to join master and pricing tables based on the key in DB>>

Name of Supplier, SOW no, EmpTitle, qty, rate, UOM , lineamount


Milestones:Use SOW Milestone & SOW Master Tables

<<For dates you have to join master and pricing tables based on the key in DB>>

Name of Supplier, SOW no, RoleMilstoneidentifier, EMp Title, lineamount


Contratc Info:Use SOW Master Table

Supplier, ContractId, SOW no,Amendment number,Customer Rep Name, Customer Rep Title, Customer Signature Date, Vendor Rep Name, Vendor Rep Title,Vendor Signature Date



Invoice Details Use Invoice Master and Pricing Tables

<<<For dates you have to join master and pricing tables based on the key in DB>>

Name of Supplier, Contratcid, SOW no, Invoice number,Invoice date, RoleIdentfierMilestone,  EmpTitle, PricDescription, Pricqty, Pricrate,lineamount, Invoice total