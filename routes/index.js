const router = require('express').Router();
const passport = require('passport')
const apiRoutes = require('./api');
var path = require('path');

router.use('/api', apiRoutes);


//Default home page
router.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, '../public/html', 'homepage.html'));
});

router.get('/login', (req,res) => {
  console.log("sending login form");
  res.sendFile(path.join(__dirname, '../public/html', 'login.html'));
});

/* POST /logout
 *
 * This route logs the user out.
 */
router.get('/logout', function(req, res, next) {
  console.log('logging out user');
  req.logout();
  console.log('logging out user');
  res.redirect('/');
});

router.get('/userhome', checkAuthentication,  (req,res) => {
  console.log("sending user home page");
  res.sendFile(path.join(__dirname, '../public/html', 'homepagewithlogin.html'));
  
});

router.get('/usertips', checkAuthentication,  (req,res) => {
  console.log("sending user tips page");
  res.sendFile(path.join(__dirname, '../public/html', 'mytips.html'));
});

router.get('/myaccount',checkAuthentication,  (req,res) => {
  console.log("sending user account page");
  res.sendFile(path.join(__dirname, '../public/html', 'myaccount.html'));
});


function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect("/login");
  }
}



  module.exports = router;