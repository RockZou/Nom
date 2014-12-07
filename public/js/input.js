var menu_items;
var htmlString;
var dataStatus;
var user_credits=[];

function deleteFunction(dataObj){
	console.log(dataObj);
	//Make sure you want to delete
	var conf = confirm("Are you sure you want to delete '" + dataObj.user + " : " + dataObj.word + "' ?");
	if (!conf) return;

	$('#loading').html('deleting');
	$('#loading').show();
	//Proceed if confirm is true
	//$('#dataContainer').html('<div id="loading">Data is being deleted...</div>');
	$.ajax({
		url: '/delete_menu_item',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(dataObj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Deleted!');
			console.log(resp);
			getMenu();
		}
	});
}

function addFunction(theObj){
	console.log("empty addFunction");
}

//send the data to the server then the server will send the data to DB
function sendToServer(theObj){

	dataStatus='sending to server';
	$('#loading').html(dataStatus);
	$('#loading').show();

	$.ajax({
		url:'/save_menu_item',
		type:'POST',
		contentType: 'application/json',
		data: JSON.stringify(theObj),
		error: function(resp){
			console.log("bad things happened");
			console.log(resp);
		},
		success: function(resp){
			console.log("happiness");
			console.log(resp);
			console.log("should show data here");
			getMenu();
		}
	});
}


/****
Credit related
*****/

//send the data to the server then the server will send the data to DB
function saveCredit(theObj){

	dataStatus='sending to server';
	$('#loading').html(dataStatus);
	$('#loading').show();

	$.ajax({
		url:'/save_credit',
		type:'POST',
		contentType: 'application/json',
		data: JSON.stringify(theObj),
		error: function(resp){
			console.log("bad things happened");
			console.log(resp);
		},
		success: function(resp){
			console.log("should show credit data here");
			console.log(resp);
			$('#credit_current').html('data is back');
			getCredits();
		}
	});
}

//user credit class to be displayed
function User_credit(dataObj,index){
	
	this.dataObj=dataObj;
	this.dataObj.index=index;
	console.log('this is dataObj object:');
	console.log(this.dataObj);

	this.createDomElement = function(){
		var htmlString = '';
		htmlString += '<li>' + this.dataObj.user_name + ' : '  + this.dataObj.amount;
		htmlString += '<button id=' + this.dataObj._rev + ' class="addButton">ADD</button>';
		htmlString += '<button id=' + this.dataObj._id + ' class="deleteButton">DELETE</button>';
		htmlString += '</li>';

		//console.log(htmlString);
		//Bind DOM events within the class
		var curObj = this;
		curObj.element = $(htmlString).appendTo('#theCreditList');
		curObj.element.click(function(e){
			var theID = $(e.target).attr("id");
			if (theID == curObj.dataObj._rev){
				addCreditToEntry(curObj.dataObj);//addFunction specific to each page
			}
			else if (theID == curObj.dataObj._id){
				deleteCreditEntry(curObj.dataObj);//deleteFunction specific to each page
			}
		});
	};
}

function deleteCreditEntry(dataObj){
	console.log(dataObj);
	//Make sure you want to delete
	var conf = confirm("Are you sure you want to delete '" + dataObj.user + " : " + dataObj.word + "' ?");
	if (!conf) return;

	$('#loading').html('deleting');
	$('#loading').show();
	//Proceed if confirm is true
	//$('#dataContainer').html('<div id="loading">Data is being deleted...</div>');
	$.ajax({
		url: '/delete_credit_entry',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(dataObj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Deleted!');
			console.log(resp);
			getCredits();
		}
	});
}

function getCredits(){
	$.ajax({
		url:'/api_credit',
		type:'GET',
		dataType:'json',
		error: function(data){
			console.log("bad things happened at getMenu");
			console.log(data);
			$('#loading').html('Sorry things are wrong while sending to server...');
			$('#loading').show();
		},
		success: function(data){
			console.log("Data came back from server");
			var credit_docs=data.map(function(d){
				return d.doc;
			});
			user_credits=credit_docs;
			user_credits.sort(function(a,b){return(a.user_name-b.user_name)});

			$('#creditContainer').html('<ul id="theCreditList" style="list-style-type:none">');
			user_credits.forEach(function(d,i){
				var tempObj = new User_credit(d,i);
				tempObj.createDomElement();
			});
			$('#theCreditList').append('</ul>');
		}
	});
}


function updateTheCredit(credit_obj,index){
	console.log("credit should be updated");
	var amountInt=parseInt(user_credits[index].amount,10);
	user_credits[index].amount=amountInt + parseInt(credit_obj.amount,10);

	saveCredit(user_credits[index]);
	console.log("user_credit Number" + index + "is");
	console.log(user_credits[index]);
}


$(document).ready(function(){
	console.log(message);

	dataStatus='loading data';
	$('#loading').html(dataStatus);
	$('#loading').show();
	getMenu();
	getCredits();

	$('#enter').click(function(){
		console.log("Enter clicked");
		var name = $('#name').val();
		var price = $('#price').val();
		var obj = {
			name:name,
			price:price
		};
		console.log(obj);
		sendToServer(obj);
	});

	$('#credit_enter').click(function(){

		console.log("Credit_enter clicked");
		var user_name = $('#credit_user').val();
		var credit_amount = $('#credit_amount').val();
		var credit_obj = {
			user_name:user_name,
			amount:credit_amount
		};

		var matched=false;

		//if user_name is in user_credits, update, otherwise, create a new document
		$.each(user_credits, function(index, item){
			//if the user name in credits matches the input name
			if (item.user_name==credit_obj.user_name)
			{
				console.log("user named matched");
				updateTheCredit(credit_obj,index);
				matched=true;
				return(false);//return false in a each loop in jquery breaks out of loop
			}
		});
		//if there's no match, create a new document
		if (!matched)
		{
			console.log('matched is false');
			saveCredit(credit_obj);
		}
	});

});
