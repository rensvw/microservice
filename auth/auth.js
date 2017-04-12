let moment = require('moment');
var Promise = require('bluebird');
const randomID = require('random-id');



module.exports = function auth(options) {

  var act = Promise.promisify(this.act, {context: this});

  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  this.add({role:'auth',cmd:'signup'}, signup);     
  this.add({role:'auth',cmd:'authenticate'}, authenticate);
  this.add({role:'auth',cmd:'authenticate',tfa:'sms'}, authenticateAndSendSMSCode);
  this.add({role:'auth',cmd:'authenticate',tfa:'email'}, authenticateAndSendEmail);
  
  this.add({role:'auth',cmd:'verify',tfa:'sms'}, verifySMSCode);
  this.add({role:'auth',cmd:'verify',tfa:'email'}, verifyEmailCode);
  
  this.add({role:'auth',cmd:'hash'}, hashPassword);
  this.add({role:'auth',cmd:'comparePasswords'}, comparePassword);
  
  //this.add({role:'auth',cmd:'verify',tfa:'email'}, verifyEmailCode);
  
  function hashPassword(msg,respond){
    bcrypt.hash(msg.password, saltRounds, function (err, hash) {
     respond({password: hash});
    });
  }
  
function comparePassword(msg, respond) {
  bcrypt.compare(msg.password, msg.hash, function (err, res) {
    if (err) {
      respond(err, null);
    } else if (!res) {
      respond(null, {
        succes: false,
        message: "Username or password is incorrect!"
      });
    } else if (res) {
      respond(null, {
        succes: true,
        message: "Username and password are correct!"
      });
    }
  });
}

  function signup(msg, respond) {
    let email = msg.email;
    let fullName = msg.fullName;
    let password = msg.password;
    let countryCode = msg.countryCode;
    let mobilePhoneNumber = msg.mobilePhoneNumber;
    act('role:auth,cmd:hash',{ password: password})
    .then((hash) => {
      return act('role:user,cmd:create,checkExistingUser:true', {
        email: email,
        fullName: fullName,
        password: hash.password,
        countryCode: countryCode,
        mobilePhoneNumber: mobilePhoneNumber
      });
    })
    .then((user) => {
      respond(user);
    })
    .catch((err) => {
      respond(err);
    })
      
  }

  function authenticate(msg, respond) {
    let email = msg.email;
    let password = msg.password;
    let seneca = this;
    act('role:user,cmd:get', {
        email: email
      })
      .then((user) => {
        if (!user.succes) {
          return respond({
            succes: false,
            message: "Username or password is incorrect!"
          });
        } else {
          act('role:auth,cmd:comparePasswords', {
              password: password,
              hash: user.password
            })

            .then((result) => {
              if (result.succes) {
                return respond({
                  succes: result.succes,
                  message: result.message,
                  user: user
                });
              } else {
                return respond({
                  succes: false,
                  message: "Username or password is incorrect!"
                });
              }
            })
            .catch((err) => {
        return respond(err);
      });
        }
      })

      .catch((err) => {
        return respond(err);
      });
  }

  function authenticateAndSendSMSCode(msg, respond) {
    let email = msg.email;
    let password = msg.password;
    act('role:user,cmd:get', {
        email: email
      })
      .then((user) => {
        if (user.succes) {
          act('role:auth,cmd:comparePasswords', {
              password: password,
              hash: user.password
            })
            .then((authenticated) => {
              if (authenticated.succes) {
                return act('role:sms,cmd:save,send:false', {
                    email: email
                  })
                  .then((result) => {
                    return respond({
                      succes: true,
                      uuid: result.uuid,
                      message: "Username and password are correct, we've send you a code in a text message!"
                    });
                  })
                  .catch((err) => {
                    return respond(err);
                  });
              } else {
                return respond({
                  succes: false,
                  message: "Username or password is incorrect!"
                });
              }
            })
            .catch((err) => {
              return respond(err);
            });
        } else {
          return respond({
            succes: false,
            message: "Username or password is incorrect!"
          });
        }
      })
      .catch((err) => {
        return respond(err);
      });
  }

    function authenticateAndSendEmail(msg,respond){
      let email = msg.email;
      let password = msg.password;
    act('role:user,cmd:get', {email: email})
      .then((user) => {
        if (user.succes) {
          act('role:auth,cmd:comparePasswords', {password: password,hash: user.password})
            .then((authenticated) => {
              if (authenticated.succes) {
                return act('role:email,cmd:send,type:2fa', {email: email})
                  .then((result) => {
                    return respond({
                      succes: true,
                      uuid: result.uuid,
                      message: "Username and password are correct, we've send you a code in an email!"
                    });
                  })
                  .catch((err) => {
                    return respond(err);
                  });
              } else {
                return respond({
                  succes: false,
                  message: "Username or password is incorrect!"
                });
              }
            })
            .catch((err) => {
              return respond(err);
            });
        } else {
          return respond({
            succes: false,
            message: "Username or password is incorrect!"
          });
        }
      })
      .catch((err) => {
        return respond(err);
      });
    }


  function verifySMSCode(msg, respond) {
    let uuid = msg.uuid;
    let code = msg.code;
    let seneca = this;
    act('role:user,cmd:get,param:uuid', {uuid: uuid})
      .then((user) => {
        if (!user) {
          respond(user);
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

   function verifyEmailCode(msg, respond) {
    let uuid = msg.uuid;
    let code = msg.code;
    let seneca = this;
    act('role:user,cmd:get,param:uuid', {uuid: uuid})
      .then((user) => {
        if (!user) {
          respond(user);
        } else if (user) {
          let emailCodes = user.emailCodes;
          let newTime = moment(emailCodes[emailCodes.length - 1].timeCreated).add(4, 'm');
          if (newTime > moment()) {
            if (code == emailCodes[emailCodes.length - 1].code) {
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