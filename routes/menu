
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


var menuData;

exports.getMenu=function(){
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
		//Send the data
	});//end Request.get	
};//end getMenu