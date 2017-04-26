
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",")
var REPL_PORT = parseInt(process.env.REPL_PORT || process.argv[2] || 10001)
var REPL_HOST = process.env.REPL_HOST || process.argv[3] || "127.0.0.1"
var HOST = process.env.HOST || process.argv[4] || "127.0.0.1"
var SILENT = process.env.SILENT || process.argv[6] || "true"

var repl = require("seneca-repl");


var seneca = require("seneca")({
  tag: "repl",
  internal: {logger: require("seneca-demo-logger")},
  debug: {short_logs:true}
})
//.use("zipkin-tracer", {sampling:1})
.use("mesh",{
  tag: null, // ensures membership of all tagged meshes
  bases: BASES,
  host: HOST,
  make_entry: function( entry ) {
    if( "wo" === entry.tag$ ) {
      return {
        route: JSON.stringify(entry.route),
        host: entry.host,
        port: entry.port,
        identifier: entry.identifier$
      }
    }
  },
  sneeze:{
    silent: JSON.parse(SILENT),
    swim: {interval: 1111}
  }
})
.use(repl)
.ready(function () {
  seneca.repl({
    port: REPL_PORT,
    host: REPL_HOST,
      alias: {
      m: "role:mesh,get:members"
    }
  })
})