const config = require('../../config/common').config;
var fs = require('fs');
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const fileUpload = require("../../services/fileUpload");
var util = require('util');
const Files = require('../../models').Files;
var ActiveDirectory = require('activedirectory2');
const s3 = new AWS.S3({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretKey,
    region: config.s3.location
});


const parseForm = async req => {
    return new Promise((resolve, reject) => {
      const form = new Busboy({ headers: req.headers })
      const files = [] // create an empty array to hold the processed files
      const buffers = {} // create an empty object to contain the buffers
      form.on('file', (field, file, filename, enc, mime) => {
        buffers[field] = [] // add a new key to the buffers object
        file.on('data', data => {
          buffers[field].push(data)
        })
        file.on('end', () => {
          files.push({
            fileBuffer: Buffer.concat(buffers[field]),
            fileType: mime,
            fileName: filename,
            fileEnc: enc,
          })
        })
      })
      form.on('error', err => {
        reject(err)
      })
      form.on('finish', () => {
        resolve(files)
      })
      req.pipe(form) // pipe the request to the form handler
    })
}

var uploadFile = async function(buffer, fileParams){
    //console.log(buffer.length)
    // or module.exports = (buffer, fileParams) => {
      const params = {
        Bucket: config.s3.bucket,
        Key: fileParams.fileName,
        Body: buffer,
        ContentType: fileParams.fileType,
        ContentEncoding: fileParams.fileEnc,
      }
      console.log(params)
      return s3.upload(params).promise()
}

module.exports = {
    findAllByUser : (req, res) => {
      /*var con = {
            url: config.adds.url,
            baseDN: config.adds.baseDn,
            username: `lveti@${config.adds.domain}`,
            password: 'Welcome@2021'
        };
        var ad = new ActiveDirectory(con);
        ad.findUser('CN=lveti,DC=GPO-HEALTH,DC=COM',function(err, user) {
          if (err) {
            console.log('ERROR: ' +JSON.stringify(err));
            return;
          }
        
          if (! user) console.log('User: ' + 'lveti' + ' not found.');
          else console.log(user);
      });*/
      

      //   ad.getRootDSE(function(err, user) {
      //     if (err) {
      //       console.log('ERROR: ' +JSON.stringify(err));
      //       return;
      //     }
        
      //     if (! user) console.log('User: ' + 'lveti' + ' not found.');
      //     else console.log(user);
      // });
        Files.findAll({ where: { user: req.params.userId} })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message
        });
        });
    },
    download: function(req, res){
        //console.log(req.params)
        Files.findOne({ where: { user: req.params.userId, id: req.params.uuid} })
            .then(data => {
                if(data){
                    const params = {
                        Bucket: config.s3.bucket,
                        Key: data.filename,
                        //region: config.s3.location
                    };
                    res.set('resType', 'blob');
                    res.attachment(data.filename);
                    var fileStream = s3.getObject(params).createReadStream();
                    fileStream.pipe(res);
                }
                
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message
            });
        });
    },
    getFile: function(req, resp){
        const params = {
            Bucket: config.s3.bucket,
            Key: req.body.key,
            //region: config.s3.location
           };
         
          // const data = await s3.getObject(params).promise();
          // const contents = data.Body.toString();
         
           s3.getObject(params, function(err, dat) {
            if (err) resp.render([],err,err.stack.toString()); 
            else{
                console.log(dat)
                resp.render(dat.toString());      
            } 
            //console.log('Bucket Created Successfully', data.Location);
            });
    },
    upload: async(req,res)=>{
    try {
        const files = await parseForm(req)
        const fileUrls = [], urls = [], promices=[];
        for (const file of files) {
          const { fileBuffer, ...fileParams } = file
          //promices.push(uploadFile(fileBuffer, fileParams));
          const result = await uploadFile(fileBuffer, fileParams)
          urls.push({ filename: result.key, url: result.Location })
        }

        // Promise.all(promices).then((objs) => {               
        //     console.log(objs)
        //     res.render({});   
        // }); 

        res.status(200).json({ success: true, fileUrls: urls })
      } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, error: err.message })
    }
    },
    multipleUpload : async (req, res) => {
        try {
        req.files = req.files.files;
        if(!util.isArray(req.files)) req.files = [req.files]
        var urls = [];
        for (const file of req.files) {
          //if(config.allowedExt.some(file.name.includes.bind(file.name))){
            const fileName = req.body.folder+'/'+file.name;
            console.log("before upload: "+file.data.length)
            const result = await uploadFile(file.data, {fileName, fileType:file.mimetype, fileEnc:file.encoding})
            console.log(result)
            if(result){
              urls.push({ user:req.params.userId, fname:fileName, filename: result.Key, path: result.Location })
            } 
          //}
        }  

        Files.bulkCreate(urls).then(function() {
            return urls;
          }).then(function(data) {
            res.status(200).json({ success: true, fileUrls: data })
          });
        
        } catch (error) {
          res.status(500).json({ success: false, error: error.message })
        }
    },
    delete: function(req, res){
        Files.findOne({ where: { user: req.params.userId, id: req.params.uuid} })
            .then(data => {
                if(data){
                    const params = {
                        Bucket: config.s3.bucket,
                        Key: data.filename,
                        //region: config.s3.location
                    };
                    s3.deleteObject(params, function(err, data) {
                        if (err) res.status(500).json({ success: false, err: err.message })
                        else {
                            Files.destroy({ where: { user: req.params.userId, id: req.params.uuid} }).then(ress=>{
                                if(ress){
                                    res.status(200).json({ success: true, data });
                                }
                            });
                           
                        }
                    });
                }
                
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message
            });
        });
    },
    getCustomerOutputFileTree: function(req, res){
      const params = {
        Bucket: config.s3.bucket,
        Prefix: 'Customer/'
      };
      s3.listObjects(params,function(err,data){
        if (err) {
          res.status(500).json({ success: false, err: err.message })
        } else {

          let fileList = [];

          if(data && data['Contents'] && data['Contents'].length != 0){
            for(let fileNameIndex in data['Contents']){
              let fileName = data.Contents[fileNameIndex];
              if(String(fileName.Key).slice(-1) !== '/'){
                fileList.push({"name":fileName.Key,"LastModified":new Date(fileName.LastModified).toLocaleDateString()});
              }
            }
          }
          
          let response = { 'files': fileList };
          res.status(200).json({ success: true, response }); 
        }
      });
    },
    downloadCustomerOutputFile: function(req,res){
      //"https://gpotest.s3.amazonaws.com/"+
      if(req.query.fileName){
        const params = {
          Bucket: config.s3.bucket,
          Key: req.query.fileName
        };
        res.set('resType', 'blob');
        res.attachment(req.query.fileName);
        var fileStream = s3.getObject(params).createReadStream();
        fileStream.pipe(res);
        
      }else{
        res.status(404);
      }
      
    }

}