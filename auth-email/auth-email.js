module.exports = function auth(options) {

  const moment = require("moment");
  const Promise = require("bluebird");

  var act = Promise.promisify(this.act, {context: this});

 function authenticateAndSendEmail(msg,respond){
      let email = msg.email;
      let password = msg.password;
    act("role:user,cmd:get", {email: email})
      .then((user) => {
        if (user.succes) {
          act("role:hash,cmd:comparePasswords", {password: password,hash: user.password})
            .then((authenticated) => {
              if (authenticated.succes) {
                return act("role:email,cmd:send,type:2fa", {email: email})
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

 function verifyEmailCode(msg, respond) {
    let uuid = msg.uuid;
    let code = msg.code;
    let seneca = this;
    act("role:user,cmd:get,param:uuid", {uuid: uuid})
      .then((user) => {
        if (!user) {
          respond(user);
        } else if (user) {
          let emailCodes = user.emailCodes;
          let newTime = moment(emailCodes[emailCodes.length - 1].timeCreated).add(4, "m");
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

  this.add({role:"auth",cmd:"authenticate",mfa:"email"}, authenticateAndSendEmail);
  this.add({role:"auth",cmd:"verify",mfa:"email"}, verifyEmailCode);


}