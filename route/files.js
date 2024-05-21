const express = require('express');
const router = express.Router();

var files = require('../controllers/shared/files');
var auth = require('../controllers/shared/auth');

//router.get("/", auth.hasAccess('user'), Profile.findOne);

router.get('/list', auth.hasAccess('user'), files.findAllByUser);

router.get('/list/output', auth.hasAccess('user'), files.getCustomerOutputFileTree);



router.get('/getFile', files.getFile);

router.post('/download/:uuid', auth.hasAccess('user'),files.download);

router.post('/download/customer/output', auth.hasAccess('user'), files.downloadCustomerOutputFile);

router.delete('/delete/:uuid', auth.hasAccess('user'),files.delete);

router.post('/multi-upload', auth.hasAccess('user'), files.multipleUpload);

router.post('/upload', files.upload);



module.exports = router;