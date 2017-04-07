var seneca = require('seneca')()

  seneca.ready(function(err){
    seneca.act('role:email,cmd:send',{
      from: 'rensvanw@gmail.com',
      to: 'rensvanw@gmail.com',
      subject: 'test1234',
      html: 'test123',
      text: '1234'
    })
  })