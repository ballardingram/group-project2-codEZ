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
            console.log('no user found');
              return cb(null, false, { message: 'USER_NOT_FOUND' });
          }
          if (username ==dbuser['username'] && await bcrypt.compare(password, dbuser['password'])) {
            console.log('User authenticated');
              let user = dbuser['dataValues'];
              user['password'] = undefined;
              return cb(null, user);
          }
          else {
            console.log('wrong credentials');
              return cb(null, false, {message: "WRONG_CREDS"});
          }
      }).catch(err => {
          return cb(null, false, { message: 'internal db error: ' + err });
      });
  })
);

passport.serializeUser(function (user, done) {
  console.log('we came to store a session : '+user);
  process.nextTick(function() {
      done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  console.log('we came to retrieve a session : '+user);
      process.nextTick(function() {
        done(null, user);
      });
});


//http://localhost:3001/api/users/login


router.post('/', passport.authenticate('local', {
  successReturnToOrRedirect: '/userhome',
  failureRedirect: '/login',
  failureMessage: true
}) );




module.exports = router;
  


   /**
    * Implement temporary sessions
    * Implement logout
    * limit passport middleware to my tips/my accounts page
    * 
    */