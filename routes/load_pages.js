var order_route = require('./order_route.js');


// main page
exports.index =  function(req, res){
  res.render('index');
};
//order page
exports.order =function(req, res){
  order_route.clearOrderData();
  res.render('order');
};

exports.input = function(req, res){
  res.render('input');
};