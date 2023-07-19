const express = require('express');
const router = express.Router();

var company = require('../controllers/company');

//
router.get('/get', company.findAll);



module.exports = router;