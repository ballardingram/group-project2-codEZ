require('dotenv').config()
var passport = require('passport')
const express = require('express')
const routes = require('./routes');
const app = express()
var path = require('path');
// const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
const session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const { v4: uuidv4 } = require('uuid'); 
// var http = require('http').Server(app);



const sequelize = require('./config/connection');
const { builtinModules } = require('module');
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
  genid: function(req) { return uuidv4()},
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

// app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});


app.use(routes);





app.use((req, res) => {
    res.sendFile(__dirname+'/public/html/homepage.html');
  });


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

module.exports = app;