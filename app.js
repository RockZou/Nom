//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');

//Create an 'express' object
var app = express();

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

app.use(bodyParser.json());

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

var db_USER='rockzou';
var db_DATABASE = 'samurai_menu';
var db_KEY = 'someeptimedcurvandentsoc';
var db_PASSWORD = 'NUfwHgih5VxoNA6OHVpkEHYp';



/*-----
ROUTES
-----*/


var menuData;

function getMenu(){
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
}//end getMenu


/******************ALL THE POST STUFF*******************/
/**************** MENU INPUT ***********************/
app.post("/save",function(req,res){
	var db_DATABASE = 'samurai_menu';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;


	console.log("A POST!!!!");
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
});

//DELETE an object from the database
app.post("/delete", function(req,res){
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
});
/******************END MENU INPUT******************/
app.post("/order", function(req,res){
	var db_DATABASE = 'samurai_orders';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;

	console.log("posting an order");
	var theObj=req.body;
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
});


/******************END THE POST STUFF**************/



/*************ALL THE GET STUFF*********************/


//Main Page Route - Menu Page
app.get("/", function(req, res){
//	console.log(menuData);
	res.render('index');
});

//the user page
app.get("/user",function(req, res){
	res.render('user');
});

//get the menu data
app.get("/menu.json", function(req, res){
	getMenu();
	res.json(menuData);
});


//Input Page route, input menu items
app.get("/input", function(req, res){
	res.render('input');
});

//Main Page Route - WITH data requested via the client
app.get("/:word", function(req, res){
	var currentWord = req.params.word;
	res.render('index', {message: currentWord, search: true});
});



//JSON Serving route - ALL Data
app.get("/api/all", function(req,res){
	var db_DATABASE = 'samurai_menu';
	var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;


	console.log('Making a db request for all entries');
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
});



//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

// Start the server
app.listen(4000);
	getMenu();
console.log('Express started on port 4000');