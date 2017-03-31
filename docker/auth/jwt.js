module.exports = function jwt(options) {

const jwt = require('jsonwebtoken');
const secret = "thisisaverynicesecret";

this.add({role:'token',cmd:'create'}, createToken);

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
};