const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local');
const { User } = require('../../models');
const router = require('express').Router();

/* Actual authentication logic, getting user from DB, validating password sending user back */
passport.use('local', new LocalStrategy(
  (username, password, cb) => {
      console.log("we are validateing user : " + Date.now());
      User.findOne({
          attributes: { include: ['password'] },
          where: {
              username: username
          }
      }).then(async(dbuser) => {
          if (!dbuser) {
              return cb(null, true, { message: 'USER_NOT_FOUND' });
          }
         
          if (username ==dbuser['username'] && await bcrypt.compare(password, dbuser['password'])) {
              let user = dbuser['dataValues'];
              user['password'] = undefined;
              // req.login(user);
              return cb(null, user);
          }
          else {
              return cb(null, false, {message: "WRONG_CREDS"});
          }
      }).catch(err => {
          return cb(null, false, { message: 'internal db error: ' + err });
      });
  })
);

passport.serializeUser(function (user, done) {
  console.log('we came to store a session');
  process.nextTick(function() {
  done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function() {
  done(null, user);
  });
});


//http://localhost:3001/api/users/login


router.post('/', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}) );


/* POST /logout
 *
 * This route logs the user out.
 */
router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

   module.exports = router;
  