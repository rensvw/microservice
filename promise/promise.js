var Promise = require('bluebird');
var seneca = require('seneca')();

var act = Promise.promisify(seneca.act, {context: seneca});

// Add a command that takes a longer time than the seneca's timeout period
// Add a conversion command
seneca.add({cmd: 'dollars-to-euros'}, function(args, done) {
  var exchangeRate = 0.88;
  var euros = args.product.price * exchangeRate;

  // Return the product with euros set
  done(null, {
    name: args.product.name,
    price: args.product.price,
    euros: euros
  });
});

var products = [
  {name: 'Product A', price: 9.99},
  {name: 'Product B', price: 23.99},
  {name: 'Product C', price: 10.00},
  {name: 'Product D', price: 100.99},
  {name: 'Product E', price: 0.99}
];

// Build an array of promisified commands
var cmds = [];
products.forEach(function (product) {
  var command = act({cmd: 'dollars-to-euros', product: product});

  cmds.push(command);
});

Promise.all(cmds)
  .then(function (results) {
    // results is now an array of each of the resolved promises
    // {name: 'Product A', price: 9.99, euros: 8.81}
    // {name: 'Product B', price: 23.99, euros: 21.15}
    // {name: 'Product C', price: 10.00, euros: 8.82}
    // {name: 'Product D', price: 100.99, euros: 89.05}
    // {name: 'Product E', price: 0.99, euros: 0.87}
    results.forEach(function (result) {
      console.log(result);
    });
  })
  .catch(function (err) {
    console.error(err);
  });