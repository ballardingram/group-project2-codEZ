const express = require('express')
require('dotenv').config()
const routes = require('./routes');
const app = express()
var path = require('path');
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const PORT = process.env.PORT || 3001;
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/frontend'))

app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res) => {
    res.sendFile(__dirname+'/frontend/html/homepage.html');
  });

app.use(routes);
app.listen(PORT, () => console.log('Now listening'));