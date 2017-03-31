
var PORT = process.env.PORT || process.argv[2] || 4002;
var HOST = process.env.HOST || process.argv[2] || '127.0.0.1';
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');
var SILENT = process.env.SILENT || process.argv[4] || 'true';

const Chairo = require('chairo');
const Seneca = require('seneca');
const Rif = require('rif');
const tag = 'api';
var Hapi = require('hapi')
var Good = require('good')
var Vision = require('vision')
var Users = require('./users-db')
var Handlebars = require('handlebars')
var CookieAuth = require('hapi-auth-cookie')

var rif = Rif();
var host = rif(HOST) || HOST
// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// register plugins to server instance
server.register([
  {
    register: Vision
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
  },
  {
    register: CookieAuth
  },
  { register: Chairo,
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
}
], function (err) {
  if (err) {
    server.log('error', 'failed to install plugins')

    throw err
  }

  server.log('info', 'Plugins registered')

  /**
   * view configuration
   */


  // validation function used for hapi-auth-cookie: optional and checks if the user is still existing
  var validation = function (request, session, callback) {
    var username = session.username
    var user = Users[ username ]

    if (!user) {
      return callback(null, false)
    }

    server.log('info', 'user authenticated')
    callback(err, true, user)
  }

  server.auth.strategy('session', 'cookie', true, {
    password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
    cookie: 'future-studio-hapi-tutorials-cookie-auth-example',
    redirectTo: '/',
    isSecure: false,
    validateFunc: validation
  })

  server.log('info', 'Registered auth strategy: cookie auth')

  var routes = require('./cookie-routes')
  server.route(routes)
  server.log('info', 'Routes registered')

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      server.log('error', 'failed to start server')
      server.log('error', err)

      throw err
    }

    server.log('info', 'Server running at: ' + server.info.uri)
  })
})

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