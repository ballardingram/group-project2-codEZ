const passport = require('passport')
const Strategy = require('passport-facebook')
const router = require('express').Router();
const { User } = require('../../models');
const path = require('path');
const errorParser = require('../../utils/errorparser');


const fbStrategy = new Strategy({
  clientID: process.env['FB_APP_ID'],
  clientSecret: process.env['FB_SECRET'],
  callbackURL: process.env['FB_CALLBACK'],
  profileFields: ['id', 'email', 'link', 'locale', 'name',
    'timezone', 'updated_time', 'verified', 'displayName']
},
  (accessToken, refreshToken, profile, cb) => {
    console.log('FB Profile ')
    console.log(profile);
    User.findOne({
      where: {
        email: profile.emails[0].value,
        provider: 'facebook'
      }
    }).then( dbUserData => {
      if (!dbUserData) {
        console.log('No User found with email, creating a new federated user');
        User.create(
          {
            first_name: profile.name.givenName,
            last_name:profile.name.familyName,
            provider: 'facebook',
            email: profile.emails[0].value
          }
        ).then(dbUserData => {
          console.log('new federated user created with facebook provider');
          // Don't pass federated user details. always use profile
          return cb(null, dbUserData);
        })
          .catch(err => {
            console.log(err);
            return cb(null, false, { message: errorParser(err) });
          });
      }else{
      console.log('DB uesr data is '+JSON.stringify(dbUserData));
      if (dbUserData['provider'] == 'facebook' && dbUserData['email'] == profile.emails[0].value) {
        console.log('user found in federated users list with provider');
        // Don't pass federated user details. always use profile
        return cb(null, dbUserData);
      } else {
        console.log('user found with email but provider not matching');
        return cb(null, false, { message: 'Email ID already existed with other account created through '+dbUserData['provider'] });
      }
    }
    }
    ).catch(err => {
      return cb(null, false, { message: errorParser(err) });
    });
  });


passport.use('facebook',fbStrategy);


router.get('/loginfacebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/oauth2/redirect/www.facebook.com',
  passport.authenticate('facebook', {
  successRedirect: '/userhome',
  failureRedirect: '/login',
  failureMessage: true
}));

module.exports = router;