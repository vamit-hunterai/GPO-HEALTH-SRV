module.exports.config = {
    urlSlug: "api",
    apiVersion: "v1",
    appRoot: "http://localhost:3000",
    dataPath : './data',
    defaultAvtar : './data/default.png',
    allowedExt: ['.csv','.tab','.rtf','.ods ','.html','.htm','.xml','.jp2','.tiff ','.gif','.png','.jpg','.jpeg','.txt','.doc','.docx', '.xls', '.xlsx','.pdf','.ppt','.pptx','.frm', '.myd','.mdb','.accdb'],
    listPerPage: 10,
    adds:{
        url:'LDAP://GPO-HEALTH.COM:389/',
        baseDn:'CN=Rohit Dwivedi,OU=users,OU=GPO-HEALTH,DC=GPO-HEALTH,DC=COM',
        domain:'gpo-health.com'
    },
    s3:{
        accessKeyId: 'AKIAWLVMBXBUX5I27XNN',
        secretKey: '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',
        location:'us-east-1',
        bucket:'gpotest'
    },
    role:{
        ADMIN:'admin',
        USER:'user'
    }
}
