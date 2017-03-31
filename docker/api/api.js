module.exports = function api(options) {

  this.add({ role:'api', path:'getUser' }, getUser );
  this.add({ role:'api', path:'authenticate' }, authenticate);
  this.add({ role:'api', path:'hello' }, hello);
  this.add({ role:'api', path:'signUp' }, signUp);
  this.add({ role:'api', path:'verifyToken' }, getUser);
  this.add({ role:'api', path:'verifyAccount' }, getUser);
  this.add({ role:'api', path:'newSMSCode' }, getUser);

  this.add('init:api', function (msg, respond) {
    this.act('role:web',{routes:{
      prefix: '/api',
      pin:    'role:api,path:*',
      map: {
        calculate: { GET:true, suffix:'/:operation' },
        authenticate: { POST:true },
        signUp: { POST:true },
        verifyToken: { GET:true },
        verifyAccount: { GET:true },
        newSMSCode: { GET:true },   
        getUser: { GET:true },      
        hello: {GET:true}  
      }
    }}, respond)
  })

  function hello(msg,respond){
    respond({answer:'hello'});
  }

  function getUser(msg,respond){
    this.act('role:user,cmd:get',{
      email: msg.args.query.email
    },
    respond);
  }

  function authenticate(msg,respond){
    let email = msg.args.body.email;
    let password = msg.args.body.password;
    this.act('role:auth,cmd:authenticate',{
      password: password,
      email: email
    }, respond);
  }

  function signUp(msg, respond){
    let email = msg.args.body.email;
    let fullName = msg.args.body.fullName;
    let password = msg.args.body.password;
    let countryCode = msg.args.body.countryCode;
    let mobilePhoneNumber = msg.args.body.mobilePhoneNumber;
    this.act('role:auth,cmd:signup',{
      email: email,
      fullName: fullName,
      password: password,
      countryCode: countryCode,
      mobilePhoneNumber: mobilePhoneNumber
    }, respond)
  }

}