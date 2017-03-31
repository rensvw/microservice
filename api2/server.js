'use strict';

var PORT = process.env.PORT || process.argv[2] || 4002;
var HOST = process.env.HOST || process.argv[2] || '127.0.0.1';
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');
var SILENT = process.env.SILENT || process.argv[4] || 'true';

const Chairo = require('chairo');
const Seneca = require('seneca');
const Rif = require('rif');
const tag = 'api'
const Bell = require('bell')
const Hapi_Cookie = require('hapi-auth-cookie')
const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');
const CookieAuth = require('hapi-auth-cookie')

var rif = Rif();
var host = rif(HOST) || HOST
const server = new Hapi.Server();

server.connection({
    port: 3000
});

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, {
            id: user.id,
            name: user.name
        });
    });
};

server.register({
    register: Chairo,
    options: {
        seneca: Seneca({
            tag: tag,
            internal: {
                logger: require('seneca-demo-logger')
            },
            debug: {
                short_logs: true
            }
        })
        //.use('zipkin-tracer', {sampling:1})
    }
});

server.register(CookieAuth, (err) => {

    if (err) {
        throw err;
    }

    server.auth.strategy('session', 'cookie', {
        password: "hsdjhsjdfhjksadhfjahsjkasdfhjsdhajfhjsdhfhjkasdfhjhdsjhafdsjhsdfjh"
    });

    server.route({  
  method: 'GET',
  path: '/some-route',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        // session data available
        var session = request.auth.credentials

        return reply('Bro, you’re already authenticated :)')
      }

      // further processing if not authenticated …
    }
  }
})

    server.route({  
  method: 'POST',
  path: '/login',
  config: {
    handler: function (request, reply) {
      var username = request.payload.username
      var password = request.payload.password

      // check if user exists in DB
      // compare passwords

      // if everything went smooth, set the cookie with "user" specific data
      request.cookieAuth.set(user);

      reply('Wohoo, great to see you')
    }
  }
})

    server.route({  
  method: 'GET',
  path: '/private-route',
  config: {
    auth: 'session',
    handler: function (request, reply) {
      reply('Yeah! This message is only available for authenticated users!')
    }
  }
})

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'session',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/hello',
        config: {
            auth: 'session',
            handler: function (req, reply) {
                reply({
                    message: 'hello'
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/signup',
        handler: function (req, reply) {
            let email = req.payload.email;
            let fullName = req.payload.fullName;
            let password = req.payload.password;
            let countryCode = req.payload.countryCode;
            let mobilePhoneNumber = req.payload.mobilePhoneNumber;
            server.seneca.act('role:auth,cmd:signup', {
                email: email,
                fullName: fullName,
                password: password,
                countryCode: countryCode,
                mobilePhoneNumber: mobilePhoneNumber
            }, function (err, out) {
                if (err) {
                    reply(err);
                }
                reply(out);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/authenticate',
        handler: function (req, reply) {
            let email = req.payload.email;
            let password = req.payload.password;
            server.seneca.act('role:auth,cmd:authenticate', {
                email: email,
                password: password,
            }, function (err, out) {
                if (err) {
                    reply(err);
                }
                reply(out);
            });
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('server running at: ' + server.info.uri);
    });
});

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