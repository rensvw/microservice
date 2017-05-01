var HOST = process.env.HOST || process.argv[2] || "127.0.0.1"
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",")
var SILENT = process.env.SILENT || process.argv[4] || "true"

var seneca = require("seneca")({tag: "user-app-redis-service"})

seneca
  .use("entity")
  .use("basic")
  .use(require("./user-app"))
  .use("mongo-store", {
  uri: "mongodb://rensvanw:zb74jt3bzn.@ds157439.mlab.com:57439/qnh"
  
})
.use("zipkin-tracer", {sampling:1})
  .use("mesh",{
    listen: [
      {
        pins: [
          "role:userapp,cmd:get,type:totp",
          
          "role:userapp,cmd:create,type:totp"]
      }],
    host:HOST,
    bases:BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })