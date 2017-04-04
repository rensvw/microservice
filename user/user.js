var moment = require('moment');

module.exports = function user( options ) {

this.add({role:'user',cmd:'create'}, createUser);
this.add({role:'user',cmd:'create', checkExistingUser:'true'}, createUserWhileCheckingForExistingUser);
this.add({'role':'user','cmd':'get'}, getUser);
this.add({'role':'user','cmd':'update'}, updateUser);


this.add({'role':'user','cmd':'addSMSCodeToUser'}, addSMSCodeToUser);

function getUser(msg, respond) {
  var user = this.make$('user');
  var email = msg.email;
  user.load$({
    email: email
  }, function (err, user) {
    if (err) {
      respond(err, null);
    }
    if (!user) {
      respond(err, null);
    }
    if (user) {
      respond(err, {
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        countryCode: user.countryCode,
        mobilePhoneNumber: user.mobilePhoneNumber,
        verified: user.verified
      });
    }
  });
}

function updateUser(msg,respond){
  console.log('testsdfsdfgdfsdg')
  let email = msg.email;
  this.act('role:user,cmd:get',{
    email: email
  }, function(err,user){
    if(err){
      respond(er,null);
    }
    if(!user){
      respond({
        succes:false,
        message:'User could not be found!'});
    }
    if(user){
      console.log("HIER ZET IK DE USER,",user);
      user.email = msg.email || user.email;
      user.password = msg.password || user.password;
      user.fullName = msg.fullName || user.fullName;
      user.countryCode = msg.countryCode || user.countryCode;
      user.mobilePhoneNumber = msg.mobilePhoneNumber || user.mobilePhoneNumber;
      user.verified = msg.verified | user.verified;
      if(msg.code){
        user.smsCodes.push({
          code: msg.code,
          timeCreated: moment()})
      }
      user.save$(function(err,user){
        respond(console.log(user));
      });
    }
  });
}

function addSMSCodeToUser(msg, respond) {
  let user = this.make$('user');
  let email = msg.email;
  let code = msg.code;
  user.load$({
    email: email
  }, function (err, user) {
    if (err) {
      respond(err, null);
    }
    if (!user) {
      respond(err, null);
    }
    if (user) {
      user.smsCodes.push({
        code: msg.code,
        timeCreated: moment()
      });
      user.save$((err, user) => {
        if (err) {
          respond(err, null);
        }
        if (user) {
          respond(err, {
            message: "Added sms code to SMSCodes table",
            succes: true,
            code: code
          });
        }
      });
    }
  });

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
  user.smsCodes = {};
  user.save$((err, user) => {
    if (err) {
      respond(err, null);
    }
    if (user) {
      respond(err, {
        message: "Account created!",
        succes: true,
        email: user.email
      });
    }
  });
}

//Creates an user, but first checks of an user already exists with the same email.
function createUserWhileCheckingForExistingUser(msg, respond) {
  var user = this.make$('user');
  user.email = msg.email;
  user.fullName = msg.fullName;
  user.password = msg.password;
  user.countryCode = msg.countryCode;
  user.mobilePhoneNumber = msg.mobilePhoneNumber;
  user.verified = false;
  user.smsCodes = {};
  this.act('role:user,cmd:get', {
      email: user.email
    }, function (err, user) {
      if (err) {
        respond(err, null);
      } else if (user) {
        respond(null, {
          succes: false,
          message: "Email does already exist!"
        });
      } else {
        user.save$((err, user) => {
          if (err) {
            respond(err, null);
          }
          if (user) {
            respond(err, {
              message: "Account created!",
              succes: true,
              email: user.email
            });
          }
        });
      }
    }
  );
}
};

 