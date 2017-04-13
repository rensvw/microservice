module.exports = function(options){

const randomID = require('random-id');
const uuidV4 = require('uuid/v4');

this.add({role: 'generate',cmd: 'code'}, generateCode);
this.add({role: 'generate',cmd: 'uuid'}, generateUuid);

function generateCode(msg,respond){
    let code = randomID(6, '0');
    respond({code:code});
}

function generateUuid(msg,respond){
    let uuid = uuidV4();
    respond({uuid:uuid});
}

};