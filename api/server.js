var PORT = process.env.PORT || process.argv[2] || 3000;
var HOST = process.env.HOST || process.argv[2] || '127.0.0.1';
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');
var SILENT = process.env.SILENT || process.argv[4] || 'true';

const Chairo = require('chairo');
const Seneca = require('seneca');
const tag = 'api';
const Joi = require('joi');
const Hapi = require('hapi');
const Handlebars = require('handlebars');
const Boom = require('boom');
const Bcrypt = require('bcrypt');
const CookieAuth = require('hapi-auth-cookie');

// create new server instance
const server = new Hapi.Server();

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
});

// register plugins to server instance
const plugins = require('./plugins');
server.register(plugins, function (err) {
  if (err) {
    server.log('error', 'failed to install plugins');
    throw err;
  }

  server.log('info', 'Plugins registered');

  // Set authentication strategy
  server.auth.strategy('session', 'cookie', true, {
    password: 'worldofwalmartsdgjsdfjgksdgfjksdfhjksdfhsdjksdfjsdhkshdfjkl', // cookie secret
    cookie: 'session', // Cookie name
    redirectTo: false, // Let's handle our own redirections
    isSecure: false, // required for non-https applications
    ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    //validateFunc: validation

  });

  server.log('info', 'Registered auth strategy: cookie auth')

  // Routes
  server.route([{
      method: 'GET',
      path: '/',
      config: {

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
      path: '/login',
      config: {
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
    },
     {
      method: 'POST',
      path: '/update',
      config: {
        
        handler: update,
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
      path: '/logout',
      config: {
        handler: logout
      }
    },
    {
      method: 'POST',
      path: '/signup',
      config: {
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(200).required(),
            fullName: Joi.string().min(2).max(200).required(),
            countryCode: Joi.string().min(2).max(5).required(),
            mobilePhoneNumber: Joi.number().required()
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

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      server.log('error', 'failed to start server')
      server.log('error', err);

      throw err
    }
    server.log('info', 'Server running at: ' + server.info.uri)
  });
});

// Set up mesh network
server.seneca
  .use('mesh', {
    host: HOST,
    bases: BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {
        interval: 1111
      }
    }
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
  server.seneca.act('role:auth,cmd:authenticate,tfa:sms', {
    password: password,
    email: email
  }, function (err, respond) {
    if (err) {
      return reply(Boom.badRequest(respond(err)));
    } else if (respond.succes == true) {
      request.cookieAuth.set(respond.user);
      return reply(respond);
    } else if (respond.succes == false) {
      return reply(Boom.unauthorized('Username or password is wrong!'));
    }
  });
};

const update = (request,reply) => {
  let email = request.payload.email;
  server.seneca.act('role:sms,cmd:save,send:true', {
    email: email
  }, function (err, respond){
    return reply(respond);
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