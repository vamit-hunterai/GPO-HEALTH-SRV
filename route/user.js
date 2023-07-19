const express = require('express');
const router = express.Router();

var user = require('../controllers/shared/user');
var auth = require('../controllers/shared/auth');
var powerbi = require('../controllers/shared/powerbi');

//get all user
//router.get("/list", auth.hasAccess('admin'), user.list);


//login user
router.post('/login', user.authenticate);

router.get('/powerbi-auth', auth.hasAccess('user'), powerbi.powerBiAuth);



module.exports = router;