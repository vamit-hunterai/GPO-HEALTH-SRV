const Mongoose = require("mongoose");
module.exports.getDBCluster = function(env){
    switch(env){
        case 'prod':
            Mongoose.connect("");
            break;    
    }
    return Mongoose.connection;
}


module.exports.msSqlConfig = {
  user: "lakshman",
  password: "Gpomssql@321",
  database: "Dev_WebApplication",
  server: 'dev-test-mssql.c969yoyq9cyy.us-east-1.rds.amazonaws.com',
  requestTimeout: 130000, 
  options: { 
    enableArithAbort: true, 
    idleTimeoutMillis: 130000 ,
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 20000000
  }
}