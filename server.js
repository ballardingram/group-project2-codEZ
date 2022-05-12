const express = require('express')
require('dotenv').config()
const routes = require('./routes');
const app = express()
var path = require('path');
const PORT = process.env.PORT || 3001;
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/frontend'))
app.use((req, res) => {
    res.sendFile(__dirname+'/frontend/html/homepage.html');
  });

app.use(routes);
app.listen(PORT, () => console.log('Now listening'));