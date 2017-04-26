module.exports = function auth(options) {

  let moment = require("moment");
  const Promise = require("bluebird");
  const randomID = require("random-id");

  var act = Promise.promisify(this.act, {context: this});

  function signup(msg, respond) {
    let email = msg.email;
    let fullName = msg.fullName;
    let password = msg.password;
    let countryCode = msg.countryCode;
    let mobilePhoneNumber = msg.mobilePhoneNumber;
    act("role:hash,cmd:newHash",{ password: password})
    .then((hash) => {
      return act("role:user,cmd:create,checkExistingUser:true", {
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
    act("role:user,cmd:get", {
        email: email
      })
      .then((user) => {
        if (!user.succes) {
          return respond({
            succes: false,
            message: "Username or password is incorrect!"
          });
        } else {
          act("role:hash,cmd:comparePasswords", {
              password: password,
              hash: user.password
            })
            .then((result) => {
              if (result.succes) {
                return respond({
                  succes: result.succes,
                  message: result.message,
                  user: {
                    fullname: user.fullName,
                    email: user.email
                  }
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

  this.add({role:"auth",cmd:"signup"}, signup);     
  this.add({role:"auth",cmd:"authenticate",mfa:"none"}, authenticate);

  };