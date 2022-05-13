require('dotenv').config()
require('./passport')
const express = require('express')
const routes = require('./routes');
const app = express()
var path = require('path');
const session = require('express-session');


const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.sendFile(__dirname+'/public/html/homepage.html');
  });


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});