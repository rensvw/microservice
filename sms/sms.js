const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);
const randomID = require('random-id');

module.exports = function sms(options){

    this.add({role:'sms',cmd:'send'}, sendTextMessage);
    this.add({role:'sms',cmd:'save',send:'true'}, createSMSCodeAndSendTextMessage)

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

    function createSMSCodeAndSendTextMessage(msg,respond){
      
    }
       

};