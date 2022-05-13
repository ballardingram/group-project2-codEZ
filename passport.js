const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('./models');
const bcrypt = require('bcrypt');

/* Actual authentication logic, getting user from DB, validating password sending user back */
passport.use('local', new LocalStrategy(
    (username, password, cb) => {
        console.log("we are validateing user : " + Date.now());
        User.findOne({
            attributes: { include: ['password'] },
            where: {
                username: username
            }
        }).then(async(user) => {
            if (!user) {
                return cb(null, true, { message: 'USER_NOT_FOUND' });
            }
            if (username == user['username'] && await bcrypt.compare(password, user['password'])) {
                let userData = user['dataValues'];
                userData['password'] = undefined;
                return cb(null, userData, {message: "SUCCESS"});
            }
            else {
                console.log("******");
                return cb(null, true, {message: "WRONG_CREDS"});
            }
        }).catch(err => {
            return cb(null, false, { message: 'internal db error: ' + err });
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});




