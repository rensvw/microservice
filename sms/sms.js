const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);
const randomID = require('random-id');
var Promise = require('bluebird');

module.exports = function sms(options){

    var act = Promise.promisify(this.act, {context: this});

    this.add({role:'sms',cmd:'send'}, sendTextMessage);
    this.add({role:'sms',cmd:'save',send:'true'}, createSMSCodeAndSendTextMessage)
    this.add({role:'sms',cmd:'save',send:'false'}, createSMSCode)
    
    
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

    function createSMSCodeAndSendTextMessage(msg, respond) {
        let smsCode = randomID(6, '0');
        let email = msg.email;
        act('role:user,cmd:update,service:sms', {
                email: email,
                code: smsCode
            })
            .then((user) => {
                if (user.succes) {
                    act('role:sms,cmd:send', {
                        message: smsCode,
                        to: user.countryCode + user.mobilePhoneNumber
                    }).then((result) => {
                        respond({
                            uuid: user.uuid,
                            message: result.message
                        });
                    }).catch((err) => {
                        respond(err, null)
                    })
                }
                if (!user.succes) {
                    respond({
                        message: "Something went wrong while updating the user object!"
                    })
                }
            })
            .catch((err) => {
                respond(err, null);
            })


    }
    /*function createSMSCodeAndSendTextMessage(msg, respond) {
        let smsCode = randomID(6, '0');
        let email = msg.email;
        console.log("BEFORE ACT")
        act('role:user,cmd:update,service:sms', {
            email: email,
            code: smsCode
        }).then(function (user) {
             console.log("in ACT")
                if (user.succes == true) {
                    act('role:sms,cmd:send', {
                            message: smsCode,
                            to: user.countryCode + user.mobilePhoneNumber
                        }).then(function (result) {
                            respond({
                                uuid: user.uuid,
                                message: result.message
                            });
                        })
                        .catch(function (err) {
                            respond(err, null);
                        })
                }
                if (user.succes == false) {
                    respond({
                        message: "Something went wrong while updating the user object!"
                    })
                }

            })
            .catch(function (err) {
                respond(err, null);
            })
    }*/


    function createSMSCode(msg, respond) {
        let smsCode = randomID(6, '0');
        let email = msg.email;
        act('role:user,cmd:update,service:sms', {
                email: email,
                code: smsCode
            })
            .then((user) => {
                if (user.succes) {
                    respond({
                        uuid: user.uuid,
                        message: "SMS Code created!"
                    });
                }
                if (!user.succes) {
                    respond({
                        message: "Something went wrong while updating the user object!"
                    })
                }
            })
            .catch((err) => {
                respond(err, null);
            });
    }


    };