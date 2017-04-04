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
  var user = this.make$('user');
  user.load$({
    email: msg.email
  }, function(err,result){
    result.data$({
      smsCode: {
        code: msg.smsCode,
        timeCreated: moment()}
    });
    result.save$(function(err,user){
      respond(err,user.data$(false));
    });
    }
  );
  
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
  user.smsCode = {};
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
  user.smsCode = {};
  this.act('role:user,cmd:get', {
    email: user.email
  }, function (err, newUser) {
    if (err) {
      respond(err, null);
    } else if (newUser) {
      respond(null, {
        succes: false,
        message: "Email does already exist!"
      });
    } else if (!newUser) {
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
  });
}
};

 