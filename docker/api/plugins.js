const Chairo = require('chairo');
const Seneca = require('seneca');
const tag = 'api';
var Hapi = require('hapi')
var Good = require('good')
var Vision = require('vision')
var CookieAuth = require('hapi-auth-cookie')
const Inert = require('inert');

const HapiSwagger = require('hapi-swagger');


const options = {
    info: {
            'title': 'SecurityPoC API Documentation',
            'version': '1',
        }
    };

var plugins = [{
   register: Inert
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
}
];

module.exports = plugins;