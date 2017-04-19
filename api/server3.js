
"use strict"

var PORT = process.env.PORT || process.argv[2] || 3000
var HOST = process.env.HOST || process.argv[3] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');
var SILENT = process.env.SILENT || process.argv[5] || 'true'


var Hapi   = require('hapi')
var Chairo = require('chairo')
var Seneca = require('seneca')
var Rif    = require('rif')


var tag = 'api'

var server = new Hapi.Server()



server.connection({
    port: PORT
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
  register: require('wo'),
  options:{
    bases: BASES,
    route: [
        {path: '/api/ping'}
    ],
    sneeze: {
      host: host,
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  }
})


server.route({
  method: 'GET', path: '/api/ping',
  handler: function( req, reply ){
    server.seneca.act(
      'role:api,cmd:ping',
      function(err,out) {
        reply(err||out)
      }
  )}
})

server.seneca
  .add('role:api,cmd:ping', function(msg,done){
    done( null, {pong:true,api:true,time:Date.now()})
  })
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