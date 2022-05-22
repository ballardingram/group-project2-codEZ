const passport = require('passport')
const Strategy = require('passport-github2')
const router = require('express').Router();
const { User } = require('../../models');
const path = require('path');
const errorParser = require('../../utils/errorparser');

passport.use(new Strategy({
    clientID: process.env['GH_CLIENT_ID'],
    clientSecret: process.env['GH_SECRET'],
    scope: ['user:email'],
    callbackURL: process.env['GH_CALLBACK']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('FB Profile ')
    console.log(profile);
    User.findOne({
        where: {
          email: profile.emails[0].value,
          provider: 'github'
        }
      }).then( dbUserData => {
        if (!dbUserData) {
          console.log('No User found with email, creating a new federated user');
          User.create(
            {
              provider: 'github',
              email: profile.emails[0].value
            }
          ).then(dbUserData => {
            console.log('new federated user created with github provider');
            // Don't pass federated user details. always use profile
            return cb(null, dbUserData);
          })
            .catch(err => {
              console.log(err);
              return cb(null, false, { message: errorParser(err) });
            });
        }else{
        console.log('DB uesr data is '+JSON.stringify(dbUserData));
        if (dbUserData['provider'] == 'github' && dbUserData['email'] == profile.emails[0].value) {
          console.log('user found in federated users list with provider');
          // Don't pass federated user details. always use profile
          return cb(null, dbUserData);
        } else {
          console.log('user found with email but provider not matching');
          return cb(null, false, { message: 'Email ID already existed with other account' });
        }
      }
      }
      ).catch(err => {
        return cb(null, false, { message: errorParser(err) });
      });
  }
));
  
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { 
    successRedirect: '/userhome',
    failureRedirect: '/login',
    failureMessage: true
    })
  );


module.exports = router;