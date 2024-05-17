'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const configDemo1 = require(__dirname + '/../config/config.json')['demo1'];
const configDemo2 = require(__dirname + '/../config/config.json')['demo2'];
const configDemo3 = require(__dirname + '/../config/config.json')['demo3'];
const db = {};

let sequelize,sequelize1,sequelize2,sequelize3;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize1 = new Sequelize(configDemo1.database, configDemo1.username, configDemo1.password, configDemo1);
  sequelize2 = new Sequelize(configDemo2.database, configDemo2.username, configDemo2.password, configDemo2);
  sequelize3 = new Sequelize(configDemo3.database, configDemo3.username, configDemo3.password, configDemo3);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  sequelize1 = new Sequelize(configDemo1.database, configDemo1.username, configDemo1.password, configDemo1);
  sequelize2 = new Sequelize(configDemo2.database, configDemo2.username, configDemo2.password, configDemo2);
  sequelize3 = new Sequelize(configDemo3.database, configDemo3.username, configDemo3.password, configDemo3);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    switch (file) {
      
        case 'apdetails.js':
          const model0 = require(path.join(__dirname, file))(sequelize1, Sequelize.DataTypes);
          db[model0.name] = model0;
        break;
      
        case 'yearlyinsights.js':
          const model1 = require(path.join(__dirname, file))(sequelize2, Sequelize.DataTypes);
          db[model1.name] = model1;
        break;
      
        case 'insights.js':
          const model2 = require(path.join(__dirname, file))(sequelize2, Sequelize.DataTypes);
          db[model2.name] = model2;
        break;
      
        case 'invoicedetail.js':
          const model3 = require(path.join(__dirname, file))(sequelize1, Sequelize.DataTypes);
          db[model3.name] = model3;
        break;
      
        case 'podetails.js':
          const model4 = require(path.join(__dirname, file))(sequelize1, Sequelize.DataTypes);
          db[model4.name] = model4; 
        break;
        
        case 'vendors.js':
          const model5 = require(path.join(__dirname, file))(sequelize3, Sequelize.DataTypes);
          db[model5.name] = model5;
        break;
    
      default:
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model; 
        break;
    }
       
    
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize1 = sequelize1;
db.sequelize2 = sequelize2;
db.sequelize3 = sequelize3;

module.exports = db;
