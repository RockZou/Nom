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

var db_URL = 'https://'+ db_USER +'.cloudant.com/' + db_DATABASE;


/*-----
ROUTES
-----*/


var menuData;

function getMenu(){

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
		menuData=rows;
//		console.log(menuData);
		//Send the data
//		res.send(theRows);
	});//end Request.get	
}//end getMenu



/*************ALL THE POST STUFF*******************/
app.post("/save",function(req,res){
	var theObj= req.body;
	//res.send("A POST IS MADE FUCKER!");
	console.log("A POST IS MADE!");
	console.log("theObj is:", theObj);

	//send data to database
	//Using the Request Library
	//request.post({params},callbackfunction(){});
	Request.post({
		url:db_URL, /*databaseURL*/
		auth: {user:db_KEY/*user API key*/, pass: db_PASSWORD},
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(theObj)
	},
		function(err/*error message*/, response/*response status*/, body/*return message from Database*/){
			//Need to parse the body AGAIN

			var theBody = JSON.parse(body);
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
	console.log(menuData);
	res.render('index');
});

//get the menu data
app.get("/menu", function(req, res){
	console.log(menuData);
	res.send(menuData);
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
		var theBody = JSON.parse(body);
		var theRows = theBody.rows;
		//Send the data
		res.send(theRows);
	});
});



//JSON Serving route
app.get("/api/:word", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	var currentWord = req.params.word;
	var requestURL = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + currentWord;
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var theData = JSON.parse(body);
			//console.log(theData);
			res.json(theData);
		}
	});
});


//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

// Start the server
app.listen(3000);
	getMenu();
console.log('Express started on port 3000');