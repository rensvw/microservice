const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);

module.exports = function sms(options){

    this.add({role:'sms',cmd:'send'}, sendTextMessage);

    function sendTextMessage(msg,respond){
        let message = msg.message;
        let to = msg.to;
        let from = config.sendingNumber;
        client.messages.create({
            body: message,
            to: to,
            from: from
        }, function(err,data){
            if(err){
                respond(err,null);
            }
            else{
                respond({message:"SMS has been send!"});
            }
        });
    }

};