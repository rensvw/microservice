module.exports = function auth(options) {

  const bcrypt = require('bcrypt');
  const saltRounds = 14;

  this.add({role:'auth',cmd:'signup'}, signup);
  this.add({role:'auth',cmd:'authenticate'}, signup);

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
    }, respond)
  });
  }

  function authenticate(msg,respond){
    let email = msg.email;
    let password = msg.password;
    this.act('role:user,cmd:get',{
      email:email
    },function(err,user){
      if(err){
        respond(console.log(err),null)
      }
      else{
        console.log(user);
        if(!user){
          respond(null,{message:"User could not be found!"})
        }
        else if (user){
          let hash = user.password;
          bcrypt.compare(password,hash,function(err,response){
            if(!response){
              respond(null,{message:"Authentication failed, username or password is wrong!"})
            }
            else{
              respond(null,{
                succes:true,
                email:user.email,
                password:user.password
              })
            }
          })
        }
      }
    })
  }

}