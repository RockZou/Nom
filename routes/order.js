
//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');


var orderTotal=0;
var theOrder=[];//store all ordered items from a user
var theOrderObj={};

var db_USER='rockzou';
var db_DATABASE = 'samurai_orders';
var db_KEY = 'someeptimedcurvandentsoc';
var db_PASSWORD = 'NUfwHgih5VxoNA6OHVpkEHYp';

exports.order_add = function(req,res){
	
	var theObj=req.body;
	orderTotal+=parseInt(theObj.price,10);
	theOrder.push(theObj);
	console.log("the current order is:");
	console.log(theOrder);
};

exports.order_confirm = function(req,res){
	//var db_DATABASE = 'samurai_orders';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	console.log("posting an order");

	console.log("the current order is:");
	console.log(theOrder);

	theOrderObj.orderTotal=orderTotal;
	theOrderObj.theOrder= theOrder;

		Request.post({
		url:db_URL, /*databaseURL*/
		auth: {
			user: db_KEY/*user API key*/,
			pass: db_PASSWORD
		},
		json: true,
		body:theOrderObj
		},
		function(err/*error message*/, response/*response status*/, body/*return message from Database*/){
			//Need to parse the body AGAIN
			var theBody = body;
			console.log ("error message:", err);
			console.log("theBody:",theBody);
			res.json(theBody);
			clearOrderData();
		}
	);
};

function clearOrderData (){
	theOrderObj={};
	theOrder=[];
	orderTotal=0;
}

exports.clearOrderData = function(){
	theOrderObj={};
	theOrder=[];
	orderTotal=0;
};