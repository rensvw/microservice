
"use strict"
var HOST = process.env.HOST || process.argv[2] || "127.0.0.1"
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true"

var Hapi = require("hapi")
var Rif = require("rif")


var server = new Hapi.Server()
var rif = Rif()


var host = rif(HOST) || HOST


server.connection({ 
  port: 8000
})

server.register(require("inert"))

server.register({
  register: require("wo"),
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
  method: "GET", path: "/api/", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/login", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/login-email", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/login-sms", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "GET", path: "/api/logout", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/signup", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/verify-email", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/verify-sms", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/login-app", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})

server.route({
  method: "POST", path: "/api/verify-app", 
  handler: {
    wo: {
      passThrough: true
    }
  }
})


server.start(function(){
  console.log("front",server.info.uri)
})