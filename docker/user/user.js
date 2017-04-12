module.exports = function user( options ) {

const moment = require('moment');
const uuidV4 = require('uuid/v4');


this.add({role:'user',cmd:'create'}, createUser);
this.add({role:'user',cmd:'create', checkExistingUser:'true'}, createUserWhileCheckingForExistingUser);
this.add({'role':'user','cmd':'get'}, getUser);
this.add({'role':'user','cmd':'get','param':'uuid'}, getUserByUuid);

this.add({'role':'user','cmd':'update','service':'sms'}, updateUserWithSMSCode);

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

function getUserByUuid(msg, respond) {
  let user = this.make$('user');
  let uuid = msg.uuid;
  user.load$({
    uuid: uuid
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
        verified: user.verified,
        uuid: user.uuid,
        smsCodes: user.smsCodes
      });
    }
  });
}

function updateUserWithSMSCode(msg,respond){
  var user = this.make$('user');
  user.load$({
    email: msg.email
  }, function(err,result){
    result.data$(result.smsCodes.push(
      {
        code: msg.code,
        timeCreated: moment().format('LLL'),
      })
    );
    result.data$({
      uuid:uuidV4()
    });
    result.save$(function(err,user){
      respond(err,{ succes:true,
      message: "Succesfully added the generated code to the user object!",
      uuid: user.uuid,
      countryCode: user.countryCode,
      mobilePhoneNumber: user.mobilePhoneNumber});
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
  user.smsCodes = [];
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
  user.smsCodes = [];
  user.uuid = null;
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

 