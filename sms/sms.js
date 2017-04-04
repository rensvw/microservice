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

    function createSMSCodeAndSendTextMessage(msg, respond) {
        let smsCode = randomID(6, '0');
        let email = msg.email;
        this.act('role:user,cmd:update,service:sms', {
            email: email,
            smsCode: smsCode
        }, function (err, user) {
            if (err) {
                respond(err, null);
            }
            if (user.succes == true) {
                this.act('role:sms,cmd:send', {
                    message: smsCode,
                    to: user.countryCode + user.mobilePhoneNumber
                }, function (err, result) {
                    if (err) {
                        respond(err, null)
                    } else {
                        respond(err, {
                            uuid: user.uuid,
                            message: result.message
                        });
                    }
                });
            }
            if (user.succes == false) {
                respond(err, {
                    message: "Something went wrong while updating the user object!"
                })
            }
        });
    }
       

};