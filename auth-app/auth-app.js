module.exports = function authenticatorAppAuth(option) {

    const authenticator = require("authenticator");
    const Promise = require("bluebird");

    var act = Promise.promisify(this.act, {
        context: this
    });

    

    "use strict";

    function authenticate(msg, respond) {
        let email = msg.email;
        let password = msg.password;
        act("role:userapp,cmd:get,type:totp", {
                email: email
            })
            .then((key) => {
                if (!key.succes) {
                    return respond({
                        succes: false,
                        message: "Please first connect the authenticator app to your account!"
                    })
                } else {
                    return act("role:user,cmd:get", {
                            email: email
                        })
                        .then((user) => {
                            if (user.succes) {
                                act("role:hash,cmd:comparePasswords", {
                                        password: password,
                                        hash: user.password
                                    })
                                    .then((authenticated) => {
                                        if (authenticated.succes) {
                                            return act("role:user,cmd:update,param:uuid", {
                                                    email: email
                                                })
                                                .then((result) => {
                                                    return respond({
                                                        succes: true,
                                                        uuid: result.uuid,
                                                        message: "Username and password are correct, please fill in the code from the app!"
                                                    });
                                                })
                                                .catch((err) => {
                                                    return respond(err);
                                                });
                                        } else {
                                            return respond({
                                                succes: false,
                                                message: "Username or password is incorrect!"
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        return respond(err);
                                    });
                            } else {
                                return respond({
                                    succes: false,
                                    message: "Username or password is incorrect!"
                                });
                            }
                        })
                        .catch((err) => {
                            return respond(err);
                        });
                }
            })
            .catch((err) => {
                return respond(err);
            });

    }

    function verifyToken(msg, respond) {
        let uuid = msg.uuid;
        let code = msg.code;
        let seneca = this;
        act("role:user,cmd:get,param:uuid", {
                uuid: uuid
            })
            .then((user) => {
                this.user = user;
                if (!user) {
                    respond(user);
                } else if (user) {
                    act("role:userapp,cmd:get,type:totp", {
                            email: user.email
                        })
                        .then((key) => {
                            if (!key.succes) {
                                return respond({
                                    succes: false,
                                    message: "Please first connect the authenticator app to your account!"
                                })
                            } else {
                                return act("role:userapp,cmd:get,type:totp", {
                                        email: this.user.email
                                    })
                                    .then((data) => {
                                        if (!data.key) {
                                            console.log(data)
                                            respond("Error, key not found")
                                        } else {
                                            let verify = authenticator.verifyToken(data.key.toString(), code.toString());
                                            if (verify === null) {
                                                return respond({
                                                    succes: false,
                                                    message: "Code is incorrect!"
                                                });
                                            } else if (verify.delta === 0) {
                                                return respond({
                                                    succes: true,
                                                    user: {
                                                        email: this.user.email,
                                                        fullName: this.user.fullName
                                                    },
                                                    message: "Code is correct, welcome!"
                                                });
                                            } else if (verify.delta === -1) {
                                                return respond({
                                                    succes: false,
                                                    message: "You are to late!"
                                                });
                                            }
                                        }
                                    })
                                    .catch(function (err) {
                                        respond(err);
                                    })
                            }

                        }).catch((err) => {
                            respond(err);
                        })

                }
            }).catch((err) => {
                respond(err);
            })
    }

    function createUri(msg,respond){
        act("role:generate,cmd:totp-key")
        .then((data)=>{
            return act("role:generate,cmd:totp-uri",{
                email: msg.email,
                key: data.key
            })
            .then((result)=>{
                respond({
                    uri: result.uri,
                    secret: data.key,
                    email: msg.email
                });
            })
            .catch((err)=>{
                respond(err);
            });
        })
        .catch((err)=>{
            respond(err);
        });
    }

    function verifyUriAndSaveToAccount(msg, respond) {
        let code = msg.code.toString();
        let secret = msg.secret.toString();
        let verify = authenticator.verifyToken(secret, code);
        if (verify === null) {
            return respond({
                succes: false,
                message: "Code is incorrect!"
            });
        } else if (verify.delta === 0) {
            act("role:userapp,cmd:create,type:totp",{
                email: msg.email,
                key: secret
            })
            .then((result)=>{
                return respond({
                    message: "We saved the authenticator to your account!",
                    succes: true,
                })
            })
            .catch((err)=>{
                respond(err);
            })
        } else if (verify.delta === -1) {
            return respond({
                succes: false,
                message: "You are to late!"
            });
        }
    }

    this.add({
        role: "auth",
        cmd: "authenticate",
        mfa: "app"
    }, authenticate);
    this.add({
        role: "auth",
        cmd: "verify",
        mfa: "app"
    }, verifyToken);
    this.add({
        role: "auth",
        cmd: "create",
        mfa: "app",
        url: "uri"
    }, createUri);
    this.add({
        role: "auth",
        cmd: "save",
        mfa: "new-app",
    }, verifyUriAndSaveToAccount);

}