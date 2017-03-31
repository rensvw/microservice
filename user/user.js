 module.exports = function user( options ) {

  this.add({'role':'user','cmd':'create'}, createUser);
  this.add({'role':'user','cmd':'get'}, getUser);

  function getUser(msg, respond) {
    
  }
  //working
  function createUser(msg, respond) {
    var user = this.make$('user');
    user.email = msg.email;
    user.fullName = msg.fullName;
    user.password = msg.password;
    user.countryCode = msg.countryCode;
    user.mobilePhoneNumber = msg.mobilePhoneNumber;
    user.verified = false;
    user.save$((err,user) => {
      respond(err,{
        message: "Account created!",
        succes: true,
        email: user.email
      });
    });
  }

 }