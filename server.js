require('dotenv').config()
var passport = require('passport')
const express = require('express')
const routes = require('./routes');
const exphbs = require('express-handlebars');
var path = require('path');

const app = express();
app.use('/public',express.static(path.join(__dirname, './public')));

const hbs = exphbs.create({defaultLayout: 'main'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');





var cookieParser = require('cookie-parser');
const session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const { v4: uuidv4 } = require('uuid'); 


const sequelize = require('./config/connection');
const { builtinModules } = require('module');
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(cookieParser());

app.use(session({
  genid: function(req) { return uuidv4()},
  secret: 'thisisforproject2',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 30 * 60 * 1000 , // The maximum age (in milliseconds) of a valid session.
    unset: 'destroy'    
      }),
      cookie: {
        maxAge: 30 * 60 * 1000, //30 minutes
        sameSite: false,
        secure: false
      }
  }),
);
app.use((req,res,next) => { 
  res.locals.session = req.session;
  next();
});

app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});

app.use(passport.initialize());
app.use(passport.session());
//any middleware adding from here on causng mulitple logins
app.use(routes);

sequelize.sync({ force: false }).then(() => {

  app.listen(PORT, () => console.log('Now listening'));
});

module.exports = app;