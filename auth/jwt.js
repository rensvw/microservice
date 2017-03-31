module.exports = function jwt(options) {

const jwt = require('jsonwebtoken');
const secret = "thisisaverynicesecret";

this.add({role:'token',cmd:'create'}, createToken);
this.add({role:'token',cmd:'verify'}, verifyToken);

function createToken(msg, respond) {
    let user = msg.user;
    var token = jwt.sign({
            data: user
        },
        secret, {
            expiresIn: 1440
        });
        respond(null, {
            succes: true,
            message: 'Enjoy your token!',
            user: user,
            token: token
        });
    }

function verifyToken(msg, respond) {
    let token = msg.token;
    if(token){
        jwt.verify(token,secret, (err,decoded) => {
            err ? respond(err,{
                succes:false,
                message: "Failed to authenticate token!"
            }) : msg.decoded = decoded;
        });
    }
    else{
        respond(err,{
            succes:false,
            message: "No token provided!"
        });
    }
    }
};