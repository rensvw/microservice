 module.exports = function user( options ) {

this.add({role:'user',cmd:'create'}, createUser);
this.add({role:'user',cmd:'create', checkExistingUser:'true'}, createUserWhileCheckingForExistingUser);
this.add({'role':'user','cmd':'get'}, getUser);

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
//working
function createUser(msg, respond) {
  var user = this.make$('user');
  user.email = msg.email;
  user.fullName = msg.fullName;
  user.password = msg.password;
  user.countryCode = msg.countryCode;
  user.mobilePhoneNumber = msg.mobilePhoneNumber;
  user.verified = false;
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

function createUserWhileCheckingForExistingUser(msg, respond) {
  var user = this.make$('user');
  user.email = msg.email;
  user.fullName = msg.fullName;
  user.password = msg.password;
  user.countryCode = msg.countryCode;
  user.mobilePhoneNumber = msg.mobilePhoneNumber;
  user.verified = false;
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

 