const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local');
const { User, UserAccount } = require('../../models');
const router = require('express').Router();
const sequelize = require('../../config/connection');
const errorParser = require('../../utils/errorparser');

/* Actual authentication logic, getting user from DB, validating password sending user back */
passport.use('local', new LocalStrategy(
  (username, password, cb) => {
    console.log("we are validateing user : " + Date.now());
    UserAccount.findOne({
      where: {
        username: username
      },
      include: [
        {
          model: User
        }
      ]
    }).then(async (dbuser) => {
      if (!dbuser) {
        console.log('no user found');
        return cb(null, false, { message: 'user not found with given credentials' });
      }
      if (username == dbuser['username'] && await bcrypt.compare(password, dbuser['password'])) {
        console.log('user authenticated');
        let user = dbuser['dataValues']['user']['dataValues'];
        user.username = dbuser['username'];
        return cb(null, user);
      }
      else {
        console.log('wrong credentials');
        return cb(null, false, { message: "given username or password incorrect" });
      }
    }).catch(err => {
      return cb(null, false, { message: errorParser(err) });
    });
  })
);

//signup strategy locally
passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password', passReqToCallback: true
},
  async (req, username, password, cb) => {
    console.log("we are registering a user : " + Date.now());
    //Create User first 
    //use sequelize transactions to avoid parent insertion without child
    let dbtransaction = await sequelize.transaction();
    
    User.create({
      email: req.body.email,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      provider: 'codez',
      paranoid: false
    }, { transaction: dbtransaction })
      .then(async (dbUserData) => {
        if (!dbUserData) {
          console.error('internal db failure while creating user: ' + err);
          await dbtransaction.rollback();
          return cb(null, false, { message: errorParser(err) })
        }
        else {
          UserAccount.create({
            username: username,
            password: password,
            userid: dbUserData['id']
          }, {transaction: dbtransaction}).then(async (dbUserAccountData) => {
            if (!dbUserAccountData) {
              console.error('internal db failure while creating user: ' + err);
              await dbtransaction.rollback();
              return cb(null, false, { message: errorParser(err) })
            } else{
              let user = dbUserData['dataValues'];
              user.username = username;
              await dbtransaction.commit();
              return cb(null, user);
            }
          }).catch(async (err) => {
            await dbtransaction.rollback();
            return cb(null, false, { message: errorParser(err) })
          })
        }
        
      }
      )
      .catch(err => {
        console.error('internal db failure while storing user: ' + err);
        return cb(null, false, { message: errorParser(err) })
      });
  }
));


passport.serializeUser(function (user, done) {
  console.log('we came to store a session : ' + JSON.stringify(user));
  process.nextTick(function () {
    done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  console.log('we came to retrieve a session : ' + JSON.stringify(user));
  process.nextTick(function () {
    done(null, user);
  });
});


//http://localhost:3001/api/users/login


router.post('/', passport.authenticate('local', {
  successReturnToOrRedirect: '/api/tips/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/signup', passport.authenticate('local-signup', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/register',
  failureMessage: true
}));




module.exports = router;



/**
 * Implement temporary sessions
 * Implement logout
 * limit passport middleware to my tips/my accounts page
 * 
 */