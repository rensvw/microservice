var HOST = process.env.HOST || process.argv[2] || "127.0.0.1"
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",")
var SILENT = process.env.SILENT || process.argv[4] || "true"

var seneca = require("seneca")({tag: "user-mongo-service"})
seneca
  .use("entity")
  .use("basic")
  .use(require("./user"))
  .use("mongo-store", {
  //uri: "mongodb://rensvanw:zb74jt3bzn.@ds157439.mlab.com:57439/qnh"
  uri: "mongodb://172.17.0.2:27017/QNHSecurityPoC"
  
})
.use("zipkin-tracer", {sampling:1})
  .use("mesh",{
    listen: [
      { 
      pins: [
      "role:user,cmd:create,checkExistingUser:true", 
      "role:user,cmd:create",
      "role:user,cmd:get",
      "role:user,cmd:get,param:uuid",
      "role:user,cmd:update,param:uuid",      
      "role:user,cmd:update,service:2fa"]
    }],
    host:HOST,
    bases:BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })


