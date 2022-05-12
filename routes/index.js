const router = require('express').Router();
const apiRoutes = require('./api');
var path = require('path');

router.use('/api', apiRoutes);



  module.exports = router;