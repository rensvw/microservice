module.exports = function user( options ) {

const Promise = require('bluebird');
var act = Promise.promisify(this.act, {context: this});

function getUserWithKey(msg, respond) {
  var user = this.make$('user-app');
  var email = msg.email;
  user.load$({
    email: email
  }, function (err, user) {
    if (err) {
      respond(err, null);
    }
    if (!user) {
      respond({
        succes: false,
        message: "User could not be found!"
      });
    }
    if (user) {
      respond(err, {
        succes: true,
        email: user.email,
        key: user.key
      });
    }
  });
}

//Creates an user, but first checks of an user already exists with the same email.
function createUserWithKeyWhileCheckingForExistingUser(msg, respond) {
  var user = this.make$('user-app');
  user.email = msg.email;
  this.act('role:user,cmd:get,type:totp', {
    email: user.email
  }, function (err, newUser) {
    if (err) {
      respond(err, null);
    } else if (newUser.succes) {
      respond(null, {
        succes: false,
        message: "Email does already exist!"
      });
    } else if (!newUser.succes) {
          user.key = msg.key;
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

this.add({role:'user',cmd:'create',type:'totp'}, createUserWithKeyWhileCheckingForExistingUser);
this.add({role:'user',cmd:'get',key:'totp'}, getUserWithKey);

};

 