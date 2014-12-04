//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');
//var theJsFile= require('/the')


var db_USER='rockzou';
var db_DATABASE = 'samurai_menu';
var db_KEY = 'someeptimedcurvandentsoc';
var db_PASSWORD = 'NUfwHgih5VxoNA6OHVpkEHYp';

exports.save_menu_item=function(req,res){
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	//Get the data from the body
	var theObj= req.body;
	console.log("the posted Obj is:", theObj);
	//send the data to db
	Request.post({
		url:db_URL, /*databaseURL*/
		auth: {
			user: db_KEY/*user API key*/,
			pass: db_PASSWORD
		},
		json: true,
		body:theObj
		},
		function(err/*error message*/, response/*response status*/, body/*return message from Database*/){
			//Need to parse the body AGAIN

			var theBody = body;
			console.log ("error message:", err);
			console.log("theBody:",theBody);
			res.json(theBody);
		}
	);
};

exports.delete_menu_item=function(req,res){
	var db_DATABASE = 'samurai_menu';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	console.log("Deleting an object");
	var theObj = req.body;
	//The URL must include the obj ID and the obj REV values
	var theURL = db_URL + '/' + theObj._id + '?rev=' + theObj._rev;
	//Need to make a DELETE Request
	Request.del({
		url: theURL,
		auth: {
			user: db_KEY,
			pass: db_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		console.log(body);
		res.json(body);
	});
};