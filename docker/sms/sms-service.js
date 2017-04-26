var HOST = process.env.HOST || process.argv[2] || "127.0.0.1"
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",")
var SILENT = process.env.SILENT || process.argv[4] || "true"

var seneca = require("seneca")({tag: "sms-service"})

  seneca.use(require("./sms"))
  .use("zipkin-tracer", {sampling:1})
  .use("mesh",{
    listen: [
      { 
      pins: [
      "role:sms,cmd:send", 
      "role:sms,cmd:save,send:true",
      "role:sms,cmd:save,send:false"
      ]
    }],
    bases: BASES,
    host: HOST,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  });
