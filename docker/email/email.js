module.exports = function email(options) {

const nodemailer = require('nodemailer');
var Promise = require('bluebird');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rensvanw@gmail.com',
        pass: 'SojCsv4XOBXp'
    }
});

  var act = Promise.promisify(this.act, {
    context: this
  });

  this.add({
    role: 'email',
    cmd: 'send'
  }, sendMail);

  function sendMail(msg, respond) {
    let mailOptions = {
      from: msg.from, // sender address
      to: msg.to, // list of receivers
      subject: msg.subject, // Subject line
      text: msg.text, // plain text body
      html: msg.html // html body 
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      respond({message:"Message has been sent!"})
    });



  }

}