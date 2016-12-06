const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

app.use(express.static(path.join(__dirname, '/front/bundle')));
app.use(bodyParser.urlencoded({ extended: true }));
//router
// require('./router');
app.use(express.static(path.join(__dirname, '/front/bundle')));
app.use("/", require("./router"));

//listen on port 9999
app.listen('9999', () => console.log('Listening on port 9999'));


//////////
// YOUR CODE HERE:
//////////
