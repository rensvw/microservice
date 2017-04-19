var PORT = process.env.PORT || process.argv[2] || 0
var HOST = process.env.HOST || process.argv[3] || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '127.0.0.1:39000,127.0.0.1:39001').split(',');

var SILENT = process.env.SILENT || process.argv[5] || 'true'


var Hapi = require('hapi');
var seneca = require('seneca')();
var Rif    = require('rif')

var rif = Rif()
var host = rif(HOST) || HOST

var server = new Hapi.Server();

server.connection({
    port: 3000,
    host: host
})

seneca.add({role: 'test', cmd: 'test'}, function(args, done) {
  console.log('Recieved a request');
  done(null, {worked: true});
});

seneca.act('role:web', {use: {
  prefix: '/api/1.0',
  pin: {role:'test', cmd: '*'},
  map: {
    test: true
  }
}});

seneca
  .use('mesh', {
    host: host,
    bases: BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {
        interval: 1111
      }
    }
  });

server.register({
  register: require('hapi-seneca'),
  options: {
    seneca: seneca,
    cors: true
  }
}, function(err) {
  if (err) console.error(err);
  server.start(function() {
    console.log('Server is running');
  });
});