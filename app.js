/***********
Bug List to be fixed
************/
/******
CURRENT ISSUES
1. Database timeout
2. Input page add button
*******/
/******
DONE
1. The order total should first load the info from db 
instead of showing 0
2. Loading menu from index page not working
*******/

/***********
Functions to be added
**********/
/********
5. Order Items manipulation/display for user and admin
2. Add Credit System
3. Multi-restaurant for menu input and order
1. Deploy to Heroku
3. Authentication
4. Styling
6. Total Order Amount Prediction based on current user's order/ dynamic color cues
*********/

/*********
Structural Changes
**********/
/*********
1. Modulerize the app.js with extra js files
*********/



//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');
//var theJsFile= require('/the')

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


var load_pages_routes = require('./routes/load_pages.js');
var order_routes = require('./routes/order.js');
var input_routes = require('./routes/input.js');
var data_routes = require('./routes/data.js');

/*-----
ROUTES
-----*/

/**
Credit Input
**/
app.post("/save_credit",input_routes.save_credit);
//app.post('/delete_credit_entry',input_routes.delete_credit_entry);

app.post("/delete_credit_entry", input_routes.delete_credit_entry);

//UPDATE an object in the database
app.post('/update_credit', function(req,res){
	console.log("Updating an object");
	var theObj = req.body;
	//Send the data to the db
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: theObj
	},
	function (error, response, body){
		if (response.statusCode == 201){
			console.log("Updated!");
			res.json(body);
		}
		else{
			console.log("Uh oh...");
			console.log("Error: " + res.statusCode);
			res.send("Something went wrong...");
		}
	});
});


/**************** MENU INPUT ***********************/
//ADD an item to the menu database
app.post("/save_menu_item",input_routes.save_menu_item);

//DELETE an item from the database
app.post("/delete_menu_item", input_routes.delete_menu_item);


/*******
ORDER COLLECTION
********/
//add an item to the current order
app.post("/order_add", order_routes.order_add);
//confirm and send order to database
app.post("/order_confirm", order_routes.order_confirm);


/******************END THE POST STUFF**************/


/****
page loads
*****/
//Main Page Route - Menu Page
app.get("/", load_pages_routes.index);
//the order page
app.get("/order",load_pages_routes.order);
//Input Page route, input menu items
app.get("/input", load_pages_routes.input);



/***
data loads
***/
//get the menu data
app.get("/menu.json", data_routes.get_menus_data);

//JSON Serving routes - ALL Menu Data
app.get("/api_menu_all", data_routes.get_menus_data);

//JSON Serving route - ALL Order Data
app.get("/api_orders_all", data_routes.get_orders_data);

app.get("/api_credit",data_routes.get_credit_data);



//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

// Start the server
app.listen(4000);
console.log('Express started on port 4000');