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

//signup strategy locally
passport.use('local-signup', new LocalStrategy({usernameField: 'username',
passwordField: 'password', passReqToCallback: true},
  (req, username, password, cb) => {
      console.log("we are registering a user : " + Date.now());
      User.create({
        username: username,
        email: req.body.email,
        password: password
    })
    .then(dbUserData => 
          {
            let user = dbUserData['dataValues'];
            user['password'] = undefined;
            return cb(null, dbUserData);
          }
      )
    .catch(err => {
        console.error('internal db failure while storing user: '+err);
        return cb(null, false, {message: 'internal db failure while storing user: '+err})
    });
  }
));


passport.serializeUser(function (user, done) {
  console.log('we came to store a session : '+JSON.stringify(user));
  process.nextTick(function() {
      done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  console.log('we came to retrieve a session : '+JSON.stringify(user));
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

router.post('/signup', passport.authenticate('local-signup', {
  successReturnToOrRedirect: '/userhome',
  failureRedirect: '/register',
  failureMessage: true
}) );




module.exports = router;
  


   /**
    * Implement temporary sessions
    * Implement logout
    * limit passport middleware to my tips/my accounts page
    * 
    */