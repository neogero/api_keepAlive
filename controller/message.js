//var Message = require('../model/message.js');

module.exports.new = function(req, res){
	//var message = new Message();
	
    if(req.body){
        //example.exString = req.body.exString;
   
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        //example.clientIp = ip;
        // save message into database
        /*example.save(function(err){
            if(err){
                res.send(err); // TODO - make a better exception control.
            }else{
                res.json({response: 'process'});
            }
        });*/

        console.log('Peticion Recibida de ' + ip);
   
    }else{
        res.json({response: 'incorrect json file'});
    }
   
}