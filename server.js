const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

app.use(express.static(path.join(__dirname, '/front/bundle')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
});

//listen on port 8888
app.listen('9999', () => console.log('Listening on port 9999'));


//////////
// YOUR CODE HERE:
//////////
