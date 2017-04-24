module.exports = function authenticatorAppAuth(option){
    
    const authenticator = require('authenticator');
    const Promise = require('bluebird');

    var act = Promise.promisify(this.act, {context: this});

    this.add({role:'auth',cmd:'authenticate',tfa:'app'}, authenticateAndGenerateToken);
    this.add({role:'auth',cmd:'verify',tfa:'app'}, verifyToken);

    'use strict';
 

 
var formattedKey = authenticator.generateKey();
// "acqo ua72 d3yf a4e5 uorx ztkh j2xl 3wiz" 
 
var formattedToken = authenticator.generateToken(formattedKey);
// "957 124" 
 
authenticator.verifyToken(formattedKey, formattedToken);
// { delta: 0 } 
 
authenticator.verifyToken(formattedKey, '000 000');
// null 
 
authenticator.generateTotpUri(formattedKey, "rensvanw@gmail.com", "securityPoC", 'SHA1', 6, 30);
// 
// otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30 



}