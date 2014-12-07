
//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');


var db_USER='rockzou';
var db_DATABASE = 'samurai_menu';
var db_KEY = 'someeptimedcurvandentsoc';
var db_PASSWORD = 'NUfwHgih5VxoNA6OHVpkEHYp';


exports.get_credit_data = function(req,res){
	var db_DATABASE = 'user_credit';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	Request.get({
		url: db_URL+"/_all_docs?include_docs=true",
		auth: {
			user: db_KEY,
			pass: db_PASSWORD
		}
	}, function (error, response, body){
		// Need to parse the body string
		var theBody = JSON.parse(body);
		var rows = theBody.rows;

		console.log('the credit information');
		console.log(rows);
		res.json(rows);
		//Send the data
	});//end Request.get
};//end 

exports.get_menus_data = function(req,res){
	var db_DATABASE = 'samurai_menu';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	Request.get({
		url: db_URL+"/_all_docs?include_docs=true",
		auth: {
			user: db_KEY,
			pass: db_PASSWORD
		}
	}, function (error, response, body){
		// Need to parse the body string
		var theBody = JSON.parse(body);
		var rows = theBody.rows;

		console.log(rows);
		res.json(rows);
		//Send the data
	});//end Request.get
};//end getMenu

exports.get_orders_data= function(req,res){
	var db_DATABASE = 'samurai_orders';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	console.log('Making a db request for all order entries');
	// Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: db_URL+"/_all_docs?include_docs=true",
		auth: {
			user: db_KEY,
			pass: db_PASSWORD
		}
	}, function (error, response, body){
		// Need to parse the body string
		console.log(error);

		var theBody = JSON.parse(body);
		var theRows = theBody.rows;
		//Send the data
		res.send(theRows);
	});
};