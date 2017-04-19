"use strict"

var PORT = process.env.PORT || process.argv[2] || 3000
var HOST = process.env.HOST || process.argv[3] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');

var SILENT = process.env.SILENT || process.argv[5] || 'true'

const Chairo = require('chairo');
const Seneca = require('seneca');
const Joi = require('joi');
const Hapi = require('hapi');
const Handlebars = require('handlebars');
const Boom = require('boom');
const Bcrypt = require('bcrypt');
const CookieAuth = require('hapi-auth-cookie');
const Rif = require('rif')


var Good = require('good')
var Vision = require('vision')

const Inert = require('inert');

const HapiSwagger = require('hapi-swagger');

const options = {
    info: {
            'title': 'SecurityPoC API Documentation',
            'version': '1',
        }
    };


var tag = 'api'

var server = new Hapi.Server()
var rif = Rif()


var host = rif(HOST) || HOST


server.connection({
    port: PORT,
    host: host
})


server.register({
  register: Chairo,
  options:{
    seneca: Seneca({
      tag: tag,
      internal: {logger: require('seneca-demo-logger')},
      debug: {short_logs:true}
    })
    //.use('zipkin-tracer', {sampling:1})
  }
})

server.register({
   register: Inert
})

server.register({
        register: HapiSwagger,
        options: options
    })

server.register({
   register: Good,
    options: {
      ops: {
        interval: 10000
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [ { log: '*', response: '*', request: '*' } ]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
})

server.register({
   register: CookieAuth
})


server.register({
  register: require('wo'),
  options:{
    bases: BASES,
    route: [
        {path: '/api/', method: 'get'},      
        {path: '/api/login', method: 'post'},
        {path: '/api/login-email', method: 'post'},
        {path: '/api/login-sms', method: 'post'},
        {path: '/api/logout', method: 'get'},
        {path: '/api/signup', method: 'post'},
        {path: '/api/verify-email}', method: 'post'},
        {path: '/api/verify-sms}', method: 'post'},
        
    ],
    sneeze: {
      host: host,
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  }
})

 server.auth.strategy('session', 'cookie', true, {
    password: 'worldofwalmartsdgjsdfjgksdgfjksdfhjksdfhsdjksdfjsdhkshdfjkl', // cookie secret
    cookie: 'session', // Cookie name
    redirectTo: false, // Let's handle our own redirections
    isSecure: false, // required for non-https applications
    ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    //validateFunc: validation

  });
// Tests if user is logged in!
const testAuth = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      auth: 'yessss'
    });
  }
  return reply({
    auth: 'nooooo'
  });
}

// Function for logging in!
const login = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "You're already authenticated!"
    });
  }
  let email = request.payload.email;
  let password = request.payload.password;
  server.seneca.act('role:auth,cmd:authenticate', {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes) {
      //request.cookieAuth.set(respond.user);
      return reply(respond);
    } else if (!respond.succes) {
      return reply(Boom.unauthorized('Username or password is wrong!'));
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
  server.seneca.act('role:auth,cmd:authenticate,tfa:sms', {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes == true) {
      
      return reply(respond);
    } else if (respond.succes == false) {
      return reply(Boom.unauthorized('Username or password is wrong!'));
    }
  });
}

const verifySMSCodeAndLogin = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "You're already authenticated!"
    });
  }
  let code = request.payload.code;
  let uuid = request.payload.uuid;
  server.seneca.act('role:auth,cmd:verify,tfa:sms', {
    code: code,
    uuid: uuid
  }, function (err, respond) {
    if (err) {
      reply(err);
    } else if (respond.succes == true) {
      request.cookieAuth.set(respond.user);
      reply({succes:respond.succes,
      message: respond.message})
    } else if (respond.succes == false) {
     reply({succes:respond.succes,
      message: respond.message})
    }
  });
};

//Function for logging out!
const logout = (request, reply) => {
  request.cookieAuth.clear();
  return reply('You are logged out!');
}

// Function for registering!
const signUp = (request, reply) => {
  let email = request.payload.email;
  let fullName = request.payload.fullName;
  let password = request.payload.password;
  let countryCode = request.payload.countryCode;
  let mobilePhoneNumber = request.payload.mobilePhoneNumber;
  server.seneca.act('role:auth,cmd:signup', {
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
      message: "You're already authenticated!"
    });
  }
  let email = request.payload.email;
  let password = request.payload.password;
  server.seneca.act('role:auth,cmd:authenticate,tfa:email', {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes == true) {
      
      return reply(respond);
    } else if (respond.succes == false) {
      return reply(Boom.unauthorized('Username or password is wrong!'));
    }
  });
}

const verifyEmailCodeAndLogin = (request, reply) => {
  if (request.auth.isAuthenticated) {
    return reply({
      message: "You're already authenticated!"
    });
  }
  let code = request.payload.code;
  let uuid = request.payload.uuid;
  server.seneca.act('role:auth,cmd:verify,tfa:email', {
    code: code,
    uuid: uuid
  }, function (err, respond) {
    if (err) {
      reply(err);
    } else if (respond.succes == true) {
      request.cookieAuth.set(respond.user);
      reply({succes:respond.succes,
      message: respond.message})
    } else if (respond.succes == false) {
     reply({succes:respond.succes,
      message: respond.message})
    }
  });
};



server.route([{
      method: 'GET',
      path: '/api/',
      config: {
        description: 'Checks if the user is currently logged in!',
        notes: 'Returns auth:yesss if the user is authenticated!',
        tags: ['api'],
        auth: 'session',
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        },
        handler: testAuth
      }
    }, {
      method: 'POST',
      path: '/api/login',
      config: {
        description: 'Login route',
        notes: 'Returns true if correctly logged in',
        tags: ['api'],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: login,
        auth: {
          mode: 'try'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    }, {
      method: 'POST',
      path: '/api/login-sms',
      config: {
        description: 'Login route with sms verification',
        notes: 'Returns a guid if username and password are correct.',
        tags: ['api'],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: authorizeAndSendSMSCode,
        auth: {
          mode: 'try'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    }, {
      method: 'POST',
      path: '/api/verify-sms',
      config: {
        description: 'Verify your sms code when logging in',
        notes: 'Returns a cookie session if authorised',
        tags: ['api'],
        validate: {
          payload: {
            uuid: Joi.string().required(),
            code: Joi.string().required()
          }
        },
        handler: verifySMSCodeAndLogin,
        auth: {
          mode: 'try'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    }, {
      method: 'POST',
      path: '/api/login-email',
      config: {
        description: 'Login route with email verification',
        notes: 'Returns a guid if username and password are correct.',
        tags: ['api'],
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required()
          }
        },
        handler: authorizeAndSendEmailCode,
        auth: {
          mode: 'try'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    }, {
      method: 'POST',
      path: '/api/verify-email',
      config: {
        description: 'Verify your email code when logging in',
        notes: 'Returns a cookie session if authorised',
        tags: ['api'],
        validate: {
          payload: {
            uuid: Joi.string().required(),
            code: Joi.string().required()
          }
        },
        handler: verifyEmailCodeAndLogin,
        auth: {
          mode: 'try'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/api/logout',
      config: {
        description: 'Logout route',
        notes: 'Logs the user out',
        tags: ['api'],
        handler: logout
      }
    },
    {
      method: 'POST',
      path: '/api/signup',
      config: {
        description: 'Registers a new user',
        notes: 'Returns true if user is created and saved to database',
        tags: ['api'],
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
        auth: {
          mode: 'try'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    }
  ]);

  server.log('info', 'Routes registered');

server.seneca
    .use('mesh',{
	host: host,
	bases: BASES,
	sneeze: {
          silent: JSON.parse(SILENT),
          swim: {interval: 1111}
        }
    })


server.start(function(){
  console.log(tag,server.info.host,server.info.port)
})

