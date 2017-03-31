var Boom = require('boom')
var Bcrypt = require('bcrypt')
var Users = require('./users-db')

var routes = [
  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: 'session',
      handler: function (request, reply) {
        request.cookieAuth.clear();
        reply({message:'logged out'})
      }
    }
  },
    {
        method: 'GET',
        path: '/api/loggedin',
        config: {
            auth: {
              mode: 'try',
              strategy: 'session'
            },
            plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
        },
            handler: function (req, reply) {
              if (req.auth.isAuthenticated) {
                reply({
                    message: 'you are logged in'
                });
              }
              else{
                reply({
                    message: 'you are logged out'
                });
              }

            }
        }
    },
    {
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
    },
    {
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
    }
]

module.exports = routes;