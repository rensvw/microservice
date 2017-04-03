const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);
const randomID = require('random-id');

module.exports = function sms(options){

    this.add({role:'sms',cmd:'send'}, sendTextMessage);
    this.add({role:'sms',cmd:'createCode'}, createSMSCode)

    function sendTextMessage(msg,respond){
        let message = "test";
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

    function createSMSCode(msg,respond){
        let code = randomID(6,'0');
        let email = msg.email;
        this.act('role:user,cmd:addSMSCodeToUser',{
      email:email,
      code: code
    },function(err,user){
      if(err){
        respond(err,null);
      }
      else if(!user){
        respond(null,{
          succes: false,
          message: "User could not be found!"
        });
      }
      else if(user){
         if(err){
                respond(err,null);
            }
            else{
                respond;
            }

      }
    });
    }

};