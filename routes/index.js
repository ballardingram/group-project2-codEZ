const router = require('express').Router();
const apiRoutes = require('./api');
var path = require('path');

router.use('/api', apiRoutes);
router.get('/login', (req,res) => {
  console.log("sending login form");
  res.sendFile(path.join(__dirname, '../public/html', 'login.html'));
  
});
router.get('/authSuccess', (req,res) => {
  console.log('we are here as well : '+Date.now());
  res.json("user authenticated good");
});
router.get('/authFailure', (req,res) => {
  console.log('we dont want to be here : '+Date.now());
  res.json("user authenticated bad");
})

  module.exports = router;