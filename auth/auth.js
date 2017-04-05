let moment = require('moment');
var Promise = require('bluebird');


module.exports = function auth(options) {

  var act = Promise.promisify(this.act, {context: this});

  const bcrypt = require('bcrypt');
  const saltRounds = 14;

  this.add({role:'auth',cmd:'signup'}, signup);
  //this.add({role:'auth',cmd:'signup',tfa:'sms'}, signupWithSMSVerification);
  //this.add({role:'auth',cmd:'signup',verify:'email'}, signup);     
  this.add({role:'auth',cmd:'authenticate'}, authenticate);
  this.add({role:'auth',cmd:'authenticate',tfa:'sms'}, authenticateAndSendSMSCode);
  this.add({role:'auth',cmd:'verify',tfa:'sms'}, verifySMSCode);

  /*function signupWithSMSVerification(msg,respond){
    let email = msg.email;
    let fullName = msg.fullName;
    let password = msg.password;
    let countryCode = msg.countryCode;
    let mobilePhoneNumber = msg.mobilePhoneNumber;
    let seneca = this;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      act('role:user,cmd:create,checkExistingUser:true', {
        email: email,
        fullName: fullName,
        password: hash,
        countryCode: countryCode,
        mobilePhoneNumber: mobilePhoneNumber
      })
      .then((result) => {
        if(result.succes){
          act('role:sms,cmd:save,send:true',{
             email: email,
          })
          .then((sms) => {
            respond({
                    succes: true,
                    uuid: result.uuid,
                    message: "Username and password are correct, we've send you a code in a text message!"
                  });

          })
          .catch((err) => {
            
          })
        }
        if(!result.succes){

        }
      })
      .catch((err) => {

      })
    });
  }
*/
  function signup(msg, respond) {
    let email = msg.email;
    let fullName = msg.fullName;
    let password = msg.password;
    let countryCode = msg.countryCode;
    let mobilePhoneNumber = msg.mobilePhoneNumber;
    let seneca = this;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      seneca.act('role:user,cmd:create,checkExistingUser:true', {
        email: email,
        fullName: fullName,
        password: hash,
        countryCode: countryCode,
        mobilePhoneNumber: mobilePhoneNumber
      }, respond);
    });
  }

  function authenticate(msg, respond) {
    let email = msg.email;
    let password = msg.password;
    let seneca = this;
    act('role:user,cmd:get', {
        email: email
      })
      .then(function (user) {
        if (!user) {
          respond(null, {
            succes: false,
            message: "User could not be found!"
          });
        } else if (user) {
          bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
              respond(err, null);
            } else if (!res) {
              respond(null, {
                succes: false,
                message: "Username or password is incorrect!"
              });
            } else if (res) {
              respond(null, {
                user: {
                  email: user.email,
                  fullName: user.fullName
                },
                succes: true,
                message: "Username and password are correct!"
              })
            }
          });
        }
      })
      .catch(function (err) {
        respond(err);
      });
  }

  function authenticateAndSendSMSCode(msg, respond) {
    let email = msg.email;
    let password = msg.password;
    let seneca = this;
    act('role:user,cmd:get', {
        email: email
      }).then(function (user) {
        if (!user) {
          respond({
            succes: false,
            message: "User could not be found!"
          });
        } else if (user) {
          bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
              respond(err, null);
            } else if (!res) {
              respond({
                succes: false,
                message: "Username or password is incorrect!"
              });
            } else if (res) {
              act('role:sms,cmd:save,send:false', {
                  email: email,
                }).then(function (result) {
                  respond({
                    succes: true,
                    uuid: result.uuid,
                    message: "Username and password are correct, we've send you a code in a text message!"
                  });
                })
                .catch(function (err) {
                  respond(err);
                });
            }
          });
        }
      })
      .catch(function (err) {
        respond(err, null);
      });
  }

  function verifySMSCode(msg, respond) {
    let uuid = msg.uuid;
    let code = msg.code;
    let seneca = this;
    act('role:user,cmd:get,param:uuid', {
        uuid: uuid
      })
      .then(function (user) {
        if (!user) {
          respond({
            succes: false,
            message: "User could not be found!"
          });
        } else if (user) {
          let smsCodes = user.smsCodes;
          let newTime = moment(smsCodes[smsCodes.length - 1].timeCreated).add(4, 'm');
          if (newTime > moment()) {
            if (code == smsCodes[smsCodes.length - 1].code) {
              respond({
                succes: true,
                user: {
                  email: user.email,
                  fullName: user.fullName
                },
                message: "Code is correct, welcome!"
              });
            } else {
              respond({
                succes: false,
                message: "Code is incorrect!"
              })

            }
          } else {
            respond({
              succes: false,
              message: "you are to late!"
            })
          }
        }
      })
      .catch(function (err) {
        respond(err);
      })
  }

  };