var HOST = process.env.HOST || process.argv[2] || ''
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',')
var SILENT = process.env.SILENT || process.argv[4] || 'true'

var seneca = require('seneca')()
seneca
  .use('entity')
  .use('basic')
  .use('user')
  .use('mongo-store', {
  uri: 'mongodb://rensvanw:zb74jt3bzn.@ds157439.mlab.com:57439/qnh'
})
  .use('mesh',{
    pin: 'role:user,cmd:*',
      host:HOST,
    bases:BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })


