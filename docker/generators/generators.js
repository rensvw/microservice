module.exports = function(options){

const randomID = require("random-id");
const uuidV4 = require("uuid/v4");
const authenticator = require("authenticator");

function generateCode(msg,respond){
    let code = randomID(6, "0");
    respond({code:code});
}

function generateUuid(msg,respond){
    let uuid = uuidV4();
    respond({uuid:uuid});
}

function generateTOTPKey(msg,respond){
    var formattedKey = authenticator.generateKey();
    respond({key:formattedKey});
}

function generateTOTPUri(msg,respond){
    let email = msg.email || "test";
    let name = msg.name || "QNHSecurityPoC";
    let timeFrame = msg.time || 30;
    let digits = msg.digits || 6;
    let formattedKey = msg.key;
    var uri = authenticator.generateTotpUri(formattedKey, email, name, "SHA1", digits, timeFrame);
    respond({uri:uri});
}

this.add({role: "generate",cmd: "code"}, generateCode);
this.add({role: "generate",cmd: "uuid"}, generateUuid);
this.add({role: "generate",cmd: "totp-key"}, generateTOTPKey);
this.add({role: "generate",cmd: "totp-uri"}, generateTOTPUri);

};