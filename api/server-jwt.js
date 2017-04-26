var PORT = process.env.PORT || process.argv[2] || 3000;
var HOST = process.env.HOST || process.argv[2] || "127.0.0.1";
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true";

const Chairo = require("chairo");
const Seneca = require("seneca");
const tag = "api";
const Joi = require("joi");
const Hapi = require("hapi");
const Handlebars = require("handlebars");
const Boom = require("boom");
const Bcrypt = require("bcrypt");
const CookieAuth = require("hapi-auth-cookie");
const Rif = require("rif");
const Inert = require("inert");
const HapiSwagger = require("hapi-swagger");
const Good = require("good");
const Vision = require("vision");
const jsonwebtoken = require("hapi-auth-jwt");
const Promise = require("bluebird");
const secret = "fsdhfjiashjkfjasdijfasljfuiwhcfweahfuihahfksdh";
const jwt = require("jsonwebtoken");

const options = {
    info: {
            "title": "SecurityPoC API Documentation",
            "version": "1",
        }
    };

// create new server instance
const server = new Hapi.Server();
var rif = Rif()

var host = rif(HOST) || HOST

// add server’s connection information
server.connection({
  port: PORT,
  host: host
});

// register plugins to server instance

server.register([
  {
    register: Inert
  },{
    register: jsonwebtoken
  },
    {
      register: Vision
    },
    {
        register: HapiSwagger,
        options: options
    },
 
  {
    register: Good,
    options: {
      ops: {
        interval: 10000
      },
      reporters: {
        console: [
          {
            module: "good-squeeze",
            name: "Squeeze",
            args: [ { log: "*", response: "*", request: "*" } ]
          },
          {
            module: "good-console"
          },
          "stdout"
        ]
      }
    }
  },
 
  { register: Chairo,
    options: {
        seneca: Seneca({
            tag: tag,
            internal: {
                logger: require("seneca-demo-logger")
            },
            debug: {
                short_logs: true
            }
        })
        .use("zipkin-tracer", {sampling:1})
    }
},
{
  register: require("wo"),
  options:{
    bases: BASES,
    route: [
        {path: "/api/", method: "get"},      
        {path: "/documentation", method: "get"},      
        {path: "/api/login", method: "post"},
        {path: "/api/login-email", method: "post"},
        {path: "/api/login-sms", method: "post"},
        {path: "/api/logout", method: "get"},
        {path: "/api/signup", method: "post"},
        {path: "/api/verify-email", method: "post"},
        {path: "/api/verify-sms", method: "post"},
        {path: "/api/login-app", method: "post"},
        {path: "/api/verify-app", method: "post"},
        
        
    ],
    sneeze: {
      host: host,
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  }
}], function (err) {
  if (err) {
    server.log("error", "failed to install plugins");
    throw err;
  }

  server.log("info", "Plugins registered");


  server.auth.strategy("jwt", "jwt",
    { key: secret,          // Never Share your secret key 
      verifyOptions: { algorithms: [ "HS256" ] } // pick a strong algorithm 
    });

server.log("info", "Registered auth strategy: jwt auth")


function createToken(user) {
  return jwt.sign({ email: user.email, fullName: user.fullName }, secret, { algorithm: "HS256", expiresIn: "1h" } );
}


// Tests if user is logged in!
const testAuth = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      auth: "yessss"
    });
  }
  return reply({
    auth: "nooooo"
  });
}

// Function for logging in!
const login = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "you're already authenticated!"
    });
  }
  let email = request.payload.email;
  let password = request.payload.password;
  server.seneca.act("role:auth,cmd:authenticate,mfa:none", {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes) {
      return reply({
          respond: respond,
          token: createToken(respond.user)
        });
    } else if (!respond.succes) {
      return reply(Boom.unauthorized("Username or password is wrong!"));
    }
  });
};

const authorizeAndSendSMSCode = (request,reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "You're already authenticated!"
    });
  }
  let email = request.payload.email;
  let password = request.payload.password;
  server.seneca.act("role:auth,cmd:authenticate,mfa:sms", {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes) {
      return reply(respond);
    } else if (!respond.succes) {
      return reply(Boom.unauthorized("Username or password is wrong!"));
    }
  });
}

const verifySMSCodeAndLogin = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "you're already authenticated!"
    });
  }
  let code = request.payload.code;
  let uuid = request.payload.uuid;
  server.seneca.act("role:auth,cmd:verify,mfa:sms", {
    code: code,
    uuid: uuid
  }, function (err, respond) {
    if (err) {
      reply(err);
    } else if (respond.succes) {
    return reply({
          succes: respond.succes,
          message: respond.message,
          token: createToken(respond.user)
        });
    } else if (!respond.succes) {
     reply({succes:respond.succes,
      message: respond.message})
    }
  });
};

//Function for logging out!
const logout = (request, reply) => {
  request.cookieAuth.clear();
  return reply("You are logged out!");
}

// Function for registering!
const signUp = (request, reply) => {
  let email = request.payload.email;
  let fullName = request.payload.fullName;
  let password = request.payload.password;
  let countryCode = request.payload.countryCode;
  let mobilePhoneNumber = request.payload.mobilePhoneNumber;
  server.seneca.act("role:auth,cmd:signup", {
    email: email,
    fullName: fullName,
    password: password,
    countryCode: countryCode,
    mobilePhoneNumber: mobilePhoneNumber
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err, null)));
    } else {
      return reply(respond);
    }
  });
};

const authorizeAndSendEmailCode = (request,reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "you're already authenticated!"
    });
  }
  let email = request.payload.email;
  let password = request.payload.password;
  server.seneca.act("role:auth,cmd:authenticate,mfa:email", {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes) {
      
      return reply(respond);
    } else if (!respond.succes) {
      return reply(Boom.unauthorized("Username or password is wrong!"));
    }
  });
}

const verifyEmailCodeAndLogin = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "you're already authenticated!"
    });
  }
  let code = request.payload.code;
  let uuid = request.payload.uuid;
  server.seneca.act("role:auth,cmd:verify,mfa:email", {
    code: code,
    uuid: uuid
  }, function (err, respond) {
    if (err) {
      reply(err);
    } else if (respond.succes) {
      return reply({
          succes: respond.succes,
          message: respond.message,
          token: createToken(respond.user)
        });
    } else if (!respond.succes) {
     reply({succes:respond.succes,
      message: respond.message})
    }
  });
};

const authorizeAndDirectForTOTPApp = (request,reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "you're already authenticated!"
    });
  }
  let email = request.payload.email;
  let password = request.payload.password;
  server.seneca.act("role:auth,cmd:authenticate,mfa:app", {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes) {
      // redirect
      return reply(respond);
    } else if (!respond.succes) {
      return reply(Boom.unauthorized("Username or password is wrong, or you did not add the authenticator app to your account!"));
    }
  });
}

const verifyTOTPCodeAndLogin = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "you're already authenticated!"
    });
  }
  let code = request.payload.code;
  let uuid = request.payload.uuid;
  server.seneca.act("role:auth,cmd:verify,mfa:app", {
    code: code,
    uuid: uuid
  }, function (err, respond) {
    if (err) {
      reply(err);
    } else if (respond.succes) {
      return reply({
          succes: respond.succes,
          message: respond.message,
          token: createToken(respond.user)
        });
    } else if (!respond.succes) {
     reply({succes:respond.succes,
      message: respond.message})
    }
  });
};

  // Routes
  server.route([{
      method: "GET",
      path: "/api",
      config: {
        description: "Checks if the user is currently logged in!",
        notes: "Returns auth:yesss if the user is authenticated!",
        tags: ["api"],
        auth: {
            strategy: "jwt"
        },
        handler: testAuth
      }
    }, {
      method: "POST",
      path: "/api/login",
      config: {
        description: "Login route",
        notes: "Returns true if correctly logged in",
        tags: ["api"],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: login,
      }
    }, {
      method: "POST",
      path: "/api/login-sms",
      config: {
        description: "Login route with sms verification",
        notes: "Returns a guid if username and password are correct.",
        tags: ["api"],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: authorizeAndSendSMSCode,
        
      }
    }, {
      method: "POST",
      path: "/api/verify-sms",
      config: {
        description: "Verify your sms code when logging in",
        notes: "Returns a cookie session if authorised",
        tags: ["api"],
        validate: {
          payload: {
            uuid: Joi.string().required(),
            code: Joi.string().required()
          }
        },
        handler: verifySMSCodeAndLogin,
        
      }
    }, {
      method: "POST",
      path: "/api/login-email",
      config: {
        description: "Login route with email verification",
        notes: "Returns a guid if username and password are correct.",
        tags: ["api"],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: authorizeAndSendEmailCode,
       
      }
    }, {
      method: "POST",
      path: "/api/verify-email",
      config: {
        description: "Verify your email code when logging in",
        notes: "Returns a cookie session if authorised",
        tags: ["api"],
        validate: {
          payload: {
            uuid: Joi.string().required(),
            code: Joi.string().required()
          }
        },
        handler: verifyEmailCodeAndLogin,

      }
    },{
      method: "POST",
      path: "/api/login-app",
      config: {
        description: "Login route with Authenticator App verification",
        notes: "Returns a guid if username and password are correct.",
        tags: ["api"],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: authorizeAndDirectForTOTPApp,
       
      }
    }, {
      method: "POST",
      path: "/api/verify-app",
      config: {
        description: "Verify your TOTP code when logging in",
        notes: "Returns a cookie session if authorised",
        tags: ["api"],
        validate: {
          payload: {
            uuid: Joi.string().required(),
            code: Joi.string().required()
          }
        },
        handler: verifyTOTPCodeAndLogin,

      }
    },
    {
      method: "GET",
      path: "/api/logout",
      config: {
        description: "Logout route",
        notes: "Logs the user out",
        tags: ["api"],
        handler: logout
      }
    },
    {
      method: "POST",
      path: "/api/signup",
      config: {
        description: "Registers a new user",
        notes: "Returns true if user is created and saved to database",
        tags: ["api"],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required(),
            fullName: Joi.string().min(2).max(200).required(),
            countryCode: Joi.string().min(2).max(5).required(),
            mobilePhoneNumber: Joi.string().min(2).max(15).required()
          }
        },
        handler: signUp,
        
      }
    }
  ]);

  server.log("info", "Routes registered");


// Set up mesh network
server.seneca
  .use("mesh", {
    host: host,
    bases: BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {
        interval: 1111
      }
    }
  });

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      server.log("error", "failed to start server")
      server.log("error", err);

      throw err
    }
    server.log("info", "Server running at: " + server.info.uri)
  });
});



