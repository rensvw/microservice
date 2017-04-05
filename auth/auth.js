let moment = require('moment');

module.exports = function auth(options) {

  const bcrypt = require('bcrypt');
  const saltRounds = 14;

  this.add({role:'auth',cmd:'signup'}, signup);
  //this.add({role:'auth',cmd:'signup',verify:'sms'}, signup);
  //this.add({role:'auth',cmd:'signup',verify:'email'}, signup);     
  this.add({role:'auth',cmd:'authenticate'}, authenticate);
  this.add({role:'auth',cmd:'authenticate',tfa:'sms'}, authenticateAndSendSMSCode);

  this.add({role:'auth',cmd:'verify',tfa:'sms'}, verifySMSCode);
  

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

  function authenticateAndSendSMSCode(msg, respond) {
    let email = msg.email;
    let password = msg.password;
    let seneca = this;
    seneca.act('role:user,cmd:get', {
      email: email
    }, function (err, user) {
      if (err) {
        respond(err, null);
      } else if (!user) {
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
                seneca.act('role:sms,cmd:save,send:false', {
                  email: email,
                }, function (err,result) {
                  if (err) {
                    respond(null);
                  } else {
                    respond({
                      succes: true,
                      uuid: result.uuid,
                      message: "Username and password is correct, we've send you a code in a text message!"
                    });
                  }
                });
              }
            });
          }
        });
      }

      function verifySMSCode(msg,respond){
      let uuid = msg.uuid;
      let code = msg.code;
      let seneca = this;
    seneca.act('role:user,cmd:get,param:uuid', {
      uuid: uuid
    }, function (err, user) {
      if (err) {
        respond(err, null);
      } else if (!user) {
        respond({
          succes: false,
          message: "User could not be found!"
        });
      } else if (user) {
        console.log(user);
        let smsCodes = user.smsCodes;

        let newTime = moment(smsCodes[smsCodes.length-1].timeCreated).add(4, 'm');
        console.log(newTime);
        if(newTime > moment()){
          if(code==smsCodes[smsCodes.length-1].code){
              respond({
              succes: true,
              user: {
                email: user.email,
                fullName: user.fullName
              },
              message: "Code is correct, welcome!"
            });
          }
          else{
            respond({succes:false,
            message: "Code is incorrect!"})

          }
        }
        else{
          respond({succes:false,
            message: "you are to late!"})
        }
    }}
    )};

  };