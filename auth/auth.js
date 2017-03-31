module.exports = function auth(options) {

  const bcrypt = require('bcrypt');
  const saltRounds = 14;

  this.add({role:'auth',cmd:'signup'}, signup);
  this.add({role:'auth',cmd:'authenticate'}, authenticate);

  //working
  function signup(msg, respond) {
    let email = msg.email;
    let fullName = msg.fullName;
    let password = msg.password;
    let countryCode = msg.countryCode;
    let mobilePhoneNumber = msg.mobilePhoneNumber;
    let seneca = this;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      seneca.act('role:user,cmd:create',{
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
    console.log(password);
    
    seneca.act('role:user,cmd:get',{
      email:email
    },function(err,user){
      console.log(user);
      if(err){
        respond(err,null);
      }
      if(user){

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
              succes: true,
              message: "Welcome!"
            });
          }
        });
      }
    });
  
  }

};