var Message = require('../model/message.js');

module.exports.new = function(req, res){
	var message = new Message();
	
    if(req.body){
        //example.exString = req.body.exString;
   
        //PARSING DATA FROM POST REQUEST
        var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        message.clientIp = clientIp;

        message.uuid = req.body.uuid;
        message.model = req.body.model;
        message.platform = req.body.platform;
        message.version = req.body.version;
        message.manufacturer = req.body.manufacturer;
        message.serial = req.body.serial;
        message.message = req.body.message;
        message.at = req.body.at;
        
        // save message into database
 	    message.save(function(err){
            if(err){
                res.send(err); // TODO - make a better exception control.
            }else{
                res.json({response: 'process'});
            }
        });

        console.log('Peticion Recibida de ' + clientIp);
        //res.json({response: clientIp});
   
    }else{
        res.json({response: 'incorrect json file'});
    }
   
}

module.exports.get = function(req, res){
    var message = new Message();

    // get data from database
    Message.find({}).sort({date: -1}).exec(function(err, docs){
        var messageMap = {};

        if(!err){
        /*docs.forEach(function(message) {
            messageMap[message._id] = message;
        }, this);*/
        
            //res.send(messageMap);
            res.send(docs);
        }else{
            res.json(err);
        }
    });
}