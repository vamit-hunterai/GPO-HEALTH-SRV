/**Route Dependencies */
const user = require('./route/user');
const files = require('./route/files');
const search = require('./route/search');
/**Route dependencies end */

const Express = require("express");
//var session = require('express-session');
const BodyParser = require("body-parser");
const busboy = require('connect-busboy');
const fs = require('fs');
const c = require("./config/common");
const dbConfig = require("./config/db");
const cors = require("cors");
const path = require("path");
var app = Express();

const urlPrefix = "/"+c.config.urlSlug + '/' + c.config.apiVersion;

app.set('secretKey', 'GPOHealthRestAPI');
app.set('path', __dirname);

//app.use(session({secret:'GPOHealthRestAPI',resave:false,saveUninitialized:true}));
app.use(cors({origin: '*'}));
// app.use(BodyParser.json({limit: '50mb'}));
// app.use(BodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(Express.urlencoded({ extended: true }));

app.use(Express.json({limit: '50mb'}));
app.use(Express.urlencoded({limit: '50mb', extended: true}));

// app.use(busboy({
//   highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
// })); 
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const uploadPath = path.join(__dirname, 'data/'); // Register the upload path

//get DB connection
//let db = dbConfig.getDBCluster("prod");
//db.on('error', console.error.bind(console, 'connection error:'));

var models = require("./models");
// models.sequelize.sync().then(function(){
//   console.log("database looks fine")
// }).catch(function(err){
//   console.log(err);
//   console.log("error in contacting db")
// });

//static resource binding
app.use('/data', Express.static(__dirname + '/data'));


app.get("/", (req, res)=>{
  res.send("<h1>Welcome to GPO-Health REST Service</h1>"); 
});


//Routes
app.use(urlPrefix+'/user', user);
app.use(urlPrefix+'/file', files);
app.use(urlPrefix+'/search', search);

var port = process.env.PORT || 3000;
//console.log(process.env)
app.listen(port, () => {
  //var tst = ["full time","part time","contract"]
  //console.log(tst?("\""+tst.join("\" OR \"")+"\""):"*");
    console.log("Running at http://localhost:"+port);
});




app.response.render = function (resp, err, msg) {
  //console.log(resp)
  let _respObj = {
    success: true,
    data:resp
  };
  if(err){
    _respObj.success = false;
    _respObj.error = err;
    _respObj.message = msg
  }
  return this.status(resp && resp.statusCode?resp.statusCode:200).send(_respObj);
}

//for testing alone
module.exports = app;