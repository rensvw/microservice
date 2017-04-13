const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);
const randomID = require('random-id');
var Promise = require('bluebird');

module.exports = function sms(options){

    var act = Promise.promisify(this.act, {context: this});

    this.add({role:'sms',cmd:'send'}, sendTextMessage);
    this.add({role:'sms',cmd:'save',send:'true'}, sendTextMessageWithCode)
    this.add({role:'sms',cmd:'save',send:'false'}, createSMSCodeAndSave)
    
    
    function sendTextMessage(msg, respond) {
        let message = msg.message;
        let to = msg.to;
        let from = config.sendingNumber;
        client.messages.create({
            body: message,
            to: to,
            from: from
        }, function (err, data) {
            if (err) {
                respond(err, null);
            } else {
                respond({
                    message: "SMS has been send!"
                });
            }
        });
    }

    function sendTextMessageWithCode(msg, respond) {
        act('role:generate,cmd:code')
            .then((generatedCode) => {
                return act('role:user,cmd:update,service:2fa', {
                        type: 'sms',
                        email: msg.email,
                        code: generatedCode.code
                    })
                    .then((savedCode) => {
                        if (savedCode.succes) {
                            return act('role:sms,cmd:send', {
                                    message: savedCode.code,
                                    to: savedCode.countryCode + savedCode.mobilePhoneNumber
                                })
                                .then((smsSent) => {
                                    return respond({
                                        uuid: savedCode.uuid,
                                        message: smsSent.message
                                    });
                                })
                                .catch((err) => {
                                    respond(err)
                                })
                        } else {
                            return respond({
                                succes: false,
                                message: 'User could not be found!'
                            })
                        }
                    })
            })
            .catch((err) => {
                respond(err)
            })
    }


    function createSMSCodeAndSave(msg, respond) {
        act('role:generate,cmd:code')
        .then((generatedCode) => {
            return act('role:user,cmd:update,service:2fa',{ 
                type:'sms', 
                email: msg.email, 
                code: generatedCode.code
            });
        })
        .then((savedCode)=>{
            if(savedCode.succes){
            respond({
                succes:true,
                message: savedCode.message,
                uuid: savedCode.uuid
            });
        }
        else{
            respond({
                succes:false,
                message: savedCode.message,
            });
        }
        })
        .catch((err) => {
            respond(err);
        });
    }
}