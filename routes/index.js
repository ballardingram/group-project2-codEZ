const router = require('express').Router();
const apiRoutes = require('./api');
var path = require('path');
router.use('/api', apiRoutes);



//Default home page
router.get('/',(req, res) => {
  // res.sendFile(path.join(__dirname, '../public/html', 'homepage.html'));
  res.redirect('/api/tips')
});

// Supplying login page

router.get('/login', (req,res) => {
  console.log("sending login form");
  // res.sendFile(path.join(__dirname, '../public/html', 'login.html'));
 res.render('login')
});

/** Routes requiring a valid authentication */

router.get('/submittip',checkAuthentication,  (req,res) => {
  console.log("sending user account page");
  // res.sendFile(path.join(__dirname, '../public/html', 'submit-tip.html'));
  res.render('submittip')
});

router.get('/userhome', checkAuthentication,  (req,res) => {
  console.log("sending user home page");
  res.redirect('/api/tips/usertips/'+req.session.passport.user.id);
});

router.get('/usertips', checkAuthentication,  (req,res) => {
  console.log("sending user tips page");
  res.sendFile(path.join(__dirname, '../public/html', 'mytips.html'));
});

router.get('/account',checkAuthentication,  (req,res) => {
  console.log("sending user account page");
  // res.sendFile(path.join(__dirname, '../public/html', 'account.html'));
  console.log(req.session.passport.user);
  res.render('account',{user: req.session.passport.user})
});

router.get('/submit-tip', checkAuthentication, (req,res) => {
  console.log("sending user account page");
  // res.sendFile(path.join(__dirname, '../public/html', 'submit-tip.html'));
  res.render('submittip');
});

/** Routes not required to have authentication */

router.get('/privacy-policy',  (req,res) => {
  console.log("sending user account page");
  // res.sendFile(path.join(__dirname, '../public/html', 'privacy-policy.html'));
  res.render('privacy');
});


router.get('/terms-of-service',  (req,res) => {
  console.log("sending user account page");
  // res.sendFile(path.join(__dirname, '../public/html', 'terms-of-service.html'));
  res.render('terms-of-service');
});

router.get('/register',(req,res) => {
  console.log("sending user account page");
  // res.sendFile(path.join(__dirname, '../public/html', 'register.html'));
  res.render('register')
} );



function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect("/login");
  }
}



/* POST /logout
 *
 * This route logs the user out.
 */
router.get('/logout', function(req, res, next) {
  console.log('logging out user');
  req.logout();
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
        if(err) {
            return next(err);
        } else {
            req.session = null;
            console.log("logout successful");
            return res.redirect('/');
        }
    });
}  
    
});




  module.exports = router;

