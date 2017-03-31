var HOST = process.env.HOST || process.argv[2] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',')
var SILENT = process.env.SILENT || process.argv[4] || 'true'

var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()
var cors = require('cors')

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
}

var app = Express()
      .use( require('body-parser').urlencoded({extended: true}) )
      .use( context )
      .listen(4000)

var seneca = require('seneca')()
      .use(SenecaWeb, senecaWebConfig )
      .use('api')
      .use('mesh',{
	host: HOST,
	bases: BASES,
	sneeze: {
          silent: JSON.parse(SILENT),
          swim: {interval: 1111}
        }
    })

      