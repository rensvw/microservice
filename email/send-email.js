var seneca = require('seneca')({tag: 'send-email'})



  var HOST = process.env.HOST || process.argv[2] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',')
var SILENT = process.env.SILENT || process.argv[4] || 'true'

  seneca.use('zipkin-tracer', {sampling:1})
  seneca.use('mesh',{
    pin: 'role:email,cmd:*',
    host:HOST,
    bases:BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })
    seneca.ready(function(err){
    seneca.act('role:email,cmd:send',{
      from: 'rensvanw@gmail.com',
      to: 'rensvanw@gmail.com',
      subject: 'test1234',
      html: 'test123',
      text: '1234'
    })
  })
 
