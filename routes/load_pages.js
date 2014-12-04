var order_routes = require('./order.js');


// main page
exports.index =  function(req, res){
  res.render('index');
};
//order page
exports.order =function(req, res){
  order_routes.clearOrderData();
  res.render('user');
};

exports.input = function(req, res){
  res.render('input');
};