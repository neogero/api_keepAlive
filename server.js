/**
 * author: Gerardo rodriguez grodriguez@gmail.com
 * 
 */

 // Libreries
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

 //configuration File
 configuration = require('./configuration/default.json');


//SEQUELIZE
const sequelize = new Sequelize('mysql://' + configuration.ddbb.user + ':' + configuration.ddbb.password + '@' + configuration.ddbb.host + ':'+ configuration.ddbb.port + '/' + configuration.ddbb.name);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



 //Initialize Server App
var app = express();


// CORST PROBLEM
var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.sendStatus(200);
    }
    else {
      next();
    }
};


//Configuring Server App.
app.use(allowCrossDomain);
app.use(bodyParser.json());


// APP ROUTES - BEGIN
app.get('/', function(req, res){
    res.send('Hello World');
    //res.json({response: 'process'});
});

app.post('/', require('./controller/message.js').new);
// APP ROUTES - END


//Starting Server App
app.listen(configuration.server.port);
console.log('MSG: App Listening in port: '+ configuration.server.port);


