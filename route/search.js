const express = require('express');
const router = express.Router();
var apicache = require('apicache');
var cache = apicache.middleware;

var search = require('../controllers/shared/search');
var auth = require('../controllers/shared/auth');

//get all user
//router.get("/list", auth.hasAccess('admin'), user.list);


router.get('/', auth.hasAccess('user'), search.search);

router.post('/count',  auth.hasAccess('user'), search.searchCount);

router.get('/similar/:sow', auth.hasAccess('user'), search.searchSimilar);

router.get('/sow-invoice-graph', cache('24 hour'), search.sowInvoiceGraph);

router.get('/sow/:numberSow', auth.hasAccess('user'), search.sow);

router.get('/auto-suggestions/:sow',  search.autoSuggest);

router.get('/roles',  cache('24 hour'), search.roles);

router.get('/suppliers',  cache('24 hour'), search.suppliers);

router.get('/locations',  cache('24 hour'), search.locations);

router.get('/tech-stack', cache('24 hour'), search.techStack);

router.get('/full-list/:type', cache('24 hour'), search.getFullList);

router.get('/engagements', cache('24 hour'), search.engagements);

router.get('/ap-details', cache('24 hour'), search.apDetails);

router.get('/invoice-details', cache('24 hour'), search.search);


module.exports = router;