const Chairo = require('chairo');
const Seneca = require('seneca');
const tag = 'api';
var Hapi = require('hapi')
var Good = require('good')
var Vision = require('vision')
var CookieAuth = require('hapi-auth-cookie')
const Inert = require('inert');
const wo = require('wo');
const HapiSwagger = require('hapi-swagger');
var PORT = process.env.PORT || process.argv[2] || 0;
var HOST = process.env.HOST || process.argv[2] || '127.0.0.1';
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');
var SILENT = process.env.SILENT || process.argv[4] || 'true';


const options = {
    info: {
            'title': 'SecurityPoC API Documentation',
            'version': '1',
        }
    };

var plugins = [
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
        .use('zipkin-tracer', {sampling:1})
    }
},{
  register: require('wo'),
  options:{
    bases: BASES,
    route: [
        {path: '/api/', method: 'get'},      
        {path: '/documentation', method: 'get'},   
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
}];

module.exports = plugins;