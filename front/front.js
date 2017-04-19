
"use strict"
var HOST = process.env.HOST || process.argv[2] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var SILENT = process.env.SILENT || process.argv[4] || 'true'


var Hapi = require('hapi')
var Rif = require('rif')

var server = new Hapi.Server()
var rif = Rif()


var host = rif(HOST) || HOST


server.connection({ 
  port: 8000 // test with http://localhost:8000/api/ping
})

server.register(require('inert'))

server.register({
  register: require('wo'),
  options: {
    bases: BASES,
      sneeze: {
	host: host,
	silent: JSON.parse(SILENT),
        swim: {interval: 1111}
      }
  }
})

server.route({ 
  method: 'GET', path: '/api/ping', 
  handler: {
    wo: {}
  }
})

server.route({
  method: 'GET', path: '/documentation/', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'GET', path: '/api/', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'POST', path: '/api/login', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'POST', path: '/api/login-email', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'POST', path: '/api/login-sms', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'GET', path: '/api/logout', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'POST', path: '/api/signup', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'POST', path: '/api/verify-email', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: 'POST', path: '/api/verify-sms', 
  handler: {
    wo: {
      passThrough: true
    }
  }
})


server.start(function(){
  console.log('front',server.info.uri)
})