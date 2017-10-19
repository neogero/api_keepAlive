/**
 * author: Gerardo rodriguez grodriguez@gmail.com
 * 
 */

 // Libreries
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


 //configuration File
 configuration = require('./configuration/default.json');


 //Connect to database
 dbMongoConnection();

 //Initialize Server App
var app = express();

//Configuring Server App.
app.use(cors());
app.use(bodyParser.json());


// APP ROUTES - BEGIN
app.get('/', require('./controller/message.js').get);
app.post('/', require('./controller/message.js').new);
// APP ROUTES - END


//Starting Server App
if(configuration.server.onlyLocalhost){
  app.listen(configuration.server.port, 'localhost', function(){
    console.log('MSG: App Listening in port: '+ configuration.server.port + ' ONLY on localhost');
  });
}else{
  app.listen(configuration.server.port, function(){
    console.log('MSG: App Listening in port: '+ configuration.server.port);
  });
}


// Connect to MongoDB Database
function dbMongoConnection(){
	var dbConnectionString = 'mongodb://' + configuration.ddbb.host + ':' + configuration.ddbb.port + '/' + configuration.ddbb.database; 
	mongoose.connect(dbConnectionString, function(err){
  		if(err){
    		console.log("ERROR: I can't connect to MongoDB, please check Mongo Server Status");
    		process.exit(1);
  		}else{
    		console.log("MSG: MongoDB it's OK");
  		}
	});
}
