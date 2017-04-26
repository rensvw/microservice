module.exports = function user( options ) {

const moment = require("moment");
const uuidV4 = require("uuid/v4");

function getUser(msg, respond) {
  var user = this.make$("user");
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
        password: user.password,
        fullName: user.fullName,
        countryCode: user.countryCode,
        mobilePhoneNumber: user.mobilePhoneNumber,
        verified: user.verified,
        uuid: user.uuid,
        smsCodes: user.smsCodes,
        emailCodes: user.emailCodes
      });
    }
  });
}

function getUserByUuid(msg, respond) {
  let user = this.make$("user");
  let uuid = msg.uuid;
  user.load$({
    uuid: uuid
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
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        countryCode: user.countryCode,
        mobilePhoneNumber: user.mobilePhoneNumber,
        verified: user.verified,
        uuid: user.uuid,
        smsCodes: user.smsCodes,
        emailCodes: user.emailCodes
      });
    }
  });
}

function updateUserWithUuid(msg,respond){
  var user = this.make$("user");
  user.load$({
    email: msg.email
  }, function(err,result){
    if (!result) {
      respond({
        succes: false,
        message: "User could not be found!"
      });
    }
    result.data$({
      uuid:uuidV4()
    });
    result.save$(function(err,user){
        respond(err,{ succes:true,
          message: "Succesfully added the uuid to the user!",
          uuid: user.uuid,    
      })
    }
  );
})}


function updateUserWithCode(msg,respond){
  var user = this.make$("user");
  user.load$({
    email: msg.email
  }, function(err,result){
    if (!result) {
      respond({
        succes: false,
        message: "User could not be found!"
      });
    }
    if(msg.type==="email"){
      result.data$(result.emailCodes.push(
        {
          code: msg.code,
          timeCreated: moment().format("LLL"),
        })
      );
    }
    else if (msg.type==="sms"){
      result.data$(result.smsCodes.push(
        {
          code: msg.code,
          timeCreated: moment().format("LLL"),
        })
      );

    }
    result.data$({
      uuid:uuidV4()
    });
    result.save$(function(err,user){
      if(msg.type==="sms"){
        respond(err,{ succes:true,
          message: "Succesfully added the generated code to the user object!",
          uuid: user.uuid,
          code: user.smsCodes[user.smsCodes.length-1].code,
          fullName: user.fullName,
          countryCode: user.countryCode,
          mobilePhoneNumber: user.mobilePhoneNumber});
      }
      else{
         respond(err,{ succes:true,
          message: "Succesfully added the generated code to the user object!",
          uuid: user.uuid,
          code: user.emailCodes[user.emailCodes.length-1].code,
          fullName: user.fullName,
          countryCode: user.countryCode,
          mobilePhoneNumber: user.mobilePhoneNumber});
      }
      
    });
    }
  );
}

//working
function createUser(msg, respond) {
  var user = this.make$("user");
{  user.email = msg.email;
  user.fullName = msg.fullName;}
  user.password = msg.password;
  user.countryCode = msg.countryCode;
  user.mobilePhoneNumber = msg.mobilePhoneNumber;
  user.verified = false;
  user.smsCodes = [];
  user.emailCodes = [];
  user.uuid = null;
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
  var user = this.make$("user");
  user.email = msg.email;
  user.fullName = msg.fullName;
  user.password = msg.password;
  user.countryCode = msg.countryCode;
  user.mobilePhoneNumber = msg.mobilePhoneNumber;
  user.verified = false;
  user.smsCodes = [];
  user.uuid = null;
  user.emailCodes = [];
  this.act("role:user,cmd:get", {
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

this.add({role:"user",cmd:"create"}, createUser);
this.add({role:"user",cmd:"create", checkExistingUser:"true"}, createUserWhileCheckingForExistingUser);
this.add({"role":"user","cmd":"get"}, getUser);
this.add({"role":"user","cmd":"get","param":"uuid"}, getUserByUuid);
this.add({"role":"user","cmd":"update","param":"uuid"}, updateUserWithUuid);
this.add({"role":"user","cmd":"update","service":"2fa"}, updateUserWithCode);

};

 