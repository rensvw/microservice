module.exports = function auth(options) {

  const bcrypt = require('bcrypt');
  const saltRounds = 14;

  this.add({role:'auth',cmd:'signup'}, signup);
  //this.add({role:'auth',cmd:'signup',verify:'sms'}, signup);
  //this.add({role:'auth',cmd:'signup',verify:'email'}, signup);     
  this.add({role:'auth',cmd:'authenticate'}, authenticate);
  this.add({role:'auth',cmd:'authenticate',tfa:'sms'}, authenticateWithTextMessage);

  //working
  function signup(msg, respond) {
    let email = msg.email;
    let fullName = msg.fullName;
    let password = msg.password;
    let countryCode = msg.countryCode;
    let mobilePhoneNumber = msg.mobilePhoneNumber;
    let seneca = this;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      seneca.act('role:user,cmd:create,checkExistingUser:true',{
      email: email,
      fullName: fullName,
      password: hash,
      countryCode: countryCode,
      mobilePhoneNumber: mobilePhoneNumber
    }, respond);
      
    });
  
  }

  function authenticate(msg,respond){
    let email = msg.email;
    let password = msg.password;
    let seneca = this;
    seneca.act('role:user,cmd:get',{
      email:email
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
        bcrypt.compare(password, user.password, function(err, res) {
          if(err){
            respond(err,null);
          }
          else if (!res){
            respond(null,{
              succes: false,
              message: "Username or password is incorrect!"
            });
          }
          else if(res){
            respond(null,{
              user: { email: user.email,
              fullName: user.fullName},
              succes: true,
              message: "Username and password is correct!"
            })
          }
        });
      }
    });
  }

  function authenticateWithTextMessage(msg, respond) {
    let email = msg.email;
    let password = msg.password;
    let seneca = this;
    seneca.act('role:user,cmd:get', {
      email: email
    }, function (err, user) {
      if (err) {
        respond(err, null);
      } else if (!user) {
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
                seneca.act('role:sms,cmd:send', {
                  email: email,
                  to: (user.countryCode + user.mobilePhoneNumber)
                }, function (err) {
                  if (err) {
                    respond(err, null);
                  } else {
                    respond({
                      user: {
                        email: user.email,
                        fullName: user.fullName,
                        guid: "GUID",
                      },
                      succes: true,
                      message: "Username and password is correct, we've send you a code in a text message!"
                    });
                  }
                });
              }
            });
          }
        });
      }
  };