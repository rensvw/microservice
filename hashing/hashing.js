module.exports = function hashing(options) {

    const bcrypt = require("bcrypt");
    const saltRounds = 10;

    function hashPassword(msg, respond) {
        bcrypt.hash(msg.password, saltRounds, function (err, hash) {
            respond({
                password: hash
            });
        });
    }

    function comparePassword(msg, respond) {
        bcrypt.compare(msg.password, msg.hash, function (err, res) {
            if (err) {
                respond(err, null);
            } else if (!res) {
                respond(null, {
                    succes: false,
                    message: "Username or password is incorrect!"
                });
            } else if (res) {
                respond(null, {
                    succes: true,
                    message: "Username and password are correct!"
                });
            }
        });
    }


    this.add({role: "hash",cmd: "newHash"}, hashPassword);
    this.add({role: "hash",cmd: "comparePasswords"}, comparePassword);

}